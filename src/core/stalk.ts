import axios from "axios"
import { load } from "cheerio"
import { Post, StalkResult, Stats, Users } from "../types"
import { _tiktokurl } from "../utils/commom"

export const TiktokStalk = (username: string): Promise<StalkResult> =>
  new Promise((resolve, reject) => {
    axios
      .get("https://pastebin.com/raw/ELJjcbZT")
      .then(({ data: cookie }) => {
        username = username.replace("@", "")
        axios
          .get(`${_tiktokurl}/@${username}`, {
            headers: {
              "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
              cookie: cookie
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
              avatar: user.users[username].avatarLarger,
              signature: user.users[username].signature,
              verified: user.users[username].verified,
              region: user.users[username].region
            }
            const stats: Stats = {
              followerCount: user.stats[username].followerCount,
              followingCount: user.stats[username].followingCount,
              heartCount: user.stats[username].heartCount,
              videoCount: user.stats[username].videoCount,
              likeCount: user.stats[username].diggCount
            }

            const items = result.ItemModule
            const posts = Object.values(items) as Post[]

            resolve({
              status: "success",
              result: {
                users,
                stats,
                posts
              }
            })
          })
          .catch((e) => resolve({ status: "error", message: e.message }))
      })
      .catch((e) => reject(e))
  })
