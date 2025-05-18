<br />

<p align="center"><a href="https://bilicon.netlify.app/" target="_blank" rel="noopener noreferrer"><img width="200" src="https://bilicon.netlify.app/images/logo.png" alt="Bilibili Iconify Logo"></a></p>

<h1 align="center">bilicon</h1>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![Netlify Status](https://api.netlify.com/api/v1/badges/3bd17822-81c1-4ec8-8b35-303a584de069/deploy-status)](https://app.netlify.com/projects/bilicon/deploys)

[English](./README.md) | 中文

通过 iconify 在任何地方使用 B 站表情包！

## 动机

B 站有很多有意思的表情包，想在其他应用里使用这些表情包非常困难。这个项目旨在提供一种方法，可以在任何支持 iconify 的应用中使用 B 站的表情包。

## 安装

1. 安装依赖

    ```shell
    pnpm i -S bilicon
    ```

2. 集成到 iconify 中

    ```js
    import { biliIconifyJSON } from 'bilicon'
    import { addCollection } from 'iconify-icon'

    addCollection(biliIconifyJSON)
    ```

3. 在 HTML 中使用

```html
<iconify-icon icon="bili:doge" />
```

> [!TIP]
> 更多详情见 [快速开始](https://bilicon.netlify.app/guide/getting-started.html)

## 许可证

[MIT](./LICENSE) 许可证 © [Gweesin](https://github.com/gweesin)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/bilicon?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/bilicon
[npm-downloads-src]: https://img.shields.io/npm/dm/bilicon?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/bilicon
[bundle-src]: https://img.shields.io/bundlephobia/minzip/bilicon?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=bilicon
[license-src]: https://img.shields.io/github/license/gweesin/bilicon.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/gweesin/bilicon/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/bilicon
