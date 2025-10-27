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
<div align="center">
  <a href="https://whatsapp.com/channel/0029VaGQpAOKAwEfkKNh6Z0X" target="_blank"><img src="https://img.shields.io/badge/join our community-%2317ad1e.svg?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Join Our Community"/></a>
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
  - [CLI Usage](#cli-usage)
  - [Example Cookie Usage](#example-cookie-usage)
- [Features](#features)
  - [Tiktok Downloader](#tiktok-downloader)
  - [Tiktok Search](#tiktok-search)
  - [Tiktok Stalk User Profile](#tiktok-stalk-user-profile)
  - [Tiktok Video User Comments](#tiktok-video-comments)
  - [Tiktok Get User Posts](#tiktok-get-user-posts)
  - [Tiktok Get User Reposts](#tiktok-get-user-reposts)
  - [Tiktok Get User Favorite Videos](#tiktok-get-user-favorite-videos)
  - [Tiktok Collection](#tiktok-collection)
  - [Tiktok Playlist](#tiktok-playlist)
  - [Tiktok Trending](#tiktok-trending)
  - [Tiktok Get Videos by Music ID](#tiktok-get-videos-by-music-id)
  - [Tiktok Get Music Detail](#tiktok-get-music-detail)
- [API Response Types](#api-response-types)
  - [Tiktok Downloader](#tiktok-downloader-1)
    - [Version 1 Response](#version-1-response)
    - [Version 2 Response](#version-2-response)
    - [Version 3 Response](#version-3-response)
  - [Tiktok Search](#tiktok-search-1)
  - [Tiktok Stalk User Profile](#tiktok-stalk-user-profile-1)
  - [Tiktok Video Comments](#tiktok-video-comments-1)
  - [Tiktok User Posts](#tiktok-user-posts)
  - [Tiktok User Reposts](#tiktok-user-reposts)
  - [Tiktok User Favorite Videos](#tiktok-user-favorite-videos)
  - [Tiktok Collection](#tiktok-collection-1)
  - [Tiktok Playlist](#tiktok-playlist-1)
  - [Tiktok Trending](#tiktok-trending-1)
  - [Tiktok Get Videos by Music ID](#tiktok-get-videos-by-music-id-1)
  - [Tiktok Get Music Detail](#tiktok-get-music-detail-response)
- [Contributing](#contributing)
- [License](#license)

# Description

Note : `This project uses the API from Tiktok & Unofficial Tiktok API from Another Website. This project is not affiliated with Tiktok. `

- This project is made to help users to download videos, images / slides and music from Tiktok.
- This project is also made to help users to view someone's profile from Tiktok.
- This project is also made to help users to view comments from a video on Tiktok.
- This project is also made to help users to search for users, live streams and videos on Tiktok.
- This project is also made to help users to get user's posts, reposts and liked videos from Tiktok.
- This project is made to help users to get videos, images / slides from a Tiktok collection or playlist.
- This project is also made to help users to get trending content and creators from Tiktok.
- This project is also made to help users to get videos that use a specific music/audio track by music ID from Tiktok.
- This project is also made to help users to get detailed information about a music/audio track from Tiktok.

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
npm run cli  [command] [options]
```

### CLI Usage

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
  getvideocomments [options] <url>  Get comments from a Tiktok video
  getuserposts [options] <username>  Get posts from a Tiktok user
  getuserreposts [options] <username>  Get reposts from a Tiktok user
  stalk [options] <username>   Stalk a Tiktok user
  help [command]               display help for command
```

### Example Cookie Usage

```bash
# Set Tiktok Cookie to use in commands
tiktokdl cookie set "YOUR_COOKIE"

# Get Tiktok Cookie
tiktokdl cookie get

# Delete Tiktok Cookie
tiktokdl cookie delete
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

### CLI Usage

```bash
# Download Tiktok Video
tiktokdl download "https://vt.tiktok.com/xxxxxxxx"

# Download Tiktok Video with version
tiktokdl download "https://vt.tiktok.com/xxxxxxxx" -v v1

# Download Tiktok Video with Custom Output Directory Path
tiktokdl download "https://vt.tiktok.com/xxxxxxxx" -v v1 -o "/path/to/save/video.mp4"

# Download Tiktok Video with Proxy
tiktokdl download "https://vt.tiktok.com/xxxxxxxx" -v v1 -proxy "http://your-proxy-url"

# Download Collection or Playlist
tiktokdl download "https://www.tiktok.com/@username/collection/name-id"
tiktokdl download "https://www.tiktok.com/@username/playlist/name-id"

# Download Collection or Playlist with Count
tiktokdl download "https://www.tiktok.com/@username/collection/name-id" -c 5
tiktokdl download "https://www.tiktok.com/@username/playlist/name-id" -c 5

# Download Collection or Playlist with Proxy
tiktokdl download "https://www.tiktok.com/@username/collection/name-id" -c 5 -proxy "http://your-proxy-url"
tiktokdl download "https://www.tiktok.com/@username/playlist/name-id" -c 5 -proxy "http://your-proxy-url"
```

- [Version 1 Response](#version-1-response)
- [Version 2 Response](#version-2-response)
- [Version 3 Response](#version-3-response)

## Tiktok Search

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

Tiktok.Search("username", {
  type: "user", // "user" | "live" | "video"
  page: 1,
  cookie: "YOUR_COOKIE", // needed
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
```

### CLI Usage

```bash
# Search Tiktok Users
tiktokdl search user <username>

# Search Tiktok Users with pagination
tiktokdl search user <username> -p 1

# Search Tiktok Users with proxy
tiktokdl search user <username> -p 1 -proxy "http://your-proxy-url"

# Search Tiktok Live Streams
tiktokdl search live <username>

# Search Tiktok Live Streams with pagination
tiktokdl search live <username> -p 1

# Search Tiktok Live Streams with proxy
tiktokdl search live <username> -p 1 -proxy "http://your-proxy-url"

# Search Tiktok Videos
tiktokdl search video <query>

# Search Tiktok Videos with pagination
tiktokdl search video <query> -p 1

# Search Tiktok Videos with proxy
tiktokdl search video <query> -p 1 -proxy "http://your-proxy-url"
```

- [User Search Response](#user-search-response)
- [Live Search Response](live-search-response)
- [Video Search Response](#video-search-response)

## Tiktok Stalk User Profile

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

const username = "Tobz2k19"
Tiktok.StalkUser(username, {
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
```

### CLI Usage

```bash
# Stalk User Profile
tiktokdl stalk <username>

# Stalk User Profile with proxy
tiktokdl stalk <username> -proxy "http://your-proxy-url"
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

### CLI Usage

```bash
# Get Video Comments
tiktokdl getvideocomments "https://vt.tiktok.com/xxxxxxxx"

# Get Video Comments with limit of comments
tiktokdl getvideocomments "https://vt.tiktok.com/xxxxxxxx" -l 10

# Get Video Comments with proxy
tiktokdl getvideocomments "https://vt.tiktok.com/xxxxxxxx" -l 10 -proxy "http://your-proxy-url"
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

### CLI Usage

```bash
# Get User Posts
tiktokdl getuserposts <username>

# Get User Posts with limit of posts
tiktokdl getuserposts <username> -l 10

# Get User Posts with proxy
tiktokdl getuserposts <username> -l 10 -proxy "http://your-proxy-url"
```

- [Tiktok User Posts Response](#tiktok-user-posts)

## Tiktok Get User Reposts

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

const username = "Tobz2k19"
Tiktok.GetUserReposts(username, {
  postLimit: 10, // optional, default is 30
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
```

### CLI Usage

```bash
# Get User Reposts
tiktokdl getuserreposts <username>

# Get User Reposts with limit of reposts
tiktokdl getuserreposts <username> -l 10

# Get User Reposts with proxy
tiktokdl getuserreposts <username> -l 10 -proxy "http://your-proxy-url"
```

- [Tiktok User Reposts Response](#tiktok-user-reposts)

## Tiktok Get User Favorite Videos

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

### CLI Usage

```bash
# Get User Liked Videos
tiktokdl getuserliked <username>

# Get User Liked Videos with limit of posts
tiktokdl getuserliked <username> -l 10

# Get User Liked Videos with proxy
tiktokdl getuserliked <username> -l 10 -proxy "http://your-proxy-url"
```

- [Tiktok User Liked Videos Response](#tiktok-user-liked-videos)

## Tiktok Collection

Get videos from a TikTok collection (supports collection ID or URL)

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

// Using collection ID
const collectionId = "7507916135931218695"
Tiktok.Collection(collectionId, {
  page: 1, // optional, default is 1
  count: 5, // optional, default is 5
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))

// Using collection URL
const collectionUrl = "https://www.tiktok.com/@username/collection/name-id"
Tiktok.Collection(collectionUrl, {
  page: 1,
  count: 5,
  proxy: "YOUR_PROXY"
}).then((result) => console.log(result))
```

### CLI Usage

```bash
# Using download command with collection URL
tiktokdl download "https://www.tiktok.com/@username/collection/name-id"

# Using download command with count
tiktokdl download "https://www.tiktok.com/@username/collection/name-id" -c 5

# Using collection ID
tiktokdl collection 7507916135931218695 -c 5

# Using collection URL
tiktokdl collection "https://www.tiktok.com/@username/collection/name-id"

# Using collection URL with count
tiktokdl collection "https://www.tiktok.com/@username/collection/name-id" -c 5

# With page for pagination
tiktokdl collection 7507916135931218695 -p 1 -c 5

# With proxy
tiktokdl collection 7507916135931218695 -c 5 -proxy "http://your-proxy-url"
```

- [Tiktok Collection Response](#tiktok-collection-1)

## Tiktok Playlist

Get videos from a TikTok playlist (supports playlist ID or URL)

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

const playlistIdOrUrl = "https://www.tiktok.com/@username/playlist/name-id"
Tiktok.Playlist(playlistIdOrUrl, {
  page: 1,
  count: 5,
  proxy: "YOUR_PROXY"
}).then((result) => console.log(result))
```

### CLI Usage

```bash
# Using download command with playlist URL
tiktokdl download "https://www.tiktok.com/@username/playlist/name-id"

# Using download command with count
tiktokdl download "https://www.tiktok.com/@username/playlist/name-id" -c 5

# Using playlist ID
tiktokdl download 7507916135931218695 -c 5

# Using playlist URL
tiktokdl playlist "https://www.tiktok.com/@username/playlist/name-id" -c 5

# With page for pagination
tiktokdl playlist 7507916135931218695 -p 1 -c 5

# With proxy
tiktokdl playlist 7507916135931218695 -c 5 -proxy "http://your-proxy-url"
```

- [Tiktok Playlist Response](#tiktok-playlist-1)

## Tiktok Trending

Get trending content and creators from TikTok's discovery/explore page

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

// Get all trending content (full data structure)
Tiktok.Trending({
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))

// Get trending creators only (simplified data)
Tiktok.TrendingCreators({
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
```

### CLI Usage

```bash
# Get trending content
tiktokdl trending

# Get trending creators only
tiktokdl trending-creators

# With proxy
tiktokdl trending -proxy "http://your-proxy-url"
tiktokdl trending-creators -proxy "http://your-proxy-url"
```

- [Tiktok Trending Response](#tiktok-trending-1)

## Tiktok Get Videos by Music ID

Get videos that use a specific music/audio track by providing the music ID or URL

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

// Using music ID
const musicId = "7034143722082192134"
Tiktok.GetVideosByMusicId(musicId, {
  page: 1, // optional, default is 1
  count: 30, // optional, default is 30
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))

// Or using music URL
const musicUrl = "https://www.tiktok.com/music/QKThr-6771810675950880769"
Tiktok.GetVideosByMusicId(musicUrl, {
  page: 1,
  count: 30
}).then((result) => console.log(result))
```

### CLI Usage

```bash
# Get videos by music ID
tiktokdl getmusicvideos 7034143722082192134

# Get videos by music URL
tiktokdl getmusicvideos "https://www.tiktok.com/music/QKThr-6771810675950880769"

# Get videos by music ID with page and count
tiktokdl getmusicvideos 7034143722082192134 -p 1 -c 20

# Get videos by music ID with proxy
tiktokdl getmusicvideos 7034143722082192134 -p 1 -c 20 --proxy "http://your-proxy-url"

# Get raw JSON response
tiktokdl getmusicvideos 7034143722082192134 -r
```

- [Tiktok Music Videos Response](#tiktok-music-videos-response)

## Tiktok Get Music Detail

Get detailed information about a music/audio track by providing the music ID or URL. This feature uses xttparams encryption for enhanced security.

```javascript
const Tiktok = require("@tobyg74/tiktok-api-dl")

// Using music ID
const musicId = "7562597337407785760"
Tiktok.GetMusicDetail(musicId, {
  cookie: "YOUR_COOKIE", // required
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))

// Or using music URL
const musicUrl = "https://www.tiktok.com/music/QKThr-6771810675950880769"
Tiktok.GetMusicDetail(musicUrl, {
  cookie: "YOUR_COOKIE"
}).then((result) => console.log(result))
```

### CLI Usage

**Note:** This command requires a cookie. Set your cookie first using `tiktokdl cookie set <value>`

```bash
# Set cookie first (required)
tiktokdl cookie set "YOUR_COOKIE_VALUE"

# Get music detail by ID
tiktokdl getmusicdetail 7562597337407785760

# Get music detail by URL
tiktokdl getmusicdetail "https://www.tiktok.com/music/QKThr-6771810675950880769"

# Get music detail with proxy
tiktokdl getmusicdetail 7562597337407785760 --proxy "http://your-proxy-url"

# Get raw JSON response
tiktokdl getmusicdetail 7562597337407785760 -r
```

Download music/audio files from TikTok. Requires cookie authentication.

### CLI Usage for Downloading Music

```bash
# Set cookie first (required for downloading)
tiktokdl cookie set "YOUR_TIKTOK_COOKIE"

# Download by music ID
tiktokdl downloadmusic 7562597337407785760

# Download by music URL
tiktokdl downloadmusic "https://www.tiktok.com/music/QKThr-6771810675950880769"

# Custom output directory
tiktokdl downloadmusic 7562597337407785760 -o "./my-music"

# With proxy
tiktokdl downloadmusic 7562597337407785760 --proxy "http://your-proxy-url"
```

**How to get TikTok cookie:**

1. Open TikTok in your browser and login
2. Open DevTools (F12)
3. Go to Application/Storage > Cookies
4. Copy the entire cookie value
5. Set it using: `tiktokdl cookie set "YOUR_COOKIE"`

- [Tiktok Music Detail Response](#tiktok-music-detail-response)

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
    video?: {
      playAddr: string
    }
    music?: {
      playUrl: string
    }
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

## Tiktok User Reposts

### User Reposts Response

```typescript
interface TiktokUserRepostsResponse {
  status: "success" | "error"
  message?: string
  result?: Array<{
    id: string
    desc: string
    createTime: number
    digged: boolean
    duetEnabled?: boolean
    forFriend: boolean
    officalItem: boolean
    originalItem: boolean
    privateItem: boolean
    secret: boolean
    shareEnabled: boolean
    stitchEnabled?: boolean
    stats: {
      shareCount: number
      collectCount?: number
      commentCount?: number
      likeCount?: number
      playCount?: number
      repostCount?: number
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
      openFavorite?: boolean
      privateAccount?: boolean
      isADVirtual?: boolean
      isEmbedBanned?: boolean
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
      authorName?: string
      coverLarge?: string
      coverMedium?: string
      coverThumb?: string
      duration?: number
      id?: string
      title?: string
      playUrl?: string
      original?: boolean
      tt2dsp?: any
    }
    imagePost?: {
      title: string
      images?: Array<{
        imageURL: {
          urlList: string[]
        }
      }>
    }
    AIGCDescription?: string
    CategoryType?: number
    collected?: boolean
    contents?: any[]
    challenges?: any[]
    textExtra?: any[]
    textLanguage?: string
    textTranslatable?: boolean
    titleLanguage?: string
    titleTranslatable?: boolean
    isAd?: boolean
    isReviewing?: boolean
    itemCommentStatus?: number
    item_control?: {
      can_repost?: boolean
      can_share?: boolean
    }
    duetDisplay?: number
    stitchDisplay?: number
    diversificationId?: number
    backendSourceEventTracking?: string
    stickersOnItem?: any[]
    videoSuggestWordsList?: any
  }>
  totalReposts?: number
}
```

## Tiktok User Favorite Videos

### User Favorite Videos Response

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

## Tiktok Collection

### Collection Response

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

## Tiktok Playlist

### Playlist Response

```typescript
status: "success" | "error"
message?: string
result?: {
  hasMore: boolean
  itemList: Array<{
    id: string
    desc: string
    createTime: number
    author: PlaylistAuthor
    stats: Statistics
    video: VideoTiktokAPI
    music: MusicTiktokAPI
    challenges: Array<{
      id: string
      title: string
      desc: string
      coverLarger: string
      coverMedium: string
      coverThumb: string
      profileLarger: string
      profileMedium: string
      profileThumb: string
    }>
    collected: boolean
    digged: boolean
    duetDisplay: number
    forFriend: boolean
    officalItem: boolean
    originalItem: boolean
    privateItem: boolean
    shareEnabled: boolean
    stitchDisplay: number
    textExtra: Array<{
      awemeId: string
      end: number
      hashtagName: string
      isCommerce: boolean
      start: number
      subType: number
      type: number
    }>
  }>
  extra?: {
    fatal_item_ids: string[]
    logid: string
    now: number
  }
}
```

## Tiktok Trending

### Trending Response

```typescript
interface TiktokTrendingResponse {
  status: "success" | "error"
  message?: string
  result?: Array<{
    exploreList: Array<{
      cardItem: {
        id: string
        type: number
        cover: string
        title: string
        subTitle: string
        description: string
        link: string
        round: boolean
        playToken: string
        keyToken: string
        extraInfo: {
          verified: boolean
          fans: number
          likes: number
          userId: string
          secUid: string
          relation: number
          video: number
          following: number
          heart: number
          digg: number
        }
      }
    }>
    pageState: {
      regionAppId: number
      os: string
      region: string
      baseURL: string
      appType: string
      fullUrl: string
    }
  }>
}
```

### Trending Creators Response

```typescript
interface TrendingCreatorsResponse {
  status: "success" | "error"
  message?: string
  result?: Array<{
    id: string
    username: string
    nickname: string
    avatarThumb: string
    description: string
    verified: boolean
    followerCount: number
    likeCount: number
    videoCount: number
    followingCount: number
    heartCount: number
    diggCount: number
    secUid: string
    link: string
  }>
}
```

## Tiktok Get Videos by Music ID

### Get Music Videos Response

```typescript
interface TiktokMusicVideosResponse {
  status: "success" | "error"
  message?: string
  result?: {
    music?: {
      id: string
      title: string
      authorName: string
      author?: string
      duration?: number
      original?: boolean
      playUrl?: string[]
      coverThumb?: string
      coverLarge?: string
      coverMedium?: string
    }
    videos?: Array<{
      id: string
      desc?: string
      createTime: number
      digged?: boolean
      duetEnabled?: boolean
      forFriend?: boolean
      officalItem?: boolean
      originalItem?: boolean
      privateItem?: boolean
      shareEnabled?: boolean
      stitchEnabled?: boolean
      stats: {
        collectCount?: number
        commentCount: number
        diggCount: number
        playCount: number
        shareCount: number
      }
      author: {
        id: string
        uniqueId: string
        nickname: string
        avatarLarger?: string
        avatarThumb?: string
        avatarMedium?: string
        signature?: string
        verified?: boolean
        openFavorite?: boolean
        privateAccount?: boolean
        isADVirtual?: boolean
        isEmbedBanned?: boolean
      }
      video?: {
        id: string
        duration: number
        ratio?: string
        cover?: string
        originCover?: string
        dynamicCover?: string
        playAddr?: string
        downloadAddr?: string
        format?: string
        bitrate?: number
      }
      music: {
        id: string
        title: string
        authorName: string
        duration: number
        playUrl?: string[]
        coverLarge?: string
        coverMedium?: string
        coverThumb?: string
        original?: boolean
      }
      imagePost?: string[]
      effectStickers?: Array<{
        id: string
        name: string
        type?: number
      }>
    }>
    totalVideos?: number
  }
}
```

## Tiktok Get Music Detail Response

### Get Music Detail Response

```typescript
interface TiktokMusicDetailResponse {
  status: "success" | "error"
  message?: string
  result?: {
    musicInfo: {
      author: {
        id: string
        nickname: string
        uniqueId: string
        signature: string
        avatarThumb: string
        avatarMedium: string
        avatarLarger: string
        secUid: string
        privateAccount: boolean
        ftc: boolean
        relation: number
        openFavorite: boolean
        secret: boolean
      }
      music: {
        id: string
        title: string
        authorName: string
        original: boolean
        playUrl: string
        coverLarge: string
        coverMedium: string
        coverThumb: string
        duration: number
        private: boolean
        isCopyrighted: boolean
      }
      stats: {
        videoCount: number
      }
    }
    shareMeta: {
      title: string
      desc: string
    }
    statusCode: number
    status_msg: string
  }
}
```

# Changelog

- All changes will be documented in the [CHANGELOG.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CHANGELOG.md) file.

# Contributing

- This repository is open source. We really appreciate it if you want to participate in developing this repository...
- Please read our [CONTRIBUTING.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/TobyG74/tiktok-api-dl/blob/master/CODE_OF_CONDUCT.md) before contributing.

# License

- This project is licensed under the Apache License - see the [LICENSE](https://github.com/TobyG74/tiktok-api-dl/blob/master/LICENSE) file for details.

```

```
