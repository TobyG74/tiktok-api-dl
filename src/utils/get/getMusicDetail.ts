import Axios from "axios"
import { _tiktokGetMusicDetail } from "../../constants/api"
import { TiktokMusicDetailResponse } from "../../types/get/getMusicDetail"
import { _getMusicDetailParams } from "../../constants/params"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"
import { TiktokService } from "../../services/tiktokService"
import { webUserAgent } from "../../constants/headers"
import { extractMusicId } from "../urlExtractors"

export const getMusicDetail = (
  musicIdOrUrl: string,
  cookie: string | any[],
  proxy?: string
): Promise<TiktokMusicDetailResponse> =>
  new Promise(async (resolve) => {
    try {
      // Extract music ID from URL or use as is
      const musicId = extractMusicId(musicIdOrUrl)

      if (!musicId) {
        return resolve({
          status: "error",
          message: "Invalid music ID or URL format"
        })
      }

      const Tiktok = new TiktokService()

      // Generate xttparams
      const params = _getMusicDetailParams(musicId)
      const xttparams = Tiktok.generateXTTParams(params)

      // Build URL
      const url = new URL(_tiktokGetMusicDetail())
      url.search = params

      // Setup axios config
      const config: any = {
        headers: {
          "User-Agent": webUserAgent,
          Cookie: Array.isArray(cookie) ? cookie.join("; ") : cookie,
          "x-tt-params": xttparams
        }
      }

      // Setup proxy if provided
      if (proxy) {
        if (proxy.startsWith("http://") || proxy.startsWith("https://")) {
          config.httpsAgent = new HttpsProxyAgent(proxy)
        } else if (proxy.startsWith("socks://")) {
          config.httpsAgent = new SocksProxyAgent(proxy)
        }
      }

      // Make request
      const response = await Axios.get(url.toString(), config)

      if (response.data.statusCode === 0 && response.data.musicInfo) {
        resolve({
          status: "success",
          result: {
            musicInfo: response.data.musicInfo,
            shareMeta: response.data.shareMeta
          }
        })
      } else {
        resolve({
          status: "error",
          message:
            response.data.status_msg || "Music not found or invalid response"
        })
      }
    } catch (err: any) {
      resolve({
        status: "error",
        message: err.message || "Failed to fetch music detail"
      })
    }
  })
