import { JSDOM, ResourceLoader } from "jsdom"
import { _getUserLikedParams, _userSearchParams } from "../constants/params"
import xbogus from "../../helper/xbogus"
import { userAgent, webUserAgent } from "../constants/headers"
import qs from "qs"
import fs from "fs"
import { createCipheriv } from "crypto"
import path from "path"

export class TiktokService {
  /**
   * Generate Signature parameter for TikTok API requests
   * @param {string} id - User ID to generate X-Bogus for
   * @param {string} secUid - User's secure ID
   * @param {number} count - Number of items to request
   * @returns {string} URL with X-Bogus parameter appended
   */
  public generateSignature(url: URL): string {
    const stringUrl = url.toString()
    const jsdomOptions = this.getJsdomOptions()

    const { window } = new JSDOM(``, jsdomOptions)
    let _window = window
    _window.eval(this.signaturejs.toString())
    _window.byted_acrawler.init({
      aid: 24,
      dfp: true
    })
    _window.eval(this.webmssdk)
    const signature = _window.byted_acrawler.sign({ url: stringUrl })
    return signature
  }

  /**
   * Generate X-Bogus parameter for TikTok API requests
   * @param {string} id - User ID to generate X-Bogus for
   * @param {string} secUid - User's secure ID
   * @param {number} count - Number of items to request
   * @returns {string} URL with X-Bogus parameter appended
   */
  public generateXBogus(url: URL, signature?: string): string {
    const jsdomOptions = this.getJsdomOptions()

    const { window } = new JSDOM(``, jsdomOptions)
    let _window = window
    _window.eval(this.signaturejs.toString())
    _window.byted_acrawler.init({
      aid: 24,
      dfp: true
    })
    _window.eval(this.webmssdk)
    if (signature) {
      url.searchParams.append("_signature", signature)
    }
    const xbogus = _window._0x32d649(url.searchParams.toString())
    return xbogus
  }

  /**
   * Generate XTTPParams
   * @param {any} params - The params you want to encrypt
   * @returns {string}
   */
  public generateXTTParams(params: any): string {
    const cipher = createCipheriv(
      "aes-128-cbc",
      TiktokService.AES_KEY,
      TiktokService.AES_IV
    )
    return Buffer.concat([cipher.update(params), cipher.final()]).toString(
      "base64"
    )
  }

  /**
   * Generate URL with X-Bogus
   * Special thanks to https://github.com/iamatef/xbogus
   * @param {string} username - The username you want to search
   * @param {number} page - The page you want to search
   * @returns {string}
   */
  public generateURLXbogus(username: string, page: number): string {
    const baseUrl = `${TiktokService.BASE_URL}api/search/user/full/?`
    const queryParams = _userSearchParams(username, page)
    const xbogusParams = xbogus(`${baseUrl}${queryParams}`, userAgent)

    return `${baseUrl}${_userSearchParams(username, page, xbogusParams)}`
  }

  /**
   * Get JSDOM Options
   * @returns {object}
   */
  private getJsdomOptions() {
    return {
      url: TiktokService.BASE_URL,
      referrer: TiktokService.BASE_URL,
      contentType: "text/html",
      includeNodeLocations: false,
      runScripts: "outside-only",
      pretendToBeVisual: true,
      resources: new ResourceLoader({ userAgent: webUserAgent })
    }
  }

  private static readonly FILE_PATH = path.join(__dirname, "../../helper")
  private static readonly BASE_URL = "https://www.tiktok.com/"
  private static readonly AES_KEY = "webapp1.0+202106"
  private static readonly AES_IV = "webapp1.0+202106"
  private signaturejs = fs.readFileSync(
    path.join(TiktokService.FILE_PATH, "signature.js"),
    "utf-8"
  )
  private webmssdk = fs.readFileSync(
    path.join(TiktokService.FILE_PATH, "webmssdk.js"),
    "utf-8"
  )
  private resourceLoader = new ResourceLoader({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35"
  })
}
