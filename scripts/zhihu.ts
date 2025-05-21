import type { ArrayExpression, Identifier, Literal, Node, ObjectExpression, Program, Property } from 'acorn'
import { blankIconSet } from '@iconify/tools'
import { parse } from 'acorn'
import { simple } from 'acorn-walk'
import fse from 'fs-extra'
import pLimit from 'p-limit'
import { author, license } from '../package.json'
import { replaceSquareBrackets } from '../src/utils'
import { encodeFromURL } from './utils'

interface Sticker {
  static_image_url: string
  title: string
  placeholder: string
}

interface EmoticonGroup {
  title: string
  stickers: Sticker[]
  version: number
  selected_icon_url?: string | null
  type?: string
  group_type?: number
}

function convertNode(node: Node): any {
  switch (node.type) {
    case 'ArrayExpression':
      return (node as ArrayExpression).elements.map(element => convertNode(element!))
    case 'ObjectExpression': {
      const objNode = node as ObjectExpression
      const obj: Record<string, any> = {}

      for (const prop of objNode.properties) {
        const property = prop as Property
        const key = property.key.type === 'Identifier'
          ? (property.key as Identifier).name
          : (property.key as Literal).value
        obj[key as string] = convertNode(property.value as Node)
      }
      return obj
    }
    case 'Literal':
      return (node as Literal).value
    default:
      throw new Error(`Unsupported node type: ${node.type}`)
  }
}

function convertToEmoticon(ast: Program): EmoticonGroup[] {
  let emoticonGroups: EmoticonGroup[] = []
  simple(ast, {
    VariableDeclarator(node) {
      if (
        node.id.type === 'Identifier'
        && node.id.name === 'emoticon'
        && node.init?.type === 'ArrayExpression'
      ) {
        emoticonGroups = convertNode(node.init)
      }
    },
  })

  return emoticonGroups
}

async function main() {
  const code = await fetch('https://unpkg.zhimg.com/@cfe/emoticon@latest/lib/emoticon.js').then(res => res.text())
  const ast = parse(code, { ecmaVersion: 2020, locations: true })

  const emoticonGroups = convertToEmoticon(ast)
  // TODO deal others
  const defaultEmoticon = emoticonGroups.find(emoticonGrp => emoticonGrp.title === '默认')!
  // defaultEmoticon.stickers

  const iconSet = blankIconSet('zhihu')
  iconSet.info = {
    name: 'zhihu',
    author: {
      name: author.replace(/<.*>/g, ''),
    },
    license: {
      title: license,
    },
  }

  const limit = pLimit(10)

  await Promise.all(defaultEmoticon.stickers.map(icon =>
    limit(async () => {
      const dataURI = await encodeFromURL(icon.static_image_url)

      iconSet.setIcon(replaceSquareBrackets(icon.title), {
        body: `<image width="100%" height="100%" xlink:href="${dataURI}" />`,
      })
    }),
  ))

  const orderMap = defaultEmoticon.stickers.reduce((map, icon, idx) => {
    map[replaceSquareBrackets(icon.title)] = idx
    return map
  }, {} as Record<string, number>)
  await fse.writeJSON('./docs/assets/zhihu-order.json', orderMap)
  await fse.writeJSON('./json/zhihu.json', iconSet.export(), {
    spaces: 2,
  })
}

main()
