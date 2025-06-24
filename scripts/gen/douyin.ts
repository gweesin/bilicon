import type { DouyinIconEmote } from '../types'
import type { BiliIconGroups } from './icon-generator'
import { blankIconSet, writeJSONFile } from '@iconify/tools'
import { author, license } from '../../package.json'
import { replaceSquareBrackets } from '../../src/utils'
import { encodeFromURL } from '../utils'
import { IconSpiderRunner } from './icon-generator'

async function getEmotes(): Promise<DouyinIconEmote[]> {
  const data = await fetch('https://www.douyin.com/aweme/v1/web/emoji/list').then(response => response.json()).then(json => (json as unknown as { emoji_list: DouyinIconEmote[] }))

  return data.emoji_list
}

async function main(): Promise<void> {
  const spiderRunner = new DouyinIconSpiderRunner()
  const iconSet = blankIconSet('douyin')

  iconSet.info = {
    name: 'douyin',
    author: {
      name: author.replace(/<.*>/g, ''),
    },
    license: {
      title: license,
    },
  }

  await spiderRunner.run(iconSet)
  await writeJSONFile('./json/douyin.json', iconSet.export())
}

export class DouyinIconSpiderRunner extends IconSpiderRunner {
  async getIconContent(url: string): Promise<string> {
    const dataURI = await encodeFromURL(url)
    return `<image width="100%" height="100%" xlink:href="${dataURI}" />`
  }

  async getIconGroups(): Promise<BiliIconGroups[]> {
    const douyinEmotes = await getEmotes()

    return [
      {
        name: 'douyin',
        emotes: douyinEmotes.map(emote => ({
          name: replaceSquareBrackets(emote.display_name),
          url: emote.emoji_url.url_list[0],
        })),
      },
    ]
  }
}

main()
