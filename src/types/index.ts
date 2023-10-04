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
  challenges?: ChallengesEntity[]
  stats: PostStats
  warnInfo?: null[]
  originalItem: boolean
  officalItem: boolean
  textExtra?: TextExtraEntity[]
  secret: boolean
  forFriend: boolean
  digged: boolean
  itemCommentStatus: number
  takeDown: number
  effectStickers?: null[]
  privateItem: boolean
  duetEnabled: boolean
  stitchEnabled: boolean
  stickersOnItem?: null[]
  shareEnabled: boolean
  comments?: null[]
  duetDisplay: number
  stitchDisplay: number
  indexEnabled: boolean
  locationCreated: string
  contents?: ContentsEntity[]
  collected: boolean
  channelTags?: null[]
  nickname: string
  authorId: string
  authorSecId: string
  avatarThumb: string
  downloadSetting: number
  authorPrivate: boolean
  capcutAnchorsOriginal?: null[]
  capcutAnchors?: null[]
  contentLocation?: ContentLocation
  poi?: Poi
  videoSuggestWordsList?: VideoSuggestWordsList
  imagePost?: ImagePost
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
  shareCover?: string[]
  reflowCover: string
  bitrate?: number
  encodedType?: string
  format?: string
  videoQuality?: string
  encodeUserTag?: string
  codecType?: string
  definition?: string
  subtitleInfos?: SubtitleInfosEntity[]
  zoomCover: ZoomCover
  volumeInfo?: VolumeInfo
  bitrateInfo?: BitrateInfoEntity[]
}

export interface SubtitleInfosEntity {
  LanguageID: string
  LanguageCodeName: string
  Url: string
  UrlExpire: string
  Format: string
  Version: string
  Source: string
  Size: string
}

export interface ZoomCover {
  240: string
  480: string
  720: string
  960: string
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
  UrlList?: string[]
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
  album?: string
}

export interface PreciseDuration {
  preciseDuration: number
  preciseShootDuration?: number
  preciseAuditionDuration?: number
  preciseVideoDuration?: number
}

export interface ChallengesEntity {
  id: string
  title: string
  desc: string
  profileLarger: string
  profileMedium: string
  profileThumb: string
  coverLarger: string
  coverMedium: string
  coverThumb: string
  isCommerce?: boolean
}

export interface PostStats {
  diggCount: number
  shareCount: number
  commentCount: number
  playCount: number
  collectCount: string
}

export interface TextExtraEntity {
  awemeId: string
  start: number
  end: number
  hashtagName: string
  type: number
  subType: number
  userId?: string
  isCommerce: boolean
  userUniqueId?: string
  secUid?: string
}

export interface ContentsEntity {
  desc: string
  textExtra?: TextExtraEntity1[]
}

export interface TextExtraEntity1 {
  awemeId: string
  start: number
  end: number
  hashtagName: string
  type: number
  subType: number
  userId?: string
  isCommerce: boolean
  userUniqueId?: string
  secUid?: string
}

export interface ContentLocation {
  address: Address
}

export interface Address {
  addressCountry: string
  addressLocality: string
  addressRegion: string
  streetAddress: string
}

export interface Poi {
  name: string
  address: string
  city: string
  province: string
  country: string
  id: string
  fatherPoiName: string
  type?: null
  cityCode: string
  countryCode: string
  ttTypeCode: string
  typeCode: string
  ttTypeNameTiny: string
  ttTypeNameMedium: string
  ttTypeNameSuper: string
}

export interface VideoSuggestWordsList {
  video_suggest_words_struct?: VideoSuggestWordsStructEntity[]
}

export interface VideoSuggestWordsStructEntity {
  words?: WordsEntity[]
  scene: string
  hint_text: string
}

export interface WordsEntity {
  word: string
  word_id: string
}

export interface ImagePost {
  images?: ImagesEntityOrCoverOrShareCover[]
  cover: ImagesEntityOrCoverOrShareCover
  shareCover: ImagesEntityOrCoverOrShareCover
  title: string
}

export interface ImagesEntityOrCoverOrShareCover {
  imageURL: ImageURL
  imageWidth: number
  imageHeight: number
}

export interface ImageURL {
  urlList?: string[]
}
