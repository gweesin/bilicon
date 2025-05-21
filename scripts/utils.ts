import { Buffer } from 'node:buffer'

export async function encodeFromURL(url: string): Promise<string> {
  const response = await fetch(url)
  const blob = await response.blob()
  const arrayBuffer = await blob.arrayBuffer()

  const buffer = Buffer.from(arrayBuffer)
  const base64 = buffer.toString('base64')

  return `data:image/png;base64,${base64}`
}
