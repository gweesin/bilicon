import type { BiliIconEmote, BiliIconPackage } from './types'
import { Buffer } from 'node:buffer'
import fs from 'node:fs/promises'
import path from 'node:path'

async function getEmotePackages(): Promise<BiliIconPackage[]> {
  const data = await fetch('https://api.bilibili.com/x/emote/user/panel/web?business=reply').then(response => response.json()).then(json => (json as unknown as { data: { packages: BiliIconPackage[] } }).data)

  return data.packages
}

async function getStandardIcons(): Promise<BiliIconEmote[]> {
  const packages = await getEmotePackages()
  return packages.find(pkg => pkg.text === '小黄脸')?.emote ?? []
}

async function encodeFromURL(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()

    const buffer = Buffer.from(arrayBuffer, 'binary')
    const base64 = buffer.toString('base64')

    return `data:image/png;base64,${base64}`
  }
  catch (error) {
    console.error('Error encoding from URL:', error)
    throw error // Re-throw the error for the caller to handle
  }
}

async function main(): Promise<void> {
  const icons = await getStandardIcons()

  await Promise.all(icons.map(async (icon) => {
    const dataURI = await encodeFromURL(icon.url)
    const filename = `${icon.meta.alias}.svg`
    const fileContent = `<svg viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
  <image xlink:href="${dataURI}" width="100%" height="100%" />
</svg>`

    return fs.writeFile(path.join('assets', filename), fileContent)
  }))
}

main()
