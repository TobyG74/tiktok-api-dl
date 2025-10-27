/** Types */
import { TiktokAPIResponse } from "./types/downloader/tiktokApiDownloader"
import { SSSTikResponse } from "./types/downloader/ssstikDownloader"
import { MusicalDownResponse } from "./types/downloader/musicaldownDownloader"
import { UserSearchResult } from "./types/search/userSearch"
import { LiveSearchResult } from "./types/search/liveSearch"
import { VideoSearchResult } from "./types/search/videoSearch"
import { TiktokStalkUserResponse } from "./types/get/getProfile"
import { TiktokVideoCommentsResponse } from "./types/get/getComments"
import { TiktokUserPostsResponse } from "./types/get/getUserPosts"
import { TiktokUserRepostsResponse } from "./types/get/getUserReposts"
import { TiktokUserFavoriteVideosResponse } from "./types/get/getUserLiked"
import { TiktokCollectionResponse } from "./types/get/getCollection"
import {
  TiktokTrendingResponse,
  TrendingCreator
} from "./types/get/getTrendings"
import { TiktokMusicVideosResponse } from "./types/get/getMusicVideos"
import { TiktokMusicDetailResponse } from "./types/get/getMusicDetail"

/** Services */
import { TiktokAPI } from "./utils/downloader/tiktokAPIDownloader"
import { SSSTik } from "./utils/downloader/ssstikDownloader"
import { MusicalDown } from "./utils/downloader/musicaldownDownloader"
import { StalkUser } from "./utils/get/getProfile"
import { SearchUser } from "./utils/search/userSearch"
import { SearchLive } from "./utils/search/liveSearch"
import { getComments } from "./utils/get/getComments"
import { getUserPosts } from "./utils/get/getUserPosts"
import { getUserReposts } from "./utils/get/getUserRepost"
import { getUserLiked } from "./utils/get/getUserLiked"
import { SearchVideo } from "./utils/search/videoSearch"
import { getCollection } from "./utils/get/getCollection"
import { getTrendings, getTrendingCreators } from "./utils/get/getTrendings"
import { getMusicVideos } from "./utils/get/getMusicVideos"
import { getMusicDetail } from "./utils/get/getMusicDetail"

/** Constants */
import { DOWNLOADER_VERSIONS, SEARCH_TYPES } from "./constants"
import { ERROR_MESSAGES } from "./constants"
import { validateCookie } from "./utils/validator"
import { TiktokPlaylistResponse } from "./types/get/getPlaylist"
import { getPlaylist } from "./utils/get/getPlaylist"
import {
  extractMusicId,
  extractCollectionId,
  extractPlaylistId
} from "./utils/urlExtractors"

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
      version: T
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
   * @param {string} [options.cookie] - Required cookie for authentication
   * @param {number} [options.page] - Page number for pagination
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<TiktokSearchResponse>}
   */
  Search: async <T extends SearchType>(
    keyword: string,
    options?: {
      type?: T
      cookie: string | any[]
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
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<TiktokStalkUserResponse>}
   */
  StalkUser: async (
    username: string,
    options?: {
      proxy?: string
    }
  ): Promise<TiktokStalkUserResponse> => {
    return await StalkUser(username, options?.proxy)
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
   * @param {Object} [options] - The options for getting posts
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
  },

  /**
   * Tiktok Get User Reposts
   * @param {string} username - The username you want to get reposts from
   * @param {Object} [options] - The options for getting reposts
   * @param {number} [options.postLimit] - Limit number of reposts to fetch
   * @param {string} [options.proxy] - Optional proxy URL
   * @param {boolean} [options.filterDeletedPost] - Whether to filter deleted posts ()
   * @returns {Promise<TiktokUserRepostsResponse>}
   */
  GetUserReposts: async (
    username: string,
    options?: {
      postLimit?: number
      proxy?: string
      filterDeletedPost?: boolean
    }
  ): Promise<TiktokUserRepostsResponse> => {
    return await getUserReposts(
      username,
      options?.proxy,
      options?.postLimit,
      options?.filterDeletedPost
    )
  },

  /**
   * Get TikTok Collection
   * @param {string} collectionIdOrUrl - Collection ID or URL (e.g. 7507916135931218695 or https://www.tiktok.com/@username/collection/name-id)
   * @param {Object} options - The options for collection
   * @param {string} [options.proxy] - Optional proxy URL
   * @param {string} [options.page] - Optional page for pagination
   * @param {number} [options.count] - Optional number of items to fetch
   * @returns {Promise<TiktokCollectionResponse>}
   */
  Collection: async (
    collectionIdOrUrl: string,
    options?: {
      proxy?: string
      page?: number
      count?: number
    }
  ): Promise<TiktokCollectionResponse> => {
    const collectionId = extractCollectionId(collectionIdOrUrl)
    if (!collectionId) {
      return {
        status: "error",
        message: "Invalid collection ID or URL format"
      }
    }
    return await getCollection(
      collectionId,
      options?.proxy,
      options?.page,
      options?.count
    )
  },

  /**
   * Get TikTok Playlist
   * @param {string} playlistIdOrUrl - Playlist ID or URL (e.g. 7507916135931218695 or https://www.tiktok.com/@username/playlist/name-id)
   * @param {Object} options - The options for playlist
   * @param {string} [options.proxy] - Optional proxy URL
   * @param {string} [options.page] - Optional page for pagination
   * @param {number} [options.count] - Optional number of items to fetch(max: 20)
   * @returns {Promise<TiktokPlaylistResponse>}
   */
  Playlist: async (
    playlistIdOrUrl: string,
    options?: {
      proxy?: string
      page?: number
      count?: number
    }
  ): Promise<TiktokPlaylistResponse> => {
    const playlistId = extractPlaylistId(playlistIdOrUrl)
    if (!playlistId) {
      return {
        status: "error",
        message: "Invalid playlist ID or URL format"
      }
    }
    return await getPlaylist(
      playlistId,
      options?.proxy,
      options?.page,
      options?.count
    )
  },

  /**
   * Get TikTok Trending Content
   * @param {Object} options - The options for trending
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<TiktokTrendingResponse>}
   */
  Trending: async (options?: {
    proxy?: string
  }): Promise<TiktokTrendingResponse> => {
    return await getTrendings(options?.proxy)
  },

  /**
   * Get Videos by Music ID
   * @param {string} musicIdOrUrl - The music ID or URL to fetch videos for (e.g., "6771810675950880769" or "https://www.tiktok.com/music/QKThr-6771810675950880769")
   * @param {Object} options - The options for music videos
   * @param {string} [options.proxy] - Optional proxy URL
   * @param {number} [options.page] - Page number for pagination (default: 1)
   * @param {number} [options.count] - Number of videos per page (default: 30)
   * @returns {Promise<TiktokMusicVideosResponse>}
   */
  GetVideosByMusicId: async (
    musicIdOrUrl: string,
    options?: {
      proxy?: string
      page?: number
      count?: number
    }
  ): Promise<TiktokMusicVideosResponse> => {
    return await getMusicVideos(
      musicIdOrUrl,
      options?.proxy,
      options?.page,
      options?.count
    )
  },

  /**
   * Get Music Detail
   * @param {string} musicIdOrUrl - The music ID or URL to fetch detail for (e.g., "6771810675950880769" or "https://www.tiktok.com/music/QKThr-6771810675950880769")
   * @param {Object} options - The options for music detail
   * @param {string|Array} [options.cookie] - Required use of cookies for this endpoint
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<TiktokMusicDetailResponse>}
   */
  GetMusicDetail: async (
    musicIdOrUrl: string,
    options: {
      cookie: string | any[]
      proxy?: string
    }
  ): Promise<TiktokMusicDetailResponse> => {
    return await getMusicDetail(musicIdOrUrl, options.cookie, options?.proxy)
  },

  /**
   * Get TikTok Trending Creators
   * @param {Object} options - The options for trending creators
   * @param {string} [options.proxy] - Optional proxy URL
   * @returns {Promise<{ status: "success" | "error", message?: string, result?: TrendingCreator[] }>}
   */
  TrendingCreators: async (options?: { proxy?: string }) => {
    return await getTrendingCreators(options?.proxy)
  }
}
