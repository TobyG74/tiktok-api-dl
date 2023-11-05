import { TiktokAPI, SSSTik, MusicalDown, TiktokStalk } from "../index"

export class Client {
  private cookie: string[]

  constructor() {
    this.cookie = []
  }

  public getCookie(): string {
    if (this.cookie.length === 0) throw new Error("Please login your account first!")
    return this.cookie[0]
  }

  public getAllCookie(): string[] {
    if (this.cookie.length === 0) throw new Error("Please login your account first!")
    return this.cookie
  }

  public setCookie(cookie: string) {
    this.cookie.push(cookie)
  }

  public deleteCookie(index: number) {
    this.cookie.splice(index - 1, 1)
  }

  public clearCookie() {
    this.cookie = []
  }

  public TiktokDL = (url: string, options: { version: "v1" | "v2" | "v3" }) =>
    new Promise(async (resolve, reject) => {
      switch (options.version) {
        case "v1": {
          await TiktokAPI(url).then(resolve).catch(reject)
        }
        case "v2": {
          await SSSTik(url).then(resolve).catch(reject)
        }
        case "v3": {
          await MusicalDown(url).then(resolve).catch(reject)
        }
        default: {
          await TiktokAPI(url).then(resolve).catch(reject)
        }
      }
    })

  public TiktokStalk = (username: string) =>
    new Promise(async (resolve, reject) => {
      const cookie = this.getCookie()
      await TiktokStalk(username, { cookie: cookie }).then(resolve).catch(reject)
    })
}
