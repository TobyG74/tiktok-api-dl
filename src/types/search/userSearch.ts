export type TiktokUserSearchResponse = {
  status: "success" | "error"
  message?: string
  result?: Array<{
    uid: string
    username: string
    nickname: string
    signature: string
    followerCount: number
    avatarThumb: string
    isVerified: boolean
    secUid: string
    url: string
  }>
  page?: number
  totalResults?: number
}

export type UserSearchResult = {
  uid: string
  username: string
  nickname: string
  signature: string
  avatarThumb: string
  followerCount: number
  isVerified: boolean
  secUid: string
  url: string
}

export interface IUserSearch {
  saveSearch(searchTerm: string): void
  getLastSearch(): string | null
}
