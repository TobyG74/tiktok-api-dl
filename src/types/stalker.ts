export type StalkResult = {
  status: "success" | "error"
  message?: string
  result?: {
    users: Users
    stats: Stats
    // posts: Posts[]
  }
}

export type Users = {
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
}

export type Stats = {
  followerCount: number
  followingCount: number
  heartCount: number
  videoCount: number
  likeCount: number
  friendCount: number
}

export type Statistics = {
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
