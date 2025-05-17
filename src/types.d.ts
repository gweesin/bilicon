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
