export type TiktokUserPostsResponse = {
  status: "success" | "error"
  message?: string
  result?: Posts[]
  totalPosts?: number
}

export type Posts = {
  id: string
  desc: string
  createTime: number
  digged: number
  duetEnabled: number
  forFriend: number
  officalItem: number
  originalItem: number
  privateItem: number
  shareEnabled: number
  stitchEnabled: number
  stats: StatsPost
  statsV2: StatsV2Post
  author: AuthorPost
  video?: VideoPost
  music: MusicPost
  imagePost?: string[]
}

export type StatsPost = {
  collectCount: number
  commentCount: number
  likeCount: number
  playCount: number
  shareCount: number
}

export type StatsV2Post = {
  collectCount: string
  commentCount: string
  diggCount: string
  playCount: string
  repostCount: string
  shareCount: string
}

export type AuthorPost = {
  id: string
  username: string
  nickname: string
  avatarLarger: string
  avatarThumb: string
  avatarMedium: string
  signature: string
  verified: boolean
  openFavorite: boolean
  privateAccount: boolean
  isADVirtual: boolean
  isEmbedBanned: boolean
}

export type VideoPost = {
  id: string
  duration: number
  ratio: string
  cover: string
  originCover: string
  dynamicCover: string
  playAddr: string
  downloadAddr: string
  format: string
  bitrate: number
}

export type MusicPost = {
  authorName: string
  coverLarge: string
  coverMedium: string
  coverThumb: string
  duration: number
  id: string
  title: string
  playUrl: string
  original: boolean
}
