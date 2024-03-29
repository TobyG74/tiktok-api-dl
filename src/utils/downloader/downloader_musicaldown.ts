import Axios from "axios"
import { load } from "cheerio"
import { MusicalDownResponse, getMusic, getRequest } from "../../types/downloader/musicaldown"
import { _musicaldownapi, _musicaldownmusicapi, _musicaldownurl } from "../../constants/api"

/**
 * Using API from Website:
 * BASE URL : https://ssstik.io
 */

const TiktokURLregex = /(?:http[s]?:\/\/)?(?:www\.|m\.)?(?:tiktok\.com\/(?:@[\w.-]+\/video\/|@[\w.-]+\/video\/))?(\d+)/

const getRequest = (url: string) =>
  new Promise<getRequest>((resolve, reject) => {
    if (!TiktokURLregex.test(url)) {
      return resolve({
        status: "error",
        message: "Invalid Tiktok URL. Make sure your url is correct!"
      })
    }
    Axios.get(_musicaldownurl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
      }
    })
      .then((data) => {
        const cookie = data.headers["set-cookie"][0].split(";")[0] + "; " + "lang=en"
        const $ = load(data.data)
        const input = $("div > input").map((_, el) => $(el))
        const request = {
          [input.get(0).attr("name")]: url,
          [input.get(1).attr("name")]: input.get(1).attr("value"),
          [input.get(2).attr("name")]: input.get(2).attr("value")
        }
        resolve({ status: "success", request, cookie })
      })
      .catch((e) => resolve({ status: "error", message: "Failed to get the request form!" }))
  })

const getMusic = (cookie: string) =>
  new Promise<getMusic>((resolve, reject) => {
    Axios.get(_musicaldownmusicapi, {
      headers: {
        cookie: cookie,
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
      }
    })
      .then(({ data }) => {
        const $ = load(data)
        const music = $("audio > source").attr("src")
        resolve({ status: "success", result: music })
      })
      .catch((e) => resolve({ status: "error" }))
  })

/**
 * Tiktok MusicalDown Downloader
 * @param {string} url - Tiktok URL
 * @returns {Promise<MusicalDownResponse>}
 */

export const MusicalDown = (url: string) =>
  new Promise<MusicalDownResponse>(async (resolve, reject) => {
    const request: getRequest = await getRequest(url)
    if (request.status !== "success") return resolve({ status: "error", message: request.message })
    Axios(_musicaldownapi, {
      method: "POST",
      headers: {
        cookie: request.cookie,
        "Upgrade-Insecure-Requests": "1",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
      },
      data: new URLSearchParams(Object.entries(request.request))
    })
      .then(async ({ data }) => {
        const $ = load(data)

        // Get Image Video
        const images = []
        $("div.row > div[class='col s12 m3']")
          .get()
          .map((v) => {
            images.push($(v).find("img").attr("src"))
          })

        // Get Result Video
        let i = 1
        let videos = {}
        $("div[class='col s12 l8'] > a")
          .get()
          .map((v) => {
            if ($(v).attr("href") !== "#modal2") {
              let text = $(v).text().trim().replace(/\s/, " ").replace("arrow_downward", "").toLowerCase()
              videos[text.includes("hd") ? "video_hd" : text.includes("watermark") ? "video_watermark" : `video${i}`] = $(v).attr("href")
              i++
            }
          })
        // Result
        if (images.length !== 0) {
          // Images or Slide Result
          resolve({
            status: "success",
            result: {
              type: "image",
              author: {
                nickname: $("h2.white-text").text().trim().replace("Download Now: Check out ", "").replace("’s video! #TikTok >If MusicallyDown has helped you, you can help us too", "").replace("Download Now: ", "").replace("If MusicallyDown has helped you, you can help us too", "")
              },
              images,
              music: $("a.download").attr("href")
            }
          })
        } else {
          // Video Result
          const music = await getMusic(request.cookie)
          resolve({
            status: "success",
            result: {
              type: "video",
              author: {
                avatar: $("div.img-area > img").attr("src"),
                nickname: $("div.row > div > div > h2")
                  .map((_, el) => $(el).text())
                  .get(0)
              },
              desc: $("div.row > div > div > h2")
                .map((_, el) => $(el).text())
                .get(1),
              music: music.result,
              ...videos
            }
          })
        }
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })
