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
- [Quick Installation](#quick-installation)
- [Installation Methods](#installation-methods)
  - [Using Installation Script](#using-installation-script)
  - [Using NPM](#using-npm)
  - [Using Yarn](#using-yarn)
  - [Using Github](#using-github)
- [Usage Guide](#usage-guide)
  - [Getting Tiktok Cookie](#getting-tiktok-cookie)
  - [Using CLI](#using-cli)
  - [Building from Source](#building-from-source)
- [Features](#features)
  - [Tiktok Downloader](#tiktok-downloader)
  - [Tiktok Search](#tiktok-search)
  - [Tiktok Stalk User Profile](#tiktok-stalk-user-profile)
  - [Tiktok Video User Comments](#tiktok-video-comments)
  - [Tiktok Get User Posts](#tiktok-get-user-posts)
  - [Tiktok Get User Favorite Videos](#tiktok-get-user-favorite-videos)
- [API Response Types](#api-response-types)
  - [Tiktok Downloader](#tiktok-downloader-1)
    - [Version 1 Response](#version-1-response)
    - [Version 2 Response](#version-2-response)
    - [Version 3 Response](#version-3-response)
  - [Tiktok Search](#tiktok-search-1)
  - [Tiktok Stalk User Profile](#tiktok-stalk-user-profile-1)
  - [Tiktok Video Comments](#tiktok-video-comments-1)
  - [Tiktok User Posts](#tiktok-user-posts)
  - [Tiktok User Liked Videos](#tiktok-user-liked-videos)
- [Contributing](#contributing)
- [License](#license)

# Description

Note : `This project uses the API from Tiktok. This project is made for educational purposes only. This project is not affiliated with Tiktok. This project is not intended to harm or damage the Tiktok platform.`

- This project is made to help users to download videos, images / slides and music from Tiktok.
- This project is also made to help users to view someone's profile from Tiktok.
- This project is also made to help users to view comments from a video on Tiktok.

# Quick Installation

Install using our automated script:

```bash
curl -o install.sh https://raw.githubusercontent.com/TobyG74/tiktok-api-dl/master/install.sh
chmod +x install.sh
./install.sh
```

The script automatically:

- Verifies Node.js installation and version
- Installs the library using npm or yarn
- Provides usage examples

# Installation Methods

## Using NPM

```bash
npm install @tobyg74/tiktok-api-dl
```

## Using Yarn

```bash
yarn add @tobyg74/tiktok-api-dl
```

## Using Github

```bash
npm install github:TobyG74/tiktok-api-dl
```

# Usage Guide

## Getting Tiktok Cookie

1. Install [Cookie-Editor](https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm)
2. Login to [Tiktok](https://tiktok.com)
3. Open Cookie-Editor
4. Copy the cookie and use it in your code: `COOKIE: "YOUR_COOKIE"`

## Using CLI

### Global Installation

```bash
npm install -g @tobyg74/tiktok-api-dl
tiktokdl [command] [options]
```

### Direct Usage

```bash
git clone https://github.com/TobyG74/tiktok-api-dl.git
cd tiktok-api-dl
npm install
npx ts-node src/cli/index.ts [command] [options]
```

### NPM Script

```bash
npm run cli -- [command] [options]
```

### Examples

```bash
$ tiktokdl -h
Usage: tiktokdl [options] [command]

Tiktok downloader and search CLI tool

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  download [options] <url>     Download Tiktok Video / Slide / Music
  cookie                       Cookie Manager
  search                       Search Tiktok users or live streams
  getcomments [options] <url>  Get comments from a Tiktok video
  stalk [options] <username>   Stalk a Tiktok user
  help [command]               display help for command
```

## Building from Source

```bash
git clone https://github.com/TobyG74/tiktok-api-dl.git
cd tiktok-api-dl
npm install
npm run build
```

# Features

## Tiktok Downloader

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

const url = "https://vt.tiktok.com/xxxxxxxx"
Tiktok.Downloader(url, {
  version: "v1", // "v1" | "v2" | "v3"
  proxy: "YOUR_PROXY", // optional
  showOriginalResponse: true // optional, v1 only
}).then((result) => console.log(result))
```

- [Version 1 Response](#version-1-response)
- [Version 2 Response](#version-2-response)
- [Version 3 Response](#version-3-response)

## Tiktok Search

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

Tiktok.Search("username", {
  type: "user", // "user" | "live"
  page: 1,
  cookie: "YOUR_COOKIE", // needed
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
```

- [User Search Response](#user-search-response)
- [Live Search Response](live-search-response)

## Tiktok Stalk User Profile

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

const username = "Tobz2k19"
Tiktok.Stalker(username, {
  cookie: "YOUR_COOKIE", // optional, if response null
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
```

- [Tiktok Stalk User Response](#tiktok-stalk-user-profile-1)

## Tiktok Video Comments

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

const url = "https://vt.tiktok.com/xxxxxxxx"
Tiktok.GetVideoComments(url, {
  commentLimit: 10, // optional, default is 30
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
```

- [Tiktok Video Comments Response](#tiktok-video-comments-1)

## Tiktok Get User Posts

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

const username = "Tobz2k19"
Tiktok.GetUserPosts(username, {
  postLimit: 10, // optional, default is 30
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
```

- [Tiktok User Posts Response](#tiktok-user-posts)

## Tiktok Get User Liked Videos

- Note: To use this feature, you must be logged in with valid TikTok cookies to access user's liked videos

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

const username = "Tobz2k19"
Tiktok.GetUserLiked(username, {
  postLimit: 10, // optional, default is 30
  cookie: "YOUR_COOKIE", // needed
  proxy: "YOUR_PROXY" // optional
})
```

- [Tiktok User Liked Videos Response](#tiktok-user-liked-videos)

## Tiktok Collection

Get videos from a TikTok collection (supports collection ID or URL)

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

// Using collection ID
const collectionId = "7507916135931218695"
Tiktok.Collection(collectionId, {
  cursor: "0", // optional, default is "0"
  count: 5, // optional, default is 5
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))

// Using collection URL
const collectionUrl = "https://www.tiktok.com/@username/collection/name-id"
Tiktok.Collection(collectionUrl, {
  cursor: "0",
  count: 5,
  proxy: "YOUR_PROXY"
}).then((result) => console.log(result))
```

### CLI Usage

```bash
# Using collection ID
tiktokdl collection 7507916135931218695 -n 5

# Using collection URL
tiktokdl collection "https://www.tiktok.com/@username/collection/name-id" -n 5

# With cursor for pagination
tiktokdl collection 7507916135931218695 -c 5 -n 5

# With proxy
tiktokdl collection 7507916135931218695 -n 5 -p "http://your-proxy-url"
```

### Response Type

```typescript
interface TiktokCollectionResponse {
  status: "success" | "error"
  message?: string
  result?: {
    itemList: Array<{
      id: string
      desc: string
      createTime: number
      author?: {
        id: string
        uniqueId: string
        nickname: string
        avatarThumb: string
        avatarMedium: string
        avatarLarger: string
        signature: string
        verified: boolean
      }
      statistics?: {
        playCount: number
        diggCount: number
        shareCount: number
        commentCount: number
        collectCount: number
      }
      video?: {
        id: string
        height: number
        width: number
        duration: number
        ratio: string
        cover: string
        originCover: string
        dynamicCover: string
        playAddr: string
        downloadAddr: string
        format: string
        bitrate: number
      }
      textExtra?: Array<{
        hashtagName: string
        hashtagId: string
        type: number
      }>
    }>
    hasMore: boolean
    cursor: string
  }
}
```

# API Response Types

## Tiktok Downloader

### Version 1 Response

```typescript
interface TiktokAPIResponse {
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    desc: string
    author: {
      uid: number
      username: string
      nickname: string
      signature: string
      region: string
      avatarThumb: string[]
      avatarMedium: string[]
      url: string
    }
    statistics: {
      playCount: number
      downloadCount: number
      shareCount: number
      commentCount: number
      likeCount: number
      collectCount: number
      forwardCount: number
      whatsappShareCount: number
      loseCount: number
      loseCommentCount: number
      repostCount: number
    }
    hashtag: string[]
    isTurnOffComment: boolean
    isADS: boolean
    cover?: string[]
    dynamicCover?: string[]
    originCover?: string[]
    video?: {
      ratio: string
      duration: number
      playAddr: string[]
      downloadAddr: string[]
      cover: string[]
      dynamicCover: string[]
      originCover: string[]
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

### Version 2 Response

```typescript
interface SSSTikResponse {
  status: "success" | "error"
  message?: string
  result?: {
    type: "image" | "video" | "music"
    desc?: string
    author?: {
      avatar: string
      nickname: string
    }
    statistics?: {
      likeCount: string
      commentCount: string
      shareCount: string
    }
    images?: string[]
    video?: string
    music?: string
    direct?: string
  }
}
```

### Version 3 Response

```typescript
interface MusicalDownResponse {
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
    videoHD?: string
    videoWatermark?: string
  }
}
```

## Tiktok Search

### User Search Response

```typescript
interface TiktokUserSearchResponse {
  status: "success" | "error"
  message?: string
  result?: Array<{
    uid: string
    username: string
    nickname: string
    signature: string
    followerCount: number
    avatarThumb: string
    isVerified: boolean
    secUid: string
    url: string
  }>
  page?: number
  totalResults?: number
}
```

### Live Search Response

```typescript
interface TiktokLiveSearchResponse {
  status: "success" | "error"
  message?: string
  result?: Array<{
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
  }>
  page?: number
  totalResults?: number
}
```

### Video Search Response

```typescript
interface TiktokVideoSearchResponse {
  status: "success" | "error"
  message?: string
  result?: Array<{
    id: string
    desc: string
    createTime: number
    author: {
      id: string
      uniqueId: string
      nickname: string
      avatarThumb: string
      avatarMedium: string
      avatarLarger: string
      signature: string
      verified: boolean
      secUid: string
      openFavorite: boolean
      privateAccount: boolean
      isADVirtual: boolean
      tiktokSeller: boolean
      isEmbedBanned: boolean
    }
    stats: {
      collectCount: number
      commentCount: number
      likeCount: number
      playCount: number
      shareCount: number
    }
    video: {
      id: string
      ratio: string
      cover: string
      originCover: string
      dynamicCover: string
      playAddr: string
      downloadAddr: string
      format: string
    }
    music: {
      id: string
      title: string
      playUrl: string
      coverThumb: string
      coverMedium: string
      coverLarge: string
      authorName: string
      original: boolean
      album: string
      duration: number
      isCopyrighted: boolean
    }
  }>
  page?: number
  totalResults?: number
}
```

## Tiktok Stalk User Profile

### Profile Response

```typescript
interface TiktokStalkUserResponse {
  status: "success" | "error"
  message?: string
  result?: {
    user: {
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

## Tiktok Video Comments

### Comments Response

```typescript
interface TiktokVideoCommentsResponse {
  status: "success" | "error"
  message?: string
  result?: Array<{
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
  }>
  totalComments?: number
}
```

## Tiktok User Posts

### User Posts Response

```typescript
interface TiktokUserPostsResponse {
  status: "success" | "error"
  message?: string
  result?: Array<{
    id: string
    desc: string
    createTime: number
    digged: number
    duetEnabled: number
    forFriend: number
    officalItem: number
    originalItem: number
    privateItem: number
    shareEnabled: number
    stitchEnabled: number
    stats: {
      collectCount: number
      commentCount: number
      likeCount: number
      playCount: number
      shareCount: number
    }
    author: {
      id: string
      username: string
      nickname: string
      avatarLarger: string
      avatarThumb: string
      avatarMedium: string
      signature: string
      verified: boolean
      openFavorite: boolean
      privateAccount: boolean
      isADVirtual: boolean
      isEmbedBanned: boolean
    }
    video?: {
      id: string
      duration: number
      ratio: string
      cover: string
      originCover: string
      dynamicCover: string
      playAddr: string
      downloadAddr: string
      format: string
      bitrate: number
    }
    music: {
      authorName: string
      coverLarge: string
      coverMedium: string
      coverThumb: string
      duration: number
      id: string
      title: string
      playUrl: string
      original: boolean
    }
    images?: string[]
  }>
  totalPosts?: number
}
```

## Tiktok User Liked Videos

### User Liked Videos Response

```typescript
interface TiktokUserFavoriteVideosResponse {
  status: "success" | "error"
  message?: string
  result?: Array<{
    id: string
    desc: string
    createTime: string
    duetEnabled: boolean
    digged: boolean
    forFriend: boolean
    isAd: boolean
    originalItem: boolean
    privateItem: boolean
    officialItem: boolean
    secret: boolean
    shareEnabled: boolean
    stitchEanbled: boolean
    textTranslatable: boolean
    author: {
      id: string
      username: string
      nickname: string
      avatarLarger: string
      avatarThumb: string
      avatarMedium: string
      signature: string
      verified: string
      openFavorite: string
      privateAccount: string
      isADVirtual: string
      isEmbedBanned: string
    }
    stats: {
      collectCount: string
      commentCount: string
      likeCount: string
      playCount: string
      repostCount: string
      shareCount: string
    }
    video?: {
      id: string
      videoID: string
      duration: number
      ratio: string
      cover: string
      originCover: string
      dynamicCover: string
      playAddr: string
      downloadAddr: string
      format: string
      bitrate: number
      bitrateInfo: any[]
    }
    imagePost?: Array<{
      title: string
      images: string[]
    }>
    music: {
      id: string
      title: string
      playUrl: string
      coverThumb: string
      coverMedium: string
      coverLarge: string
      authorName: string
      original: boolean
      album: string
      duration: number
      isCopyrighted: boolean
      private: boolean
    }
  }>
  totalPosts?: number
}
```

# Changelog

- All changes will be documented in the [CHANGELOG.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CHANGELOG.md) file.

# Contributing

- This repository is open source. We really appreciate it if you want to participate in developing this repository...
- Please read our [CONTRIBUTING.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CODE_OF_CONDUCT.md) before contributing.

# License

- This project is licensed under the Apache License - see the [LICENSE](https://github.com/TobyG74/tiktok-api-dl/blob/master/LICENSE) file for details.
