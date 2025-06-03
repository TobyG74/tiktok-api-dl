// Test for Tiktok Playlist
import Tiktok from "../src/index"

async function testPlaylist() {
  try {
    const playlistUrl =
      "https://www.tiktok.com/@tobz2k19/playlist/tset-7511644672511626004" // Ganti dengan URL playlist yang valid jika perlu
    console.log(`\nTesting Playlist: ${playlistUrl}`)
    const result = await Tiktok.Playlist(playlistUrl, {
      proxy: undefined,
      page: 1,
      count: 5
    })
    if (result.status === "success" && result.result) {
      const { itemList, hasMore, extra } = result.result
      console.log(`Total Videos: ${itemList.length}`)
      itemList.forEach((item, idx) => {
        console.log(`\n[${idx + 1}] ID: ${item.id}`)
        console.log(`Description: ${item.desc}`)
        if (item.author) {
          console.log(`Author: ${item.author.nickname}`)
        }
        if (item.stats) {
          console.log("Statistics:")
          console.log(`- Likes: ${item.stats.diggCount}`)
          console.log(`- Comments: ${item.stats.commentCount}`)
          console.log(`- Shares: ${item.stats.shareCount}`)
          console.log(`- Plays: ${item.stats.playCount}`)
        }
        if (item.video?.playAddr?.length) {
          console.log(`Video URL: ${item.video.playAddr}`)
        }
      })
      console.log("========================")
      if (hasMore) {
        console.log(
          "There are more videos. Use the 'page' option to fetch next page."
        )
      }
    } else {
      console.error("Error:", result.message)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testPlaylist()
