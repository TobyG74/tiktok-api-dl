# Tiktok Downloader

-   Used to download videos, images, music from TikTok
-   No login or password are required

## Installation

-   @tobyg74/tiktok-api-dl requires Node.js v10+ to run.

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

```
const { TiktokDL } =  require("@tobyg74/tiktok-api-dl");

const tiktok_url = "https://vt.tiktok.com/ZS84BnrU9"

TiktokDL(tiktok_url)
    .then((result) => {
        console.log(result);
    })
```

### Tiktok Profile

const { TiktokStalk } = require("@tobyg74/tiktok-api-dl");

const username = "tobz2k19"

```
TiktokStalk(username)
    .then((result) => {
        console.log(result);
    })
```

## Tiktok Downloader Response

```
{
  status: "success",
  result: {
    type: "video" // "image",
    id: ...,
    create_time: ...,
    description: ...,
    author: {
        ...
    },
    statistics: {
        ...
    },
    video // images: [
        ...
    ],
    music: [
        ...
    ]
  }
}
```

## Tiktok Profile Response

```
{
  status: "success",
  result: {
    users: {
      username: ...,
      nickname: ...,
      avatar: ...,
      signature: ...,
      verified: ...,
      region: ...
    },
    stats: {
      followerCount: ...,
      followingCount: ...,
      heartCount: ...,
      videoCount: ...,
      likeCount: ...
    }
  }
}
```
