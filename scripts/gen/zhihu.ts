import type { ArrayExpression, Identifier, Literal, Node, ObjectExpression, Program, Property } from 'acorn'
import type { BiliIconGroups } from './icon-generator'
import { blankIconSet, writeJSONFile } from '@iconify/tools'
import {

  parse,

} from 'acorn'
import { simple } from 'acorn-walk'
import { author, license } from '../../package.json'
import { replaceSquareBrackets } from '../../src/utils'
import { encodeFromURL } from '../utils'
import { IconSpiderRunner } from './icon-generator'

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

class ZhihuIconSpiderRunner extends IconSpiderRunner {
  async getIconContent(url: string): Promise<string> {
    const dataURI = await encodeFromURL(url)

    return `<image width="100%" height="100%" xlink:href="${dataURI}" />`
  }

  async getIconGroups(): Promise<BiliIconGroups[]> {
    const code = await fetch('https://unpkg.zhimg.com/@cfe/emoticon@latest/lib/emoticon.js').then(res => res.text())
    const ast = parse(code, { ecmaVersion: 2020, locations: true })

    const emoticonGroups = convertToEmoticon(ast)

    return emoticonGroups.map(group => ({
      name: group.title,
      emotes: group.stickers.map((sticker) => {
        let name = replaceSquareBrackets(sticker.title)

        if (group.title !== '默认') {
          name = `${group.title}_${name}`
        }

        return {
          name,
          url: sticker.static_image_url,
        }
      }),
    }))
  }
}

async function main() {
  // TODO deal others
  const spiderRunner = new ZhihuIconSpiderRunner()
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

  await spiderRunner.run(iconSet)
  await writeJSONFile('./json/zhihu.json', iconSet.export())
}

main()
