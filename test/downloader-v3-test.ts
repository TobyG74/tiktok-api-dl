// Test for Tiktok Downloader v3
import Tiktok from "../src/index"

async function testDownloaderV3() {
  try {
    const url = "https://www.tiktok.com/@tobz2k19/video/7451777267107187986" // Change to a valid TikTok video URL
    console.log(`\nTesting Downloader version: v3`)
    const result = await Tiktok.Downloader(url, {
      version: "v3",
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      const r = result.result
      console.log(`Type: ${r.type}`)
      if (r.desc) console.log(`Description: ${r.desc}`)
      if (r.author && r.author.nickname) {
        console.log(`Author: ${r.author.nickname}`)
      } else if (r.author && r.author.avatar) {
        // fallback for v3 author structure
        console.log(`Author Avatar: ${r.author.avatar}`)
      }
      if (r.videoHD) console.log(`Video HD: ${r.videoHD}`)
      if (r.videoWatermark) console.log(`Video Watermark: ${r.videoWatermark}`)
      if (r.images?.length) console.log(`Images: ${r.images.join(", ")}`)
      if (r.music) console.log(`Music: ${r.music}`)
      console.log("========================")
    } else {
      console.error("Error:", result.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testDownloaderV3()
