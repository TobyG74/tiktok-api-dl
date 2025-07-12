export type TiktokUserRepostsResponse = {
  status: "success" | "error"
  message?: string
  result?: Reposts[]
  totalReposts?: number
}

export type Reposts = {
  id: string
  desc: string
  createTime: number
  digged: boolean
  duetEnabled?: boolean
  forFriend: boolean
  officalItem: boolean
  originalItem: boolean
  privateItem: boolean
  secret: boolean
  shareEnabled: boolean
  stitchEnabled?: boolean
  stats: StatsRepost
  author: AuthorRepost
  video?: VideoRepost
  music: MusicRepost
  imagePost?: ImageRepost
  AIGCDescription?: string
  CategoryType?: number
  collected?: boolean
  contents?: any[]
  challenges?: any[]
  textExtra?: any[]
  textLanguage?: string
  textTranslatable?: boolean
  titleLanguage?: string
  titleTranslatable?: boolean
  isAd?: boolean
  isReviewing?: boolean
  itemCommentStatus?: number
  item_control?: ItemControl
  duetDisplay?: number
  stitchDisplay?: number
  diversificationId?: number
  backendSourceEventTracking?: string
  stickersOnItem?: any[]
  videoSuggestWordsList?: any
}

export type StatsRepost = {
  shareCount: number
  collectCount?: number
  commentCount?: number
  likeCount?: number
  playCount?: number
  repostCount?: number
}

export type AuthorRepost = {
  id: string
  username: string
  nickname: string
  avatarLarger: string
  avatarThumb: string
  avatarMedium: string
  signature: string
  verified: boolean
  openFavorite?: boolean
  privateAccount?: boolean
  isADVirtual?: boolean
  isEmbedBanned?: boolean
}

export type VideoRepost = {
  id: string
  duration: number
  ratio: string
  cover: string
  originCover: string
  dynamicCover: string
  playAddr: string
  downloadAddr: string
  format: string
  bitrate: number
}

export type MusicRepost = {
  authorName?: string
  coverLarge?: string
  coverMedium?: string
  coverThumb?: string
  duration?: number
  id?: string
  title?: string
  playUrl?: string
  original?: boolean
  tt2dsp?: any
}

export type ImageRepost = {
  title: string
  images?: ImageRepostItem[]
}

export type ImageRepostItem = {
  imageURL: {
    urlList: string[]
  }
}

export type ItemControl = {
  can_repost?: boolean
  can_share?: boolean
}
