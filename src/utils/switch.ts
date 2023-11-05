import { MusicalDownResponse } from "../types/musicaldown"
import { SSSTikResponse } from "../types/ssstik"
import { TiktokAPIResponse } from "../types/tiktokApi"
import { MusicalDown } from "./downloader_musicaldown"
import { SSSTik } from "./downloader_ssstik"
import { TiktokAPI } from "./downloader_tiktokApi"

export const TiktokDL = (url: string, options: { version: "v1" | "v2" | "v3" }) =>
  new Promise<TiktokAPIResponse | SSSTikResponse | MusicalDownResponse>(async (resolve, reject) => {
    switch (options.version) {
      case "v1": {
        await TiktokAPI(url).then(resolve).catch(reject)
      }
      case "v2": {
        await SSSTik(url).then(resolve).catch(reject)
      }
      case "v3": {
        await MusicalDown(url).then(resolve).catch(reject)
      }
      default: {
        await TiktokAPI(url).then(resolve).catch(reject)
      }
    }
  })
