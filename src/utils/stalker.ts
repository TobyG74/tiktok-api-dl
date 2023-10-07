import axios from "axios"
import { load } from "cheerio"
import { _tiktokurl } from "../api"
import { StalkResult, Stats, Users } from "../types"

const getCookie = () =>
  new Promise((resolve, reject) => {
    axios
      .get("https://pastebin.com/raw/ELJjcbZT")
      .then(({ data: cookie }) => {
        resolve(cookie)
      })
      .catch((e) => resolve({ status: "error", message: "Failed to fetch cookie." }))
  })

export const TiktokStalk = (username: string, options: { cookie: string }): Promise<StalkResult> =>
  new Promise(async (resolve, reject) => {
    username = username.replace("@", "")
    axios
      .get(`${_tiktokurl}/@${username}`, {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
          cookie: (options?.cookie ? options.cookie : await getCookie()) as string
        }
      })
      .then(({ data }) => {
        const $ = load(data)
        const result = JSON.parse($("script#SIGI_STATE").text())
        if (!result.UserModule) {
          return resolve({
            status: "error",
            message: "User not found!"
          })
        }
        const user = result.UserModule
        const users: Users = {
          username: user.users[username].uniqueId,
          nickname: user.users[username].nickname,
          avatarLarger: user.users[username].avatarLarger,
          avatarThumb: user.users[username].avatarThumb,
          avatarMedium: user.users[username].avatarMedium,
          signature: user.users[username].signature,
          verified: user.users[username].verified,
          region: user.users[username].region,
          commerceUser: user.users[username].commerceUserInfo.commerceUser,
          usernameModifyTime: user.users[username].uniqueIdModifyTime,
          nicknameModifyTime: user.users[username].nickNameModifyTime
        }
        const stats: Stats = {
          followerCount: user.stats[username].followerCount,
          followingCount: user.stats[username].followingCount,
          heartCount: user.stats[username].heartCount,
          videoCount: user.stats[username].videoCount,
          likeCount: user.stats[username].diggCount,
          friendCount: user.stats[username].friendCount
        }
        resolve({
          status: "success",
          result: {
            users,
            stats
          }
        })
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })
