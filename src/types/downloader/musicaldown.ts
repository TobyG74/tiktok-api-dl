export type getRequest = {
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

export type getMusic = {
  status: "success" | "error"
  result?: string
}
