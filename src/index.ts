/** Types */
import { TiktokAPIResponse } from "./types/downloader/tiktokApi"
import { SSSTikResponse } from "./types/downloader/ssstik"
import { MusicalDownResponse } from "./types/downloader/musicaldown"
import {
  TiktokUserSearchResponse,
  UserSearchResult
} from "./types/search/userSearch"
import {
  TiktokLiveSearchResponse,
  LiveSearchResult
} from "./types/search/liveSearch"
import {
  TiktokVideoSearchResponse,
  VideoSearchResult
} from "./types/search/videoSearch"
import { TiktokStalkUserResponse } from "./types/get/getProfile"
import { TiktokVideoCommentsResponse } from "./types/get/getComments"
import { TiktokUserPostsResponse } from "./types/get/getUserPosts"
import { TiktokUserFavoriteVideosResponse } from "./types/get/getUserLiked"

/** Services */
import { TiktokAPI } from "./utils/downloader/tiktokApi"
import { SSSTik } from "./utils/downloader/ssstik"
import { MusicalDown } from "./utils/downloader/musicalDown"
import { StalkUser } from "./utils/get/getProfile"
import { SearchUser } from "./utils/search/userSearch"
import { SearchLive } from "./utils/search/liveSearch"
import { getComments } from "./utils/get/getComments"
import { getUserPosts } from "./utils/get/getUserPosts"
import { getUserLiked } from "./utils/get/getUserLiked"
import { SearchVideo } from "./utils/search/videoSearch"

/** Constants */
import { DOWNLOADER_VERSIONS, SEARCH_TYPES } from "./constants"
import { ERROR_MESSAGES } from "./constants"
import { validateCookie } from "./utils/validator"

/** Types */
type DownloaderVersion = "v1" | "v2" | "v3"
type SearchType = "user" | "live" | "video"

type TiktokDownloaderResponse<T extends DownloaderVersion> = T extends "v1"
  ? TiktokAPIResponse
  : T extends "v2"
  ? SSSTikResponse
  : T extends "v3"
  ? MusicalDownResponse
  : TiktokAPIResponse

type SearchResult<T extends SearchType> = {
  type: T
} & (T extends "user"
  ? UserSearchResult
  : T extends "live"
  ? LiveSearchResult
  : VideoSearchResult)

type TiktokSearchResponse<T extends SearchType> = {
  status: "success" | "error"
  message?: string
  result?: SearchResult<T>[]
  page?: number
  totalResults?: number
}

/** Helper Functions */
const handleError = (message: string) => {
  return {
    status: "error",
    message
  }
}

/** Main API */
export = {
  /**
   * Tiktok Downloader
   * @param {string} url - The Tiktok URL you want to download
   * @param {Object} options - The options for downloader
   * @param {DownloaderVersion} options.version - The version of downloader to use
   * @param {string} [options.proxy] - Optional proxy URL
   * @param {boolean} [options.showOriginalResponse] - Whether to show original response
   * @returns {Promise<TiktokDownloaderResponse>}
   */
  Downloader: async <T extends DownloaderVersion>(
    url: string,
    options?: {
      version: DownloaderVersion
      proxy?: string
      showOriginalResponse?: boolean
    }
  ): Promise<TiktokDownloaderResponse<T>> => {
    const version = options?.version?.toLowerCase() as DownloaderVersion

    switch (version) {
      case DOWNLOADER_VERSIONS.V1:
        return (await TiktokAPI(
          url,
          options?.proxy,
          options?.showOriginalResponse
        )) as TiktokDownloaderResponse<T>

      case DOWNLOADER_VERSIONS.V2:
        return (await SSSTik(
          url,
          options?.proxy
        )) as TiktokDownloaderResponse<T>

      case DOWNLOADER_VERSIONS.V3:
        return (await MusicalDown(
          url,
          options?.proxy
        )) as TiktokDownloaderResponse<T>

      default:
        return (await TiktokAPI(
          url,
          options?.proxy,
          options?.showOriginalResponse
        )) as TiktokDownloaderResponse<T>
    }
  },

  /**
   * Tiktok Search
   * @param {string} keyword - The query you want to search
   * @param {Object} options - The options for search
   * @param {SearchType} [options.type] - The type of search (user/live/video)
   * @param {string} [options.cookie] - Cookie for authentication
   * @param {number} [options.page] - Page number for pagination
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<TiktokSearchResponse>}
   */
  Search: async <T extends SearchType>(
    keyword: string,
    options?: {
      type?: T
      cookie?: string
      page?: number
      proxy?: string
    }
  ): Promise<TiktokSearchResponse<T>> => {
    try {
      const type = options?.type?.toLowerCase() as SearchType
      if (!type || !Object.values(SEARCH_TYPES).includes(type)) {
        throw new Error(ERROR_MESSAGES.INVALID_SEARCH_TYPE)
      }

      switch (type) {
        case SEARCH_TYPES.USER:
          const userResults = await SearchUser(
            keyword,
            options.cookie,
            options?.page,
            options?.proxy
          )
          return {
            ...userResults,
            result: userResults.result?.map((user) => ({
              type: "user" as const,
              ...user
            })) as SearchResult<"user">[]
          } as unknown as TiktokSearchResponse<T>
        case SEARCH_TYPES.LIVE:
          const liveResults = await SearchLive(
            keyword,
            options.cookie,
            options?.page,
            options?.proxy
          )
          return {
            ...liveResults,
            result: liveResults.result?.map((live) => ({
              type: "live" as const,
              ...live
            })) as SearchResult<"live">[]
          } as unknown as TiktokSearchResponse<T>
        case SEARCH_TYPES.VIDEO:
          const videoResults = await SearchVideo(
            keyword,
            options.cookie,
            options?.page,
            options?.proxy
          )
          return {
            ...videoResults,
            result: videoResults.result?.map((video) => ({
              type: "video" as const,
              ...video
            })) as SearchResult<"video">[]
          } as unknown as TiktokSearchResponse<T>
        default:
          throw new Error(ERROR_MESSAGES.INVALID_SEARCH_TYPE)
      }
    } catch (error) {
      return {
        status: "error",
        message: error.message
      }
    }
  },

  /**
   * Tiktok Stalk User
   * @param {string} username - The username you want to stalk
   * @param {Object} options - The options for stalk
   * @param {string|Array} [options.cookie] - Optional cookie for authentication
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<TiktokStalkUserResponse>}
   */
  StalkUser: async (
    username: string,
    options?: {
      cookie?: string | any[]
      proxy?: string
    }
  ): Promise<TiktokStalkUserResponse> => {
    return await StalkUser(username, options?.cookie, options?.proxy)
  },

  /**
   * Tiktok Get Comments
   * @param {string} url - The Tiktok URL you want to get comments
   * @param {Object} options - The options for get comments
   * @param {number} [options.commentLimit] - Limit number of comments to fetch
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<TiktokVideoCommentsResponse>}
   */
  GetVideoComments: async (
    url: string,
    options?: {
      commentLimit?: number
      proxy?: string
    }
  ): Promise<TiktokVideoCommentsResponse> => {
    return await getComments(url, options?.proxy, options?.commentLimit)
  },

  /**
   * Tiktok Get User Posts
   * @param {string} username - The username you want to get posts from
   * @param {Object} options - The options for getting posts
   * @param {number} [options.postLimit] - Limit number of posts to fetch
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<TiktokUserPostsResponse>}
   */
  GetUserPosts: async (
    username: string,
    options?: {
      postLimit?: number
      proxy?: string
    }
  ): Promise<TiktokUserPostsResponse> => {
    return await getUserPosts(username, options?.proxy, options?.postLimit)
  },

  /**
   * Tiktok Get User Liked Videos
   * @param {string} username - The username you want to get liked videos from
   * @param {Object} options - The options for getting liked videos
   * @param {string|Array} options.cookie - Cookie for authentication
   * @param {number} [options.postLimit] - Limit number of posts to fetch
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<TiktokUserFavoriteVideosResponse>}
   */
  GetUserLiked: async (
    username: string,
    options: {
      cookie: string | any[]
      postLimit?: number
      proxy?: string
    }
  ): Promise<TiktokUserFavoriteVideosResponse> => {
    if (!validateCookie(options?.cookie)) {
      return handleError(
        ERROR_MESSAGES.COOKIE_REQUIRED
      ) as TiktokUserFavoriteVideosResponse
    }

    return await getUserLiked(
      username,
      options.cookie,
      options?.proxy,
      options?.postLimit
    )
  }
}
