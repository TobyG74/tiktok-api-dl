import Tiktok from "../src"

async function testCollection() {
  try {
    // Test collection ID from your example
    const collectionId = "7507916135931218695"

    console.log("Fetching collection...")
    const collection = await Tiktok.Collection(collectionId, {
      cursor: "0" // Optional: For pagination
    })

    console.log(collection)

    if (collection.status === "success" && collection.result) {
      const { itemList, hasMore, cursor } = collection.result

      console.log(`\nFound ${itemList.length} videos in collection`)
      console.log(`Has more videos: ${hasMore}`)
      console.log(`Next cursor: ${cursor}\n`)

      // Print details of first video
      if (itemList.length > 0) {
        const firstVideo = itemList[0]
        console.log("First video details:")
        console.log("-------------------")
        console.log(`Description: ${firstVideo.desc}`)
        console.log(`Author: ${firstVideo.author?.nickname || 'Unknown'}`)
        console.log(
          `Created: ${new Date(firstVideo.createTime * 1000).toLocaleString()}`
        )
        
        // Print statistics if available
        if (firstVideo.statistics) {
          console.log("\nStatistics:")
          console.log(`- Likes: ${firstVideo.statistics.likeCount || 0}`)
          console.log(`- Comments: ${firstVideo.statistics.commentCount || 0}`)
          console.log(`- Shares: ${firstVideo.statistics.shareCount || 0}`)
          console.log(`- Plays: ${firstVideo.statistics.playCount || 0}`)
        }

        // Print video URLs if available
        if (firstVideo.video) {
          console.log("\nVideo URLs:")
          if (firstVideo.video.playAddr?.[0]) {
            console.log(`- Play URL: ${firstVideo.video.playAddr[0]}`)
          }
          if (firstVideo.video.downloadAddr?.[0]) {
            console.log(`- Download URL: ${firstVideo.video.downloadAddr[0]}`)
          }
        }

        // Print hashtags if available
        if (firstVideo.textExtra?.length > 0) {
          console.log("\nHashtags:")
          firstVideo.textExtra.forEach((tag) => {
            if (tag.hashtagName) {
              console.log(`- #${tag.hashtagName}`)
            }
          })
        }
      }

      // If there are more videos, you can fetch the next page
      if (hasMore) {
        console.log("\nFetching next page...")
        const nextPage = await Tiktok.Collection(collectionId, {
          proxy: "http://your-proxy-url", // Optional: Add your proxy if needed
          cursor: cursor
        })

        if (nextPage.status === "success" && nextPage.result) {
          console.log(`Found ${nextPage.result.itemList.length} more videos`)
        }
      }
    } else {
      console.error("Error:", collection.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

// Run the test
testCollection()
