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
  avatarLarger: string
  avatarThumb: string
  avatarMedium: string
  signature: string
  verified: boolean
  region: string
  commerceUser: boolean
  usernameModifyTime: number
  nicknameModifyTime: number
}

export interface Stats {
  followerCount: number
  followingCount: number
  heartCount: number
  videoCount: number
  likeCount: number
  friendCount: number
}
