import Axios from "axios"
import { _tiktokTrendings } from "../../constants/api"
import {
  TiktokTrendingResponse,
  TrendingData,
  TrendingCreator
} from "../../types/get/getTrendings"
import { _getTrendingsParams } from "../../constants/params"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"

/**
 * Get TikTok Trending Content
 * @param {string} proxy - Your Proxy (optional)
 * @returns {Promise<TiktokTrendingResponse>}
 */
export const getTrendings = (proxy?: string): Promise<TiktokTrendingResponse> =>
  new Promise(async (resolve) => {
    try {
      const params = _getTrendingsParams()
      const url = _tiktokTrendings(params)

      const response = await Axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin"
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

      if (response.status !== 200) {
        return resolve({
          status: "error",
          message: "Failed to fetch trending data"
        })
      }

      const data = response.data

      if (!data || !data.body || data.statusCode !== 0) {
        return resolve({
          status: "error",
          message: "Invalid response from TikTok API"
        })
      }

      const trendingData = parseTrendingData(data.body)

      resolve({
        status: "success",
        result: trendingData
      })
    } catch (error) {
      resolve({
        status: "error",
        message: error.message || "Unknown error occurred"
      })
    }
  })

/**
 * Parse trending data from TikTok API response
 * @param {any[]} body - Raw response body from TikTok API
 * @returns {TrendingData[]} Parsed trending data
 */
const parseTrendingData = (body: any[]): TrendingData[] => {
  const trendingData: TrendingData[] = []

  body.forEach((section) => {
    if (section.exploreList && Array.isArray(section.exploreList)) {
      trendingData.push({
        exploreList: section.exploreList,
        pageState: section.pageState || {}
      })
    }
  })

  return trendingData
}

/**
 * Get trending creators as a simplified list
 * @param {string} proxy - Your Proxy (optional)
 * @returns {Promise<{ status: "success" | "error", message?: string, result?: TrendingCreator[] }>}
 */
export const getTrendingCreators = async (
  proxy?: string
): Promise<{
  status: "success" | "error"
  message?: string
  result?: TrendingCreator[]
}> => {
  try {
    const trendingResponse = await getTrendings(proxy)

    if (trendingResponse.status === "error") {
      return {
        status: "error",
        message: trendingResponse.message
      }
    }

    const creators: TrendingCreator[] = []

    trendingResponse.result?.forEach((data) => {
      data.exploreList.forEach((item) => {
        if (item.cardItem && item.cardItem.type === 2) {
          // Type 2 seems to be user/creator
          const cardItem = item.cardItem
          const creator: TrendingCreator = {
            id: cardItem.id,
            username: cardItem.subTitle.replace("@", ""),
            nickname: cardItem.title,
            avatarThumb: cardItem.cover,
            description: cardItem.description,
            verified: cardItem.extraInfo?.verified || false,
            followerCount: cardItem.extraInfo?.fans || 0,
            likeCount: cardItem.extraInfo?.likes || 0,
            videoCount: cardItem.extraInfo?.video || 0,
            followingCount: cardItem.extraInfo?.following || 0,
            heartCount: cardItem.extraInfo?.heart || 0,
            diggCount: cardItem.extraInfo?.digg || 0,
            secUid: cardItem.extraInfo?.secUid || "",
            link: cardItem.link
          }
          creators.push(creator)
        }
      })
    })

    return {
      status: "success",
      result: creators
    }
  } catch (error) {
    return {
      status: "error",
      message: error.message || "Unknown error occurred"
    }
  }
}
