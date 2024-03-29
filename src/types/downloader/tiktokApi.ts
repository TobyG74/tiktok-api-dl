export type TiktokAPIResponse = {
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    description: string
    author: Author
    statistics: Statistics
    hashtag: string[]
    isADS: boolean
    cover?: string[]
    dynamicCover?: string[]
    originCover?: string[]
    video?: Video
    images?: string[]
    music: Music
  }
}

export type Author = {
  uid: number
  username: string
  nickname: string
  signature: string
  region: string
  avatarThumb: string[]
  avatarMedium: string[]
  url: string
}

export type Statistics = {
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

export type Video = {
  ratio: string
  duration: number
  playAddr: string[]
  downloadAddr: string[]
  cover: string[]
  dynamicCover: string[]
  originCover: string[]
}

export type Music = {
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

export type responseParser = {
  content?: any
  statistics?: Statistics
  author?: Author
  music?: Music
}
