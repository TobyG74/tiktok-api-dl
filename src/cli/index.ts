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

const TIKTOK_URL_REGEX = {
  playlist:
    /https:\/\/(?:www|m)\.tiktok\.com\/@[\w.-]+\/playlist\/[\w-]+-(\d+)/,
  collection:
    /https:\/\/(?:www|m)\.tiktok\.com\/@[\w.-]+\/collection\/[\w-]+-(\d+)/,
  video: /https:\/\/(?:www|m)\.tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
  photo: /https:\/\/(?:www|m)\.tiktok\.com\/@[\w.-]+\/photo\/(\d+)/,
  shortLink: /https:\/\/(vm|vt|lite)\.tiktok\.com\/[\w\d]+\/?/,
  music: /https:\/\/(?:www|m)\.tiktok\.com\/music\/[\w%-]+-(\d+)/
}

const cookieManager = new CookieManager()

program
  .name("tiktokdl")
  .description("TikTok downloader and search CLI tool")
  .version("1.0.0")

program
  .command("download")
  .description("Download TikTok Video / Slide / Music / Playlist / Collection")
  .argument(
    "<urls...>",
    "TikTok URLs (Video / Slide / Music / Playlist / Collection)"
  )
  .option("-o, --output <path>", "Output directory path")
  .option("-v, --version <version>", "Downloader version (v1/v2/v3)", "v1")
  .option("-p, --proxy <proxy>", "Proxy URL (http/https/socks)")
  .option(
    "-c, --count <number>",
    "Number of items to fetch for playlist/collection (default: 20)",
    (val) => parseInt(val),
    20
  )
  .action(async (urls, options) => {
    const outputPath = options.output || getDefaultDownloadPath()
    const version = options.version.toLowerCase()
    const count = options.count || 20
    if (!Array.isArray(urls)) urls = [urls]
    for (const url of urls) {
      try {
        if (!["v1", "v2", "v3"].includes(version)) {
          throw new Error("Invalid version. Use v1, v2 or v3")
        }
        if (TIKTOK_URL_REGEX.playlist.test(url)) {
          Logger.info(`Fetching playlist items from: ${url}`)
          const match = url.match(TIKTOK_URL_REGEX.playlist)
          const results = await Tiktok.Playlist(match[1], {
            page: 1,
            proxy: options.proxy,
            count: count
          })
          if (results.status === "success" && results.result) {
            const { itemList } = results.result
            Logger.info(
              `Found ${itemList.length} items in playlist. Starting download...`
            )
            for (const [index, item] of itemList.entries()) {
              Logger.info(
                `Downloading [${index + 1}/${itemList.length}]: ${item.id}`
              )
              const videoUrl = `https://www.tiktok.com/@${
                item.author?.uniqueId || "unknown"
              }/video/${item.id}`
              try {
                const data = await Tiktok.Downloader(videoUrl, {
                  version: version,
                  proxy: options.proxy
                })
                await handleMediaDownload(data, outputPath, version)
                Logger.success(`Downloaded: ${videoUrl}`)
              } catch (err) {
                Logger.error(`Failed to download ${videoUrl}: ${err.message}`)
              }
            }
            Logger.info("All downloads finished.")
          } else {
            Logger.error(`Error: ${results.message}`)
          }
        } else if (TIKTOK_URL_REGEX.collection.test(url)) {
          Logger.info(`Fetching collection items from: ${url}`)
          const match = url.match(TIKTOK_URL_REGEX.collection)
          const results = await Tiktok.Collection(match[1], {
            page: 1,
            proxy: options.proxy,
            count: count
          })
          if (results.status === "success" && results.result) {
            const { itemList } = results.result
            Logger.info(
              `Found ${itemList.length} items in collection. Starting download...`
            )
            for (const [index, item] of itemList.entries()) {
              Logger.info(
                `Downloading [${index + 1}/${itemList.length}]: ${item.id}`
              )
              const videoUrl = `https://www.tiktok.com/@${
                item.author?.uniqueId || "unknown"
              }/video/${item.id}`
              try {
                const data = await Tiktok.Downloader(videoUrl, {
                  version: version,
                  proxy: options.proxy
                })
                await handleMediaDownload(data, outputPath, version)
                Logger.success(`Downloaded: ${videoUrl}`)
              } catch (err) {
                Logger.error(`Failed to download ${videoUrl}: ${err.message}`)
              }
            }
            Logger.info("All downloads finished.")
          } else {
            Logger.error(`Error: ${results.message}`)
          }
        } else if (
          TIKTOK_URL_REGEX.video.test(url) ||
          TIKTOK_URL_REGEX.shortLink.test(url) ||
          TIKTOK_URL_REGEX.photo.test(url)
        ) {
          Logger.info("Fetching media information...")
          const data = await Tiktok.Downloader(url, {
            version: version,
            proxy: options.proxy
          })
          await handleMediaDownload(data, outputPath, version)
        } else {
          Logger.error("URL tidak valid atau tidak dikenali: " + url)
        }
      } catch (error) {
        Logger.error(`Error: ${error.message}`)
      }
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
  .description("Search TikTok users or live streams or videos")

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

// Get User Reposts Command

program
  .command("getuserreposts")
  .description("Get reposts from a TikTok user")
  .argument("<username>", "TikTok username")
  .option("-l, --limit <number>", "Limit of reposts", "5")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .action(async (username, options) => {
    try {
      const postLimit = parseInt(options.limit)
      const results = await Tiktok.GetUserReposts(username, {
        postLimit: postLimit,
        proxy: options.proxy
      })
      if (results.status === "success") {
        const data = results.result
        for (const [index, repost] of data.entries()) {
          Logger.info(`---- REPOST ${index + 1} ----`)
          Logger.result(`Video ID: ${repost.id}`, chalk.green)
          Logger.result(`Description: ${repost.desc}`, chalk.yellow)
          Logger.info(`---- STATISTICS ----`)
          Logger.result(`Shares: ${repost.stats.shareCount}`, chalk.yellow)
          if (repost.stats.likeCount) {
            Logger.result(`Likes: ${repost.stats.likeCount}`, chalk.yellow)
          }
          if (repost.stats.collectCount) {
            Logger.result(
              `Favorites: ${repost.stats.collectCount}`,
              chalk.yellow
            )
          }
          if (repost.stats.playCount) {
            Logger.result(`Views: ${repost.stats.playCount}`, chalk.yellow)
          }
          if (repost.stats.commentCount) {
            Logger.result(
              `Comments: ${repost.stats.commentCount}`,
              chalk.yellow
            )
          }
        }
        Logger.info(`Total reposts: ${data.length}`)
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

// Collection Command
program
  .command("collection")
  .description(
    "Get videos from a TikTok collection (supports collection ID or URL)"
  )
  .argument(
    "<collectionIdOrUrl>",
    "Collection ID or URL (e.g. 7507916135931218695 or https://www.tiktok.com/@username/collection/name-id)"
  )
  .option("-p, --page <number>", "Page number", "1")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .option(
    "-n, --count <number>",
    "Number of items to fetch",
    (val) => parseInt(val),
    5
  )
  .action(async (collectionIdOrUrl, options) => {
    try {
      Logger.info(
        `Fetching page ${options.page} with ${options.count} items per page from collection...`
      )
      const results = await Tiktok.Collection(collectionIdOrUrl, {
        page: options.page,
        proxy: options.proxy,
        count: options.count
      })

      if (results.status === "success" && results.result) {
        const { itemList, hasMore } = results.result
        Logger.info(`Found ${itemList.length} videos in collection`)
        Logger.info(`Has more videos: ${hasMore}`)

        for (const [index, video] of itemList.entries()) {
          Logger.info(`---- VIDEO ${index + 1} ----`)
          Logger.result(`Video ID: ${video.id}`, chalk.green)
          Logger.result(`Description: ${video.desc}`, chalk.yellow)
          Logger.result(
            `Author: ${video.author?.nickname || "Unknown"}`,
            chalk.yellow
          )
          Logger.result(
            `Created: ${new Date(video.createTime * 1000).toLocaleString()}`,
            chalk.yellow
          )

          if (video.statistics) {
            Logger.info(`---- STATISTICS ----`)
            Logger.result(
              `Likes: ${video.statistics.likeCount || 0}`,
              chalk.yellow
            )
            Logger.result(
              `Comments: ${video.statistics.commentCount || 0}`,
              chalk.yellow
            )
            Logger.result(
              `Shares: ${video.statistics.shareCount || 0}`,
              chalk.yellow
            )
            Logger.result(
              `Plays: ${video.statistics.playCount || 0}`,
              chalk.yellow
            )
          }

          if (video.video) {
            Logger.info(`---- VIDEO URLs ----`)
            const videoUrl = `${_tiktokurl}/@${
              video.author?.uniqueId || "unknown"
            }/video/${video.id}`
            Logger.result(`Video URL: ${videoUrl}`, chalk.blue)
          }

          if (video.textExtra?.length > 0) {
            Logger.info(`---- HASHTAGS ----`)
            video.textExtra.forEach((tag) => {
              if (tag.hashtagName) {
                Logger.result(`#${tag.hashtagName}`, chalk.cyan)
              }
            })
          }
        }

        if (hasMore) {
          Logger.info("\nTo fetch more videos, use:")
          Logger.info(
            `tiktokdl collection ${collectionIdOrUrl} -p ${
              parseInt(options.page) + 1
            }`
          )
        }
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

// =============================================
// Playlist parser
// =============================================
program
  .command("playlist")
  .description("Get videos from a TikTok playlist")
  .argument(
    "<PlaylistIdOrUrl>",
    "Collection URL (e.g. https://www.tiktok.com/@username/playlist/name-id)"
  )
  .option("-p, --page <number>", "Page number", "1")
  .option("--proxy <proxy>", "Proxy URL (http/https/socks)")
  .option(
    "-c, --count <number>",
    "Number of items to fetch (max: 20)",
    (val) => parseInt(val),
    5
  )
  .option("-r, --raw", "Show raw response", false)
  .action(async (url, options) => {
    try {
      Logger.info(
        `Fetching page ${options.page} with ${options.count} items per page from playlist...`
      )
      const results = await Tiktok.Playlist(url, {
        page: options.page,
        proxy: options.proxy,
        count: options.count
      })

      const contentType = (content: any): string => {
        if (content?.imagePost) {
          return "photo"
        } else {
          return "video"
        }
      }

      if (results.status === "success" && results.result) {
        if (options.raw) {
          console.log(JSON.stringify(results.result, null, 2))
          return
        }
        const { itemList, hasMore } = results.result

        Logger.info(`Found ${itemList.length} items in playlist`)
        Logger.info(`Has more items: ${hasMore}`)

        for (const [index, item] of itemList.entries()) {
          Logger.info(`---- ITEM ${index + 1} ----`)
          Logger.result(`Item ID: ${item.id}`, chalk.green)
          Logger.result(`Description: ${item.desc}`, chalk.yellow)
          Logger.result(
            `Author: ${item.author?.nickname || "Unknown"}`,
            chalk.yellow
          )
          Logger.result(
            `Created: ${new Date(item.createTime * 1000).toLocaleString()}`,
            chalk.yellow
          )

          if (item.stats) {
            Logger.info(`---- STATISTICS ----`)
            Logger.result(
              `Comments: ${item.stats.commentCount || 0}`,
              chalk.yellow
            )
            Logger.result(`Shares: ${item.stats.shareCount || 0}`, chalk.yellow)
            Logger.result(`Plays: ${item.stats.playCount || 0}`, chalk.yellow)
          }

          if (item.video) {
            Logger.info(`---- VIDEO URLs ----`)
            const videoUrl = `${_tiktokurl}/@${
              item.author?.uniqueId || "unknown"
            }/${contentType(item)}/${item.id}`
            Logger.result(`Video URL: ${videoUrl}`, chalk.blue)
          }
        }

        if (hasMore) {
          Logger.info("\nTo fetch more videos, use:")
          Logger.info(
            `tiktokdl playlist ${url} -p ${parseInt(options.page) + 1}`
          )
        }
      } else {
        Logger.error(`Error: ${results.message}`)
      }
    } catch (error) {
      Logger.error(`Error: ${error.message}`)
    }
  })

program.parse()
