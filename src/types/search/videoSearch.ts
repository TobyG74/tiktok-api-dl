export type TiktokVideoSearchResponse = {
  status: "success" | "error"
  message?: string
  result?: VideoSearchResult[]
  page?: number
  totalResults?: number
}

export type VideoSearchResult = {
  id: string
  desc: string
  createTime: number
  author: AuthorVideoSearch
  stats: StatisticsVideoSearch
  video: VideoSearch
  music: MusicVideoSearch
}

export type VideoSearch = {
  id: string
  ratio: string
  cover: string
  originCover: string
  dynamicCover: string
  playAddr: string
  downloadAddr: string
  format: string
}

export type StatisticsVideoSearch = {
  collectCount: number
  commentCount: number
  likeCount: number
  playCount: number
  shareCount: number
}

export type AuthorVideoSearch = {
  id: string
  uniqueId: string
  nickname: string
  avatarThumb: string
  avatarMedium: string
  avatarLarger: string
  signature: string
  verified: boolean
  secUid: string
  openFavorite: boolean
  privateAccount: boolean
  isADVirtual: boolean
  tiktokSeller: boolean
  isEmbedBanned: boolean
}

export type MusicVideoSearch = {
  id: string
  title: string
  playUrl: string
  coverThumb: string
  coverMedium: string
  coverLarge: string
  authorName: string
  original: boolean
  album: string
  duration: number
  isCopyrighted: boolean
}
