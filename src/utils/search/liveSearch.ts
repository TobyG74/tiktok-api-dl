import Axios from "axios"
import { _tiktokSearchLiveFull } from "../../constants/api"
import { _liveSearchParams } from "../../constants/params"
import {
  LiveInfo,
  Owner,
  OwnerStats,
  LiveSearchResult,
  TiktokLiveSearchResponse
} from "../../types/search/liveSearch"
import { SocksProxyAgent } from "socks-proxy-agent"
import { HttpsProxyAgent } from "https-proxy-agent"

/**
 * Tiktok Search Live
 * @param {string} keyword - The keyword you want to search
 * @param {string | any[]} cookie - Your Tiktok cookie (optional)
 * @param {number} page - The page you want to search (optional)
 * @param {string} proxy - Your Proxy (optional)
 * @returns {Promise<TiktokLiveSearchResponse>}
 */

export const SearchLive = async (
  keyword: string,
  cookie: string | any[],
  page: number = 1,
  proxy?: string
): Promise<TiktokLiveSearchResponse> =>
  new Promise(async (resolve) => {
    if (!cookie) {
      return resolve({
        status: "error",
        message: "Cookie is required!"
      })
    }
    Axios(_tiktokSearchLiveFull(_liveSearchParams(keyword, page)), {
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
    })
      .then(({ data }) => {
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
        if (!data.data)
          return resolve({ status: "error", message: "Live not found!" })

        const result: LiveSearchResult[] = []
        data.data.forEach((v: any) => {
          const content = JSON.parse(v.live_info.raw_data)

          // Live Info
          const liveInfo: LiveInfo = {
            id: content.id,
            title: content.title,
            cover: content.cover?.url_list || [],
            squareCover: content.square_cover_img?.url_list || [],
            rectangleCover: content.rectangle_cover_img?.url_list || [],
            liveTypeThirdParty: content.live_type_third_party,
            hashtag: content.hashtag?.title || "",
            startTime: content.start_time,
            stats: {
              totalUser: content.stats.total_user,
              viewerCount: content.user_count,
              likeCount: content.like_count
            },
            owner: {
              uid: content.owner.id,
              nickname: content.owner.nickname,
              username: content.owner.display_id,
              signature: content.owner.bio_description,
              avatarThumb: content.owner.avatar_thumb?.url_list || [],
              avatarMedium: content.owner.avatar_medium?.url_list || [],
              avatarLarge: content.owner.avatar_large?.url_list || [],
              modifyTime: content.owner.modify_time,
              stats: {
                followingCount: content.owner.follow_info.following_count,
                followerCount: content.owner.follow_info.follower_count
              } as OwnerStats,
              isVerified:
                content.owner?.authentication_info?.custom_verify ===
                  "verified account" || false
            } as Owner
          }

          // Room Info
          const roomInfo = {
            hasCommerceGoods: v.live_info.room_info.has_commerce_goods,
            isBattle: v.live_info.room_info.is_battle
          }
          result.push({ roomInfo, liveInfo })
        })

        if (!result.length)
          return resolve({ status: "error", message: "Live not found!" })

        resolve({
          status: "success",
          result,
          page,
          totalResults: result.length
        })
      })
      .catch((e) => {
        resolve({ status: "error", message: e.message })
      })
  })
