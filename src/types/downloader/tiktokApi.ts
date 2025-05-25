import {
  BaseContentResponse,
  Content,
  Author,
  Statistics,
  Video,
  Music
} from "../common"

export type TiktokAPIResponse = BaseContentResponse

export type AuthorTiktokAPI = Author & {
  uid: string
  username: string
  uniqueId: string
  avatarThumb: string
  avatarMedium: string
  url: string
}

export type StatisticsTiktokAPI = Statistics

export type VideoTiktokAPI = Video

export type MusicTiktokAPI = Music

export type ResultTiktokAPI = Content

export type ResponseParserTiktokAPI = {
  content?: any
  statistics?: StatisticsTiktokAPI
  author?: AuthorTiktokAPI
  music?: MusicTiktokAPI
}

export type TiktokCollectionResponse = {
  status: "success" | "error"
  message?: string
  result?: {
    itemList: Array<{
      id: string
      desc: string
      createTime: number
      author: AuthorTiktokAPI
      statistics: StatisticsTiktokAPI
      video: VideoTiktokAPI
      textExtra: Array<{
        hashtagName?: string
      }>
    }>
    hasMore: boolean
  }
}
