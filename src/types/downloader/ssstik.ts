export type SSSTikFetchTT = {
  status: "success" | "error"
  message?: string
  result?: string
}

export type SSSTikResponse = {
  status: "success" | "error"
  message?: string
  result?: {
    type: "image" | "video"
    desc: string
    author: Author
    statistics: Statistics
    images?: string[]
    video?: string
    music: string
  }
}

export type Author = {
  avatar: string
  nickname: string
}

export type Statistics = {
  likeCount: string
  commentCount: string
  shareCount: string
}
