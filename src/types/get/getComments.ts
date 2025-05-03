export type TiktokVideoCommentsResponse = {
  status: "success" | "error"
  message?: string
  result?: Comments[]
  totalComments?: number
}

export type Comments = {
  cid: string
  text: string
  commentLanguage: string
  createTime: number
  likeCount: number
  isAuthorLiked: boolean
  isCommentTranslatable: boolean
  replyCommentTotal: number
  replyComment: Comments[] | null
  user: User
  url: string
}

export type User = {
  uid: string
  avatarThumb: string[]
  nickname: string
  username: string
  isVerified: boolean
}
