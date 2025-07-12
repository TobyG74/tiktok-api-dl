// Test for Tiktok Get User Reposts
import Tiktok from "../src/index"

async function testUserReposts() {
  try {
    const username = "Tobz2k19" // Change to a valid TikTok username
    const result = await Tiktok.GetUserReposts(username, {
      postLimit: 30,
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      console.log("\nUser Reposts fetched successfully!")
      console.log("========================")
      console.log("Reposts Overview:")
      console.log("========================")
      console.log(`Total reposts fetched: ${result.result.length}`)

      result.result.forEach((post, index) => {
        console.log(`\nRepost ${index + 1}:`)
        console.log("-------------------")
        console.log(`ID: ${post.id}`)
        console.log(`Description: ${post.desc}`)
        if (post.author) {
          console.log(
            `Author: ${post.author.nickname} (@${post.author.username})`
          )
        }
        console.log(
          `Create Time: ${new Date(post.createTime * 1000).toLocaleString()}`
        )
        if (post.stats) {
          console.log(`Share Count: ${post.stats.shareCount}`)
        }
        if (post.video) {
          console.log(`Video Duration: ${post.video.duration}s`)
          console.log(`Video Format: ${post.video.format}`)
        }
        if (
          post.imagePost &&
          post.imagePost.images &&
          post.imagePost.images.length > 0
        ) {
          console.log(`Image Post: ${post.imagePost.images.length} images`)
        }
        if (post.music && post.music.title) {
          console.log(`Music: ${post.music.title}`)
        }
      })
    } else {
      console.error("Failed to fetch reposts:", result.message)
    }
  } catch (error) {
    console.error("Error:", error)
  }
}

testUserReposts()
