/** Downloader */
import { MusicalDown } from "./utils/downloader/musicalDown"
import { SSSTik } from "./utils/downloader/ssstik"
import { TiktokAPI } from "./utils/downloader/tiktokApi"

/** Search */
import { StalkUser } from "./utils/search/stalker"
import { SearchUser } from "./utils/search/userSearch"

/** Types */
import { MusicalDownResponse } from "./types/downloader/musicaldown"
import { SSSTikResponse } from "./types/downloader/ssstik"
import { TiktokAPIResponse } from "./types/downloader/tiktokApi"
import { TiktokUserSearchResponse } from "./types/search/userSearch"
import { StalkResult } from "./types/search/stalker"
import { SearchLive } from "./utils/search/liveSearch"
import { TiktokLiveSearchResponse } from "./types/search/liveSearch"

type TiktokDownloaderResponse<T extends "v1" | "v2" | "v3"> = T extends "v1"
  ? TiktokAPIResponse
  : T extends "v2"
  ? SSSTikResponse
  : T extends "v3"
  ? MusicalDownResponse
  : TiktokAPIResponse
type TiktokSearchResponse<T extends "user" | "live"> = T extends "user"
  ? TiktokUserSearchResponse
  : T extends "live"
  ? any
  : TiktokLiveSearchResponse

export = {
  /**
   * Tiktok Downloader
   * @param {string} url - The Tiktok URL you want to download
   * @param {object} options - The options for downloader
   * @param {string} options.version - The version of downloader
   * @returns {Promise<TiktokDownloaderResponse>}
   */

  Downloader: async <T extends "v1" | "v2" | "v3">(
    url: string,
    options?: { version: T }
  ): Promise<TiktokDownloaderResponse<T>> => {
    switch (options?.version.toLowerCase()) {
      case "v1": {
        const response = await TiktokAPI(url)
        return response as TiktokDownloaderResponse<T>
      }
      case "v2": {
        const response = await SSSTik(url)
        return response as TiktokDownloaderResponse<T>
      }
      case "v3": {
        const response = await MusicalDown(url)
        return response as TiktokDownloaderResponse<T>
      }
      default: {
        const response = await TiktokAPI(url)
        return response as TiktokDownloaderResponse<T>
      }
    }
  },
  /**
   * Tiktok Search
   * @param {string} query - The query you want to search
   * @param {object} options - The options for search
   * @param {string} options.type - The type of search
   * @param {string} options.cookie - Your Tiktok Cookie (optional)
   * @param {number} options.page - The page of search (optional)
   * @returns {Promise<TiktokSearchResponse>}
   */
  Search: async <T extends "user" | "live">(
    query: string,
    options: { type: T; cookie?: string; page?: number; proxy?: string }
  ): Promise<TiktokSearchResponse<T>> => {
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
   * @param {string} options.cookie - Your Tiktok Cookie (optional)
   * @returns {Promise<StalkResult>}
   */
  StalkUser: async (
    username: string,
    options?: { cookie?: string; postLimit?: number; proxy?: string }
  ): Promise<StalkResult> => {
    const response = await StalkUser(
      username,
      options?.cookie,
      options?.postLimit,
      options?.proxy
    )
    return response
  }
}
