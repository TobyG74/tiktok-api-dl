# Tiktok Downloader

- Used to download videos, images, music from TikTok
- No login or password are required

## Installation

- @tobyg74/tiktok-api-dl requires Node.js v10+ to run.

### Install from NPM

```
npm install @tobyg74/tiktok-api-dl
```

### Install from YARN

```
yarn add @tobyg74/tiktok-api-dl
```

## Usage

### Tiktok Downloader

```js
const { TiktokDL } = require("@tobyg74/tiktok-api-dl")

const tiktok_url = "https://vt.tiktok.com/ZS84BnrU9"

TiktokDL(tiktok_url).then((result) => {
  console.log(result)
})
```

### Tiktok Profile

```js
const { TiktokStalk } = require("@tobyg74/tiktok-api-dl")

const username = "tobz2k19"

TiktokStalk(username).then((result) => {
  console.log(result)
})
```

## Response

### Tiktok Downloader

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    description: string
    author: {
      username: string
      nickname: string
      signature: string
      birthday: string
      region: string
    }
    statistics: {
      playCount: number
      downloadCount: number
      shareCount: number
      commentCount: number
      likeCount: number
      favoriteCount: number
    }
    video?: string[]
    cover?: string[]
    dynamic_cover?: string[]
    images?: string[]
    music: string[]
  }
}
```

### Tiktok Profile

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    users: {
      username: string
      nickname: string
      avatar: string
      signature: string
      verified: boolean
      region: string
    }
    stats: {
      followerCount: number
      followingCount: number
      heartCount: number
      videoCount: number
      likeCount: number
    }
  }
}
```

### Collaborators

- [Nugraizy](https://github.com/nugraizy)
- [Aqul](https://github.om/zennn08)
