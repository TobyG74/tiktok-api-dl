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
  - [Getting TikTok Cookie](#getting-tiktok-cookie)
  - [Using CLI](#using-cli)
  - [Building from Source](#building-from-source)
- [Features](#features)
  - [TikTok Downloader](#tiktok-downloader)
  - [TikTok Search](#tiktok-search)
  - [TikTok Profile Stalker](#tiktok-stalker)
  - [TikTok Comments](#tiktok-comments)
- [API Response Types](#api-response-types)
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

## Getting TikTok Cookie

1. Install [Cookie-Editor](https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm)
2. Login to [TikTok](https://tiktok.com)
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

TikTok downloader and search CLI tool

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  download [options] <url>     Download TikTok Video / Slide / Music
  cookie                       Cookie Manager
  search                       Search TikTok users or live streams
  getcomments [options] <url>  Get comments from a TikTok video
  stalk [options] <username>   Stalk a TikTok user
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

## TikTok Downloader

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

const url = "https://vt.tiktok.com/xxxxxxxx"
Tiktok.Downloader(url, {
  version: "v1", // "v1" | "v2" | "v3"
  proxy: "YOUR_PROXY", // optional
  showOriginalResponse: true // optional, v1 only
}).then((result) => console.log(result))
```

## TikTok Search

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

Tiktok.Search("username", {
  type: "user", // "user" | "live"
  page: 1,
  cookie: "YOUR_COOKIE",
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
```

[View more examples and full API documentation in our wiki](#examples)

# API Response Types

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
  }]
  totalComments: number
}
```

</details>
<br>

# Changelog

- All changes will be documented in the [CHANGELOG.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CHANGELOG.md) file.

# Contributing

- This repository is open source. We really appreciate it if you want to participate in developing this repository...
- Please read our [CONTRIBUTING.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CODE_OF_CONDUCT.md) before contributing.

# License

- This project is licensed under the Apache License - see the [LICENSE](https://github.com/TobyG74/tiktok-api-dl/blob/master/LICENSE) file for details.
