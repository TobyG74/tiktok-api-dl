import fs from "fs"
import path from "path"

export class CookieManager {
  private cookieFile: string
  private cookieData: { [key: string]: string }

  constructor() {
    // Create cookies directory in user's home directory
    const homeDir = process.env.HOME || process.env.USERPROFILE
    const cookieDir = path.join(homeDir!, ".tiktok-api")

    if (!fs.existsSync(cookieDir)) {
      fs.mkdirSync(cookieDir, { recursive: true })
    }

    this.cookieFile = path.join(cookieDir, "cookies.json")
    this.cookieData = this.loadCookies()
  }

  private loadCookies(): { [key: string]: string } {
    try {
      if (fs.existsSync(this.cookieFile)) {
        const data = fs.readFileSync(this.cookieFile, "utf8")
        return JSON.parse(data)
      }
    } catch (error) {
      console.error("Error loading cookies:", error)
    }
    return {}
  }

  private saveCookies(): void {
    try {
      fs.writeFileSync(
        this.cookieFile,
        JSON.stringify(this.cookieData, null, 2)
      )
    } catch (error) {
      console.error("Error saving cookies:", error)
    }
  }

  public setCookie(value: string): void {
    this.cookieData["tiktok"] = value
    this.saveCookies()
  }

  public getCookie(): string | null {
    return this.cookieData["tiktok"] || null
  }

  public deleteCookie(): void {
    delete this.cookieData["tiktok"]
    this.saveCookies()
  }
}
