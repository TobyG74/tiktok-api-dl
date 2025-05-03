export type GetMusicalDownReuqest = {
  status: "success" | "error"
  request?: {
    [key: string]: string
  }
  message?: string
  cookie?: string
}

export type MusicalDownResponse = {
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    desc?: string
    author?: {
      avatar?: string
      nickname?: string
    }
    music?: string
    images?: string[]
    videoHD?: string
    videoWatermark?: string
  }
}

export type GetMusicalDownMusic = {
  status: "success" | "error"
  result?: string
}
