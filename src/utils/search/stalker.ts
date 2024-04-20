import Axios from "axios"
import qs from "qs"
import { load } from "cheerio"
import { _tiktokGetPosts, _tiktokurl } from "../../constants/api"
import { AuthorPost, Posts, StalkResult, Stats, Users } from "../../types/search/stalker"
import { _userPostsParams, _xttParams } from "../../constants/params"
import { createCipheriv } from "crypto"

/**
 * Tiktok Stalk User
 * @param {string} username - The username you want to stalk
 * @param {object|string} cookie - Your Tiktok Cookie (optional)
 * @returns {Promise<StalkResult>}
 */

export const StalkUser = (username: string, cookie?: any, postLimit?: number): Promise<StalkResult> =>
  new Promise(async (resolve, reject) => {
    username = username.replace("@", "")
    Axios.get(`${_tiktokurl}/@${username}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
        cookie: typeof cookie === "object" ? cookie.map((v) => `${v.name}=${v.value}`).join("; ") : cookie
      }
    })
      .then(async ({ data }) => {
        const $ = load(data)
        const result = JSON.parse($("script#__UNIVERSAL_DATA_FOR_REHYDRATION__").text())
        if (!result["__DEFAULT_SCOPE__"] && !result["__DEFAULT_SCOPE__"]["webapp.user-detail"]) {
          return resolve({
            status: "error",
            message: "User not found!"
          })
        }
        const dataUser = result["__DEFAULT_SCOPE__"]["webapp.user-detail"]["userInfo"]

        const posts: Posts[] = await parsePosts(dataUser, postLimit)
        const { users, stats } = parseDataUser(dataUser, posts)

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

/**
 * Thanks to:
 * https://github.com/atharahmed/tiktok-private-api/blob/020ede2eaa6021bcd363282d8cef1aacaff2f88c/src/repositories/user.repository.ts#L148
 */

const request = async (secUid: string, cursor = 0, count = 30) => {
  const { data } = await Axios.get(`${_tiktokGetPosts(_userPostsParams())}`, {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35",
      "X-tt-params": xttparams(_xttParams(secUid, cursor, count))
    }
  })

  return data
}

const parseDataUser = (dataUser: any, posts: Posts[]) => {
  // User Info Result
  const users: Users = {
    id: dataUser.user.id,
    username: dataUser.user.uniqueId,
    nickname: dataUser.user.nickname,
    avatarLarger: dataUser.user.avatarLarger,
    avatarThumb: dataUser.user.avatarThumb,
    avatarMedium: dataUser.user.avatarMedium,
    signature: dataUser.user.signature,
    verified: dataUser.user.verified,
    privateAccount: dataUser.user.privateAccount,
    region: dataUser.user.region,
    commerceUser: dataUser.user.commerceUserInfo.commerceUser,
    usernameModifyTime: dataUser.user.uniqueIdModifyTime,
    nicknameModifyTime: dataUser.user.nickNameModifyTime
  }

  // Statistics Result
  const stats: Stats = {
    followerCount: dataUser.stats.followerCount,
    followingCount: dataUser.stats.followingCount,
    heartCount: dataUser.stats.heartCount,
    videoCount: dataUser.stats.videoCount,
    likeCount: dataUser.stats.diggCount,
    friendCount: dataUser.stats.friendCount,
    postCount: posts.length
  }

  return { users, stats }
}

const parsePosts = async (dataUser: any, postLimit?: number): Promise<Posts[]> => {
  // Posts Result
  let hasMore = true
  let cursor: number | null = null
  const posts: Posts[] = []
  while (hasMore) {
    let result2: any | null = null
    let counter = 0

    // Prevent missing response posts
    for (let i = 0; i < 30; i++) {
      result2 = await request(dataUser.user.secUid, cursor, 30)
      if (result2 !== "") break
    }

    // Validate
    if (result2 === "") hasMore = false // No More Post

    result2?.itemList?.forEach((v: any) => {
      const author: AuthorPost = {
        id: v.author.id,
        username: v.author.uniqueId,
        nickname: v.author.nickname,
        avatarLarger: v.author.avatarLarger,
        avatarThumb: v.author.avatarThumb,
        avatarMedium: v.author.avatarMedium,
        signature: v.author.signature,
        verified: v.author.verified,
        openFavorite: v.author.openFavorite,
        privateAccount: v.author.privateAccount,
        isADVirtual: v.author.isADVirtual,
        isEmbedBanned: v.author.isEmbedBanned
      }

      if (v.imagePost) {
        const images: string[] = v.imagePost.images.map((img: any) => img.imageURL.urlList[0])

        posts.push({
          id: v.id,
          desc: v.desc,
          createTime: v.createTime,
          digged: v.digged,
          duetEnabled: v.duetEnabled,
          forFriend: v.forFriend,
          officalItem: v.officalItem,
          originalItem: v.originalItem,
          privateItem: v.privateItem,
          shareEnabled: v.shareEnabled,
          stitchEnabled: v.stitchEnabled,
          stats: v.stats,
          music: v.music,
          author,
          images
        })
      } else {
        const video = {
          id: v.video.id,
          duration: v.video.duration,
          format: v.video.format,
          bitrate: v.video.bitrate,
          ratio: v.video.ratio,
          playAddr: v.video.playAddr,
          cover: v.video.cover,
          originCover: v.video.originCover,
          dynamicCover: v.video.dynamicCover,
          downloadAddr: v.video.downloadAddr
        }

        posts.push({
          id: v.id,
          desc: v.desc,
          createTime: v.createTime,
          digged: v.digged,
          duetEnabled: v.duetEnabled,
          forFriend: v.forFriend,
          officalItem: v.officalItem,
          originalItem: v.originalItem,
          privateItem: v.privateItem,
          shareEnabled: v.shareEnabled,
          stitchEnabled: v.stitchEnabled,
          stats: v.stats,
          music: v.music,
          author,
          video
        })
      }
    })

    // Restrict too many data requests
    if (postLimit !== 0) {
      let loopCount = Math.floor(postLimit / 30)
      if (counter >= loopCount) break
    }

    hasMore = result2.hasMore
    cursor = hasMore ? result2.cursor : null
    counter++
  }

  return postLimit ? posts.slice(0, postLimit) : posts
}

const xttparams = (params: any) => {
  const cipher = createCipheriv("aes-128-cbc", "webapp1.0+202106", "webapp1.0+202106")
  return Buffer.concat([cipher.update(params), cipher.final()]).toString("base64")
}
