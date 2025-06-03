import Axios from "axios"
import asyncRetry from "async-retry"
import {
  _tiktokvFeed,
  _tiktokurl,
  _tiktokGetCollection,
  _tiktokGetPlaylist
} from "../../constants/api"
import {
  _tiktokApiParams,
  _getCollectionParams,
  _getPlaylistParams
} from "../../constants/params"
import {
  AuthorTiktokAPI,
  TiktokAPIResponse,
  StatisticsTiktokAPI,
  MusicTiktokAPI,
  ResponseParserTiktokAPI,
  VideoTiktokAPI,
  TiktokCollectionResponse
} from "../../types/downloader/tiktokApi"
import { HttpsProxyAgent } from "https-proxy-agent"
import { SocksProxyAgent } from "socks-proxy-agent"
import { ERROR_MESSAGES } from "../../constants"
import { TiktokPlaylistResponse } from "../../types/get/getPlaylist"

/** Constants */
const TIKTOK_URL_REGEX =
  /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video|photo)\/|\?shareId=|\&item_id=)(\d+))|\w+)/
const USER_AGENT =
  "com.zhiliaoapp.musically/300904 (2018111632; U; Android 10; en_US; Pixel 4; Build/QQ3A.200805.001; Cronet/58.0.2991.0)"
const COLLECTION_URL_REGEX = /collection\/[^/]+-(\d+)/
const PLAYLIST_URL_REGEX = /playlist\/[^/]+-(\d+)/

/** Types */
interface ProxyConfig {
  httpsAgent?: HttpsProxyAgent<string> | SocksProxyAgent
}

/** Helper Functions */
const createProxyAgent = (proxy?: string): ProxyConfig => {
  if (!proxy) return {}

  const isHttpProxy = proxy.startsWith("http") || proxy.startsWith("https")
  const isSocksProxy = proxy.startsWith("socks")

  if (!isHttpProxy && !isSocksProxy) return {}

  return {
    httpsAgent: isHttpProxy
      ? new HttpsProxyAgent(proxy)
      : new SocksProxyAgent(proxy)
  }
}

const validateTikTokUrl = (url: string): boolean => {
  return TIKTOK_URL_REGEX.test(url)
}

const extractVideoId = (responseUrl: string): string | null => {
  const matches = responseUrl.match(/\d{17,21}/g)
  return matches ? matches[0] : null
}

const parseStatistics = (content: any): StatisticsTiktokAPI => ({
  commentCount: content.statistics.comment_count,
  likeCount: content.statistics.digg_count,
  shareCount: content.statistics.share_count,
  playCount: content.statistics.play_count,
  downloadCount: content.statistics.download_count
})

const parseAuthor = (content: any): AuthorTiktokAPI => ({
  uid: content.author.uid,
  username: content.author.unique_id,
  uniqueId: content.author.unique_id,
  nickname: content.author.nickname,
  signature: content.author.signature,
  region: content.author.region,
  avatarThumb: content.author?.avatar_thumb?.url_list || [],
  avatarMedium: content.author?.avatar_medium?.url_list || [],
  url: `${_tiktokurl}/@${content.author.unique_id}`
})

const parseMusic = (content: any): MusicTiktokAPI => ({
  id: content.music.id,
  title: content.music.title,
  author: content.music.author,
  album: content.music.album,
  playUrl: content.music?.play_url?.url_list || [],
  coverLarge: content.music?.cover_large?.url_list || [],
  coverMedium: content.music?.cover_medium?.url_list || [],
  coverThumb: content.music?.cover_thumb?.url_list || [],
  duration: content.music.duration,
  isCommerceMusic: content.music.is_commerce_music,
  isOriginalSound: content.music.is_original_sound,
  isAuthorArtist: content.music.is_author_artist
})

const parseVideo = (content: any): VideoTiktokAPI => ({
  ratio: content.video.ratio,
  duration: content.video.duration,
  playAddr: content.video?.play_addr?.url_list || [],
  downloadAddr: content.video?.download_addr?.url_list || [],
  cover: content.video?.cover?.url_list || [],
  dynamicCover: content.video?.dynamic_cover?.url_list || [],
  originCover: content.video?.origin_cover?.url_list || []
})

const parseTiktokData = (ID: string, data: any): ResponseParserTiktokAPI => {
  const content = data?.aweme_list?.find((v: any) => v.aweme_id === ID)

  if (!content) return { content: null }

  return {
    content,
    statistics: parseStatistics(content),
    author: parseAuthor(content),
    music: parseMusic(content)
  }
}

const fetchTiktokData = async (
  ID: string,
  proxy?: string
): Promise<ResponseParserTiktokAPI | null> => {
  try {
    const response = await asyncRetry(
      async () => {
        const res = await Axios(
          _tiktokvFeed(_tiktokApiParams({ aweme_id: ID })),
          {
            method: "OPTIONS",
            headers: { "User-Agent": USER_AGENT },
            ...createProxyAgent(proxy)
          }
        )

        if (res.data && res.data.status_code === 0) {
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

    return parseTiktokData(ID, response)
  } catch (error) {
    console.error("Error fetching TikTok data:", error)
    return null
  }
}

const createImageResponse = (
  content: any,
  author: AuthorTiktokAPI,
  statistics: StatisticsTiktokAPI,
  music: MusicTiktokAPI
): TiktokAPIResponse => ({
  status: "success",
  result: {
    type: "image",
    id: content.aweme_id,
    createTime: content.create_time,
    desc: content.desc,
    isTurnOffComment: content.item_comment_settings === 3,
    hashtag: content.text_extra
      .filter((x: any) => x.hashtag_name !== undefined)
      .map((v: any) => v.hashtag_name),
    isADS: content.is_ads,
    author,
    statistics,
    images:
      content.image_post_info.images?.map(
        (v: any) => v?.display_image?.url_list[0]
      ) || [],
    music
  }
})

const createVideoResponse = (
  content: any,
  author: AuthorTiktokAPI,
  statistics: StatisticsTiktokAPI,
  music: MusicTiktokAPI
): TiktokAPIResponse => ({
  status: "success",
  result: {
    type: "video",
    id: content.aweme_id,
    createTime: content.create_time,
    desc: content.desc,
    isTurnOffComment: content.item_comment_settings === 3,
    hashtag: content.text_extra
      .filter((x: any) => x.hashtag_name !== undefined)
      .map((v: any) => v.hashtag_name),
    isADS: content.is_ads,
    author,
    statistics,
    video: parseVideo(content),
    music
  }
})

const handleRedirect = async (url: string, proxy?: string): Promise<string> => {
  try {
    const response = await Axios(url, {
      method: "HEAD",
      maxRedirects: 5,
      validateStatus: (status) => status >= 200 && status < 400,
      ...createProxyAgent(proxy)
    })

    // Get the final URL after all redirects
    const finalUrl = response.request.res.responseUrl

    // Remove query parameters
    return finalUrl.split("?")[0]
  } catch (error) {
    console.error("Error handling redirect:", error)
    return url
  }
}

export const extractCollectionId = (input: string): string | null => {
  // If it's already just a number, return it
  if (/^\d+$/.test(input)) {
    return input
  }

  // Try to extract from URL
  const match = input.match(COLLECTION_URL_REGEX)
  return match ? match[1] : null
}

export const extractPlaylistId = (url: string): string | null => {
  const match = url.match(PLAYLIST_URL_REGEX)
  return match ? match[1] : null
}

/**
 * Tiktok API Downloader
 * @param {string} url - Tiktok URL
 * @param {string} proxy - Your Proxy (optional)
 * @param {boolean} showOriginalResponse - Show Original Response (optional)
 * @returns {Promise<TiktokAPIResponse>}
 */
export const TiktokAPI = async (
  url: string,
  proxy?: string,
  showOriginalResponse?: boolean
): Promise<TiktokAPIResponse> => {
  try {
    if (!validateTikTokUrl(url)) {
      return {
        status: "error",
        message: ERROR_MESSAGES.INVALID_URL
      }
    }

    // Normalize URL
    url = url.replace("https://vm", "https://vt")

    // Get video ID
    const { request } = await Axios(url, {
      method: "HEAD",
      ...createProxyAgent(proxy)
    })

    const videoId = extractVideoId(request.res.responseUrl)
    if (!videoId) {
      return {
        status: "error",
        message: ERROR_MESSAGES.INVALID_URL
      }
    }

    // Fetch TikTok data
    const data = await fetchTiktokData(videoId, proxy)
    if (!data?.content) {
      return {
        status: "error",
        message: ERROR_MESSAGES.NETWORK_ERROR
      }
    }

    const { content, author, statistics, music } = data

    // Create response based on content type
    const response = content.image_post_info
      ? createImageResponse(content, author, statistics, music)
      : createVideoResponse(content, author, statistics, music)

    // Return original response if requested
    if (showOriginalResponse) {
      return {
        status: "success",
        resultNotParsed: data
      }
    }

    return response
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR
    }
  }
}

export const Collection = async (
  collectionIdOrUrl: string,
  options?: {
    page?: number
    proxy?: string
    count?: number
  }
): Promise<TiktokCollectionResponse> => {
  try {
    // Only handle redirects if the input is a URL
    const processedUrl = collectionIdOrUrl.startsWith("http")
      ? await handleRedirect(collectionIdOrUrl, options?.proxy)
      : collectionIdOrUrl

    const collectionId = extractCollectionId(processedUrl)
    if (!collectionId) {
      return {
        status: "error",
        message: "Invalid collection ID or URL format"
      }
    }

    const response = await Axios(
      _tiktokGetCollection(
        _getCollectionParams(collectionId, options.page, options.count)
      ),
      {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
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
          hasMore: data.hasMore
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
