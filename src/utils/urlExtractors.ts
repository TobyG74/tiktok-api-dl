/**
 * Extract music ID from TikTok music URL or return the ID if already provided
 * @param musicIdOrUrl - Music ID or URL (e.g., "6771810675950880769" or "https://www.tiktok.com/music/QKThr-6771810675950880769")
 * @returns Music ID or null if invalid
 */
export const extractMusicId = (musicIdOrUrl: string): string | null => {
  if (!musicIdOrUrl || typeof musicIdOrUrl !== "string") {
    return null
  }

  const trimmed = musicIdOrUrl.trim()

  if (/^\d+$/.test(trimmed)) {
    return trimmed
  }

  const urlPattern = /tiktok\.com\/music\/[^\/\-]*-?(\d+)/i
  const match = trimmed.match(urlPattern)

  if (match && match[1]) {
    return match[1]
  }

  return null
}

export const extractCollectionId = (input: string): string | null => {
  if (/^\d+$/.test(input)) {
    return input
  }

  const urlPattern = /collection\/[^\/\-]*-?(\d+)/i
  const match = input.match(urlPattern)
  return match ? match[1] : null
}

export const extractPlaylistId = (input: string): string | null => {
  if (/^\d+$/.test(input)) {
    return input
  }

  const urlPattern = /playlist\/[^\/\-]*-?(\d+)/i
  const match = input.match(urlPattern)
  return match ? match[1] : null
}
