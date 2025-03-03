import * as path from "path"
import * as os from "os"
import axios from "axios"
import * as fs from "fs"
import { Logger } from "./logger"

function getDefaultDownloadPath(): string {
  const homeDir = os.homedir()
  return path.join(homeDir, "Downloads")
}

async function downloadMedia(
  url: string,
  outputPath: string,
  filename: string
): Promise<void> {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream"
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
  const username = version === "v1" ? author.username : author.nickname

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
          ? result.video.downloadAddr[0]
          : version === "v2"
          ? result.video
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

export { getDefaultDownloadPath, downloadMedia, handleMediaDownload }
