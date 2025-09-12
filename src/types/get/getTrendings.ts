export type TiktokTrendingResponse = {
  status: "success" | "error"
  message?: string
  result?: TrendingData[]
}

export type TrendingData = {
  exploreList: TrendingItem[]
  pageState: PageState
}

export type TrendingItem = {
  cardItem: CardItem
}

export type CardItem = {
  id: string
  type: number
  cover: string
  title: string
  subTitle: string
  description: string
  link: string
  round: boolean
  playToken: string
  keyToken: string
  extraInfo: ExtraInfo
}

export type ExtraInfo = {
  verified: boolean
  fans: number
  likes: number
  userId: string
  secUid: string
  relation: number
  video: number
  following: number
  heart: number
  digg: number
}

export type PageState = {
  regionAppId: number
  os: string
  region: string
  baseURL: string
  appType: string
  fullUrl: string
}

export type TrendingCreator = {
  id: string
  username: string
  nickname: string
  avatarThumb: string
  description: string
  verified: boolean
  followerCount: number
  likeCount: number
  videoCount: number
  followingCount: number
  heartCount: number
  diggCount: number
  secUid: string
  link: string
}
