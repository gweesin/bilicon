import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: 'bilicon | iconify',
  description: 'using bilibili icon/emotions everywhere by iconify!',
  themeConfig: {
    siteTitle: 'bilicon',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Icons', link: '/page/icons' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is bilicon?', link: '/guide/what-is-bilicon' },
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'Icons',
        items: [
          { text: 'bilibili', link: '/page/icons' },
          { text: 'zhihu', link: '/page/zhihu' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gweesin/bilicon' },
    ],
  },
})
