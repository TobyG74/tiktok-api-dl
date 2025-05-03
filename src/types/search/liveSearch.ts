export type TiktokLiveSearchResponse = {
  status: "success" | "error"
  message?: string
  result?: LiveSearchResult[]
  page?: number
  totalResults?: number
}

export type LiveSearchResult = {
  roomInfo: RoomInfo
  liveInfo: LiveInfo
}

export type RoomInfo = {
  hasCommerceGoods: boolean
  isBattle: boolean
}

export type LiveInfo = {
  id: string
  title: string
  cover: string[]
  squareCover: string[]
  rectangleCover: string[]
  liveTypeThirdParty: boolean
  hashtag: string
  startTime: number
  stats: Stats
  owner: Owner
}

export type Stats = {
  totalUser: number
  viewerCount: number
  likeCount: number
}

export type Owner = {
  uid: string
  nickname: string
  username: string
  signature: string
  avatarThumb: string[]
  avatarMedium: string[]
  avatarLarge: string[]
  modifyTime: number
  stats: OwnerStats
  isVerified: boolean
}

export type OwnerStats = {
  followingCount: number
  followerCount: number
}
