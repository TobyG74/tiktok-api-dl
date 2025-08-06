export type TiktokStalkUserResponse = {
  status: "success" | "error"
  message?: string
  result?: {
    user: UserProfile
    stats: StatsUserProfile
    statsV2: StatsV2UserProfile
  }
}

export type UserProfile = {
  uid: string
  username: string
  nickname: string
  avatarLarger: string
  avatarThumb: string
  avatarMedium: string
  signature: string
  verified: boolean
  privateAccount: boolean
  region: string
  commerceUser: boolean
  usernameModifyTime: number
  nicknameModifyTime: number
  secUid: string
}

export type StatsUserProfile = {
  followerCount: number
  followingCount: number
  heartCount: number
  videoCount: number
  likeCount: number
  friendCount: number
}


export type StatsV2UserProfile = {
  followerCount: string
  followingCount: string
  heartCount: string
  videoCount: string
  likeCount: string
  friendCount: string
}

export type StatisticsUserProfile = {
  likeCount: number
  shareCount: number
  commentCount: number
  playCount: number
  favoriteCount: number
}

export type Video = {
  id: string
  duration: string
  ratio: string
  cover: string
  originCover: string
  dynamicCover: string
  playAddr: string
  downloadAddr: string
  format: string
  bitrate: number
}

export type Music = {
  id: string
  title: string
  album: string
  playUrl: string
  coverLarge: string
  coverMedium: string
  coverThumb: string
  authorName: string
  duration: string
}
