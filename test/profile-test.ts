// Test for Tiktok Stalk User Profile
import Tiktok from "../src/index"

async function testProfile() {
  try {
    const username = "charlidamelio" // Change to a valid TikTok username
    const result = await Tiktok.StalkUser(username, {
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      const { user, stats, statsV2 } = result.result
      console.log("\nProfile fetched successfully!")
      console.log("========================")
      console.log("User Profile:")
      console.log("========================")
      console.log(`Username: @${user.username}`)
      console.log(`Nickname: ${user.nickname}`)
      console.log(`Signature: ${user.signature}`)
      console.log(`Verified: ${user.verified ? "Yes" : "No"}`)
      console.log(`Region: ${user.region}`)
      console.log(`Private Account: ${user.privateAccount ? "Yes" : "No"}`)
      console.log(`Commerce User: ${user.commerceUser ? "Yes" : "No"}`)
      console.log(`Avatar: ${user.avatarLarger}`)
      console.log(`Secured ID: ${user.secUid}`)
      console.log("\nStats:")
      console.log(`- Followers: ${stats.followerCount}`)
      console.log(`- Following: ${stats.followingCount}`)
      console.log(`- Hearts: ${stats.heartCount}`)
      console.log(`- Videos: ${stats.videoCount}`)
      console.log(`- Likes: ${stats.likeCount}`)
      console.log(`- Friends: ${stats.friendCount}`)
      console.log("========================")
      console.log("\nStats V2:")
      console.log(`- Followers: ${statsV2.followerCount}`)
      console.log(`- Following: ${statsV2.followingCount}`)
      console.log(`- Hearts: ${statsV2.heartCount}`)
      console.log(`- Videos: ${statsV2.videoCount}`)
      console.log(`- Likes: ${statsV2.likeCount}`)
      console.log(`- Friends: ${statsV2.friendCount}`)
      console.log("========================")
    } else {
      console.error("Error:", result.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testProfile()
