import Axios from "axios"
import { load } from "cheerio"
import { Author, Statistics, TiktokFetchTT } from "../types/tiktokdownload"

const fetchTT = (): Promise<TiktokFetchTT> =>
  new Promise(async (resolve, reject) => {
    Axios.get("https://tiktokdownload.online/", {
      headers: {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
      }
    })
      .then(({ data }) => {
        const regex = /form\.setAttribute\("include-vals",\s*"([^"]+)"\)/
        const match = data.match(regex)
        if (match) {
          const includeValsValue = match[1]
          resolve({ status: "success", result: includeValsValue })
        } else {
          resolve({ status: "error", message: "Not found" })
        }
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })

export const TiktokDownload = (url: string) =>
  new Promise(async (resolve, reject) => {
    const tt: TiktokFetchTT = await fetchTT()
    if (tt.status !== "success") return resolve(tt)
    Axios("https://tiktokdownload.online/abc?url=dl", {
      method: "POST",
      data: new URLSearchParams(
        Object.entries({
          id: url,
          locale: "en",
          tt: tt.result
        })
      )
    })
      .then(({ data }) => {
        const $ = load(data)

        // Result
        const desc = $("p.maintext").text().trim()
        const author: Author = {
          avatar: $("img.result_author").attr("src"),
          nickname: $("h2").text().trim()
        }
        const statistics: Statistics = {
          likeCount: $("#trending-actions > .justify-content-start").text().trim(),
          commentCount: $("#trending-actions > .justify-content-center").text().trim(),
          shareCount: $("#trending-actions > .justify-content-end").text().trim()
        }

        // Images / Slide Result
        const images: string[] = []
        $("ul.splide__list > li")
          .get()
          .map((img) => {
            images.push($(img).find("img").attr("src"))
          })

        if (images.length !== 0) {
          // Images / Slide Result
          resolve({
            status: "success",
            result: {
              type: "image",
              desc,
              author,
              statistics,
              images,
              music: $("a.music").attr("href")
            }
          })
        } else {
          // Video Result
          resolve({
            status: "success",
            result: {
              type: "video",
              desc,
              author,
              statistics,
              video: $("a.without_watermark").attr("href"),
              music: $("a.music").attr("href")
            }
          })
        }
      })
      .catch(console.log)
  })
