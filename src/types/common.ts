/** Common Types */
export type ResponseStatus = "success" | "error"

export type BaseResponse = {
  status: ResponseStatus
  message?: string
}

export type ContentType = "video" | "image" | "music"

export type Author = {
  avatar?: string
  nickname?: string
  signature?: string
  region?: string
  url?: string
}

export type Statistics = {
  likeCount?: string | number
  commentCount?: string | number
  shareCount?: string | number
  playCount?: number
  downloadCount?: number
}

export type Video = {
  ratio?: string
  duration?: number
  playAddr?: string[]
  downloadAddr?: string[]
  cover?: string[]
  dynamicCover?: string[]
  originCover?: string[]
}

export type Music = {
  id?: number
  title?: string
  author?: string
  album?: string
  playUrl?: string[]
  coverLarge?: string[]
  coverMedium?: string[]
  coverThumb?: string[]
  duration?: number
  isCommerceMusic?: boolean
  isOriginalSound?: boolean
  isAuthorArtist?: boolean
}

export type Content = {
  type: ContentType
  id?: string
  createTime?: number
  desc?: string
  author?: Author
  statistics?: Statistics
  hashtag?: string[]
  isTurnOffComment?: boolean
  isADS?: boolean
  video?: Video
  images?: string[]
  music?: Music
  videoHD?: string
  videoSD?: string
  videoWatermark?: string
  direct?: string
}

export type BaseContentResponse = BaseResponse & {
  result?: Content
  resultNotParsed?: any
}
