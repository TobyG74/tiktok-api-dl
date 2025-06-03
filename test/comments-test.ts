// Test for Tiktok Video Comments
import Tiktok from "../src/index"

async function testComments() {
  try {
    const url = "https://www.tiktok.com/@tobz2k19/video/7451777267107187986" // Change to a valid TikTok video URL
    const result = await Tiktok.GetVideoComments(url, {
      commentLimit: 10,
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      console.log("\nComments fetched successfully!")
      console.log("========================")
      console.log("Comments Overview:")
      console.log("========================")
      console.log(`Total comments fetched: ${result.result.length}`)
      // Log all comments
      result.result.forEach((comment, index) => {
        console.log(`\nComment ${index + 1}:`)
        console.log("-------------------")
        console.log(`ID: ${comment.cid}`)
        if (comment.user) {
          console.log(
            `Author: ${comment.user.nickname} (@${comment.user.username})`
          )
          console.log(`Verified: ${comment.user.isVerified ? "Yes" : "No"}`)
        }
        console.log(`Text: ${comment.text}`)
        if (comment.createTime) {
          console.log(
            `Created: ${new Date(comment.createTime * 1000).toLocaleString()}`
          )
        }
        // Log comment statistics
        if (typeof comment.likeCount !== "undefined") {
          console.log("\nStatistics:")
          console.log(`- Likes: ${comment.likeCount}`)
        }
        if (typeof comment.replyCommentTotal !== "undefined") {
          console.log(`- Replies: ${comment.replyCommentTotal}`)
        }
        if (comment.isAuthorLiked) console.log("👍 Liked by author")
        if (comment.isCommentTranslatable) console.log("🌐 Translatable")
        console.log("========================")
      })
    } else {
      console.error("Error:", result.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testComments()
