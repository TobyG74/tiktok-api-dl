import Axios from "axios"
import { _tiktokGetPlaylist, _tiktokDesktopUrl } from "../../constants/api"
import { _getPlaylistParams } from "../../constants/params"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"
import { ERROR_MESSAGES } from "../../constants"
import retry from "async-retry"
import { TiktokPlaylistResponse } from "../../types/get/getPlaylist"
import { handleRedirect } from "../downloader/tiktokAPIDownloader"
import { extractPlaylistId } from "../urlExtractors"

/** Types */
interface ProxyConfig {
  httpsAgent?: HttpsProxyAgent<string> | SocksProxyAgent
}

const createProxyAgent = (proxy?: string): ProxyConfig => {
  if (!proxy) return {}

  if (proxy.startsWith("socks")) {
    return {
      httpsAgent: new SocksProxyAgent(proxy)
    }
  }

  return {
    httpsAgent: new HttpsProxyAgent(proxy)
  }
}

/**
 * Get TikTok Collection
 * @param {string} collectionId - Collection ID
 * @param {string} proxy - Your Proxy (optional)
 * @param {string} page - Page for pagination (optional)
 * @param {number} count - Number of items to fetch (optional)
 * @returns {Promise<TiktokPlaylistResponse>}
 */
export const getPlaylist = async (
  playlistId: string,
  proxy?: string,
  page: number = 1,
  count: number = 5
): Promise<TiktokPlaylistResponse> => {
  try {
    const response = await retry(
      async () => {
        const res = await Axios(
          _tiktokGetPlaylist(_getPlaylistParams(playlistId, page, count)),
          {
            method: "GET",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0",
              Accept: "*/*",
              "Accept-Language": "en-US,en;q=0.7",
              Referer: "https://www.tiktok.com/",
              Origin: "https://www.tiktok.com",
              "Content-Type": "application/json"
            },
            ...createProxyAgent(proxy)
          }
        )

        if (res.data && res.data.statusCode === 0) {
          return res.data
        }

        throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
      },
      {
        retries: 20,
        minTimeout: 200,
        maxTimeout: 1000
      }
    )

    return {
      status: "success",
      result: {
        hasMore: response.hasMore,
        itemList: response.itemList || [],
        extra: response.extra
      }
    }
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR
    }
  }
}

export const Playlist = async (
  url: string,
  options?: {
    page?: number
    proxy?: string
    count?: number
  }
): Promise<TiktokPlaylistResponse> => {
  try {
    const processedUrl = url.startsWith("http")
      ? await handleRedirect(url, options?.proxy)
      : url

    const playlistId = extractPlaylistId(processedUrl)
    if (!playlistId) {
      return {
        status: "error",
        message: "Invalid playlist ID or URL format"
      }
    }

    const response = await Axios(
      _tiktokGetPlaylist(
        _getPlaylistParams(playlistId, options.page, options.count)
      ),
      {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.7",
          Referer: "https://www.tiktok.com/",
          Origin: "https://www.tiktok.com"
        },
        ...createProxyAgent(options?.proxy)
      }
    )

    if (response.data && response.data.status_code === 0) {
      const data = response.data

      return {
        status: "success",
        result: {
          itemList: data.itemList || [],
          hasMore: data.hasMore,
          extra: data.extra
        }
      }
    }

    return {
      status: "error",
      message: ERROR_MESSAGES.NETWORK_ERROR
    }
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR
    }
  }
}
