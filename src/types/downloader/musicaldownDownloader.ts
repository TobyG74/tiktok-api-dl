import { BaseResponse } from "../common"

export type GetMusicalDownReuqest = BaseResponse & {
  request?: {
    [key: string]: string
  }
  cookie?: string
}

export type MusicalDownResponse = BaseResponse & {
  result?: ContentMusicalDown
}

export type ContentMusicalDown = {
  type: "video" | "image"
  author?: AuthorMusicalDown
  desc?: string
  images?: string[]
  videoHD?: string
  videoSD?: string
  videoWatermark?: string
  music?: string
}

export type AuthorMusicalDown = {
  avatar: string
  nickname: string
}

export type GetMusicalDownMusic = BaseResponse & {
  result?: string
}
