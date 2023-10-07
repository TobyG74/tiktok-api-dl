import axios from "axios"
import { _tiktokapi, _tiktokurl } from "../api"
import { Author, DLResult, Statistics, Music } from "../types"

const toMinute = (duration) => {
  const mins = ~~((duration % 3600) / 60)
  const secs = ~~duration % 60

  let ret = ""

  ret += "" + mins + ":" + (secs < 10 ? "0" : "")
  ret += "" + secs

  return ret
}

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

            // Statictics Result
            const statistics: Statistics = {
              playCount: content.statistics.play_count,
              downloadCount: content.statistics.download_count,
              shareCount: content.statistics.share_count,
              commentCount: content.statistics.comment_count,
              likeCount: content.statistics.digg_count,
              favoriteCount: content.statistics.collect_count,
              forwardCount: content.statistics.forward_count,
              whatsappShareCount: content.statistics.whatsapp_share_count,
              loseCount: content.statistics.lose_count,
              loseCommentCount: content.statistics.lose_comment_count
            }

            // Author Result
            const author: Author = {
              uid: content.author.uid,
              username: content.author.unique_id,
              nickname: content.author.nickname,
              signature: content.author.signature,
              region: content.author.region,
              avatarLarger: content.author.avatar_larger.url_list,
              avatarThumb: content.author.avatar_thumb.url_list,
              avatarMedium: content.author.avatar_medium.url_list,
              url: `${_tiktokurl}/@${content.username}`
            }

            // Music Result
            const music: Music = {
              id: content.music.id,
              title: content.music.title,
              author: content.music.author,
              album: content.music.album,
              playUrl: content.music.play_url.url_list,
              coverLarge: content.music.cover_large.url_list,
              coverMedium: content.music.cover_medium.url_list,
              coverThumb: content.music.cover_thumb.url_list,
              duration: content.music.duration
            }

            // Download Result
            if (content.image_post_info) {
              // Images or Slide Result
              resolve({
                status: "success",
                result: {
                  type: "image",
                  id: content.aweme_id,
                  createTime: content.create_time,
                  description: content.desc,
                  hashtag: content.text_extra.filter((x) => x.hashtag_name !== undefined).map((v) => v.hashtag_name),
                  author,
                  statistics,
                  images: content.image_post_info.images.map((v) => v.display_image.url_list[0]),
                  music
                }
              })
            } else {
              // Video Result
              resolve({
                status: "success",
                result: {
                  type: "video",
                  id: content.aweme_id,
                  createTime: content.create_time,
                  description: content.desc,
                  hashtag: content.text_extra.filter((x) => x.hashtag_name !== undefined).map((v) => v.hashtag_name),
                  duration: toMinute(content.duration),
                  author,
                  statistics,
                  video: content.video.play_addr.url_list,
                  cover: content.video.cover.url_list,
                  dynamicCover: content.video.dynamic_cover.url_list,
                  originCover: content.video.origin_cover.url_list,
                  music
                }
              })
            }
          })
          .catch((e) => resolve({ status: "error", message: e.message }))
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })
