// Test for Tiktok Get Music Detail
import Tiktok from "../src/index"

/**
 * Test getMusicDetail function
 * This test will fetch detailed information for a specific music ID or URL
 * Note: This requires a valid TikTok cookie
 */
async function testGetMusicDetail() {
  console.log("Testing getMusicDetail function...")

  // You can use either music ID or URL
  const musicIdOrUrl = "https://www.tiktok.com/music/QKThr-6771810675950880769"
  // const musicIdOrUrl = "6771810675950880769" // Alternative: use direct ID

  // IMPORTANT: Replace with your actual TikTok cookie
  const cookie = "YOUR_TIKTOK_COOKIE_HERE" // Get this from your browser's dev tools

  try {
    console.log(`Fetching music detail for: ${musicIdOrUrl}`)
    console.log("Note: Make sure you have set a valid TikTok cookie\n")

    const result = await Tiktok.GetMusicDetail(musicIdOrUrl, {
      cookie: cookie
      // proxy: "http://your-proxy-url" // Optional: Add proxy if needed
    })

    console.log("Result received:")
    console.log(`Status: ${result.status}`)

    if (result.status === "success" && result.result) {
      const { musicInfo, shareMeta } = result.result

      console.log("\n========================")
      console.log("MUSIC INFORMATION")
      console.log("========================")
      console.log(`Music ID: ${musicInfo.music.id}`)
      console.log(`Title: ${musicInfo.music.title}`)
      console.log(`Author Name: ${musicInfo.music.authorName}`)
      console.log(`Duration: ${musicInfo.music.duration} seconds`)
      console.log(`Original: ${musicInfo.music.original ? "Yes" : "No"}`)
      console.log(
        `Copyrighted: ${musicInfo.music.isCopyrighted ? "Yes" : "No"}`
      )
      console.log(`Private: ${musicInfo.music.private ? "Yes" : "No"}`)

      console.log("\n========================")
      console.log("AUTHOR INFORMATION")
      console.log("========================")
      console.log(`Author ID: ${musicInfo.author?.id}`)
      console.log(`Nickname: ${musicInfo.author?.nickname}`)
      console.log(`Username: @${musicInfo.author?.uniqueId}`)
      console.log(`Verified: ${musicInfo.author?.ftc ? "Yes" : "No"}`)
      console.log(
        `Private Account: ${musicInfo.author?.privateAccount ? "Yes" : "No"}`
      )
      console.log(`Secure UID: ${musicInfo.author?.secUid}`)
      console.log(`Signature: ${musicInfo.author?.signature || "No signature"}`)

      console.log("\n========================")
      console.log("STATISTICS")
      console.log("========================")
      console.log(
        `Videos using this music: ${musicInfo.stats.videoCount.toLocaleString()}`
      )

      console.log("\n========================")
      console.log("URLS")
      console.log("========================")
      console.log(`Play URL: ${musicInfo.music.playUrl}`)
      console.log(`Cover Thumbnail: ${musicInfo.music.coverThumb}`)
      console.log(`Cover Medium: ${musicInfo.music.coverMedium}`)
      console.log(`Cover Large: ${musicInfo.music.coverLarge}`)

      if (shareMeta) {
        console.log("\n========================")
        console.log("SHARE META")
        console.log("========================")
        console.log(`Title: ${shareMeta.title}`)
        console.log(`Description: ${shareMeta.desc}`)
      }

      console.log("\n✅ Test completed successfully!")
      console.log(
        "\n💡 Tip: Use 'GetVideosByMusicId' to get videos using this music"
      )
    } else {
      console.log(`❌ Error: ${result.message}`)
    }
  } catch (error: any) {
    console.error("\n❌ Test failed:", error.message)
    console.error("\nError details:", error)
  }
}

// Run the test
testGetMusicDetail()
