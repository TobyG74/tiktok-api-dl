import {
  AuthorTiktokAPI,
  MusicTiktokAPI,
  VideoTiktokAPI
} from "../downloader/tiktokApiDownloader"

export interface PlaylistAuthor
  extends Omit<AuthorTiktokAPI, "username" | "uid"> {
  avatarLarger: string
  nickname: string
  id: string
}

interface Statistics {
  collectCount: number
  commentCount: number
  diggCount: number
  playCount: number
  shareCount: number
}

export interface PlaylistItem {
  id: string
  desc: string
  createTime: number
  author: PlaylistAuthor
  stats: Statistics
  video: VideoTiktokAPI
  music: MusicTiktokAPI
  challenges: Array<{
    id: string
    title: string
    desc: string
    coverLarger: string
    coverMedium: string
    coverThumb: string
    profileLarger: string
    profileMedium: string
    profileThumb: string
  }>
  collected: boolean
  digged: boolean
  duetDisplay: number
  forFriend: boolean
  officalItem: boolean
  originalItem: boolean
  privateItem: boolean
  shareEnabled: boolean
  stitchDisplay: number
  textExtra: Array<{
    awemeId: string
    end: number
    hashtagName: string
    isCommerce: boolean
    start: number
    subType: number
    type: number
  }>
}

export interface TiktokPlaylistResponse {
  status: "success" | "error"
  message?: string
  result?: {
    hasMore: boolean
    itemList: PlaylistItem[]
    extra?: {
      fatal_item_ids: string[]
      logid: string
      now: number
    }
  }
}
