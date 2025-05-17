import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'bilicon | iconify',
  description: 'using bilibili icon everywhere by iconify!',
  themeConfig: {
    siteTitle: 'bilicon',
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' },
    // ],

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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
