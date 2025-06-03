// Test for Tiktok Search Live
import Tiktok from "../src/index"

async function testSearchLive() {
  try {
    const keyword = "call of duty" // Change to a valid search keyword
    const cookie = "" // Optional: provide a valid TikTok cookie if needed
    console.log(`\nTesting Search type: live`)
    const result = await Tiktok.Search(keyword, {
      type: "live",
      cookie,
      page: 1,
      proxy: undefined
    })
    if (result.status === "success" && result.result) {
      console.log("Success! Parsed Result:")
      result.result.forEach((item, index) => {
        if (item.type === "live") {
          const live = item as typeof item & { liveInfo: any }
          if (live.liveInfo) {
            console.log(`\nResult ${index + 1}:`)
            console.log("-------------------")
            console.log(`ID: ${live.liveInfo.id}`)
            console.log(`Title: ${live.liveInfo.title}`)
            console.log(`Hashtag: ${live.liveInfo.hashtag}`)
            if (live.liveInfo.owner)
              console.log(`Owner: ${live.liveInfo.owner.nickname}`)
            if (live.liveInfo.stats)
              console.log(`Viewers: ${live.liveInfo.stats.viewerCount}`)
            console.log("========================")
          }
        }
      })
    } else {
      console.error("Error:", result.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testSearchLive()
