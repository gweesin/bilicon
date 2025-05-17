import type { IconifyIcon, IconifyJSON } from '@iconify/types'
import type { BiliIconEmote, BiliIconPackage } from './types'
import { Buffer } from 'node:buffer'
import fse from 'fs-extra'

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

  const iconifyList: Array<Record<string, IconifyIcon>> = await Promise.all(icons.map(async (icon) => {
    const dataURI = await encodeFromURL(icon.url)

    const iconifyIcon: IconifyIcon = {
      body: `<image width="100%" height="100%" xlink:href="${dataURI}" />`,
    }

    return {
      [icon.meta.alias]: iconifyIcon,
    }
  }))

  const iconifyJSON: IconifyJSON = iconifyList.reduce((obj, iconifyIcon) => {
    Object.assign(obj.icons, iconifyIcon)
    return obj
  }, {
    prefix: 'bili',
    icons: {},
  })

  await fse.writeJSON('./json/bili.json', iconifyJSON, {
    spaces: 2,
  })
}

main()
