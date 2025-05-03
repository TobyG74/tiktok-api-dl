export type SSSTikFetchTT = {
  status: "success" | "error"
  message?: string
  result?: string
}

export type SSSTikResponse = {
  status: "success" | "error"
  message?: string
  result?: {
    type: "image" | "video" | "music"
    desc?: string
    author?: AuthorSSSTik
    statistics?: StatisticsSSSTik
    images?: string[]
    video?: string
    music?: string
    direct?: string
  }
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
