# Tiktok Downloader

-   Used to download videos, images, music from TikTok
-   No login or password are required

## Installation

-   tiktok-down requires Node.js v10+ to run.

### Install from NPM

```
npm install tiktok-down
```

### Install from YARN

```
yarn add tiktok-down
```

## Usage

```
const { TiktokDL } =  require("tiktok-down");

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
    video: [
        ...
    ],
    music: [
        ...
    ]
  }
}
```
