import Axios from "axios"
import { load } from "cheerio"
import { Author, Statistics, SSSTikFetchTT, SSSTikResponse } from "../../types/downloader/ssstik"
import { _ssstikapi, _ssstikurl } from "../../constants/api"

/**
 * Using API from Website:
 * BASE URL : https://ssstik.io
 */

const TiktokURLregex = /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/

const fetchTT = () =>
  new Promise<SSSTikFetchTT>(async (resolve, reject) => {
    Axios.get(_ssstikurl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
      }
    })
      .then(({ data }) => {
        const regex = /s_tt\s*=\s*["']([^"']+)["']/
        const match = data.match(regex)
        if (match) {
          const value = match[1]
          resolve({ status: "success", result: value })
        } else {
          resolve({ status: "error", message: "Failed to get the request form!" })
        }
      })
      .catch((e) => resolve({ status: "error", message: e.message }))
  })

/**
 * Tiktok SSSTik Downloader
 * @param {string} url - Tiktok URL
 * @returns {Promise<SSSTikResponse>}
 */

export const SSSTik = (url: string) =>
  new Promise<SSSTikResponse>(async (resolve, reject) => {
    if (!TiktokURLregex.test(url)) {
      return resolve({
        status: "error",
        message: "Invalid Tiktok URL. Make sure your url is correct!"
      })
    }
    const tt: SSSTikFetchTT = await fetchTT()
    if (tt.status !== "success") return resolve({ status: "error", message: tt.message })
    Axios(_ssstikapi, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: _ssstikurl,
        Referer: _ssstikurl + "/en",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
      },
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
            images.push($(img).find("a").attr("href"))
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
      .catch((e) => resolve({ status: "error", message: e.message }))
  })
