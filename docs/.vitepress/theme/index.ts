import type { Theme } from 'vitepress'
import { biliIconifyJSON, douyinIconifyJSON, zhihuIconifyJSON } from 'bilicon'
import { addCollection } from 'iconify-icon'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import BiliconIcons from '../components/BiliconIcons.vue'
import BiliconSingleCollection from '../components/BiliconSingleCollection.vue'
import './style.css'

addCollection(biliIconifyJSON)
addCollection(zhihuIconifyJSON)
addCollection(douyinIconifyJSON)

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('BiliconIcons', BiliconIcons)
    app.component('BiliconSingleCollection', BiliconSingleCollection)
  },
} satisfies Theme
