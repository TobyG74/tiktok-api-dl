export type StalkResult = {
  status: "success" | "error"
  message?: string
  result?: {
    users: Users
    stats: Stats
    posts: Posts[]
  }
  totalPosts?: number
}

export type Users = {
  uid: string
  username: string
  nickname: string
  avatarLarger: string
  avatarThumb: string
  avatarMedium: string
  signature: string
  verified: boolean
  privateAccount: boolean
  region: string
  commerceUser: boolean
  usernameModifyTime: number
  nicknameModifyTime: number
}

export type Stats = {
  followerCount: number
  followingCount: number
  heartCount: number
  videoCount: number
  likeCount: number
  friendCount: number
  postCount: number
}

export type Statistics = {
  likeCount: number
  shareCount: number
  commentCount: number
  playCount: number
  favoriteCount: number
}

export type Video = {
  id: string
  duration: string
  ratio: string
  cover: string
  originCover: string
  dynamicCover: string
  playAddr: string
  downloadAddr: string
  format: string
  bitrate: number
}

export type Music = {
  id: string
  title: string
  album: string
  playUrl: string
  coverLarge: string
  coverMedium: string
  coverThumb: string
  authorName: string
  duration: string
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
  author: AuthorPost
  video?: VideoPost
  music: MusicPost
  images?: string[]
}

export type StatsPost = {
  collectCount: number
  commentCount: number
  diggCount: number
  playCount: number
  shareCount: number
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
