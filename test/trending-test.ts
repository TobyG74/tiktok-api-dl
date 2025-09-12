// Test for TikTok Trending Content
import Tiktok from "../src/index"

async function testTrending() {
  try {
    console.log(`\nTesting TikTok Trending Content`)
    console.log("===============================")

    // Test basic trending functionality
    const result = await Tiktok.Trending({
      proxy: undefined // Add proxy if needed
    })

    if (result.status === "success" && result.result) {
      console.log("✅ Success! Trending content fetched successfully")
      console.log(`📊 Total trending sections: ${result.result.length}`)

      result.result.forEach((section, sectionIndex) => {
        console.log(`\n📂 Section ${sectionIndex + 1}:`)
        console.log("-------------------")
        console.log(`Items in this section: ${section.exploreList.length}`)

        section.exploreList.slice(0, 3).forEach((item, index) => {
          const cardItem = item.cardItem
          console.log(`\n  Item ${index + 1}:`)
          console.log(`  ID: ${cardItem.id}`)
          console.log(`  Title: ${cardItem.title}`)
          console.log(`  Subtitle: ${cardItem.subTitle}`)
          console.log(`  Type: ${cardItem.type}`)
          console.log(
            `  Description: ${cardItem.description.substring(0, 100)}${
              cardItem.description.length > 100 ? "..." : ""
            }`
          )

          if (cardItem.extraInfo) {
            console.log(
              `  Verified: ${cardItem.extraInfo.verified ? "Yes" : "No"}`
            )
            console.log(
              `  Fans: ${cardItem.extraInfo.fans?.toLocaleString() || "N/A"}`
            )
            console.log(
              `  Likes: ${cardItem.extraInfo.likes?.toLocaleString() || "N/A"}`
            )
            console.log(`  Videos: ${cardItem.extraInfo.video || "N/A"}`)
          }
        })

        if (section.exploreList.length > 3) {
          console.log(`  ... and ${section.exploreList.length - 3} more items`)
        }
      })
    } else {
      console.error("❌ Error fetching trending content:", result.message)
    }
  } catch (error) {
    console.error("❌ Test failed:", error)
  }
}

async function testTrendingCreators() {
  try {
    console.log(`\n\nTesting TikTok Trending Creators`)
    console.log("=================================")

    // Test trending creators functionality
    const result = await Tiktok.TrendingCreators({
      proxy: undefined // Add proxy if needed
    })

    if (result.status === "success" && result.result) {
      console.log("✅ Success! Trending creators fetched successfully")
      console.log(`👥 Total trending creators: ${result.result.length}`)

      result.result.slice(0, 10).forEach((creator, index) => {
        console.log(`\n👤 Creator ${index + 1}:`)
        console.log("-------------------")
        console.log(`ID: ${creator.id}`)
        console.log(`Username: @${creator.username}`)
        console.log(`Nickname: ${creator.nickname}`)
        console.log(`Verified: ${creator.verified ? "✅ Yes" : "❌ No"}`)
        console.log(`Followers: ${creator.followerCount.toLocaleString()}`)
        console.log(`Total Likes: ${creator.likeCount.toLocaleString()}`)
        console.log(`Videos: ${creator.videoCount.toLocaleString()}`)
        console.log(`Following: ${creator.followingCount.toLocaleString()}`)
        console.log(
          `Description: ${creator.description.substring(0, 80)}${
            creator.description.length > 80 ? "..." : ""
          }`
        )
        console.log(`Profile Link: https://www.tiktok.com${creator.link}`)
      })

      if (result.result.length > 10) {
        console.log(`\n... and ${result.result.length - 10} more creators`)
      }

      // Show some statistics
      const verifiedCount = result.result.filter((c) => c.verified).length
      const totalFollowers = result.result.reduce(
        (sum, c) => sum + c.followerCount,
        0
      )
      const avgFollowers = Math.round(totalFollowers / result.result.length)

      console.log(`\n📈 Statistics:`)
      console.log(`Verified creators: ${verifiedCount}/${result.result.length}`)
      console.log(`Average followers: ${avgFollowers.toLocaleString()}`)
      console.log(
        `Total combined followers: ${totalFollowers.toLocaleString()}`
      )
    } else {
      console.error("❌ Error fetching trending creators:", result.message)
    }
  } catch (error) {
    console.error("❌ Test failed:", error)
  }
}

// Run both tests
async function runAllTests() {
  await testTrending()
  await testTrendingCreators()
  console.log(`\n🎉 All trending tests completed!`)
}

runAllTests()
