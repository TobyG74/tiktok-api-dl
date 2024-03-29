import Axios from "axios"
import { _tiktokSearchUserFull, _tiktokurl } from "../../constants/api"
import { TiktokUserSearchResponse } from "../../types/search/userSearch"

const params = (keyword: string) => {
  return {
    WebIdLastTime: Date.now(),
    aid: "1988",
    app_language: "en",
    app_name: "tiktok_web",
    browser_language: "en-US",
    browser_name: "Mozilla",
    browser_online: true,
    browser_platform: "Win32",
    browser_version: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
    channel: "tiktok_web",
    cookie_enabled: true,
    cursor: 0,
    device_id: "7340508178566366722",
    device_platform: "web_pc",
    focus_state: false,
    from_page: "search",
    history_len: 5,
    is_fullscreen: false,
    is_page_visible: true,
    keyword: keyword,
    os: "windows",
    priority_region: "ID",
    referer: "",
    region: "ID",
    screen_height: 768,
    screen_width: 1366,
    tz_name: "Asia/Jakarta",
    web_search_code: { tiktok: { client_params_x: { search_engine: { ies_mt_user_live_video_card_use_libra: 1, mt_search_general_user_live_card: 1 } }, search_server: {} } },
    webcast_language: "en"
  }
}

/**
 * Tiktok Search User
 * @param {string} username - The username you want to search
 * @param {object|string} cookie - Your Tiktok cookie (optional)
 * @returns {Promise<TiktokUserSearchResponse>}
 */

export const SearchUser = (username: string, cookie?: any): Promise<TiktokUserSearchResponse> =>
  new Promise(async (resolve, reject) => {
    Axios(_tiktokSearchUserFull(params(username)), {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
        cookie: typeof cookie === "object" ? cookie.map((v) => `${v.name}=${v.value}`).join("; ") : cookie
      }
    })
      .then(({ data }) => {
        if (data.status_code !== 0) return resolve({ status: "error", message: "Failed to find user. Make sure the keywords you are looking for are correct..." })
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

        resolve({ status: "success", result })
      })
      .catch((e) => {
        resolve({ status: "error", message: e.message })
      })
  })
