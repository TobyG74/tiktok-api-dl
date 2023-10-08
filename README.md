# Tiktok Downloader & Stalk User

- Can be used to download videos, images / slides and music from Tiktok
- Can be used to view someone's profile from Tiktok
- No login or password are required
- It is recommended to use your own cookies on Tiktok Stalker

# Table of Contents

- [Install](#install)
  - [From NPM](#from-npm)
  - [From Yarn](#from-yarn)
  - [From Github](#from-github)
- [Examples](#examples)
  - [Tiktok Downloader V1](#tiktok-downloader-v1)
  - [Tiktok Downloader V2](#tiktok-downloader-v2)
  - [Tiktok Stalker](#tiktok-stalker)
- [Response](#response)
  - [Tiktok Downloader](#tiktok-downloader-1)
  - [Tiktok Stalker](#tiktok-stalker-1)
- [Contributors](#contributors)

# Install

- @tobyg74/tiktok-api-dl requires Node.js v10+ to run.

## From NPM

```
npm install @tobyg74/tiktok-api-dl
```

## From YARN

```
yarn add @tobyg74/tiktok-api-dl
```

## From Github

```
npm install github:TobyG74/tiktok-api-dl
```

# Examples

## Tiktok Downloader

```js
const { TiktokDL } = require("@tobyg74/tiktok-api-dl")

const tiktok_url = "https://vt.tiktok.com/ZS84BnrU9"

TiktokDL(tiktok_url, {
  version: "v1" //  version: "v1" | "v2"
}).then((result) => {
  console.log(result)
})
```

## Tiktok Stalker

- Using Default Cookies

```js
const { TiktokStalk } = require("@tobyg74/tiktok-api-dl")

const username = "tobz2k19"

TiktokStalk(username).then((result) => {
  console.log(result)
})
```

- Using Your Cookies

```js
const { TiktokStalk } = require("@tobyg74/tiktok-api-dl")

const username = "tobz2k19"

TiktokStalk(username, {
  cookie: "YourCookie"
}).then((result) => {
  console.log(result)
})
```

# Response

## Tiktok Downloader V1

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    description: string
    duration?: string
    hashtag: string[]
    author: {
      uid: string
      username: string
      nickname: string
      signature: string
      region: string
      avatarLarger: string
      avatarThumb: string
      avatarMedium: string
      url: string
    }
    statistics: {
      playCount: number
      downloadCount: number
      shareCount: number
      commentCount: number
      likeCount: number
      favoriteCount: number
      forwardCount: number
      whatsappShareCount: number
      loseCount: number
      loseCommentCount: number
    }
    video?: string[]
    cover?: string[]
    dynamicCover?: string[]
    originCover: string[]
    images?: string[]
    music: {
      id: number
      title: string
      author: string
      album: string
      playUrl: string[]
      coverLarge: string[]
      coverMedium: string[]
      coverThumb: string[]
      duration: number
    }
  }
}
```

## Tiktok Downloader V2

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    description: string
    author: {
      nickname: string
      avatr: string
    }
    statistics: {
      likeCount: string
      commentCount: string
      shareCount: string
    }
    video?: string
    images?: string[]
    music: string
  }
}
```

## Tiktok Stalker

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

# Contributors

- [Nugraizy](https://github.com/nugraizy)
- [Aqul](https://github.com/zennn08)
