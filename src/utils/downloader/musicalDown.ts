import Axios from "axios"
import { load } from "cheerio"
import {
  MusicalDownResponse,
  getMusic,
  getRequest
} from "../../types/downloader/musicaldown"
import {
  _musicaldownapi,
  _musicaldownmusicapi,
  _musicaldownurl
} from "../../constants/api"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"

/**
 * Using API from Website:
 * BASE URL : https://ssstik.io
 */

const TiktokURLregex =
  /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video|photo)\/|\?shareId=|\&item_id=)(\d+))|\w+)/

const getRequest = (url: string, proxy?: string): Promise<getRequest> =>
  new Promise((resolve) => {
    if (!TiktokURLregex.test(url)) {
      return resolve({
        status: "error",
        message: "Invalid Tiktok URL. Make sure your url is correct!"
      })
    }
    Axios(_musicaldownurl, {
      method: "GET",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",

        "Update-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0"
      },
      httpsAgent:
        (proxy &&
          (proxy.startsWith("http") || proxy.startsWith("https")
            ? new HttpsProxyAgent(proxy)
            : proxy.startsWith("socks")
            ? new SocksProxyAgent(proxy)
            : undefined)) ||
        undefined
    })
      .then((data) => {
        const cookie = data.headers["set-cookie"][0].split(";")[0]
        const $ = load(data.data)
        const input = $("div > input").map((_, el) => $(el))
        const request = {
          [input.get(0).attr("name")]: url,
          [input.get(1).attr("name")]: input.get(1).attr("value"),
          [input.get(2).attr("name")]: input.get(2).attr("value")
        }
        resolve({ status: "success", request, cookie })
      })
      .catch((e) =>
        resolve({ status: "error", message: "Failed to get the request form!" })
      )
  })

// const getMusic = (cookie: string, proxy?: string) =>
//   new Promise<getMusic>((resolve) => {
//     Axios(_musicaldownmusicapi, {
//       method: "GET",
//       headers: {
//         cookie: cookie,
//         "Upgrade-Insecure-Requests": "1",
//         "User-Agent":
//           "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0"
//       },
//       httpsAgent:
//         (proxy &&
//           (proxy.startsWith("http") || proxy.startsWith("https")
//             ? new HttpsProxyAgent(proxy)
//             : proxy.startsWith("socks")
//             ? new SocksProxyAgent(proxy)
//             : undefined)) ||
//         undefined
//     })
//       .then(({ data }) => {
//         const $ = load(data)
//         const music = $("audio > source").attr("src")
//         resolve({ status: "success", result: music })
//       })
//       .catch((e) => resolve({ status: "error" }))
//   })

/**
 * Tiktok MusicalDown Downloader
 * @param {string} url - Tiktok URL
 * @param {string} proxy - Proxy
 * @returns {Promise<MusicalDownResponse>}
 */

export const MusicalDown = (
  url: string,
  proxy?: string
): Promise<MusicalDownResponse> =>
  new Promise(async (resolve) => {
    const request: getRequest = await getRequest(url)
    if (request.status !== "success")
      return resolve({ status: "error", message: request.message })
    Axios(_musicaldownapi, {
      method: "POST",
      headers: {
        cookie: request.cookie,
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://musicaldown.com",
        Referer: "https://musicaldown.com/en",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0"
      },
      data: new URLSearchParams(Object.entries(request.request)),
      httpsAgent:
        (proxy &&
          (proxy.startsWith("http") || proxy.startsWith("https")
            ? new HttpsProxyAgent(proxy)
            : proxy.startsWith("socks")
            ? new SocksProxyAgent(proxy)
            : undefined)) ||
        undefined
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

        // Result
        if (images.length !== 0) {
          // Images or Slide Result
          resolve({
            status: "success",
            result: {
              type: "image",
              images
            }
          })
        } else {
          // Video Result
          // Get Result Video
          let i = 1
          let videos = {}
          $("div.row > div")
            .map((_, el) => $(el))
            .get(1)
            .find("a")
            .get()
            .map((v: any) => {
              if ($(v).attr("href") !== "#modal2") {
                if (!isURL($(v).attr("href"))) return
                videos[
                  $(v).attr("data-event").includes("hd")
                    ? "videoHD"
                    : $(v).attr("data-event").includes("mp4")
                    ? "videoSD"
                    : $(v).attr("data-event").includes("watermark")
                    ? "videoWatermark"
                    : $(v).attr("href").includes("type=mp3") && "music"
                ] =
                  $(v).attr("href") != undefined
                    ? $(v).attr("href")
                    : /downloadX\('([^']+)'\)/.exec($(v).attr("onclick"))[1]
                i++
              }
            })

          if (Object.keys(videos).length === 0)
            return resolve({
              status: "success",
              message: "There is an error. Can't find download link"
            })
          resolve({
            status: "success",
            result: {
              type: "video",
              author: {
                avatar: $("div.img-area > img").attr("src"),
                nickname: $("h2.video-author > b").text()
              },
              desc: $("p.video-desc").text(),
              ...videos
            }
          })
        }
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })

const isURL = (url: string) => {
  let status = false
  try {
    new URL(url)
    status = true
  } catch {
    status = false
  }
  return status
}
