import qs from "qs"

export const _userPostsParams = () => {
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
      browser_version: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35",
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
    }) + "&msToken=7UfjxOYL5mVC8QFOKQRhmLR3pCjoxewuwxtfFIcPweqC05Q6C_qjW-5Ba6_fE5-fkZc0wkLSWaaesA4CZ0LAqRrXSL8b88jGvEjbZPwLIPnHeyQq6VifzyKf5oGCQNw_W4Xq12Q-8KCuyiKGLOw=&X-Bogus=DFSzswVL-XGANHVWS0OnS2XyYJUm"
  )
}

export const _tiktokApiParams = (args: any) => {
  return {
    ...args,
    version_name: "1.1.9",
    version_code: "2018111632",
    build_number: "1.1.9",
    device_id: "7238642534011110914",
    iid: "7318518857994389254",
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
  }
}

const randomChar = (char: string, range: number) => {
  let chars = ""

  for (let i = 0; i < range; i++) {
    chars += char[Math.floor(Math.random() * char.length)]
  }

  return chars
}
