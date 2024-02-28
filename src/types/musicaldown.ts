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
    author: {
      avatar?: string
      nickname: string
    }
    music?: string
    images?: string[]
    video1?: string
    video2?: string
    video_hd?: string
    video_watermark?: string
  }
}

export type getMusic = {
  status: "success" | "error"
  result?: string
}
