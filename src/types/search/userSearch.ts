export type TiktokUserSearchResponse = {
  status: "success" | "error"
  message?: string
  result?: Result[]
}

export type Result = {
  uid: string
  username: string
  nickname: string
  signature: string
  avatarThumb: string
  followerCount: number
  isVerified: boolean
  secUid: string
  url: string
}
