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
  avatarThumb: string
  avatarMedium: string
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
