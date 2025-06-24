export interface BiliIconPackage {
  id: number
  attr: number
  emote: BiliIconEmote[]
  text: string
}

export interface BiliIconEmote {
  id: number
  package_id: number
  attr: number
  flags: { unlocked: boolean }
  meta: { size: number, suggest: string[], alias: string }
  mtime: number
  text: string
  type: number
  url: string
}

export interface DouyinIconEmote {
  origin_url: string
  display_name: string

  // 0: normal, 1: hide
  hide: number
  emoji_url: {
    uri: string
    url_list: [string, string]
  }
}

export interface RedNoteEmoteIcon {
  image_name: string

  // url
  image?: string
}

export interface RedNoteCollection {
  emoji: RedNoteEmoteIcon[]
  name: string
}
