/** Downloader */
import { MusicalDown } from "./utils/downloader/musicalDown"
import { SSSTik } from "./utils/downloader/ssstik"
import { TiktokAPI } from "./utils/downloader/tiktokApi"

/** Get */
import { StalkUser } from "./utils/get/getProfile"

/** Search */
import { SearchUser } from "./utils/search/userSearch"
import { SearchLive } from "./utils/search/liveSearch"

/** Types */
import { MusicalDownResponse } from "./types/downloader/musicaldown"
import { SSSTikResponse } from "./types/downloader/ssstik"
import { TiktokAPIResponse } from "./types/downloader/tiktokApi"
import { TiktokUserSearchResponse } from "./types/search/userSearch"
import { TiktokStalkUserResponse } from "./types/get/getProfile"
import { TiktokLiveSearchResponse } from "./types/search/liveSearch"
import { TiktokVideoCommentsResponse } from "./types/get/getComments"
import { getComments } from "./utils/get/getComments"
import { TiktokUserPostsResponse } from "./types/get/getUserPosts"
import { getUserPosts } from "./utils/get/getUserPosts"
import { getUserLiked } from "./utils/get/getUserLiked"
import { TiktokUserFavoriteVideosResponse } from "./types/get/getUserLiked"
import { TiktokVideoSearchResponse } from "./types/search/videoSearch"
import { SearchVideo } from "./utils/search/videoSearch"

type TiktokDownloaderResponse<T extends "v1" | "v2" | "v3"> = T extends "v1"
  ? TiktokAPIResponse
  : T extends "v2"
  ? SSSTikResponse
  : T extends "v3"
  ? MusicalDownResponse
  : TiktokAPIResponse
type TiktokSearchResponse<T extends "user" | "live" | "video"> =
  T extends "user"
    ? TiktokUserSearchResponse
    : T extends "live"
    ? TiktokLiveSearchResponse
    : TiktokVideoSearchResponse

export = {
  /**
   * Tiktok Downloader
   * @param {string} url - The Tiktok URL you want to download
   * @param {object} options - The options for downloader
   * @param {string} options.version - The version of downloader
   * @param {string} options.proxy - Your Proxy (optional)
   * @param {boolean} options.showOriginalResponse - Show Original Response (optional) & Only for v1
   * @returns {Promise<TiktokDownloaderResponse>}
   */

  Downloader: async <T extends "v1" | "v2" | "v3">(
    url: string,
    options?: { version: T; proxy?: string; showOriginalResponse?: boolean }
  ): Promise<TiktokDownloaderResponse<T>> => {
    switch (options?.version.toLowerCase()) {
      case "v1": {
        const response = await TiktokAPI(
          url,
          options?.proxy,
          options?.showOriginalResponse
        )
        return response as TiktokDownloaderResponse<T>
      }
      case "v2": {
        const response = await SSSTik(url, options?.proxy)
        return response as TiktokDownloaderResponse<T>
      }
      case "v3": {
        const response = await MusicalDown(url, options?.proxy)
        return response as TiktokDownloaderResponse<T>
      }
      default: {
        const response = await TiktokAPI(
          url,
          options?.proxy,
          options?.showOriginalResponse
        )
        return response as TiktokDownloaderResponse<T>
      }
    }
  },
  /**
   * Tiktok Search
   * @param {string} query - The query you want to search
   * @param {object} options - The options for search
   * @param {string} options.type - The type of search
   * @param {string | any[]} options.cookie - Your Tiktok Cookie (optional)
   * @param {number} options.page - The page of search (optional)
   * @param {string} options.proxy - Your Proxy (optional)
   * @returns {Promise<TiktokSearchResponse>}
   */
  Search: async <T extends "user" | "live" | "video">(
    query: string,
    options: {
      type: T
      cookie: string | any[]
      page?: number
      proxy?: string
    }
  ): Promise<TiktokSearchResponse<T>> => {
    if (!options?.cookie) {
      return {
        status: "error",
        message: "Cookie is required!"
      } as TiktokSearchResponse<T>
    }
    switch (options?.type.toLowerCase()) {
      case "user": {
        const response = await SearchUser(
          query,
          options?.cookie,
          options?.page,
          options?.proxy
        )
        return response as TiktokSearchResponse<T>
      }
      case "live": {
        const response = await SearchLive(
          query,
          options?.cookie,
          options?.page,
          options?.proxy
        )
        return response as TiktokSearchResponse<T>
      }
      case "video": {
        const response = await SearchVideo(
          query,
          options?.cookie,
          options?.page,
          options?.proxy
        )
        return response as TiktokSearchResponse<T>
      }
      default: {
        const response = await SearchUser(
          query,
          options?.cookie,
          options?.page,
          options?.proxy
        )
        return response as TiktokSearchResponse<T>
      }
    }
  },
  /**
   * Tiktok Stalk User
   * @param {string} username - The username you want to stalk
   * @param {object} options - The options for stalk
   * @param {string | any[]} options.cookie - Your Tiktok Cookie (optional)
   * @param {string} options.proxy - Your Proxy (optional)
   * @returns {Promise<TiktokStalkUserResponse>}
   */
  StalkUser: async (
    username: string,
    options?: {
      cookie?: string | any[]
      postLimit?: number
      proxy?: string
    }
  ): Promise<TiktokStalkUserResponse> => {
    const response = await StalkUser(username, options?.cookie, options?.proxy)
    return response
  },

  /**
   * Tiktok Get Comments
   * @param {string} url - The Tiktok URL you want to get comments
   * @param {object} options - The options for get comments
   * @param {string} options.proxy - Your Proxy (optional)
   * @param {number} options.page - The page you want to get (optional)
   * @returns {Promise<TiktokVideoCommentsResponse>}
   */
  GetVideoComments: async (
    url: string,
    options?: { commentLimit?: number; proxy?: string }
  ): Promise<TiktokVideoCommentsResponse> => {
    const response = await getComments(
      url,
      options?.proxy,
      options?.commentLimit
    )
    return response
  },

  /**
   * Tiktok Get User Posts
   * @param {string} username - The username you want to get posts from
   * @param {object} options - The options for getting posts
   * @param {number} options.postLimit - Limit number of posts to return (optional)
   * @param {string} options.proxy - Your Proxy (optional)
   * @returns {Promise<TiktokUserPostsResponse>}
   */
  GetUserPosts: async (
    username: string,
    options?: { postLimit?: number; proxy?: string }
  ): Promise<TiktokUserPostsResponse> => {
    const response = await getUserPosts(
      username,
      options?.proxy,
      options?.postLimit
    )
    return response
  },

  /**
   * Tiktok Get User Liked Videos
   * @param {string} username - The username you want to get liked videos from
   * @param {object} options - The options for getting liked videos
   * @param {string | any[]} options.cookie - Your Tiktok Cookie (optional)
   * @param {number} options.postLimit - Limit number of posts to return (optional)
   * @param {string} options.proxy - Your Proxy (optional)
   * @returns {Promise<TiktokUserFavoriteVideosResponse>}
   */
  GetUserLiked: async (
    username: string,
    options: { cookie: string | any[]; postLimit?: number; proxy?: string }
  ): Promise<TiktokUserFavoriteVideosResponse> => {
    if (!options?.cookie) {
      return {
        status: "error",
        message: "Cookie is required!"
      } as TiktokUserFavoriteVideosResponse
    }
    const response = await getUserLiked(
      username,
      options?.cookie,
      options?.proxy,
      options?.postLimit
    )
    return response
  }
}
