<br />

<p align="center"><a href="https://bilicon.netlify.app/" target="_blank" rel="noopener noreferrer"><img width="200" src="https://bilicon.netlify.app/images/logo.png" alt="Bilibili Iconify Logo"></a></p>

<h1 align="center">bilicon</h1>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![Netlify Status](https://api.netlify.com/api/v1/badges/3bd17822-81c1-4ec8-8b35-303a584de069/deploy-status)](https://app.netlify.com/projects/bilicon/deploys)

English | [中文](./README.zh-CN.md)

using bilibili icon/emotions everywhere with iconify!!

## Motivation

Bilibili has many interesting emojis, and it's very difficult to use them in other applications. This project aims to provide a way to use Bilibili's emojis in any application that supports iconify.

## Installation

1. install dependencies

    ```shell
    pnpm i -S bilicon
    ```

2. import and add as a collection to the iconify

    ```js
    import { biliIconifyJSON } from 'bilicon'
    import { addCollection } from 'iconify-icon'

    addCollection(biliIconifyJSON)
    ```

3. use in HTML

```html
<iconify-icon icon="bili:doge" />
```

> [!TIP]
> More details in the [quick start](https://bilicon.netlify.app/guide/getting-started.html)

## License

[MIT](./LICENSE) License © [Gweesin](https://github.com/gweesin)

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
