# Getting Started

## Installation

### Prerequisites

Make sure you have the following installed:

- [iconify-icon](https://www.npmjs.com/package/iconify-icon) if used in the web component, see [Iconify Icon Web Component](https://iconify.design/docs/iconify-icon/) for the details
- [@iconify/react](https://www.npmjs.com/package/@iconify/react) if used in React, see [Iconify for React](https://iconify.design/docs/icon-components/react/) for the details
- [@iconify/vue](https://www.npmjs.com/package/@iconify/vue) if used in Vue, see [Iconify for Vue](https://iconify.design/docs/icon-components/vue/) for the details
- [@iconify/svelte](https://www.npmjs.com/package/@iconify/svelte) if used in Svelte, see [Iconify for Svelte](https://iconify.design/docs/icon-components/svelte/) for the details

And then install bilicon using your package manager of choice:

::: code-group

```sh [npm]
$ npm add -S bilicon
```

```sh [pnpm]
$ pnpm add -S bilicon
```

```sh [yarn]
$ yarn add -S bilicon
```

```sh [yarn (pnp)]
$ yarn add -S bilicon
```

```sh [bun]
$ bun add -S bilicon
```

:::

## Usage

Congratulations! you have successfully installed bilicon. Now you can start using it in your project.

::: code-group

```js [Web Component]
import { biliIconifyJSON } from 'bilicon'
import { addCollection } from 'iconify-icon'

addCollection(biliIconifyJSON)

// Now you can use bilicon in your html as a web component
// <iconify-icon icon="bili:doge" />
```

```js [React]
import { addCollection, Icon } from '@iconify/react'
import { biliIconifyJSON } from 'bilicon'

addCollection(biliIconifyJSON)

// <Icon icon="bili:doge" />
```

```js [Vue]
import { addCollection, Icon } from '@iconify/vue'
import { biliIconifyJSON } from 'bilicon'

addCollection(biliIconifyJSON)

// <Icon icon="bili:doge" />
```

```js [Svelte]
import Icon, { addCollection } from '@iconify/svelte'
import { biliIconifyJSON } from 'bilicon'

addCollection(biliIconifyJSON)

// <Icon icon="bili:doge" />
```

:::

<iconify-icon icon="bili:doge" width="50"/>

## zhihu

::: tip v0.1.0

v0.1.0 already support zhihu!!!

:::

::: code-group

```js [Web Component]
import { zhihuIconifyJSON } from 'bilicon'
import { addCollection } from 'iconify-icon'

addCollection(zhihuIconifyJSON)

// Now you can use zhihu emoticon in your html as a web component
// <iconify-icon icon="zhihu:吃瓜" />
```

```js [React]
import { addCollection, Icon } from '@iconify/react'
import { zhihuIconifyJSON } from 'bilicon'

addCollection(zhihuIconifyJSON)

// <Icon icon="zhihu:吃瓜" />
```

```js [Vue]
import { addCollection, Icon } from '@iconify/vue'
import { zhihuIconifyJSON } from 'bilicon'

addCollection(zhihuIconifyJSON)

// <Icon icon="zhihu:吃瓜" />
```

```js [Svelte]
import Icon, { addCollection } from '@iconify/svelte'
import { zhihuIconifyJSON } from 'bilicon'

addCollection(zhihuIconifyJSON)

// <Icon icon="zhihu:吃瓜" />
```

:::

<iconify-icon icon="zhihu:吃瓜" width="50"/>
