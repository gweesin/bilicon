import type { Theme } from 'vitepress'
import { biliIconifyJSON } from 'bilicon'
import { addCollection } from 'iconify-icon'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import BiliconIcons from '../components/BiliconIcons.vue'
import BiliconZhihuIcons from '../components/BiliconZhihuIcons.vue'
import './style.css'

addCollection(biliIconifyJSON)

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('BiliconIcons', BiliconIcons)
    app.component('BiliconZhihuIcons', BiliconZhihuIcons)
  },
} satisfies Theme
