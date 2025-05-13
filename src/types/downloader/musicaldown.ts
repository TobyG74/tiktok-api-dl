import { BaseResponse, Content } from "../common"

export type GetMusicalDownReuqest = BaseResponse & {
  request?: {
    [key: string]: string
  }
  cookie?: string
}

export type MusicalDownResponse = BaseResponse & {
  result?: Content
}

export type GetMusicalDownMusic = BaseResponse & {
  result?: string
}
