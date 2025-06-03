import { BaseResponse } from "../common"

export type SSSTikFetchTT = BaseResponse & {
  result?: string
}

export type SSSTikResponse = BaseResponse & {
  result?: ResultContentSSSTik
}

export type ResultContentSSSTik = {
  type: "video" | "music" | "image"
  desc?: string
  author?: AuthorSSSTik
  statistics?: StatisticsSSSTik
  video?: {
    playAddr: string[]
  }
  music?: {
    playUrl: string[]
  }
  images?: string[]
  direct?: string
}

export type AuthorSSSTik = {
  avatar: string
  nickname: string
}

export type StatisticsSSSTik = {
  likeCount: string
  commentCount: string
  shareCount: string
}
