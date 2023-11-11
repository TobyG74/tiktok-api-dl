import { MusicalDown } from "./downloader_musicaldown"
import { SSSTik } from "./downloader_ssstik"
import { TiktokAPI } from "./downloader_tiktokApi"

/** Types */
import { MusicalDownResponse } from "../types/musicaldown"
import { SSSTikResponse } from "../types/ssstik"
import { TiktokAPIResponse } from "../types/tiktokApi"

export const TiktokDL = (url: string, options: { version: "v1" | "v2" | "v3" }): Promise<TiktokAPIResponse | SSSTikResponse | MusicalDownResponse> =>
  new Promise(async (resolve, reject) => {
    switch (options.version) {
      case "v1": {
        const response: TiktokAPIResponse = await TiktokAPI(url)
        resolve(response)
        break
      }
      case "v2": {
        const response: SSSTikResponse = await SSSTik(url)
        resolve(response)
        break
      }
      case "v3": {
        const response: MusicalDownResponse = await MusicalDown(url)
        resolve(response)
        break
      }
      default: {
        const response: TiktokAPIResponse = await TiktokAPI(url)
        resolve(response)
        break
      }
    }
  })
