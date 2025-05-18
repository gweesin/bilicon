import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  title: 'bilicon | iconify',
  description: 'using bilibili icon everywhere by iconify!',
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gweesin/bilicon' },
    ],
  },
})
