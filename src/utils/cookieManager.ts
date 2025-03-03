import { ICookieManager } from "../types/cookieManager"

export class CookieManager implements ICookieManager {
  private cookieName: string

  constructor(cookieName: string) {
    this.cookieName = cookieName
  }

  public getCookie(): string | null {
    if (typeof window === "undefined") return null
    const cookies = document.cookie.split(";")
    const cookie = cookies.find((c) =>
      c.trim().startsWith(`${this.cookieName}=`)
    )
    if (!cookie) return null
    return decodeURIComponent(cookie.split("=")[1])
  }

  public setCookie(value: string): void {
    if (typeof window === "undefined") return
    const date = new Date()
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
    document.cookie = `${this.cookieName}=${encodeURIComponent(
      value
    )}; expires=${date.toUTCString()}; path=/`
  }

  public deleteCookie(): void {
    if (typeof window === "undefined") return
    document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  }
}
