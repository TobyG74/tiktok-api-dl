// Test for Tiktok Get User Liked Videos
import Tiktok from "../src/index"

async function testUserLiked() {
  try {
    const username = "Tobz2k19" // Change to a valid TikTok username
    const cookie = "YOUR_TIKTOK_COOKIE_HERE" // Get this from your browser's dev tools
    const result = await Tiktok.GetUserLiked(username, {
      cookie,
      postLimit: 5,
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      console.log("\nUser Liked Videos fetched successfully!")
      console.log("========================")
      console.log("Liked Videos Overview:")
      console.log("========================")
      console.log(`Total liked videos fetched: ${result.result.length}`)
      result.result.forEach((liked, index) => {
        console.log(`\nLiked Video ${index + 1}:`)
        console.log("-------------------")
        console.log(`ID: ${liked.id}`)
        console.log(`Description: ${liked.desc}`)
        if (liked.author) {
          console.log(
            `Author: ${liked.author.nickname} (@${liked.author.username})`
          )
        }
        if (liked.createTime) {
          console.log(
            `Created: ${new Date(
              Number(liked.createTime) * 1000
            ).toLocaleString()}`
          )
        }
        if (liked.stats) {
          console.log("Statistics:")
          console.log(`- Likes: ${liked.stats.diggCount}`)
          console.log(`- Favorites: ${liked.stats.collectCount}`)
          console.log(`- Comments: ${liked.stats.commentCount}`)
          console.log(`- Shares: ${liked.stats.shareCount}`)
          console.log(`- Plays: ${liked.stats.playCount}`)
          console.log(`- Reposts: ${liked.stats.repostCount}`)
        }
        if (liked.video?.playAddr) {
          console.log(`Video URL: ${liked.video.playAddr}`)
        }
        if (liked.imagePost?.length) {
          console.log(
            `Images: \n${liked.imagePost
              .map((img) => img.images)
              .join("\n  - ")}`
          )
        }
        console.log("========================")
      })
    } else {
      console.error("Error:", result.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testUserLiked()
