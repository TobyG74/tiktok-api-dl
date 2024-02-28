import axios from "axios"
import { load } from "cheerio"
import { _tiktokurl } from "../../api"
import { StalkResult, Stats, Users } from "../../types/stalker"

const getCookie = () =>
  new Promise((resolve, reject) => {
    axios
      .get("https://pastebin.com/raw/ELJjcbZT")
      .then(({ data: cookie }) => {
        resolve(cookie)
      })
      .catch((e) => resolve({ status: "error", message: "Failed to fetch cookie." }))
  })

export const TiktokStalk = (username: string, options?: { cookie: string }): Promise<StalkResult> =>
  new Promise(async (resolve, reject) => {
    username = username.replace("@", "")
    axios
      .get(`${_tiktokurl}/@${username}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
          cookie: (options?.cookie ? options.cookie : await getCookie()) as string
        }
      })
      .then(({ data }) => {
        const $ = load(data)
        const result = JSON.parse($("script#__UNIVERSAL_DATA_FOR_REHYDRATION__").text())
        if (!result?.__DEFAULT_SCOPE__?.["webapp.user-detail"]) {
          return resolve({
            status: "error",
            message: "User not found!"
          })
        }
        const dataUser = result.__DEFAULT_SCOPE__["webapp.user-detail"].userInfo

        // User Info Result
        const users: Users = {
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
          friendCount: dataUser.stats.friendCount
          // postCount: itemKeys.length
        }

        // Posts Result
        /** 
        const posts: Posts[] = []
        itemKeys.forEach((key) => {
          const post = result.ItemModule[key]
          let media
          if (post.imagePost) {
            // Images or Slide Posts Result
            media = {
              images: post.imagePost.images.map((v: any) => v.imageURL.urlList[0])
            }
          } else {
            // Video Posts Result
            media = {
              video: {
                id: post.video.id,
                duration: post.video.duration,
                ratio: post.video.ratio,
                cover: post.video.cover,
                originCover: post.video.originCover,
                dynamicCover: post.video.dynamicCover,
                playAddr: post.video.playAddr,
                downloadAddr: post.video.downloadAddr,
                format: post.video.format,
                bitrate: post.video.bitrate
              } as Video
            }
          }

          // Music Posts Result
          const music: Music = {
            id: post.music.id,
            title: post.music.title,
            authorName: post.music.authorName,
            album: post.music.album,
            coverLarge: post.music.coverLarge,
            coverMedium: post.music.coverMedium,
            coverThumb: post.music.coverThumb,
            playUrl: post.music.playUrl,
            duration: post.music.duration
          }

          // Statistics Posts Result
          const statistics: Statistics = {
            likeCount: post.stats.diggCount,
            shareCount: post.stats.shareCount,
            commentCount: post.stats.commentCount,
            playCount: post.stats.playCount,
            favoriteCount: post.stats.collectCount
          }

          posts.push({
            id: post.id,
            desc: post.desc,
            createTime: post.createTime,
            author: post.author,
            locationCreated: post.locationCreated,
            hashtags: post.challenges.map((v: any) => v.title),
            statistics,
            music,
            ...media
          })
        })
        */
        resolve({
          status: "success",
          result: {
            users,
            stats
            // posts
          }
        })
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })
