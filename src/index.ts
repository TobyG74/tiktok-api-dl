/** Downloader */
import { MusicalDown } from "./utils/downloader/downloader_musicaldown"
import { SSSTik } from "./utils/downloader/downloader_ssstik"
import { TiktokAPI } from "./utils/downloader/downloader_tiktokApi"

/** Search */
import { StalkUser } from "./utils/search/tiktok_stalker"
import { SearchUser } from "./utils/search/tiktok_user_search"

/** Types */
import { MusicalDownResponse } from "./types/downloader/musicaldown"
import { SSSTikResponse } from "./types/downloader/ssstik"
import { TiktokAPIResponse } from "./types/downloader/tiktokApi"
import { TiktokUserSearchResponse } from "./types/search/userSearch"
import { StalkResult } from "./types/search/stalker"

type TiktokDownloaderResponse<T extends "v1" | "v2" | "v3"> = T extends "v1" ? TiktokAPIResponse : T extends "v2" ? SSSTikResponse : T extends "v3" ? MusicalDownResponse : TiktokAPIResponse
type TiktokSearchResponse<T extends "user" | "video"> = T extends "user" ? TiktokUserSearchResponse : T extends "video" ? any : TiktokUserSearchResponse

export const Tiktok = {
  Downloader: async <T extends "v1" | "v2" | "v3">(url: string, options?: { version: T }): Promise<TiktokDownloaderResponse<T>> => {
    switch (options?.version) {
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
  Search: async <T extends "user" | "video">(query: string, options: { type: T; cookie?: string; page?: number }): Promise<TiktokSearchResponse<T>> => {
    switch (options?.type) {
      case "user": {
        const response = await SearchUser(query, options?.cookie, options?.page)
        return response as TiktokSearchResponse<T>
      }
      // case "video": {
      //   const response = await SearchVideo(query)
      //   return response as TiktokSearchResponse<T>
      // }
      default: {
        const response = await SearchUser(query, options?.cookie, options?.page)
        return response as TiktokSearchResponse<T>
      }
    }
  },
  StalkUser: async (username: string, options?: { cookie?: string }): Promise<StalkResult> => {
    const response = await StalkUser(username, options?.cookie)
    return response
  }
}

export default Tiktok
