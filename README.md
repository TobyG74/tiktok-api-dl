<h1 align="center">
 Tiktok Downloader & Stalk User
</h1>

<div align="center">
  <a href="https://github.com/TobyG74/tiktok-api-dl/graphs/contributors" title="contributors">
    <img src="https://img.shields.io/github/contributors/TobyG74/tiktok-api-dl.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/TobyG74/tiktok-api-dl/network/members" title="forks">
    <img src="https://img.shields.io/github/forks/TobyG74/tiktok-api-dl.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/TobyG74/tiktok-api-dl/issues" title="issues">
    <img src="https://img.shields.io/github/issues/TobyG74/tiktok-api-dl.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/TobyG74/tiktok-api-dl/stargazers" title="stargazer">
    <img src="https://img.shields.io/github/stars/TobyG74/tiktok-api-dl.svg?style=for-the-badge">
  </a>

</div>
<br>
<div align="center">
  <a href="https://nodei.co/npm/@tobyg74/tiktok-api-dl" title="npm">
    <img src="https://nodei.co/npm/@tobyg74/tiktok-api-dl.png?downloads=true&downloadRank=true&stars=true">
  </a>
</div>

<br>

# Table of Contents

- [Description](#description)
- [How to get Tiktok Cookie](#how-to-get-tiktok-cookie)
- [Build this project](#build-this-project)
- [Install](#install)
  - [From NPM](#from-npm)
  - [From Yarn](#from-yarn)
  - [From Github](#from-github)
- [Examples](#examples)
  - [Tiktok Downloader](#tiktok-downloader)
  - [Tiktok Search](#tiktok-search)
  - [Tiktok Stalker](#tiktok-stalker)
- [Response](#response)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

# Description

This project uses the Unofficial API from Tiktok.

- Can be used to download videos, images / slides and music from Tiktok
- Can be used to view someone's profile from Tiktok
- No login or password are required
- It is recommended to use your own cookies on Tiktok Stalker

# How to get Tiktok Cookie

You can use cookies in the form of String or JSON

1. Download Extension [Cookie-Editor](https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm)
2. Login to the [Tiktok Website](https://tiktok/.com)
3. Open the Cookie-Editor Extension
4. Copy the Cookie and paste it into the code `COOKIE: "YOUR_COOKIE"`

# Build this project

- Clone the repository
- Install the dependencies
- Run the build script

```bash
git clone https://github.com/TobyG74/tiktok-api-dl.git
cd tiktok-api-dl
npm install
npm run build
```

# Install

- This module requires Node.js v10+ to run.

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

## Tiktok Downloader By URL

- V1 uses the API from TiktokAPI
  - Support Video, Images / Slide, Music
- V2 uses the API from [SSSTik](https://ssstik.io/)
- V3 uses the API from [MusicalDown](https://musicaldown.com/)

### Options

- `version` : The version of the downloader you want to use
  - `v1` : TiktokAPI
  - `v2` : SSSTik
  - `v3` : MusicalDown
- `proxy` : Proxy for request
- `showOriginalResponse` : Show original response from API && Only for V1

```js
const Tiktok = require("@tobyg74/tiktok-api-dl")

const tiktok_url = "https://vt.tiktok.com/xxxxxxxx"

Tiktok.Downloader(tiktok_url, {
  version: "v1", //  version: "v1" | "v2" | "v3"
  proxy: "YOUR_PROXY" // Support Proxy Http, Https, Socks5
  showOriginalResponse: true // Only for V1
}).then((result) => {
  console.log(result)
})
```

## Tiktok Search

Note : Cookies are required for searching users or live

### Options

- `type` : The type of search you want to use
  - `user` : Search User
  - `live` : Search Live
- `page` : The page you want to search
- `cookie` : Your Tiktok Cookie
- `proxy` : Proxy for request

### Search User | Live

```js
const Tiktok = require("@tobyg74/tiktok-api-dl")

const username = "tobz2k19"

Tiktok.Search(username, {
  type: "user" || "live",
  page: 1,
  cookie: process.env.COOKIE || "Your Cookie",
  proxy: "YOUR_PROXY" // Support Proxy Http, Https, Socks5
}).then((result) => {
  console.log(result)
})
```

## Tiktok Get Profile By Username

### Options

- `cookie` : Only needed if you want to get all user posts
- `postLimit` : Limit the number of posts to display
- `proxy` : Proxy for request

```js
const Tiktok = require("@tobyg74/tiktok-api-dl")

const username = "tobz2k19"

Tiktok.StalkUser(username, {
  cookie: process.env.COOKIE || "Your Cookie"
  postLimit: 10, // Limit the number of posts to display
  proxy: "YOUR_PROXY" // Support Proxy Http, Https, Socks5
}).then((result) => {
  console.log(result)
})
```

## Tiktok Get Comments From Video

### Options

- `postLimit` : Limit the number of posts to display
- `proxy` : Proxy for request

```js
const Tiktok = require("@tobyg74/tiktok-api-dl")

const url = "https://vt.tiktok.com/xxxxxxxx"

Tiktok.GetComments(url, {
  commentLimit: 20, // Limit the number of comments to display
  proxy: "YOUR_PROXY" // Support Proxy Http, Https, Socks5
}).then((result) => {
  console.log(result)
})
```

## Response

<br>
<details>
  <summary><b>Tiktok Downloader V1</b></summary>
  <br>

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    description: string
    isTurnOffComment: boolean
    isADS: boolean
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
      diggCount: number
      collectCount: number
      forwardCount: number
      whatsappShareCount: number
      loseCount: number
      loseCommentCount: number
      whatsappShareCount: number
      repostCount: number
    }
    video?: {
      ratio: string
      duration: number
      playAddr: string
      downloadAddr: string
      cover: string
      originCover: string
      dynamicCover: string
    }
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
      isCommerceMusic: boolean
      isOriginalSound: boolean
      isAuthorArtist: boolean
    }
  }
  resultNotParsed?: any
}
```

</details>
<details>
  <summary><b>Tiktok Downloader V2</b></summary>
  <br>

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    desc?: string
    author?: {
      nickname?: string
      avatar?: string
    }
    statistics: {
      likeCount: string
      commentCount: string
      shareCount: string
    }
    video?: string
    images?: string[]
    music?: string
  }
}
```

</details>
<details>
  <summary><b>Tiktok Downloader V3</b></summary>
  <br>

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    desc?: string
    author?: {
      avatar?: string
      nickname?: string
    }
    music?: string
    images?: string[]
    videoSD?: string
    videoHD?: string
    videoWatermark?: string
  }
}
```

</details>
<details>
  <summary><b>Tiktok Search "User"</b></summary>
  <br>

```ts
{
  status: "success" | "error"
  message?: string
  result?: [{
    uid: string
    username: string
    nickname: string
    signature: string
    followerCount: number
    avatarThumb: string[]
    isVerified: boolean
    secUid: string
    url: string
  }]
  page: number
  totalResults: number
}
```

</details>
<details>
  <summary><b>Tiktok Search "Live"</b></summary>
  <br>

```ts
{
  status: "success" | "error"
  message?: string
  result?: [{
    id: string
    title: string
    cover: string[]
    squareCover: string[]
    rectangleCover: string[]
    liveTypeThirdParty: boolean
    hashtag: string
    startTime: number
    stats: {
      totalUser: number
      viewerCount: number
      likeCount: number
    }
    owner: {
      id: string
      nickname: string
      username: string
      signature: string
      avatarThumb: string[]
      avatarMedium: string[]
      avatarLarge: string[]
      modifyTime: number
      stats: {
        followingCount: number
        followerCount: number
      }
      isVerified: boolean
    }
  }]
  page: number
  totalResults: number
}
```

</details>
<details>
  <summary><b>Tiktok Get Profile</b></summary>
  <br>

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
    posts: Posts[]
  }
  totalPosts: number
}
```

</details>
<details>
  <summary><b>Tiktok Get Comments</b></summary>
  <br>

```ts
{
  status: "success" | "error"
  message?: string
  result?: [{
    cid: string
    text: string
    commentLanguage: string
    createTime: number
    likeCount: number
    isAuthorLiked: boolean
    isCommentTranslatable: boolean
    replyCommentTotal: number
    replyComment: []
    user: User
    url: string
  }],
  totalComments: number
}
```

</details>
<br>

# Changelog

All updates and changes can be viewed in the [CHANGELOG.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CHANGELOG.md) file.

# Contributing

- This repository is open source. We really appreciate it if you want to participate in developing this repository...
- Please read our [CONTRIBUTING.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CODE_OF_CONDUCT.md) before contributing.

# License

- This project is licensed under the Apache License - see the [LICENSE](https://github.com/TobyG74/tiktok-api-dl/blob/master/LICENSE) file for details.
