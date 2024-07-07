import Axios from "axios"
import { _tiktokvFeed, _tiktokurl } from "../../constants/api"
import { _tiktokApiParams } from "../../constants/params"
import { Author, TiktokAPIResponse, Statistics, Music, responseParser, Video } from "../../types/downloader/tiktokApi"

const TiktokURLregex = /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/

/**
 * Tiktok API Downloader
 * @param {string} url - Tiktok URL
 * @returns {Promise<TiktokAPIResponse>}
 */

export const TiktokAPI = (url: string) =>
  new Promise<TiktokAPIResponse>((resolve, reject) => {
    if (!TiktokURLregex.test(url)) {
      return resolve({
        status: "error",
        message: "Invalid Tiktok URL. Make sure your url is correct!"
      })
    }
    url = url.replace("https://vm", "https://vt")
    Axios.head(url)
      .then(async ({ request }) => {
        const { responseUrl } = request.res
        let ID = responseUrl.match(/\d{17,21}/g)
        if (ID === null)
          return resolve({
            status: "error",
            message: "Failed to fetch tiktok url. Make sure your tiktok url is correct!"
          })
        ID = ID[0]

        let data2 = await fetchTiktokData(ID)

        if (!data2?.content) {
          return resolve({
            status: "error",
            message: "Failed to fetch tiktok data. Make sure your tiktok url is correct!"
          })
        }

        const { content, author, statistics, music } = data2

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
              isADS: content.is_ads,
              author,
              statistics,
              images: content.image_post_info.images.map((v) => v.display_image.url_list[0]),
              music
            }
          })
        } else {
          // Video Result
          const video: Video = {
            ratio: content.video.ratio,
            duration: content.video.duration,
            playAddr: content.video.play_addr.url_list,
            downloadAddr: content.video.download_addr.url_list,
            cover: content.video.cover.url_list,
            dynamicCover: content.video.dynamic_cover.url_list,
            originCover: content.video.origin_cover.url_list
          }

          resolve({
            status: "success",
            result: {
              type: "video",
              id: content.aweme_id,
              createTime: content.create_time,
              description: content.desc,
              hashtag: content.text_extra.filter((x) => x.hashtag_name !== undefined).map((v) => v.hashtag_name),
              isADS: content.is_ads,
              author,
              statistics,
              video,
              music
            }
          })
        }
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })

const fetchTiktokData = async (ID: string): Promise<responseParser> | null => {
  const res = await fetch(
    _tiktokvFeed(
      new URLSearchParams(
        _tiktokApiParams({
          aweme_id: ID
        })
      ).toString()
    ),
    {
      method: "GET",
      headers: {
        Cookie:
          "tt_csrf_token=g1GUApj0-ADAIP9COU6o1m1_NnbwhKGTbiyI; ttwid=1%7CvqigUFT-mdDjU8gnwF3hkh8sPQqokFjCRyD7R1jpM44%7C1720342326%7Cc8c89833ea6bb912642ea1340ef98691ad3382878374ec61a5de85eeb5d79e83; ak_bmsc=C3345397EF8621798FA50BACA05F1AD3~000000000000000000000000000000~YAAQhq0wFzqUPlOQAQAA+ctjjBiYLJJ3WVeqfLXcnxTCKMkcRlAYLT+GxhKgkMdR94wzPi2zqWiZfuEUdBpaJmo01qZY4M4dUO6xiYqbXZev0cFbauilIxyj1WRUHOy9+oAUCAkyWRMubLICOr1g9XUc7eadCgHCEnmwfVYe6mYbkwaqDMn/0mgxdqJCjnLFnEQTLG1FXUYkhk1sjrzg1ubRwJLuAdw4T+FZg2mYeQIdFuo/CUPf8Jw2UYfNd…XkpqwL-3Zzf_VO_mXrptr32f1D4TVmQPhR1FNen76-b7g2Tey2UlUrFD1fhpjJmOySmQtS_eW0p8BVLJthEcysTN98LLGTkAzD7M335V27Rf0zxX8ZsVWE6wa2P7x5X-HNmCwEO_WccrcClQifgb2PCKYDmhpG5BWNwoer5-8ak1SwZjybv_hdspeNhpbylwg4sNLRc_OiunUK0tYW2hiV7xrliwDKsIMVsZcQ0kwvBmp0eyUQJrEJv0fnzoS0o_jKMFtTvUChfEVz0Laj5O4MKf52isC30U3q; last_login_method=google; passport_fe_beating_status=true; msToken=ftn8ICq2_TfkkAyS3f6umBK1FafalSQ_IyzJxq1LmeBmDe2QxefwBfd_weMdvJI3TU5Z8gyFmzJdPSMESb5zUeseZysme5LBC19xouQTYAAMfVV35YliLfxMWhWZ_2ABP_uYMFNDJ5jtYE4Ap6uRyA==",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
      }
    }
  )

  if (res.headers.get("content-length") !== "0") {
    const data = await res.json()

    if (data) {
      return parseTiktokData(ID, data)
    }
  }

  return null
}

const parseTiktokData = (ID: string, data: any): responseParser => {
  let content = data?.aweme_list

  if (!content) return { content: null }

  content = content.find((v: any) => v.aweme_id === ID)

  // Statistics Result
  const statistics: Statistics = {
    commentCount: content.statistics.comment_count,
    diggCount: content.statistics.digg_count,
    downloadCount: content.statistics.download_count,
    playCount: content.statistics.play_count,
    shareCount: content.statistics.share_count,
    forwardCount: content.statistics.forward_count,
    loseCount: content.statistics.lose_count,
    loseCommentCount: content.statistics.lose_comment_count,
    whatsappShareCount: content.statistics.whatsapp_share_count,
    collectCount: content.statistics.collect_count,
    repostCount: content.statistics.repost_count
  }

  // Author Result
  const author: Author = {
    uid: content.author.uid,
    username: content.author.unique_id,
    nickname: content.author.nickname,
    signature: content.author.signature,
    region: content.author.region,
    avatarThumb: content.author.avatar_thumb.url_list,
    avatarMedium: content.author.avatar_medium.url_list,
    url: `${_tiktokurl}/@${content.author.unique_id}`
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
    duration: content.music.duration,
    isCommerceMusic: content.music.is_commerce_music,
    isOriginalSound: content.music.is_original_sound,
    isAuthorArtist: content.music.is_author_artist
  }

  return { content, statistics, author, music }
}
