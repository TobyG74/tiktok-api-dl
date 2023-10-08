import { TiktokDownload } from "./tiktokdownload"
import { TiktokAPI } from "./tiktokapi"

export const TiktokDL = (url: string, options: { version: "v1" | "v2" }) =>
  new Promise(async (resolve, reject) => {
    switch (options.version) {
      case "v1": {
        await TiktokAPI(url).then(resolve).catch(reject)
      }
      case "v2": {
        await TiktokDownload(url).then(resolve).catch(reject)
      }
      default: {
        await TiktokAPI(url).then(resolve).catch(reject)
      }
    }
  })
