import { VideoSearchResult } from "./videoSearch"
import { LiveSearchResult } from "./liveSearch"
import { UserSearchResult } from "./userSearch"

export type SearchType = "video" | "live" | "user"

export type SearchResult = {
  type: SearchType
  data: VideoSearchResult | LiveSearchResult | UserSearchResult
}

export type TiktokSearchResponse = {
  status: "success" | "error"
  message?: string
  result?: SearchResult[]
  page?: number
  totalResults?: number
}
