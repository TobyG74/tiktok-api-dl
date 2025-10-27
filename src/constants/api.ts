/** Tiktok */
export const _tiktokDesktopUrl: string = "https://www.tiktok.com"
export const _tiktokMobileUrl: string = "https://m.tiktok.com"
export const _tiktokSearchUserFull = (params: any): string =>
  `${_tiktokDesktopUrl}/api/search/user/full/?${params}`
export const _tiktokSearchVideoFull = (params: any): string =>
  `${_tiktokDesktopUrl}/api/search/item/full/?${params}`
export const _tiktokSearchLiveFull = (params: any): string =>
  `${_tiktokDesktopUrl}/api/search/live/full/?${params}`
export const _tiktokGetPosts = (params: any): string =>
  `${_tiktokDesktopUrl}/api/post/item_list/?${params}`
export const _tiktokGetReposts = (params: any): string =>
  `${_tiktokDesktopUrl}/api/repost/item_list/?${params}`
export const _tiktokGetComments = (params: any): string =>
  `${_tiktokDesktopUrl}/api/comment/list/?${params}`
export const _tiktokGetUserLiked = (params: any): string =>
  `${_tiktokDesktopUrl}/api/favorite/item_list/?${params}`
export const _tiktokGetCollection = (params: any): string =>
  `${_tiktokDesktopUrl}/api/collection/item_list/?${params}`
export const _tiktokGetPlaylist = (params: any): string =>
  `${_tiktokDesktopUrl}/api/mix/item_list/?${params}`
export const _tiktokGetHashtag = (params: any): string =>
  `${_tiktokDesktopUrl}/api/challenge/item_list/?${params}`
export const _tiktokGetMusic = (params: any): string =>
  `${_tiktokDesktopUrl}/api/music/item_list/?${params}`
export const _tiktokGetMusicDetail = (): string =>
  `${_tiktokMobileUrl}/api/music/detail/`
export const _tiktokTrendings = (params: any): string =>
  `${_tiktokDesktopUrl}/node/share/discover?${params}`

/** Tiktokv */
export const _tiktokvApi: string = `https://api16-normal-useast5.tiktokv.us`
export const _tiktokvFeed = (params: any): string =>
  `${_tiktokvApi}/aweme/v1/feed/?${params}`

/** SSSTik */
export const _ssstikurl: string = "https://ssstik.io"
export const _ssstikapi: string = `${_ssstikurl}/abc?url=dl`

/** Musicaldown */
export const _musicaldownurl: string = "https://musicaldown.com"
export const _musicaldownapi: string = `${_musicaldownurl}/download`
export const _musicaldownmusicapi: string = `${_musicaldownurl}/mp3/download`
