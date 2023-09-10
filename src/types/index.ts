export interface DLResult {
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    description: string
    author: Author
    statistics: Statistics
    video?: string[]
    cover?: string[]
    dynamic_cover?: string[]
    images?: string[]
    music: string[]
  }
}

export interface Author {
  uid: number
  username: string
  nickname: string
  signature: string
  birthday: string
  region: string
}

export interface Statistics {
  playCount: number
  downloadCount: number
  shareCount: number
  commentCount: number
  likeCount: number
  favoriteCount: number
}

export interface StalkResult {
  status: "success" | "error"
  message?: string
  result?: {
    users: Users
    stats: Stats
  }
}

export interface Users {
  username: string
  nickname: string
  avatar: string
  signature: string
  verified: boolean
  region: string
}

export interface Stats {
  followerCount: number
  followingCount: number
  heartCount: number
  videoCount: number
  likeCount: number
}
