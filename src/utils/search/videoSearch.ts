import Axios from "axios"
import { _tiktokSearchVideoFull } from "../../constants/api"
import { _liveSearchParams, _videoSearchParams } from "../../constants/params"
import { SocksProxyAgent } from "socks-proxy-agent"
import { HttpsProxyAgent } from "https-proxy-agent"
import retry from "async-retry"
import {
  TiktokVideoSearchResponse,
  AuthorVideoSearch,
  MusicVideoSearch,
  VideoSearch,
  VideoSearchResult,
  StatisticsVideoSearch
} from "../../types/search/videoSearch"

/**
 * Tiktok Search Live
 * @param {string} keyword - The keyword you want to search
 * @param {string | any[]} cookie - Your Tiktok cookie (optional)
 * @param {number} page - The page you want to search (optional)
 * @param {string} proxy - Your Proxy (optional)
 * @returns {Promise<TiktokVideoSearchResponse>}
 */

export const SearchVideo = async (
  keyword: string,
  cookie: string | any[],
  page: number = 1,
  proxy?: string
): Promise<TiktokVideoSearchResponse> =>
  new Promise(async (resolve) => {
    if (!cookie) {
      return resolve({
        status: "error",
        message: "Cookie is required!"
      })
    }

    try {
      const data = await requestVideoSearch(keyword, page, cookie, proxy)

      // Cookie Invalid
      if (data.status_code === 2483)
        return resolve({ status: "error", message: "Invalid cookie!" })
      // Another Error
      if (data.status_code !== 0)
        return resolve({
          status: "error",
          message:
            data.status_msg ||
            "An error occurred! Please report this issue to the developer."
        })
      if (!data.item_list)
        return resolve({ status: "error", message: "Video not found!" })

      const result: VideoSearchResult[] = []
      data.item_list.forEach((v: any) => {
        const video: VideoSearch = {
          id: v.video.id,
          ratio: v.video.ratio,
          cover: v.video.cover,
          originCover: v.video.originCover,
          dynamicCover: v.video.dynamicCover,
          playAddr: v.video.playAddr,
          downloadAddr: v.video.downloadAddr,
          format: v.video.format
        }

        const stats: StatisticsVideoSearch = {
          likeCount: v.stats.diggCount,
          shareCount: v.stats.shareCount,
          commentCount: v.stats.commentCount,
          playCount: v.stats.playCount,
          collectCount: v.stats.collectCount
        }

        const author: AuthorVideoSearch = {
          id: v.author.id,
          uniqueId: v.author.uniqueId,
          nickname: v.author.nickname,
          avatarThumb: v.author.avatarThumb,
          avatarMedium: v.author.avatarMedium,
          avatarLarger: v.author.avatarLarger,
          signature: v.author.signature,
          verified: v.author.verified,
          secUid: v.author.secUid,
          openFavorite: v.author.openFavorite,
          privateAccount: v.author.privateAccount,
          isADVirtual: v.author.isADVirtual,
          tiktokSeller: v.author.ttSeller,
          isEmbedBanned: v.author.isEmbedBanned
        }

        const music: MusicVideoSearch = {
          id: v.music.id,
          title: v.music.title,
          playUrl: v.music.playUrl,
          coverThumb: v.music.coverThumb,
          coverMedium: v.music.coverMedium,
          coverLarge: v.music.coverLarge,
          authorName: v.music.authorName,
          original: v.music.original,
          album: v.music.album,
          duration: v.music.duration,
          isCopyrighted: v.music.isCopyrighted
        }
        result.push({
          id: v.id,
          desc: v.desc,
          createTime: v.createTime,
          author,
          stats,
          video,
          music
        })
      })

      if (!result.length)
        return resolve({ status: "error", message: "Video not found!" })

      resolve({
        status: "success",
        result,
        page,
        totalResults: result.length
      })
    } catch (e) {
      resolve({ status: "error", message: e.message })
    }
  })

const requestVideoSearch = async (
  keyword: string,
  page: number,
  cookie: string | any[],
  proxy?: string
): Promise<any> => {
  return retry(
    async (bail, attempt) => {
      try {
        const { data } = await Axios(
          _tiktokSearchVideoFull(_videoSearchParams(keyword, page)),
          {
            method: "GET",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
              cookie:
                typeof cookie === "object"
                  ? cookie.map((v: any) => `${v.name}=${v.value}`).join("; ")
                  : cookie
            },
            httpsAgent:
              (proxy &&
                (proxy.startsWith("http") || proxy.startsWith("https")
                  ? new HttpsProxyAgent(proxy)
                  : proxy.startsWith("socks")
                  ? new SocksProxyAgent(proxy)
                  : undefined)) ||
              undefined
          }
        )

        if (data === "") {
          throw new Error("Empty response")
        }

        return data
      } catch (error) {
        throw error
      }
    },
    {
      retries: 10,
      minTimeout: 1000,
      maxTimeout: 5000,
      factor: 2,
      onRetry: (error, attempt) => {
        console.log(`Retry attempt ${attempt} due to: ${error}`)
      }
    }
  )
}
