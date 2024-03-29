/** Tiktok */
export const _tiktokurl: string = "https://www.tiktok.com"
export const _tiktokapi = (params: any): string => `https://api.tiktokv.com/aweme/v1/feed/?${params}`
export const _tiktokSearchUserFull = (params: any): string => _tiktokurl + `/api/search/user/full/?${params}`
export const _tiktokSearchVideoFull = (params: any): string => _tiktokurl + `/api/search/item/full/?${params}`

/** SSSTik */
export const _ssstikapi: string = "https://ssstik.io/abc?url=dl"
export const _ssstikurl: string = "https://ssstik.io"

/** Musicaldown */
export const _musicaldownapi: string = "https://musicaldown.com/download"
export const _musicaldownurl: string = "https://musicaldown.com"
export const _musicaldownmusicapi: string = "https://musicaldown.com/mp3/download"
