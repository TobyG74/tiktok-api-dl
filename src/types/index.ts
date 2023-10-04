export interface DLResult {
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    description: string
    author: Author
    statistics: Statistics
    video?: string[]
    cover?: string[]
    dynamic_cover?: string[]
    images?: string[]
    music: string[]
  }
}

export interface Author {
  uid: number
  username: string
  nickname: string
  signature: string
  birthday: string
  region: string
}

export interface Statistics {
  playCount: number
  downloadCount: number
  shareCount: number
  commentCount: number
  likeCount: number
  favoriteCount: number
}

export interface StalkResult {
  status: "success" | "error"
  message?: string
  result?: {
    users: Users
    stats: Stats
    posts: Post[]
  }
}

export interface Users {
  username: string
  nickname: string
  avatar: string
  signature: string
  verified: boolean
  region: string
}

export interface Stats {
  followerCount: number
  followingCount: number
  heartCount: number
  videoCount: number
  likeCount: number
}

export interface Post {
  id: string
  desc: string
  createTime: string
  scheduleTime: number
  video: Video
  author: string
  music: Music
  challenges?: any[]
  stats: PostStats
  warnInfo?: any[]
  originalItem: boolean
  officalItem: boolean
  textExtra?: any[]
  secret: boolean
  forFriend: boolean
  digged: boolean
  itemCommentStatus: number
  takeDown: number
  effectStickers?: any[]
  privateItem: boolean
  duetEnabled: boolean
  stitchEnabled: boolean
  stickersOnItem?: any[]
  shareEnabled: boolean
  comments?: any[]
  duetDisplay: number
  stitchDisplay: number
  indexEnabled: boolean
  locationCreated: string
  contents?: ContentsEntity[]
  collected: boolean
  channelTags?: any[]
  nickname: string
  authorId: string
  authorSecId: string
  avatarThumb: string
  downloadSetting: number
  authorPrivate: boolean
  capcutAnchorsOriginal?: any[]
  capcutAnchors?: any[]
}

export interface Video {
  id: string
  height: number
  width: number
  duration: number
  ratio: string
  cover: string
  originCover: string
  dynamicCover: string
  playAddr: string
  downloadAddr: string
  shareCover: string[]
  reflowCover: string
  bitrate: number
  encodedType: string
  format: string
  videoQuality: string
  encodeUserTag: string
  codecType: string
  definition: string
  subtitleInfos: string[]
  zoomCover: ZoomCover
  volumeInfo: VolumeInfo
  bitrateInfo: BitrateInfoEntity[]
}

export interface ZoomCover {
  [x: number]: string
}

export interface VolumeInfo {
  Loudness: number
  Peak: number
}

export interface BitrateInfoEntity {
  GearName: string
  Bitrate: number
  QualityType: number
  PlayAddr: PlayAddr
  CodecType: string
}

export interface PlayAddr {
  Uri: string
  UrlList: string[]
  DataSize: string
  UrlKey: string
  FileHash: string
  FileCs: string
}

export interface Music {
  id: string
  title: string
  playUrl: string
  coverLarge: string
  coverMedium: string
  coverThumb: string
  authorName: string
  original: boolean
  duration: number
  scheduleSearchTime: number
  collected: boolean
  preciseDuration: PreciseDuration
}

export interface PreciseDuration {
  preciseDuration: number
  preciseShootDuration: number
  preciseAuditionDuration: number
  preciseVideoDuration: number
}

export interface PostStats {
  diggCount: number
  shareCount: number
  commentCount: number
  playCount: number
  collectCount: string
}

export interface ContentsEntity {
  desc: string
  textExtra?: string[]
}
