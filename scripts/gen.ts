import type { BiliIconEmote, BiliIconPackage } from './types'
import { Buffer } from 'node:buffer'
import { blankIconSet } from '@iconify/tools'
import fse from 'fs-extra'
import pLimit from 'p-limit'
import { author, license } from '../package.json'

async function getEmotePackages(): Promise<BiliIconPackage[]> {
  const data = await fetch('https://api.bilibili.com/x/emote/user/panel/web?business=reply').then(response => response.json()).then(json => (json as unknown as { data: { packages: BiliIconPackage[] } }).data)

  return data.packages
}

async function getStandardIcons(): Promise<BiliIconEmote[]> {
  const packages = await getEmotePackages()
  return packages.find(pkg => pkg.text === '小黄脸')?.emote ?? []
}

async function encodeFromURL(url: string): Promise<string> {
  const response = await fetch(url)
  const blob = await response.blob()
  const arrayBuffer = await blob.arrayBuffer()

  const buffer = Buffer.from(arrayBuffer)
  const base64 = buffer.toString('base64')

  return `data:image/png;base64,${base64}`
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

      iconSet.setIcon(icon.meta.alias, {
        body: `<image width="100%" height="100%" xlink:href="${dataURI}" />`,
      })
    }),
  ))

  const data = iconSet.export()
  await fse.writeJSON('./json/bili.json', data, {
    spaces: 2,
  })
}

main()
