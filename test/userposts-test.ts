// Test for Tiktok Get User Posts
import Tiktok from "../src/index"

async function testUserPosts() {
  try {
    const username = "Tobz2k19" // Change to a valid TikTok username
    const result = await Tiktok.GetUserPosts(username, {
      postLimit: 30,
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      console.log("\nUser Posts fetched successfully!")
      console.log("========================")
      console.log("Posts Overview:")
      console.log("========================")
      console.log(`Total posts fetched: ${result.result.length}`)

      result.result.forEach((post, index) => {
        console.log(`\nPost ${index + 1}:`)
        console.log("-------------------")
        console.log(`ID: ${post.id}`)
        console.log(`Description: ${post.desc}`)
        if (post.author) {
          console.log(
            `Author: ${post.author.nickname} (@${post.author.username})`
          )
        }
        if (post.createTime) {
          console.log(
            `Created: ${new Date(post.createTime * 1000).toLocaleString()}`
          )
        }
        if (post.stats) {
          console.log("Statistics:")
          console.log(`- Likes: ${post.stats.likeCount}`)
          console.log(`- Comments: ${post.stats.commentCount}`)
          console.log(`- Shares: ${post.stats.shareCount}`)
          console.log(`- Plays: ${post.stats.playCount}`)
        }
        if (post.video?.playAddr) {
          console.log(`Video URL: ${post.video.playAddr}`)
        }
        if (post.imagePost?.length) {
          console.log(`Images: ${post.imagePost.join(", ")}`)
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

testUserPosts()
