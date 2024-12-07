import Axios from "axios"
import { _tiktokSearchUserFull, _tiktokurl } from "../../constants/api"
import { TiktokUserSearchResponse } from "../../types/search/userSearch"
import { _userSearchParams } from "../../constants/params"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"
import xbogus from "../../../helper/xbogus"

const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"

/**
 * Generate URL with X-Bogus
 * Special thanks to https://github.com/iamatef/xbogus
 * @param {string} username - The username you want to search
 * @param {number} page - The page you want to search
 * @returns {string}
 */

export const generateURLXbogus = (username: string, page: number) => {
  const url =
    "https://www.tiktok.com/api/search/user/full/?" +
    _userSearchParams(username, page)
  const xbogusParams = xbogus(url, userAgent)
  const urlXbogus =
    "https://www.tiktok.com/api/search/user/full/?" +
    _userSearchParams(username, page, xbogusParams)
  return urlXbogus
}

/**
 * Tiktok Search User
 * @param {string} username - The username you want to search
 * @param {string | any[]} cookie - Your Tiktok cookie (optional)
 * @param {number} page - The page you want to search (optional)
 * @param {string} proxy - Your Proxy (optional)
 * @returns {Promise<TiktokUserSearchResponse>}
 */

export const SearchUser = (
  username: string,
  cookie: string | any[],
  page: number = 1,
  proxy?: string
): Promise<TiktokUserSearchResponse> =>
  new Promise(async (resolve) => {
    if (!cookie) {
      return resolve({
        status: "error",
        message: "Cookie is required!"
      })
    }
    Axios(generateURLXbogus(username, page), {
      method: "GET",
      headers: {
        "User-Agent": userAgent,
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
        if (!data.user_list)
          return resolve({ status: "error", message: "User not found!" })

        const result = []
        for (let i = 0; i < data.user_list.length; i++) {
          const user = data.user_list[i]
          result.push({
            uid: user.user_info.uid,
            username: user.user_info.unique_id,
            nickname: user.user_info.nickname,
            signature: user.user_info.signature,
            followerCount: user.user_info.follower_count,
            avatarThumb: user.user_info.avatar_thumb,
            isVerified: user.custom_verify !== "",
            secUid: user.user_info.sec_uid,
            url: `${_tiktokurl}/@${user.user_info.unique_id}`
          })
        }

        resolve({
          status: "success",
          result,
          page,
          totalResults: data.result.length
        })
      })
      .catch((e) => {
        resolve({ status: "error", message: e.message })
      })
  })
