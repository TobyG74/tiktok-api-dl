export interface MusicAuthor {
  id: string
  nickname: string
  uniqueId: string
  signature: string
  avatarThumb: string
  avatarMedium: string
  avatarLarger: string
  secUid: string
  privateAccount: boolean
  ftc: boolean
  relation: number
  openFavorite: boolean
  secret: boolean
}

export interface Music {
  id: string
  title: string
  authorName: string
  original: boolean
  playUrl: string
  coverLarge: string
  coverMedium: string
  coverThumb: string
  duration: number
  private: boolean
  isCopyrighted: boolean
}

export interface MusicStats {
  videoCount: number
}

export interface MusicInfo {
  author?: MusicAuthor
  artist?: MusicAuthor
  music: Music
  stats: MusicStats
}

export interface ShareMeta {
  title: string
  desc: string
}

export interface TiktokMusicDetailResponse {
  status: "success" | "error"
  message?: string
  result?: {
    musicInfo: MusicInfo
    shareMeta: ShareMeta
  }
}
