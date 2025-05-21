import type { BiliIconPackage } from '../types'
import type { BiliIconGroups } from './icon-generator'
import { blankIconSet, writeJSONFile } from '@iconify/tools'
import { author, license } from '../../package.json'
import { replaceSquareBrackets } from '../../src/utils'
import { encodeFromURL } from '../utils'
import { IconSpiderRunner } from './icon-generator'

async function getEmotePackages(): Promise<BiliIconPackage[]> {
  const data = await fetch('https://api.bilibili.com/x/emote/user/panel/web?business=reply').then(response => response.json()).then(json => (json as unknown as { data: { packages: BiliIconPackage[] } }).data)

  return data.packages
}

async function main(): Promise<void> {
  const spiderRunner = new BiliIconSpiderRunner()
  const iconSet = blankIconSet('bili')

  iconSet.info = {
    name: 'bilibili',
    author: {
      name: author.replace(/<.*>/g, ''),
    },
    license: {
      title: license,
    },
  }
  await spiderRunner.run(iconSet)

  const data = iconSet.export()
  await writeJSONFile('./json/bili.json', data)
}

export class BiliIconSpiderRunner extends IconSpiderRunner {
  async getIconContent(url: string): Promise<string> {
    const dataURI = await encodeFromURL(url)
    return `<image width="100%" height="100%" xlink:href="${dataURI}" />`
  }

  async getIconGroups(): Promise<BiliIconGroups[]> {
    const biliIconPackages = await getEmotePackages()
    return biliIconPackages.filter(pkg => pkg.text !== '颜文字').map(pkg => ({
      name: pkg.text,
      emotes: pkg.emote.map(emote => ({
        name: replaceSquareBrackets(emote.text),
        url: emote.url,
      })),
    }))
  }
}

main()
