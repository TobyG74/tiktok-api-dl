// Test for Tiktok Downloader v2
import Tiktok from "../src/index"

async function testDownloaderV2() {
  try {
    const url = "https://www.tiktok.com/@tobz2k19/video/7451777267107187986" // Change to a valid TikTok video URL
    console.log(`\nTesting Downloader version: v2`)
    const result = await Tiktok.Downloader(url, {
      version: "v2",
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      const r = result.result
      console.log(`Type: ${r.type}`)
      if (r.desc) console.log(`Description: ${r.desc}`)
      if (r.author && r.author.nickname) {
        console.log(`Author: ${r.author.nickname}`)
      } else if (r.author && r.author.avatar) {
        // fallback for v2 author structure
        console.log(`Author Avatar: ${r.author.avatar}`)
      }
      if (r.statistics) {
        console.log("Statistics:")
        if (r.statistics.likeCount !== undefined)
          console.log(`- Likes: ${r.statistics.likeCount}`)
        if (r.statistics.commentCount !== undefined)
          console.log(`- Comments: ${r.statistics.commentCount}`)
        if (r.statistics.shareCount !== undefined)
          console.log(`- Shares: ${r.statistics.shareCount}`)
      }
      if (r.video?.playAddr?.length) {
        console.log(`Video URL: ${r.video.playAddr[0]}`)
      }
      if (r.music?.playUrl?.length) {
        console.log(`Music URL: ${r.music.playUrl[0]}`)
      }
      if (r.images?.length) console.log(`Images: ${r.images.join(", ")}`)
      console.log("========================")
    } else {
      console.error("Error:", result.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testDownloaderV2()
