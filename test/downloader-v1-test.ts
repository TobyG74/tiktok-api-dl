// Test for Tiktok Downloader v1
import Tiktok from "../src/index"

async function testDownloaderV1() {
  try {
    const url = "https://www.tiktok.com/@tobz2k19/video/7451777267107187986" // Change to a valid TikTok video URL
    console.log(`\nTesting Downloader version: v1`)
    const result = await Tiktok.Downloader(url, {
      version: "v1",
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      const r = result.result
      console.log(`Type: ${r.type}`)
      console.log(`ID: ${r.id}`)
      console.log(`Description: ${r.desc}`)
      if (r.author) {
        console.log(`Author: ${r.author.nickname}`)
      }
      if (r.statistics) {
        console.log("Statistics:")
        console.log(`- Likes: ${r.statistics.likeCount}`)
        console.log(`- Comments: ${r.statistics.commentCount}`)
        console.log(`- Shares: ${r.statistics.shareCount}`)
        console.log(`- Plays: ${r.statistics.playCount}`)
      }
      if (r.video?.playAddr?.length) {
        console.log(`Video URL: ${r.video.playAddr[0]}`)
      }
      if (r.images?.length) {
        console.log(`Images: ${r.images.join(", ")}`)
      }
      if (r.music) {
        console.log(`Music:`)
        console.log(`- Title: ${r.music.title}`)
        if (r.music.playUrl?.length) {
          console.log(`- Music URL: ${r.music.playUrl[0]}`)
        }
      }
      console.log("========================")
    } else {
      console.error("Error:", result.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testDownloaderV1()
