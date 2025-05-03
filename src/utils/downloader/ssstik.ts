import Axios from "axios"
import asyncRetry from "async-retry"
import { load } from "cheerio"
import {
  AuthorSSSTik,
  StatisticsSSSTik,
  SSSTikFetchTT,
  SSSTikResponse
} from "../../types/downloader/ssstik"
import { _ssstikapi, _ssstikurl } from "../../constants/api"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"

/**
 * Using API from Website:
 * BASE URL : https://ssstik.io
 */

const TiktokURLregex =
  /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video|photo)\/|\?shareId=|\&item_id=)(\d+))|\w+)/

const fetchTT = (proxy?: string): Promise<SSSTikFetchTT> =>
  new Promise(async (resolve) => {
    Axios(_ssstikurl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
      },
      httpsAgent:
        (proxy &&
          (proxy.startsWith("http") || proxy.startsWith("https")
            ? new HttpsProxyAgent(proxy)
            : proxy.startsWith("socks")
            ? new SocksProxyAgent(proxy)
            : undefined)) ||
        undefined
    })
      .then(({ data }) => {
        const regex = /s_tt\s*=\s*["']([^"']+)["']/
        const match = data.match(regex)
        if (match) {
          const value = match[1]
          return resolve({ status: "success", result: value })
        } else {
          return resolve({
            status: "error",
            message: "Failed to get the request form!"
          })
        }
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })

/**
 * Tiktok SSSTik Downloader
 * @param {string} url - Tiktok URL
 * @param {string} proxy - Your Proxy (optional)
 * @returns {Promise<SSSTikResponse>}
 */

export const SSSTik = (url: string, proxy?: string): Promise<SSSTikResponse> =>
  new Promise(async (resolve) => {
    try {
      if (!TiktokURLregex.test(url)) {
        return resolve({
          status: "error",
          message: "Invalid Tiktok URL. Make sure your url is correct!"
        })
      }
      const tt: SSSTikFetchTT = await fetchTT(proxy)
      if (tt.status !== "success")
        return resolve({ status: "error", message: tt.message })

      const response = asyncRetry(
        async () => {
          const res = await Axios(_ssstikapi, {
            method: "POST",
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              Origin: _ssstikurl,
              Referer: _ssstikurl + "/en",
              "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
            },
            data: new URLSearchParams(
              Object.entries({
                id: url,
                locale: "en",
                tt: tt.result
              })
            ),
            httpsAgent:
              (proxy &&
                (proxy.startsWith("http") || proxy.startsWith("https")
                  ? new HttpsProxyAgent(proxy)
                  : proxy.startsWith("socks")
                  ? new SocksProxyAgent(proxy)
                  : undefined)) ||
              undefined
          })

          if (res.status === 200 && res.data !== "") return res.data

          throw new Error("Failed to fetch data from SSSTik!")
        },
        {
          retries: 20,
          minTimeout: 200,
          maxTimeout: 1000
        }
      )

      const $ = load(await response)

      // Result
      const author: AuthorSSSTik = {
        avatar: $("img.result_author").attr("src"),
        nickname: $("h2").text().trim()
      }
      const statistics: StatisticsSSSTik = {
        likeCount: $("#trending-actions > .justify-content-start")
          .text()
          .trim(),
        commentCount: $("#trending-actions > .justify-content-center")
          .text()
          .trim(),
        shareCount: $("#trending-actions > .justify-content-end").text().trim()
      }

      // Video & Music Result
      const video = $("a.without_watermark").attr("href")
      const music = $("a.music").attr("href")
      const direct = $("a.music_direct").attr("href")

      // Images / Slide Result
      const images: string[] = []
      $("ul.splide__list > li")
        .get()
        .map((img) => {
          images.push($(img).find("a").attr("href"))
        })

      let result: SSSTikResponse["result"]
      if (images.length !== 0) {
        // Images / Slide Result
        result = {
          type: "image",
          desc: $("p.maintext").text().trim(),
          author,
          statistics,
          images
        }

        if (music) {
          result.music = music
        }
      } else if (video) {
        // Video Result
        result = {
          type: "video",
          desc: $("p.maintext").text().trim(),
          author,
          statistics,
          video
        }

        if (music) {
          result.music = music
        }
      } else if (music) {
        // Music Result
        result = {
          type: "music",
          music,
          direct: direct || ""
        }
      }

      resolve({ status: "success", result })
    } catch (err) {
      resolve({ status: "error", message: err.message })
    }
  })
