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

```
const { TiktokDL } =  require("@tobyg74/tiktok-api-dl");

const tiktok_url = "https://vt.tiktok.com/ZS84BnrU9"

TiktokDL(tiktok_url)
    .then((result) => {
        console.log(result);
    })
```

## Response

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
