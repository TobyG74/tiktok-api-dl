export type TiktokUserFavoriteVideosResponse = {
  status: "success" | "error"
  message?: string
  result?: LikedResponse[]
  totalPosts?: number
}

export type LikedResponse = {
  id: string
  desc: string
  createTime: string
  duetEnabled: boolean
  digged: boolean
  forFriend: boolean
  isAd: boolean
  originalItem: boolean
  privateItem: boolean
  officialItem: boolean
  secret: boolean
  shareEnabled: boolean
  stitchEanbled: boolean
  textTranslatable: boolean
  author: AuthorLiked
  stats: StatisticsLiked
  video?: VideoLiked
  imagePost?: ImagesLiked[]
  music: MusicLiked
}

export type AuthorLiked = {
  id: string
  username: string
  nickname: string
  avatarLarger: string
  avatarThumb: string
  avatarMedium: string
  signature: string
  verified: string
  openFavorite: string
  privateAccount: string
  isADVirtual: string
  isEmbedBanned: string
  stats: StatisticsAuthorLiked
}

export type StatisticsAuthorLiked = {
  likeCount: string
  followerCount: string
  followingCount: string
  friendCount: string
  heartCount: string
  postsCount: string
}

export type StatisticsLiked = {
  collectCount: string
  commentCount: string
  diggCount: string
  playCount: string
  repostCount: string
  shareCount: string
}

export type ImagesLiked = {
  title: string
  images: string[]
}

export type VideoLiked = {
  id: string
  videoID: string
  duration: number
  ratio: string
  cover: string
  originCover: string
  dynamicCover: string
  playAddr: string
  downloadAddr: string
  format: string
  bitrate: number
  bitrateInfo: any[]
}

export type MusicLiked = {
  id: string
  title: string
  playUrl: string
  coverThumb: string
  coverMedium: string
  coverLarge: string
  authorName: string
  original: boolean
  album: string
  duration: number
  isCopyrighted: boolean
  private: boolean
}
