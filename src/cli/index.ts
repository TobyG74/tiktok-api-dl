#!/usr/bin/env node

import { program } from "commander"
import Tiktok from ".."
import { CookieManager } from "../utils/cookieManager"
import { Logger } from "../utils/logger"
import chalk from "chalk"
import {
  getDefaultDownloadPath,
  handleMediaDownload
} from "../utils/downloadManager"

const cookieManager = new CookieManager("tiktok")

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
        for (const [index, user] of data.entries()) {
          Logger.info(`---- USER ${index + 1} ----`)
          Logger.result(`Username: ${user.username}`, chalk.green)
          Logger.result(`Nickname: ${user.nickname}`, chalk.green)
          Logger.result(`Bio: ${user.signature}`, chalk.green)
          Logger.result(`Followers: ${user.followerCount}`, chalk.yellow)
          Logger.result(
            `Verified: ${user.isVerified ? "Yes" : "No"}`,
            chalk.yellow
          )
          Logger.result(`Profile URL: ${user.url}`, chalk.yellow)
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
        for (const [index, live] of data.entries()) {
          Logger.info(`---- LIVE ${index + 1} ----`)
          Logger.result(`Title: ${live.liveInfo.title}`, chalk.green)
          Logger.result(
            `Nickname: ${live.liveInfo.owner.nickname}`,
            chalk.green
          )
          Logger.result(
            `Username: ${live.liveInfo.owner.username}`,
            chalk.green
          )
          Logger.result(
            `Verified: ${live.liveInfo.owner.isVerified ? "Yes" : "No"}`,
            chalk.green
          )
          Logger.result(
            `Type Third Party: ${
              live.liveInfo.liveTypeThirdParty ? "Yes" : "No"
            }`,
            chalk.green
          )
          Logger.result(`Hashtag: ${live.liveInfo.hashtag}`, chalk.green)
          Logger.info(`---- STATISTICS ----`)
          Logger.result(`Likes: ${live.liveInfo.stats.likeCount}`, chalk.yellow)
          Logger.result(
            `Views: ${live.liveInfo.stats.viewerCount}`,
            chalk.yellow
          )
          Logger.result(`Users: ${live.liveInfo.stats.totalUser}`, chalk.yellow)
        }
        Logger.info(`Total live streams: ${data.length}`)
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

// Get Comments Command

program
  .command("getcomments")
  .description("Get comments from a TikTok video")
  .argument("<url>", "TikTok video URL")
  .option("-l, --limit <number>", "Limit of comments", "10")
  .option("-p, --proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (url, options) => {
    try {
      const limit = parseInt(options.limit)
      const comments = await Tiktok.GetComments(url, {
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

// Stalk Command

program
  .command("stalk")
  .description("Stalk a TikTok user")
  .argument("<username>", "TikTok username")
  .option("-p, --postLimit <number>", "Limit of posts", "5")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (username, options) => {
    try {
      const postLimit = parseInt(options.postLimit)
      const results = await Tiktok.StalkUser(username, {
        postLimit: postLimit,
        proxy: options.proxy
      })
      if (results.status === "success") {
        const data = results.result
        Logger.info("---- TIKTOK STALKER ----")
        Logger.result(`Username:${data.users.username}`, chalk.green)
        Logger.result(`Nickname:${data.users.nickname}`, chalk.green)
        Logger.result(`Bio:${data.users.signature}`, chalk.green)
        Logger.result(
          `Verified:${data.users.verified ? "Yes" : "No"}`,
          chalk.green
        )
        Logger.result(
          `Commerce User:${data.users.commerceUser ? "Yes" : "No"}`,
          chalk.green
        )
        Logger.result(
          `Private Account:${data.users.privateAccount ? "Yes" : "No"}`,
          chalk.green
        )
        Logger.result(`Region:${data.users.region}`, chalk.green)
        Logger.info("---- STATISTICS ----")
        Logger.result(`Followers:${data.stats.followerCount}`, chalk.yellow)
        Logger.result(`Following:${data.stats.followingCount}`, chalk.yellow)
        Logger.result(`Hearts:${data.stats.heartCount}`, chalk.yellow)
        Logger.result(`Videos:${data.stats.videoCount}`, chalk.yellow)
        Logger.result(`Posts:${data.stats.postCount}`, chalk.yellow)
        Logger.result(`Likes:${data.stats.likeCount}`, chalk.yellow)
        Logger.result(`Friends:${data.stats.friendCount}`, chalk.yellow)
        Logger.info("---- POSTS ----")
        for (const [index, post] of data.posts.entries()) {
          Logger.info(`---- POST ${index + 1} ----`)
          Logger.result(`Title: ${post.desc}`, chalk.green)
          Logger.result(`Likes: ${post.stats.diggCount}`, chalk.yellow)
          Logger.result(`Comments: ${post.stats.commentCount}`, chalk.yellow)
          Logger.result(`Shares: ${post.stats.shareCount}`, chalk.yellow)
          Logger.result(`Views: ${post.stats.playCount}`, chalk.yellow)
          Logger.result(
            `Music: ${post.music.title} - ${post.music.authorName}`,
            chalk.cyan
          )
          Logger.result(`Music URL: ${post.music.playUrl}`, chalk.cyan)
        }
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

program.parse()
