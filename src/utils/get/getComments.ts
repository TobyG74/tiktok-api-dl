import Axios from "axios"
import { _tiktokGetComments } from "../../constants/api"
import { _getCommentsParams } from "../../constants/params"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"
import {
  Comments,
  TiktokVideoCommentsResponse,
  User
} from "../../types/get/getComments"

const TiktokURLregex =
  /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video|photo)\/|\?shareId=|\&item_id=)(\d+))|\w+)/

/**
 * Tiktok Get Comments
 * @param {string} url - Tiktok URL
 * @param {string} proxy - Your Proxy (optional)
 * @param {number} commentLimit - Comment Limit (optional)
 * @returns {Promise<TiktokVideoCommentsResponse>}
 */

export const getComments = async (
  url: string,
  proxy?: string,
  commentLimit?: number
): Promise<TiktokVideoCommentsResponse> =>
  new Promise(async (resolve) => {
    if (!TiktokURLregex.test(url)) {
      return resolve({
        status: "error",
        message: "Invalid Tiktok URL. Make sure your url is correct!"
      })
    }
    url = url.replace("https://vm", "https://vt")
    Axios(url, {
      method: "HEAD",
      httpsAgent:
        (proxy &&
          (proxy.startsWith("http") || proxy.startsWith("https")
            ? new HttpsProxyAgent(proxy)
            : proxy.startsWith("socks")
            ? new SocksProxyAgent(proxy)
            : undefined)) ||
        undefined
    })
      .then(async ({ request }) => {
        const { responseUrl } = request.res
        let ID = responseUrl.match(/\d{17,21}/g)
        if (ID === null)
          return resolve({
            status: "error",
            message:
              "Failed to fetch tiktok url. Make sure your tiktok url is correct!"
          })
        ID = ID[0]

        const resultComments = await parseComments(ID, commentLimit, proxy)

        if (!resultComments.comments.length)
          return resolve({
            status: "error",
            message: "No comments found!"
          })

        return resolve({
          status: "success",
          result: resultComments.comments,
          totalComments: resultComments.total
        })
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })

const requestComments = async (
  id: string,
  commentLimit: number,
  proxy?: string
) => {
  const { data } = await Axios(
    _tiktokGetComments(_getCommentsParams(id, commentLimit)),
    {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
      },
      httpsAgent:
        (proxy &&
          (proxy.startsWith("http") || proxy.startsWith("https")
            ? new HttpsProxyAgent(proxy)
            : proxy.startsWith("socks")
            ? new SocksProxyAgent(proxy)
            : undefined)) ||
        undefined
    }
  )

  return data
}

const parseComments = async (
  id: string,
  commentLimit?: number,
  proxy?: string
) => {
  const comments: Comments[] = []
  let cursor: number = 0
  let total: number = 0
  let hasMore: boolean = true

  while (hasMore) {
    const result = await requestComments(id, commentLimit, proxy)

    // Check if the result has more comments
    hasMore = result.has_more === 1
    cursor = hasMore ? result.cursor : 0

    if (result.comments) {
      result.comments.forEach((v: any) => {
        const comment = {
          cid: v.cid,
          text: v.text,
          commentLanguage: v.comment_language,
          createTime: v.create_time,
          likeCount: v.digg_count,
          isAuthorLiked: v.is_author_digged,
          isCommentTranslatable: v.is_comment_translatable,
          replyCommentTotal: v.reply_comment_total,
          user: {
            uid: v.user.uid,
            avatarThumb: v.user.avatar_thumb.url_list,
            nickname: v.user.nickname,
            username: v.user.unique_id,
            isVerified: v.user.custom_verify !== ""
          } as User,
          url: v.share_info?.url || "",
          replyComment: []
        }

        if (v.reply_comment !== null) {
          v.reply_comment.forEach((v: any) => {
            comment.replyComment.push({
              cid: v.cid,
              text: v.text,
              commentLanguage: v.comment_language,
              createTime: v.create_time,
              likeCount: v.digg_count,
              isAuthorLiked: v.is_author_digged,
              isCommentTranslatable: v.is_comment_translatable,
              replyCommentTotal: v.reply_comment_total,
              user: {
                uid: v.user.uid,
                avatarThumb: v.user.avatar_thumb.url_list,
                nickname: v.user.nickname,
                username: v.user.unique_id,
                isVerified: v.user.custom_verify !== ""
              } as User,
              url: v.share_info?.url || "",
              replyComment: []
            })
            total++
          })
        }
        total++
        comments.push(comment)
      })
    }

    // Check if we've reached the comment limit
    if (commentLimit && comments.length >= commentLimit) {
      hasMore = false
      break
    }
  }

  const response = commentLimit ? comments.slice(0, commentLimit) : comments
  return {
    total: response.length,
    comments: response
  }
}
