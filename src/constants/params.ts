import qs from "qs"

/** Get Params */
export const _getUserPostsParams = () => {
  return (
    qs.stringify({
      aid: 1988,
      app_language: "en",
      app_name: "tiktok_web",
      battery_info: 1,
      browser_language: "en-US",
      browser_name: "Mozilla",
      browser_online: true,
      browser_platform: "Win32",
      browser_version:
        "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35",
      channel: "tiktok_web",
      cookie_enabled: true,
      device_id: "7002566096994190854",
      device_platform: "web_pc",
      focus_state: false,
      from_page: "user",
      history_len: 3,
      is_fullscreen: false,
      is_page_visible: true,
      os: "windows",
      priority_region: "RO",
      referer: "https://exportcomments.com/",
      region: "RO",
      root_referer: "https://exportcomments.com/",
      screen_height: 1440,
      screen_width: 2560,
      tz_name: "Europe/Bucharest",
      verifyFp: "verify_lacphy8d_z2ux9idt_xdmu_4gKb_9nng_NNTTTvsFS8ao",
      webcast_language: "en"
    }) +
    "&msToken=7UfjxOYL5mVC8QFOKQRhmLR3pCjoxewuwxtfFIcPweqC05Q6C_qjW-5Ba6_fE5-fkZc0wkLSWaaesA4CZ0LAqRrXSL8b88jGvEjbZPwLIPnHeyQq6VifzyKf5oGCQNw_W4Xq12Q-8KCuyiKGLOw=&X-Bogus=DFSzswVL-XGANHVWS0OnS2XyYJUm"
  )
}

export const _getUserLikedParams = (
  id: string,
  secUid: string,
  count: number
) => {
  let cursor = 0
  if (count > 50) {
    for (let i = 1; i < count; i++) {
      cursor += 50
    }
  }

  return qs.stringify({
    aid: "1988",
    cookie_enabled: true,
    screen_width: 0,
    screen_height: 0,
    browser_language: "",
    browser_platform: "",
    browser_name: "",
    browser_version:
      "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0",
    browser_online: "",
    timezone_name: "Europe/London",
    is_page_visible: true,
    id,
    secUid,
    count,
    cursor,
    needPinnedItemIds: true,
    odinId: generateOdinId(),
    history_len: 3,
    user_is_login: true
  })
}

export const _xttParams = (secUid: string, cursor: number, count: number) => {
  return qs.stringify({
    aid: "1988",
    cookie_enabled: true,
    screen_width: 0,
    screen_height: 0,
    browser_language: "",
    browser_platform: "",
    browser_name: "",
    browser_version: "",
    browser_online: "",
    timezone_name: "Europe/London",
    secUid,
    cursor,
    count,
    is_encryption: 1
  })
}

export const _getCommentsParams = (id: string, count: number) => {
  let cursor = 0
  if (count > 50) {
    for (let i = 1; i < count; i++) {
      cursor += 50
    }
  }

  return qs.stringify({
    aid: "1988",
    app_language: "ja-JP",
    app_name: "tiktok_web",
    aweme_id: id,
    browser_language: "en-US",
    browser_name: "Mozilla",
    browser_online: true,
    browser_platform: "Linux x86_64",
    browser_version: "5.0 (X11)",
    channel: "tiktok_web",
    cookie_enabled: true,
    count: 50,
    cursor: cursor,
    device_id: generateDeviceId(),
    os: "linux",
    region: "ID",
    screen_height: 768,
    screen_width: 1366
  })
}

/** Search Params */
export const _userSearchParams = (
  keyword: string,
  page: number,
  xbogus?: any
) => {
  let cursor = 0
  if (page > 1) {
    for (let i = 1; i < page; i++) {
      cursor += 10
    }
  }

  const params = {
    WebIdLastTime: Date.now(),
    aid: "1988",
    app_language: "en",
    app_name: "tiktok_web",
    browser_language: "en-US",
    browser_name: "Mozilla",
    browser_online: true,
    browser_platform: "Win32",
    browser_version:
      "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
    channel: "tiktok_web",
    cookie_enabled: true,
    cursor: cursor,
    device_id: generateDeviceId(),
    device_platform: "web_pc",
    focus_state: false,
    from_page: "search",
    history_len: 5,
    is_fullscreen: false,
    is_page_visible: true,
    keyword: keyword,
    os: "windows",
    priority_region: "ID",
    referer: "",
    region: "ID",
    screen_height: 768,
    screen_width: 1366,
    search_id: generateSearchId(),
    tz_name: "Asia/Jakarta",
    web_search_code: {
      tiktok: {
        client_params_x: {
          search_engine: {
            ies_mt_user_live_video_card_use_libra: 1,
            mt_search_general_user_live_card: 1
          }
        },
        search_server: {}
      }
    },
    webcast_language: "en"
  }

  if (xbogus) {
    params["X-Bogus"] = xbogus
  }

  return qs.stringify(params)
}

export const _liveSearchParams = (keyword: string, page: number) => {
  let cursor = 0
  if (page > 1) {
    for (let i = 1; i < page; i++) {
      cursor += 12
    }
  }
  let offset = `${cursor}`
  return new URLSearchParams({
    WebIdLastTime: "1720342268",
    aid: "1988",
    app_language: "en",
    app_name: "tiktok_web",
    browser_language: "en-US",
    browser_name: "Mozilla",
    browser_online: "true",
    browser_platform: "Linux x86_64",
    browser_version: "5.0 (X11)",
    channel: "tiktok_web",
    cookie_enabled: "true",
    count: "20",
    device_id: generateDeviceId(),
    device_platform: "web_pc",
    device_type: "web_h264",
    focus_state: "true",
    from_page: "search",
    history_len: "10",
    is_fullscreen: "false",
    is_page_visible: "true",
    keyword,
    offset,
    os: "linux",
    priority_region: "",
    referer: "",
    region: "ID",
    screen_height: "768",
    screen_width: "1366",
    tz_name: "Asia/Jakarta",
    search_id: generateSearchId(),
    web_search_code:
      "{ tiktok: { client_params_x: { search_engine: { ies_mt_user_live_video_card_use_libra: 1, mt_search_general_user_live_card: 1 } }, search_server: {} } }",
    webcast_language: "en"
  })
}

export const _videoSearchParams = (keyword: string, page: number) => {
  let cursor = 0
  if (page > 1) {
    for (let i = 1; i < page; i++) {
      cursor += 12
    }
  }

  let offset = `${cursor}`

  return qs.stringify({
    WebIdLastTime: "1720342268",
    aid: "1988",
    app_language: "en",
    app_name: "tiktok_web",
    browser_language: "en-US",
    browser_name: "Mozilla",
    browser_online: "true",
    browser_platform: "Linux x86_64",
    browser_version: "5.0 (X11)",
    channel: "tiktok_web",
    cookie_enabled: "true",
    count: "20",
    device_id: generateDeviceId(),
    device_platform: "web_pc",
    device_type: "web_h264",
    focus_state: "true",
    from_page: "search",
    history_len: "10",
    is_fullscreen: "false",
    is_page_visible: "true",
    is_user_login: "true",
    keyword,
    offset,
    os: "linux",
    priority_region: "",
    referer: "",
    region: "ID",
    screen_height: "768",
    screen_width: "1366",
    tz_name: "Asia/Jakarta",
    search_id: generateSearchId(),
    web_search_code:
      "{ tiktok: { client_params_x: { search_engine: { ies_mt_user_live_video_card_use_libra: 1, mt_search_general_user_live_card: 1 } }, search_server: {} } }",
    webcast_language: "en"
  })
}

/** Downloader Params */
export const _tiktokApiParams = (args: any) => {
  return new URLSearchParams({
    ...args,
    version_name: "1.1.9",
    version_code: "2018111632",
    build_number: "1.1.9",
    device_id: generateDeviceId(),
    iid: generateDeviceId(),
    manifest_version_code: "2018111632",
    update_version_code: "2018111632",
    openudid: randomChar("0123456789abcdef", 16),
    uuid: randomChar("1234567890", 16),
    _rticket: Date.now() * 1000,
    ts: Date.now(),
    device_brand: "Google",
    device_type: "Pixel 4",
    device_platform: "android",
    resolution: "1080*1920",
    dpi: 420,
    os_version: "10",
    os_api: "29",
    carrier_region: "US",
    sys_region: "US",
    region: "US",
    timezone_name: "America/New_York",
    timezone_offset: "-14400",
    channel: "googleplay",
    ac: "wifi",
    mcc_mnc: "310260",
    is_my_cn: 0,
    ssmix: "a",
    as: "a1qwert123",
    cp: "cbfhckdckkde1"
  }).toString()
}

const randomChar = (char: string, range: number) => {
  let chars = ""
  for (let i = 0; i < range; i++) {
    chars += char[Math.floor(Math.random() * char.length)]
  }
  return chars
}

const generateSearchId = () => {
  const now = new Date()
  const timestamp =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0") +
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0") +
    now.getSeconds().toString().padStart(2, "0")

  const hex = randomChar("0123456789ABCDEF", 32)
  return `${timestamp}${hex}`
}

const generateDeviceId = () => {
  // Generate 19-digit number
  const prefix = "7" // Common prefix for device_id
  const random = randomChar("0123456789", 18)
  return `${prefix}${random}`
}

const generateOdinId = () => {
  // Generate 19-digit number
  const prefix = "7" // Common prefix for OdinId
  const random = randomChar("0123456789", 18)
  return `${prefix}${random}`
}

export const _getCollectionParams = (collectionId: string, cursor: string = "0") => {
  return qs.stringify({
    WebIdLastTime: 1741246176,
    aid: 1988,
    app_language: "en",
    app_name: "tiktok_web",
    browser_language: "en-US",
    browser_name: "Mozilla",
    browser_online: true,
    browser_platform: "Win32",
    browser_version: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    channel: "tiktok_web",
    clientABVersions: "70508271,72437276,73356773,73406215,73464037,73558921,73561312,73563784,73607175,73713381,73720541,73737112,73759867,73768252,73787023,73810364,73810951,73811265,73812969,73815488,73815490,73817289,73821742,73849114,73855857,73858886,73858985,73867894,73880997,73902810,70138197,70156809,70405643,71057832,71200802,71381811,71516509,71803300,71962127,72360691,72408100,72854054,72892778,73004916,73171280,73208420,73574728,73628214",
    collectionId,
    cookie_enabled: true,
    count: 30,
    cursor,
    data_collection_enabled: true,
    device_id: "7478595310673266194",
    device_platform: "web_pc",
    focus_state: true,
    from_page: "user",
    history_len: 3,
    is_fullscreen: false,
    is_page_visible: true,
    language: "en",
    odinId: "7458943931621032978",
    os: "windows",
    priority_region: "NZ",
    referer: "",
    region: "NZ",
    screen_height: 1440,
    screen_width: 2560,
    sourceType: 113,
    tz_name: "Pacific/Auckland",
    user_is_login: true,
    verifyFp: "verify_mb1zbd2f_sMPZ5W5a_A3yc_4dmk_8NT3_kp4HJQOdrhp5",
    webcast_language: "en"
  })
}

export { randomChar, generateSearchId, generateDeviceId, generateOdinId }
