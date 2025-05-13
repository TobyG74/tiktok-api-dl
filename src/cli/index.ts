#!/usr/bin/env node

import { program } from "commander"
import Tiktok from ".."
import { CookieManager } from "../services/cookieManager"
import { Logger } from "../lib/logger"
import chalk from "chalk"
import {
  getDefaultDownloadPath,
  handleMediaDownload
} from "../services/downloadManager"
import { _tiktokurl } from "../constants/api"

const cookieManager = new CookieManager()

program
  .name("tiktokdl")
  .description("TikTok downloader and search CLI tool")
  .version("1.0.0")

program
  .command("download")
  .description("Download TikTok Video / Slide / Music")
  .argument("<url>", "TikTok Video / Slide / Music URL")
  .option("-o, --output <path>", "Output directory path")
  .option("-v, --version <version>", "Downloader version (v1/v2/v3)", "v1")
  .option("-p, --proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (url, options) => {
    try {
      const outputPath = options.output || getDefaultDownloadPath()
      const version = options.version.toLowerCase()

      if (!["v1", "v2", "v3"].includes(version)) {
        throw new Error("Invalid version. Use v1, v2 or v3")
      }

      Logger.info("Fetching media information...")

      const data = await Tiktok.Downloader(url, {
        version: version as "v1" | "v2" | "v3",
        proxy: options.proxy
      })

      await handleMediaDownload(data, outputPath, version)
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

// Cookie Command

const cookieCommand = program.command("cookie").description("Cookie Manager")

cookieCommand
  .command("set <value>")
  .description("Set a cookie")
  .action((value: string) => {
    cookieManager.setCookie(value)
    Logger.success("Cookie set successfully.")
  })

cookieCommand
  .command("get")
  .description("Get cookie value")
  .action(() => {
    const cookie = cookieManager.getCookie()
    if (cookie) {
      Logger.info(`Cookie: ${cookie}`)
    } else {
      Logger.warning("No cookie found.")
    }
  })

cookieCommand
  .command("delete")
  .description("Delete cookie")
  .action(() => {
    cookieManager.deleteCookie()
    Logger.success("Cookie deleted successfully.")
  })

// Search Command

const searchCommand = program
  .command("search")
  .description("Search TikTok users or live streams")

searchCommand
  .command("user")
  .description("Search TikTok users")
  .argument("<keyword>", "Search keyword")
  .option("-p, --page <number>", "Page number", "1")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (keyword, options) => {
    try {
      const page = parseInt(options.page)
      const results = await Tiktok.Search(keyword, {
        type: "user",
        cookie: cookieManager.getCookie(),
        page: page,
        proxy: options.proxy
      })
      if (results.status === "success") {
        const data = results.result
        for (const [index, item] of data.entries()) {
          if (item.type === "user") {
            Logger.info(`---- USER ${index + 1} ----`)
            Logger.result(`Username: ${item.username}`, chalk.green)
            Logger.result(`Nickname: ${item.nickname}`, chalk.green)
            Logger.result(`Bio: ${item.signature}`, chalk.green)
            Logger.result(`Followers: ${item.followerCount}`, chalk.yellow)
            Logger.result(
              `Verified: ${item.isVerified ? "Yes" : "No"}`,
              chalk.yellow
            )
            Logger.result(`Profile URL: ${item.url}`, chalk.yellow)
          }
        }
        Logger.info(`Total users: ${data.length}`)
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

searchCommand
  .command("live")
  .description("Search TikTok live streams")
  .argument("<keyword>", "Search keyword")
  .option("-p, --page <number>", "Page number", "1")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (keyword, options) => {
    try {
      const page = parseInt(options.page)
      const results = await Tiktok.Search(keyword, {
        type: "live",
        cookie: cookieManager.getCookie(),
        page: page,
        proxy: options.proxy
      })
      if (results.status === "success") {
        const data = results.result
        for (const [index, item] of data.entries()) {
          if (item.type === "live") {
            Logger.info(`---- LIVE ${index + 1} ----`)
            Logger.result(`Title: ${item.liveInfo.title}`, chalk.green)
            Logger.result(
              `Nickname: ${item.liveInfo.owner.nickname}`,
              chalk.green
            )
            Logger.result(
              `Username: ${item.liveInfo.owner.username}`,
              chalk.green
            )
            Logger.result(
              `Verified: ${item.liveInfo.owner.isVerified ? "Yes" : "No"}`,
              chalk.green
            )
            Logger.result(
              `Type Third Party: ${
                item.liveInfo.liveTypeThirdParty ? "Yes" : "No"
              }`,
              chalk.green
            )
            Logger.result(`Hashtag: ${item.liveInfo.hashtag}`, chalk.green)
            Logger.info(`---- STATISTICS ----`)
            Logger.result(
              `Likes: ${item.liveInfo.stats.likeCount}`,
              chalk.yellow
            )
            Logger.result(
              `Views: ${item.liveInfo.stats.viewerCount}`,
              chalk.yellow
            )
            Logger.result(
              `Users: ${item.liveInfo.stats.totalUser}`,
              chalk.yellow
            )
          }
        }
        Logger.info(`Total live streams: ${data.length}`)
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

searchCommand
  .command("video")
  .description("Search TikTok videos")
  .argument("<keyword>", "Search keyword")
  .option("-p, --page <number>", "Page number", "1")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (keyword, options) => {
    try {
      const page = parseInt(options.page)
      const results = await Tiktok.Search(keyword, {
        type: "video",
        cookie: cookieManager.getCookie(),
        page: page,
        proxy: options.proxy
      })
      if (results.status === "success") {
        const data = results.result
        for (const [index, item] of data.entries()) {
          if (item.type === "video") {
            Logger.info(`---- VIDEO ${index + 1} ----`)
            Logger.result(`Video ID: ${item.id}`, chalk.green)
            Logger.result(`Description: ${item.desc}`, chalk.yellow)
            Logger.result(`Author: ${item.author.nickname}`, chalk.yellow)
            Logger.result(
              `Video URL: ${_tiktokurl}/@${item.author.uniqueId}/video/${item.id}`,
              chalk.yellow
            )
            Logger.info(`---- STATISTICS ----`)
            Logger.result(`Likes: ${item.stats.likeCount}`, chalk.yellow)
            Logger.result(`Favorites: ${item.stats.collectCount}`, chalk.yellow)
            Logger.result(`Views: ${item.stats.playCount}`, chalk.yellow)
            Logger.result(`Shares: ${item.stats.shareCount}`, chalk.yellow)
            Logger.result(`Comments: ${item.stats.commentCount}`, chalk.yellow)
          }
        }
        Logger.info(`Total videos: ${data.length}`)
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

// Get Comments Command

program
  .command("getvideocomments")
  .description("Get comments from a TikTok video")
  .argument("<url>", "TikTok video URL")
  .option("-l, --limit <number>", "Limit of comments", "10")
  .option("-p, --proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (url, options) => {
    try {
      const limit = parseInt(options.limit)
      const comments = await Tiktok.GetVideoComments(url, {
        commentLimit: limit,
        proxy: options.proxy
      })
      if (comments.status === "success") {
        const data = comments.result
        for (const [index, comment] of data.entries()) {
          Logger.info(`---- COMMENT ${index + 1} ----`)
          Logger.result(`Username: ${comment.user.username}`, chalk.green)
          Logger.result(`Text: ${comment.text}`, chalk.green)
          Logger.result(`Likes: ${comment.likeCount}`, chalk.yellow)
        }
        Logger.info(`Total comments: ${data.length}`)
      } else {
        Logger.error(`Error: ${comments.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

// Get User Posts Command

program
  .command("getuserposts")
  .description("Get posts from a TikTok user")
  .argument("<username>", "TikTok username")
  .option("-l, --limit <number>", "Limit of posts", "5")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (username, options) => {
    try {
      const postLimit = parseInt(options.limit)
      const results = await Tiktok.GetUserPosts(username, {
        postLimit: postLimit,
        proxy: options.proxy
      })
      if (results.status === "success") {
        const data = results.result
        for (const [index, post] of data.entries()) {
          Logger.info(`---- POST ${index + 1} ----`)
          Logger.result(`Video ID: ${post.id}`, chalk.green)
          Logger.result(`Description: ${post.desc}`, chalk.yellow)
          Logger.info(`---- STATISTICS ----`)
          Logger.result(`Likes: ${post.stats.likeCount}`, chalk.yellow)
          Logger.result(`Favorites: ${post.stats.collectCount}`, chalk.yellow)
          Logger.result(`Views: ${post.stats.playCount}`, chalk.yellow)
          Logger.result(`Shares: ${post.stats.shareCount}`, chalk.yellow)
          Logger.result(`Comments: ${post.stats.commentCount}`, chalk.yellow)
        }
        Logger.info(`Total posts: ${data.length}`)
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

// Get User Favorites Command

program
  .command("getuserliked")
  .description("Get user liked videos from a TikTok user")
  .argument("<username>", "TikTok username")
  .option("-l, --limit <number>", "Limit of posts", "5")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (username, options) => {
    try {
      const postLimit = parseInt(options.limit)
      const results = await Tiktok.GetUserLiked(username, {
        cookie: cookieManager.getCookie(),
        postLimit: postLimit,
        proxy: options.proxy
      })
      if (results.status === "success") {
        const data = results.result
        for (const [index, liked] of data.entries()) {
          Logger.info(`---- FAVORITE ${index + 1} ----`)
          Logger.result(`Video ID: ${liked.id}`, chalk.green)
          Logger.result(`Description: ${liked.desc}`, chalk.yellow)
          Logger.result(`Author: ${liked.author.nickname}`, chalk.yellow)
          Logger.result(
            `Video URL: ${_tiktokurl}/@${liked.author.username}/video/${liked.video.id}`,
            chalk.yellow
          )
          Logger.info(`---- STATISTICS ----`)
          Logger.result(`Likes: ${liked.stats.diggCount}`, chalk.yellow)
          Logger.result(`Favorites: ${liked.stats.collectCount}`, chalk.yellow)
          Logger.result(`Views: ${liked.stats.playCount}`, chalk.yellow)
          Logger.result(`Shares: ${liked.stats.shareCount}`, chalk.yellow)
          Logger.result(`Comments: ${liked.stats.commentCount}`, chalk.yellow)
          Logger.result(`Reposts: ${liked.stats.repostCount}`, chalk.yellow)
        }
        Logger.info(`Total Liked Videos: ${data.length}`)
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

// Stalk Command

program
  .command("stalk")
  .description("Stalk a TikTok user")
  .argument("<username>", "TikTok username")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (username, options) => {
    try {
      const results = await Tiktok.StalkUser(username, {
        proxy: options.proxy
      })
      if (results.status === "success") {
        const data = results.result
        Logger.info("---- TIKTOK STALKER ----")
        Logger.result(`Username:${data.user.username}`, chalk.green)
        Logger.result(`Nickname:${data.user.nickname}`, chalk.green)
        Logger.result(`Bio:${data.user.signature}`, chalk.green)
        Logger.result(
          `Verified:${data.user.verified ? "Yes" : "No"}`,
          chalk.green
        )
        Logger.result(
          `Commerce User:${data.user.commerceUser ? "Yes" : "No"}`,
          chalk.green
        )
        Logger.result(
          `Private Account:${data.user.privateAccount ? "Yes" : "No"}`,
          chalk.green
        )
        Logger.result(`Region:${data.user.region}`, chalk.green)
        Logger.info("---- STATISTICS ----")
        Logger.result(`Followers:${data.stats.followerCount}`, chalk.yellow)
        Logger.result(`Following:${data.stats.followingCount}`, chalk.yellow)
        Logger.result(`Hearts:${data.stats.heartCount}`, chalk.yellow)
        Logger.result(`Videos:${data.stats.videoCount}`, chalk.yellow)
        Logger.result(`Likes:${data.stats.likeCount}`, chalk.yellow)
        Logger.result(`Friends:${data.stats.friendCount}`, chalk.yellow)
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

program.parse()
