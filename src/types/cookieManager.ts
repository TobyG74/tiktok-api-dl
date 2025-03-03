export interface Cookie {
  name: string
  value: string
  domain?: string
  path?: string
  expires?: Date
  secure?: boolean
}

export interface ICookieManager {
  getCookie(): string | null
  setCookie(value: string): void
  deleteCookie(): void
}
