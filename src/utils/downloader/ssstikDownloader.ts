import Axios from "axios"
import asyncRetry from "async-retry"
import { load } from "cheerio"
type CheerioAPI = ReturnType<typeof load>
import {
  AuthorSSSTik,
  StatisticsSSSTik,
  SSSTikFetchTT,
  SSSTikResponse
} from "../../types/downloader/ssstikDownloader"
import { _ssstikapi, _ssstikurl } from "../../constants/api"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"
import { ERROR_MESSAGES } from "../../constants"

/**
 * Using API from Website:
 * BASE URL : https://ssstik.io
 */

/** Constants */
const TIKTOK_URL_REGEX =
  /https:\/\/(?:m|t|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video|photo)\/|\?shareId=|\&item_id=)(\d+))|\w+)/
const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"

/** Types */
interface ProxyConfig {
  httpsAgent?: HttpsProxyAgent<string> | SocksProxyAgent
}

/** Helper Functions */
const createProxyAgent = (proxy?: string): ProxyConfig => {
  if (!proxy) return {}

  const isHttpProxy = proxy.startsWith("http") || proxy.startsWith("https")
  const isSocksProxy = proxy.startsWith("socks")

  if (!isHttpProxy && !isSocksProxy) return {}

  return {
    httpsAgent: isHttpProxy
      ? new HttpsProxyAgent(proxy)
      : new SocksProxyAgent(proxy)
  }
}

const validateTikTokUrl = (url: string): boolean => {
  return TIKTOK_URL_REGEX.test(url)
}

const extractTTValue = (html: string): string | null => {
  const regex = /s_tt\s*=\s*["']([^"']+)["']/
  const match = html.match(regex)
  return match ? match[1] : null
}

const parseAuthor = ($: CheerioAPI): AuthorSSSTik => ({
  avatar: $("img.result_author").attr("src") || "",
  nickname: $("h2").text().trim()
})

const parseStatistics = ($: CheerioAPI): StatisticsSSSTik => ({
  likeCount: $("#trending-actions > .justify-content-start").text().trim(),
  commentCount: $("#trending-actions > .justify-content-center").text().trim(),
  shareCount: $("#trending-actions > .justify-content-end").text().trim()
})

const parseImages = ($: CheerioAPI): string[] => {
  const images: string[] = []
  $("ul.splide__list > li").each((_, img) => {
    const href = $(img).find("a").attr("href")
    if (href) images.push(href)
  })
  return images
}

const createImageResponse = (
  $: CheerioAPI,
  author: AuthorSSSTik,
  statistics: StatisticsSSSTik,
  images: string[],
  music?: string
): SSSTikResponse["result"] => ({
  type: "image",
  desc: $("p.maintext").text().trim(),
  author,
  statistics,
  images,
  ...(music && { music: { playUrl: [music] } })
})

const createVideoResponse = (
  $: CheerioAPI,
  author: AuthorSSSTik,
  statistics: StatisticsSSSTik,
  video: string,
  music?: string
): SSSTikResponse["result"] => ({
  type: "video",
  desc: $("p.maintext").text().trim(),
  author,
  statistics,
  video: { playAddr: [video] },
  ...(music && { music: { playUrl: [music] } })
})

const createMusicResponse = (
  music: string,
  direct?: string
): SSSTikResponse["result"] => ({
  type: "music",
  music: { playUrl: [music] },
  direct: direct || ""
})

const fetchTT = async (proxy?: string): Promise<SSSTikFetchTT> => {
  try {
    const { data } = await Axios(_ssstikurl, {
      method: "GET",
      headers: { "User-Agent": USER_AGENT },
      ...createProxyAgent(proxy)
    })

    const ttValue = extractTTValue(data)
    if (!ttValue) {
      return {
        status: "error",
        message: ERROR_MESSAGES.NETWORK_ERROR
      }
    }

    return {
      status: "success",
      result: ttValue
    }
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR
    }
  }
}

/**
 * Tiktok SSSTik Downloader
 * @param {string} url - Tiktok URL
 * @param {string} proxy - Your Proxy (optional)
 * @returns {Promise<SSSTikResponse>}
 */
export const SSSTik = async (
  url: string,
  proxy?: string
): Promise<SSSTikResponse> => {
  try {
    if (!validateTikTokUrl(url)) {
      return {
        status: "error",
        message: ERROR_MESSAGES.INVALID_URL
      }
    }

    const tt = await fetchTT(proxy)
    if (tt.status !== "success") {
      return {
        status: "error",
        message: tt.message
      }
    }

    const response = await asyncRetry(
      async () => {
        const res = await Axios(_ssstikapi, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: _ssstikurl,
            Referer: `${_ssstikurl}/en`,
            "User-Agent": USER_AGENT
          },
          data: new URLSearchParams({
            id: url,
            locale: "en",
            tt: tt.result
          }),
          ...createProxyAgent(proxy)
        })

        if (res.status === 200 && res.data) {
          return res.data
        }

        throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
      },
      {
        retries: 20,
        minTimeout: 200,
        maxTimeout: 1000
      }
    )

    const $ = load(response)
    const author = parseAuthor($)
    const statistics = parseStatistics($)
    const video = $("a.without_watermark").attr("href")
    const music = $("a.music").attr("href")
    const direct = $("a.music_direct").attr("href")
    const images = parseImages($)

    let result: SSSTikResponse["result"]

    if (images.length > 0) {
      result = createImageResponse($, author, statistics, images, music)
    } else if (video) {
      result = createVideoResponse($, author, statistics, video, music)
    } else if (music) {
      result = createMusicResponse(music, direct)
    } else {
      return {
        status: "error",
        message: ERROR_MESSAGES.NETWORK_ERROR
      }
    }

    return {
      status: "success",
      result
    }
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR
    }
  }
}
