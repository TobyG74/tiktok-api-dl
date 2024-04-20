/** Tiktok */
export const _tiktokurl: string = "https://www.tiktok.com"
export const _tiktokapi = (params: any): string => `https://api.tiktokv.com/aweme/v1/feed/?${params}`
export const _tiktokSearchUserFull = (params: any): string => `${_tiktokurl}/api/search/user/full/?${params}`
export const _tiktokSearchVideoFull = (params: any): string => `${_tiktokurl}/api/search/item/full/?${params}`
export const _tiktokGetPosts = (params: any) => `${_tiktokurl}/api/post/item_list/?${params}`

/** SSSTik */
export const _ssstikurl: string = "https://ssstik.io"
export const _ssstikapi: string = `${_ssstikurl}/abc?url=dl`

/** Musicaldown */
export const _musicaldownurl: string = "https://musicaldown.com"
export const _musicaldownapi: string = `${_musicaldownurl}/download`
export const _musicaldownmusicapi: string = `${_musicaldownurl}/mp3/download`
