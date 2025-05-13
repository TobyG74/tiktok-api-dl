import { BaseResponse, Content, Author, Statistics } from "../common"

export type SSSTikFetchTT = BaseResponse & {
  result?: string
}

export type SSSTikResponse = BaseResponse & {
  result?: Content
}

export type AuthorSSSTik = Author

export type StatisticsSSSTik = Statistics
