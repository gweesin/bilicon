import type { IconSet } from '@iconify/tools'
import pLimit from 'p-limit'
import { replaceSquareBrackets } from '../../src/utils'

export interface BiliIconGroups {
  name: string
  emotes: BiliIconUrlEmote[]
}

export interface BiliIconUrlEmote {
  name: string
  url: string
}

export abstract class IconSpiderRunner {
  abstract getIconGroups(): Promise<BiliIconGroups[]>

  abstract getIconContent(url: string): Promise<string>

  async run(iconSet: IconSet): Promise<IconSet> {
    const iconGroups = await this.getIconGroups()
    const limit = pLimit(10)

    const promises: Array<Promise<void>> = []
    iconGroups.forEach((iconGroup) => {
      iconGroup.emotes.forEach((emote) => {
        promises.push(limit(async () => {
          const body = await this.getIconContent(emote.url)
          iconSet.setIcon(emote.name, { body })
          iconSet.toggleCategory(replaceSquareBrackets(emote.name), iconGroup.name, true)
        }))
      })
    })

    await Promise.all(promises)
    return iconSet
  }
}
