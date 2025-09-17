export type TiktokMusicVideosResponse = {
  status: "success" | "error"
  message?: string
  result?: {
    music?: MusicInfo
    videos?: MusicVideo[]
    totalVideos?: number
  }
}

export type MusicInfo = {
  id: string
  title: string
  authorName: string
  author?: string
  duration?: number
  original?: boolean
  playUrl?: string[]
  coverThumb?: string
  coverLarge?: string
  coverMedium?: string
}

export type MusicVideo = {
  id: string
  desc?: string
  createTime: number
  digged?: boolean
  duetEnabled?: boolean
  forFriend?: boolean
  officalItem?: boolean
  originalItem?: boolean
  privateItem?: boolean
  shareEnabled?: boolean
  stitchEnabled?: boolean
  stats: MusicVideoStats
  author: MusicVideoAuthor
  video?: MusicVideoDetails
  music: MusicVideoMusic
  imagePost?: string[]
  effectStickers?: EffectSticker[]
}

export type MusicVideoStats = {
  collectCount?: number
  commentCount: number
  diggCount: number
  playCount: number
  shareCount: number
}

export type MusicVideoAuthor = {
  id: string
  uniqueId: string
  nickname: string
  avatarLarger?: string
  avatarThumb?: string
  avatarMedium?: string
  signature?: string
  verified?: boolean
  openFavorite?: boolean
  privateAccount?: boolean
  isADVirtual?: boolean
  isEmbedBanned?: boolean
}

export type MusicVideoDetails = {
  id: string
  duration: number
  ratio?: string
  cover?: string
  originCover?: string
  dynamicCover?: string
  playAddr?: string
  downloadAddr?: string
  format?: string
  bitrate?: number
}

export type MusicVideoMusic = {
  id: string
  title: string
  authorName: string
  duration: number
  playUrl?: string[]
  coverLarge?: string
  coverMedium?: string
  coverThumb?: string
  original?: boolean
}

export type EffectSticker = {
  id: string
  name: string
  type?: number
}

export type MusicStats = {
  videoCount?: number
  viewCount?: number
}
