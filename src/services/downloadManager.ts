import * as path from "path"
import * as os from "os"
import axios from "axios"
import * as fs from "fs"
import { Logger } from "../lib/logger"

function getDefaultDownloadPath(): string {
  const platform = os.platform()
  const homeDir = os.homedir()

  switch (platform) {
    case "win32":
      return path.join(homeDir, "Downloads")

    case "darwin":
      return path.join(homeDir, "Downloads")

    case "linux":
      if (process.env.PREFIX && process.env.PREFIX.includes("com.termux")) {
        return path.join(homeDir, "storage", "downloads")
      }
      return path.join(homeDir, "Downloads")

    case "android":
      if (process.env.EXTERNAL_STORAGE) {
        return path.join(process.env.EXTERNAL_STORAGE, "Download")
      }
      return path.join(homeDir, "Download")

    default:
      // Fallback for other OS (iOS, FreeBSD, OpenBSD, etc.)
      const possiblePaths = [
        path.join(homeDir, "Downloads"),
        path.join(homeDir, "Download"),
        path.join(homeDir, "downloads"),
        homeDir
      ]

      for (const downloadPath of possiblePaths) {
        if (fs.existsSync(downloadPath)) {
          return downloadPath
        }
      }

      return path.join(homeDir, "Downloads")
  }
}

async function downloadMedia(
  url: string,
  outputPath: string,
  filename: string,
  cookie?: string
): Promise<void> {
  try {
    const headers: any = {}
    if (cookie) {
      headers.Cookie = Array.isArray(cookie) ? cookie.join("; ") : cookie
      headers["User-Agent"] =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      headers.Referer = "https://www.tiktok.com/"
    }

    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
      headers: headers
    })

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true })
    }

    const writer = fs.createWriteStream(path.join(outputPath, filename))
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve)
      writer.on("error", reject)
    })
  } catch (error) {
    throw new Error(`Failed to download media: ${error.message}`)
  }
}

async function handleMediaDownload(
  data: any,
  outputPath: string,
  version: string
): Promise<void> {
  if (data.status !== "success") {
    throw new Error(data.message)
  }

  const { result } = data
  const author = result.author
  const username = version === "v1" ? author.username : author?.nickname || ""

  Logger.success(
    `${
      result.type.charAt(0).toUpperCase() + result.type.slice(1)
    } Successfully Fetched!`
  )
  Logger.info(`Media Type: ${result.type}`)

  switch (result.type) {
    case "video": {
      const videoUrl =
        version === "v1"
          ? result.video.playAddr[0]
          : version === "v2"
          ? result.video.playAddr[0]
          : result.videoHD
      const videoName = `ttdl_${username}_${Date.now()}.mp4`

      Logger.info("Downloading video...")
      await downloadMedia(videoUrl, outputPath, videoName)
      Logger.success(
        `Video downloaded successfully to: ${path.join(outputPath, videoName)}`
      )
      break
    }

    case "image": {
      const userOutputPath = path.join(outputPath, `${username}_${Date.now()}`)
      const images = result.images

      for (let i = 0; i < images.length; i++) {
        const imageName = `ttdl_${username}_${Date.now()}_${i + 1}.png`
        Logger.info(`Downloading image ${i + 1}/${images.length}...`)
        await downloadMedia(images[i], userOutputPath, imageName)
        Logger.success(
          `Image downloaded successfully to: ${path.join(
            userOutputPath,
            imageName
          )}`
        )
      }
      break
    }

    case "music": {
      const musicName = `ttdl_${username}_${Date.now()}.mp3`
      Logger.info("Downloading music...")
      await downloadMedia(result.music, outputPath, musicName)
      Logger.success(
        `Music downloaded successfully to: ${path.join(outputPath, musicName)}`
      )
      break
    }

    default:
      throw new Error(`Unsupported media type: ${result.type}`)
  }
}

async function downloadMusicFromDetail(
  musicIdOrUrl: string,
  cookie: string | any[],
  outputPath: string,
  proxy?: string
): Promise<void> {
  try {
    Logger.info(`Fetching music detail for: ${musicIdOrUrl}`)

    // Import getMusicDetail directly to avoid circular dependency
    const { getMusicDetail } = await import("../utils/get/getMusicDetail.js")

    const result = await getMusicDetail(musicIdOrUrl, cookie, proxy)

    if (result.status !== "success" || !result.result) {
      throw new Error(result.message || "Failed to fetch music detail")
    }

    const { musicInfo } = result.result
    const music = musicInfo.music
    const author = musicInfo.artist || musicInfo.author

    Logger.success("Music detail fetched successfully!")
    Logger.info(`Title: ${music.title}`)
    Logger.info(`Author: ${music.authorName}`)
    Logger.info(`Duration: ${music.duration} seconds`)

    // Create safe filename
    const safeTitle = music.title.replace(/[^a-z0-9]/gi, "_").substring(0, 50)
    const safeAuthor = (author?.nickname || music.authorName || "Unknown")
      .replace(/[^a-z0-9]/gi, "_")
      .substring(0, 30)
    const musicName = `ttdl_music_${safeAuthor}_${safeTitle}_${Date.now()}.mp3`

    Logger.info("Downloading music...")
    const cookieString = Array.isArray(cookie) ? cookie.join("; ") : cookie
    await downloadMedia(music.playUrl, outputPath, musicName, cookieString)
    Logger.success(
      `Music downloaded successfully to: ${path.join(outputPath, musicName)}`
    )

    // Show additional info
    Logger.info("\n==== MUSIC INFO ====")
    Logger.info(`Title: ${music.title}`)
    Logger.info(
      `Author: @${author?.uniqueId || "Unknown"} (${
        author?.nickname || music.authorName
      })`
    )
    Logger.info(`Duration: ${music.duration} seconds`)
    Logger.info(`Original: ${music.original ? "Yes" : "No"}`)
    Logger.info(`Videos using this music: ${musicInfo.stats.videoCount}`)
  } catch (error) {
    throw new Error(`Failed to download music: ${error.message}`)
  }
}

export {
  getDefaultDownloadPath,
  downloadMedia,
  handleMediaDownload,
  downloadMusicFromDetail
}
