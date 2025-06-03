import {
  StatisticsTiktokAPI,
  MusicTiktokAPI,
  VideoTiktokAPI
} from "../downloader/tiktokApiDownloader"
import { PlaylistAuthor } from "./getPlaylist"

export interface CollectionItem {
  id: string
  desc: string
  createTime: number
  author: PlaylistAuthor
  statistics: StatisticsTiktokAPI
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

export interface TiktokCollectionResponse {
  status: "success" | "error"
  message?: string
  result?: {
    hasMore: boolean
    itemList: CollectionItem[]
    extra?: {
      fatal_item_ids: string[]
      logid: string
      now: number
    }
  }
}
