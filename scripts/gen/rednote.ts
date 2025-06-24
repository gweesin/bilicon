import type { RedNoteCollection } from '../types'
import type { BiliIconGroups } from './icon-generator'
import { blankIconSet, writeJSONFile } from '@iconify/tools'
import { author, license } from '../../package.json'
import { replaceSquareBrackets } from '../../src/utils'
import { encodeFromURL } from '../utils'
import { IconSpiderRunner } from './icon-generator'

interface RedNoteResponse<T> {
  code: number
  data: T
  msg: string
  success: boolean
}

interface RedNoteEmojiWrapper {
  emoji: {
    tabs: Array<{ collection: RedNoteCollection[] }>
  }
}

async function getCollections(): Promise<RedNoteCollection[]> {
  const response = await fetch('https://edith.xiaohongshu.com/api/im/redmoji/detail').then(response => response.json()).then(json => (json as unknown as RedNoteResponse<RedNoteEmojiWrapper>))

  return response.data.emoji.tabs.flatMap(tab => tab.collection)
}

async function main(): Promise<void> {
  const spiderRunner = new DouyinIconSpiderRunner()
  const iconSet = blankIconSet('rednote')

  iconSet.info = {
    name: 'rednote',
    author: {
      name: author.replace(/<.*>/g, ''),
    },
    license: {
      title: license,
    },
  }

  await spiderRunner.run(iconSet)
  await writeJSONFile('./json/rednote.json', iconSet.export())
}

export class DouyinIconSpiderRunner extends IconSpiderRunner {
  async getIconContent(url: string): Promise<string> {
    const dataURI = await encodeFromURL(url)
    return `<image width="100%" height="100%" xlink:href="${dataURI}" />`
  }

  async getIconGroups(): Promise<BiliIconGroups[]> {
    const redNoteCollections = await getCollections()

    return redNoteCollections.map(collection => ({
      name: collection.name,
      emotes: collection.emoji.filter(emote => Object.prototype.hasOwnProperty.call(emote, 'image')).map(emote => ({
        name: replaceSquareBrackets(emote.image_name),
        url: emote.image,
      })),
    }))
  }
}

main()
