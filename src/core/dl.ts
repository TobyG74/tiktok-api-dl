import axios from "axios"
import { Author, DLResult, Statistics } from "../types"
import { _tiktokapi } from "../utils/commom"

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
