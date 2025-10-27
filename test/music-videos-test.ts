// Test for Tiktok Get Music Videos
import Tiktok from "../src/index"

/**
 * Test getMusicVideos function
 * This test will fetch videos for a specific music ID or URL
 */
async function testGetMusicVideos() {
  console.log("Testing getMusicVideos function...")

  // You can use either music ID or URL
  const musicIdOrUrl = "https://www.tiktok.com/music/QKThr-6771810675950880769"
  // const musicIdOrUrl = "7034143722082192134" // Alternative: use direct ID

  try {
    console.log(`Fetching videos for: ${musicIdOrUrl}`)

    const result = await Tiktok.GetVideosByMusicId(musicIdOrUrl, {
      page: 1,
      count: 30
    })

    console.log("Result received:")
    console.log(`Status: ${result.status}`)

    if (result.status === "success" && result.result) {
      console.log(`Music Info:`)
      if (result.result.music) {
        console.log(`  - Title: ${result.result.music.title}`)
        console.log(`  - Artist: ${result.result.music.authorName}`)
        console.log(`  - ID: ${result.result.music.id}`)
        console.log(`  - Duration: ${result.result.music.duration}s`)
        console.log(
          `  - Original: ${result.result.music.original ? "Yes" : "No"}`
        )
      }

      console.log(`\nVideos:`)
      console.log(`  - Total found: ${result.result.totalVideos}`)

      if (result.result.videos && result.result.videos.length > 0) {
        result.result.videos.forEach((video, index) => {
          console.log(`  ${index + 1}. Video ID: ${video.id}`)
          console.log(
            `     Author: @${video.author.uniqueId} (${video.author.nickname})`
          )
          console.log(
            `     Description: ${
              video.desc?.substring(0, 50) || "No description"
            }${video.desc && video.desc.length > 50 ? "..." : ""}`
          )
          console.log(
            `     Created: ${new Date(
              video.createTime * 1000
            ).toLocaleDateString()}`
          )
          console.log(
            `     Stats: ${video.stats.playCount} views, ${video.stats.diggCount} likes, ${video.stats.commentCount} comments`
          )

          if (video.video) {
            console.log(`     Video Duration: ${video.video.duration}s`)
          }

          if (video.imagePost) {
            console.log(`     Image Post: ${video.imagePost.length} images`)
          }

          if (video.effectStickers && video.effectStickers.length > 0) {
            console.log(
              `     Effects: ${video.effectStickers.length} effects used`
            )
          }

          console.log("")
        })
      }
    } else {
      console.log(`❌ Error: ${result.message}`)
    }
  } catch (error: any) {
    console.error("❌ Test failed:", error.message)
  }
}

testGetMusicVideos()
