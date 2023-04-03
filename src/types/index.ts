export type DLResult = {
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    create_time: number
    description: string
    author: {
      username: string
      nickname: string
      signature: string
      birthday: string
      region: string
    }
    statistics: {
      play_count: number
      download_count: number
      share_count: number
      comment_count: number
      like_count: number
      favourite_count: number
    }
    video?: string[]
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
