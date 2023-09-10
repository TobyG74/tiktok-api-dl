import axios from "axios"
import { load } from "cheerio"
import { Author, DLResult, StalkResult, Statistics, Stats, Users } from "../types"

const _tiktokurl: string = "https://www.tiktok.com"
const _tiktokapi = (id: string): string => `https://api16-core.tiktokv.com/aweme/v1/feed/?aweme_id=${id}&openudid=vi8vz5c5aec5wllw&uuid=7661132520610792&_rticket=1694319262046&ts=1694319262&device_platform=android&channel=googleplay&ac=wifi`

export const TiktokDL = (url: string): Promise<DLResult> =>
  new Promise((resolve, reject) => {
    url = url.replace("https://vm", "https://vt")
    axios
      .head(url)
      .then(({ request }) => {
        const { responseUrl } = request.res
        let ID = responseUrl.match(/\d{17,21}/g)
        if (ID === null)
          return resolve({
            status: "error",
            message: "Failed to fetch tiktok url. Make sure your tiktok url is correct!"
          })
        ID = ID[0]
        axios
          .get(_tiktokapi(ID))
          .then(({ data }) => {
            const content = data.aweme_list.filter((v) => v.aweme_id === ID)[0]
            if (!content)
              return resolve({
                status: "error",
                message: "Failed to find tiktok data. Make sure your tiktok url is correct!"
              })
            const statistics: Statistics = {
              playCount: content.statistics.play_count,
              downloadCount: content.statistics.download_count,
              shareCount: content.statistics.share_count,
              commentCount: content.statistics.comment_count,
              likeCount: content.statistics.digg_count,
              favoriteCount: content.statistics.collect_count
            }
            const author: Author = {
              uid: content.author.uid,
              username: content.author.unique_id,
              nickname: content.author.nickname,
              signature: content.author.signature,
              birthday: content.author.birthday,
              region: content.author.region
            }
            if (content.image_post_info) {
              resolve({
                status: "success",
                result: {
                  type: "image",
                  id: content.aweme_id,
                  createTime: content.create_time,
                  description: content.desc,
                  author,
                  statistics,
                  images: content.image_post_info.images.map((v) => v.display_image.url_list[0]),
                  music: content.music.play_url.url_list
                }
              })
            } else {
              resolve({
                status: "success",
                result: {
                  type: "video",
                  id: content.aweme_id,
                  createTime: content.create_time,
                  description: content.desc,
                  author,
                  statistics,
                  video: content.video.play_addr.url_list,
                  cover: content.video.cover.url_list,
                  dynamic_cover: content.video.dynamic_cover.url_list,
                  music: content.music.play_url.url_list
                }
              })
            }
          })
          .catch((e) => resolve({ status: "error", message: e.message }))
      })
      .catch((e) => reject(e))
  })

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
      .catch((e) => reject(e))
  })
