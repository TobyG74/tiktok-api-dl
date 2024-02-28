import { MusicalDown } from "./downloader_musicaldown"
import { SSSTik } from "./downloader_ssstik"
import { TiktokAPI } from "./downloader_tiktokApi"

/** Types */
import { MusicalDownResponse } from "../../types/musicaldown"
import { SSSTikResponse } from "../../types/ssstik"
import { TiktokAPIResponse } from "../../types/tiktokApi"

type TiktokDownloaderResponse<T extends "v1" | "v2" | "v3"> = T extends "v1" ? TiktokAPIResponse : T extends "v2" ? SSSTikResponse : T extends "v3" ? MusicalDownResponse : TiktokAPIResponse

export const TiktokDownloader = async <T extends "v1" | "v2" | "v3">(url: string, options?: { version: T }): Promise<TiktokDownloaderResponse<T>> => {
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
}
