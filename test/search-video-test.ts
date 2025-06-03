// Test for Tiktok Search Video
import Tiktok from "../src/index"

async function testSearchVideo() {
  try {
    const keyword = "call of duty" // Change to a valid search keyword
    const cookie = "" // Optional: provide a valid TikTok cookie if needed
    console.log(`\nTesting Search type: video`)
    const result = await Tiktok.Search(keyword, {
      type: "video",
      cookie,
      page: 1,
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      console.log("Success! Parsed Result:")
      result.result.forEach((item, index) => {
        if (item.type === "video") {
          const video = item as typeof item & {
            id: string
            desc: string
            author: any
            createTime: number
            stats: any
          }
          console.log(`\nResult ${index + 1}:`)
          console.log("-------------------")
          console.log(`ID: ${video.id}`)
          console.log(`Description: ${video.desc}`)
          if (video.author) console.log(`Author: ${video.author.nickname}`)
          if (video.createTime)
            console.log(
              `Created: ${new Date(video.createTime * 1000).toLocaleString()}`
            )
          if (video.stats) {
            console.log("Statistics:")
            console.log(`- Likes: ${video.stats.likeCount}`)
            console.log(`- Comments: ${video.stats.commentCount}`)
            console.log(`- Shares: ${video.stats.shareCount}`)
            console.log(`- Plays: ${video.stats.playCount}`)
          }
          console.log("========================")
        }
      })
    } else {
      console.error("Error:", result.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testSearchVideo()
