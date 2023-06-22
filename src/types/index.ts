export type DLResult = {
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    description: string
    author: {
      username: string
      nickname: string
      signature: string
      birthday: string
      region: string
    }
    statistics: {
      playCount: number
      downloadCount: number
      shareCount: number
      commentCount: number
      likeCount: number
      favoriteCount: number
    }
    video?: string[]
    cover?: string[]
    dynamic_cover?: string[]
    images?: string[]
    music: string[]
  }
}

export type StalkResult = {
  status: "success" | "error"
  message?: string
  result?: {
    users: {
      username: string
      nickname: string
      avatar: string
      signature: string
      verified: boolean
      region: string
    }
    stats: {
      followerCount: number
      followingCount: number
      heartCount: number
      videoCount: number
      likeCount: number
    }
  }
}
