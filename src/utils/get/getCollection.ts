import Axios from "axios"
import { _tiktokGetCollection } from "../../constants/api"
import { _getCollectionParams } from "../../constants/params"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"
import { TiktokCollectionResponse } from "../../types/get/getCollection"
import { ERROR_MESSAGES } from "../../constants"
import retry from "async-retry"

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
 * @param {string} cursor - Cursor for pagination (optional)
 * @returns {Promise<TiktokCollectionResponse>}
 */
export const getCollection = async (
  collectionId: string,
  proxy?: string,
  cursor: string = "0"
): Promise<TiktokCollectionResponse> => {
  try {
    const response = await retry(
      async () => {
        const res = await Axios(_tiktokGetCollection(_getCollectionParams(collectionId, cursor)), {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.7",
            "Referer": "https://www.tiktok.com/",
            "Origin": "https://www.tiktok.com"
          },
          ...createProxyAgent(proxy)
        })

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
        cursor: response.cursor,
        hasMore: response.hasMore,
        itemList: response.itemList,
        extra: response.extra
      }
    }
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR
    }
  }
} 