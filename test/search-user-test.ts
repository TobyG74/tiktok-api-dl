// Test for Tiktok Search User
import Tiktok from "../src/index"

async function testSearchUser() {
  try {
    const keyword = "call of duty" // Change to a valid search keyword
    const cookie = "" // Optional: provide a valid TikTok cookie if needed
    console.log(`\nTesting Search type: user`)
    const result = await Tiktok.Search(keyword, {
      type: "user",
      cookie,
      page: 1,
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      console.log("Success! Parsed Result:")
      result.result.forEach((item, index) => {
        if (item.type === "user") {
          const user = item as typeof item & {
            uid: string
            username: string
            nickname: string
            followerCount: number
            isVerified: boolean
            url: string
          }
          console.log(`\nResult ${index + 1}:`)
          console.log("-------------------")
          console.log(`UID: ${user.uid}`)
          console.log(`Username: ${user.username}`)
          console.log(`Nickname: ${user.nickname}`)
          console.log(`Followers: ${user.followerCount}`)
          console.log(`Verified: ${user.isVerified ? "Yes" : "No"}`)
          console.log(`Profile URL: ${user.url}`)
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

testSearchUser()
