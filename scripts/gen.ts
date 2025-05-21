import type { BiliIconEmote, BiliIconPackage } from './types'
import { blankIconSet } from '@iconify/tools'
import fse from 'fs-extra'
import pLimit from 'p-limit'
import { author, license } from '../package.json'
import { replaceSquareBrackets } from '../src/utils'
import { encodeFromURL } from './utils'

async function getEmotePackages(): Promise<BiliIconPackage[]> {
  const data = await fetch('https://api.bilibili.com/x/emote/user/panel/web?business=reply').then(response => response.json()).then(json => (json as unknown as { data: { packages: BiliIconPackage[] } }).data)

  return data.packages
}

async function getStandardIcons(): Promise<BiliIconEmote[]> {
  const packages = await getEmotePackages()
  return packages.find(pkg => pkg.text === '小黄脸')?.emote ?? []
}

async function main(): Promise<void> {
  const icons = await getStandardIcons()
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

  const limit = pLimit(10)

  await Promise.all(icons.map(icon =>
    limit(async () => {
      const dataURI = await encodeFromURL(icon.url)

      iconSet.setIcon(replaceSquareBrackets(icon.text), {
        body: `<image width="100%" height="100%" xlink:href="${dataURI}" />`,
      })
    }),
  ))

  const orderMap = icons.reduce((map, icon, idx) => {
    map[replaceSquareBrackets(icon.text)] = idx
    return map
  }, {} as Record<string, number>)
  await fse.writeJSON('./docs/assets/bili-order.json', orderMap)

  const data = iconSet.export()
  await fse.writeJSON('./json/bili.json', data, {
    spaces: 2,
  })
}

main()
