import Tiktok from "../src/index"

async function testCollection() {
  try {
    // You can use either a collection ID or URL
    const collectionId = "7507916135931218695"
    const collectionUrl =
      "https://www.tiktok.com/@getrex.co.nz/collection/big%20back-7507916135931218695"
    const collectionShareableLink = "https://vt.tiktok.com/ZShvmqNjQ/"

    console.log("Testing Collection method...")
    const result = await Tiktok.Collection(collectionId, {
      page: 1,
      count: 5, // Optional: Number of items to fetch
      proxy: undefined // Optional: Add your proxy if needed
    })

    if (result.status === "success" && result.result) {
      console.log("\nCollection fetched successfully!")
      console.log("========================")
      console.log("Collection Overview:")
      console.log("========================")
      console.log(`Total items fetched: ${result.result.itemList.length}`)
      console.log(`Has more items: ${result.result.hasMore}`)

      // Log all items
      result.result.itemList.forEach((item, index) => {
        console.log(`\nItem ${index + 1}:`)
        console.log("-------------------")
        console.log(`ID: ${item.id}`)
        console.log(`Description: ${item.desc}`)
        console.log(`Author: ${item.author.nickname}`)
        console.log(
          `Created: ${new Date(item.createTime * 1000).toLocaleString()}`
        )

        // Log video URL
        if (item.video?.playAddr?.[0]) {
          console.log(`Video URL: ${item.video.playAddr[0]}`)
        } else {
          console.log("No video URL available")
        }

        // Log item statistics
        if (item.statistics) {
          console.log("\nStatistics:")
          console.log(`- Likes: ${item.statistics.likeCount || 0}`)
          console.log(`- Comments: ${item.statistics.commentCount || 0}`)
          console.log(`- Shares: ${item.statistics.shareCount || 0}`)
          console.log(`- Plays: ${item.statistics.playCount || 0}`)
        }

        // Log hashtags if available
        if (item.textExtra?.length > 0) {
          console.log("\nHashtags:")
          item.textExtra.forEach((tag) => {
            if (tag.hashtagName) {
              console.log(`- #${tag.hashtagName}`)
            }
          })
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

// Run the test
testCollection()
