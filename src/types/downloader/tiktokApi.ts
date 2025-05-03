export type TiktokAPIResponse = {
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    description: string
    author: AuthorTiktokAPI
    statistics: StatisticsTiktokAPI
    hashtag: string[]
    isTurnOffComment: boolean
    isADS: boolean
    cover?: string[]
    dynamicCover?: string[]
    originCover?: string[]
    video?: VideoTiktokAPI
    images?: string[]
    music: MusicTiktokAPI
  }
  resultNotParsed?: any
}

export type AuthorTiktokAPI = {
  uid: number
  username: string
  nickname: string
  signature: string
  region: string
  avatarThumb: string[]
  avatarMedium: string[]
  url: string
}

export type StatisticsTiktokAPI = {
  playCount: number
  downloadCount: number
  shareCount: number
  commentCount: number
  diggCount: number
  collectCount: number
  forwardCount: number
  whatsappShareCount: number
  loseCount: number
  loseCommentCount: number
  repostCount: number
}

export type VideoTiktokAPI = {
  ratio: string
  duration: number
  playAddr: string[]
  downloadAddr: string[]
  cover: string[]
  dynamicCover: string[]
  originCover: string[]
}

export type MusicTiktokAPI = {
  id: number
  title: string
  author: string
  album: string
  playUrl: string[]
  coverLarge: string[]
  coverMedium: string[]
  coverThumb: string[]
  duration: number
  isCommerceMusic: boolean
  isOriginalSound: boolean
  isAuthorArtist: boolean
}

export type ResponseParserTiktokAPI = {
  content?: any
  statistics?: StatisticsTiktokAPI
  author?: AuthorTiktokAPI
  music?: MusicTiktokAPI
}
