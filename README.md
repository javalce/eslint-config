# @javalce/eslint-config

<a aria-label="NPM version" href="https://www.npmjs.com/package/@javalce/eslint-config">
  <img alt="" src="https://img.shields.io/npm/v/@javalce/eslint-config.svg?style=flat-square&labelColor=000000">
</a>
<a aria-label="License" href="https://github.com/javalce/eslint-config/blob/main/LICENSE">
  <img alt="" src="https://img.shields.io/npm/l/@javalce/eslint-config.svg?style=flat-square&labelColor=000000">
</a>

This configuration is opinionated and it may not fit your needs. You can extend it and override the rules that you don't like.

## Features

> [!NOTE]
> This configuration is designed to be used with Prettier for code formatting. You can use my personal config [@javalce/prettier-config](https://www.npmjs.com/package/@javalce/prettier-config).

- Supports ESLint v9 or v8.40.0+
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files) file format
- Does not lint `.gitignore` listed files (I think that if you don't want to track a file, you don't want to lint it)
- Designed to work with TypeScript, React, Next.js, Node.js, and more smoothly out of the box
- Some rules can be auto-fixed with `eslint --fix`
- Stylistic rules are disabled because they are intented to be used with Prettier (the formatter I like to use)
- A few stylistic rules are enabled because they are not covered by Prettier

> Thanks to [antfu/eslint-config](https://github.com/antfu/eslint-config) for the inspiration and reference and [vercel/style-guide](https://github.com/vercel/style-guide) for the amazing eslint rules and config for JavaScript, TypeScript and React.

## Installation

```bash
# If you use npm
npm install --save-dev eslint @javalce/eslint-config

# If you use yarn
yarn add --dev eslint @javalce/eslint-config

# If you use pnpm
pnpm add --save-dev eslint @javalce/eslint-config
```

> [!NOTE]
> From now on, I will assume that you are using `pnpm` as your package manager in the examples.

## Basic Usage

Create an `eslint.config.mjs` file in the root of your project with the following content:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({});
```

By default it uses the ecmaVersion `2021`. If you want to use a different version, you can specify it in the configuration:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  ecmaVersion: 2022,
});
```

### TypeScript

To enable TypeScript support, you only need to install the `typescript` package:

```bash
pnpm add --save-dev typescript
```

By default, it will automatically load the typescript config and the configuration will look for a `tsconfig.json` file in the root of your project.

If you want, you can enable explicitly the TypeScript config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  typescript: true,
});
```

Also, if you want to use a different file, you can specify it in the configuration:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  typescript: './path/to/tsconfig.custom.json',
});
```

Or you can use multiple tsconfig files:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  typescript: ['./path/to/tsconfig.json', './path/to/another/tsconfig.json'],
});
```

Instead of using the passing the path to the tsconfig file(s) in the configuration, you can only pass the filename(s) and let the configuration resolve the absolute path for you.

## React

To enable React support, you need to install the `eslint-plugin-react` and `eslint-plugin-react-hooks` packages:

```bash
pnpm add --save-dev eslint-plugin-react eslint-plugin-react-hooks
```

Then, update your ESLint configuration file to enable the React config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  react: true,
});
```

### TypeScript + React

When you enable both TypeScript and React configs, it will turn off some rules that I think are a bit problematic when using TypeScript with React.

- `@typescript-eslint/explicit-function-return-type`: This rule is turned off because it's troublesome to define the return type of custom React hooks, for example.
- `@typescript-eslint/no-confusing-void-expression`: This rule is turned off because of jsx expressions that return `void` are common in React.
- `@typescript-eslint/no-floating-promises`: This rule is turned off because it's common to use promises in React components.
- `@typescript-eslint/no-non-null-assertion`: This rule is turned off because it's common to use non-null assertions in React components.
- `@typescript-eslint/no-shadow`: This rule is turned off because it's common to shadow variables in React components. For example, when you destructure props or in a callback function.

## Next.js

To enable Next.js support, you need to install all the react plugins and the `@next/eslint-plugin-next` package:

```bash
# If you use npm
pnpm add --save-dev eslint-plugin-react eslint-plugin-react-hooks @next/eslint-plugin-next
```

Then, update your ESLint configuration file to enable the Next.js config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  react: 'next',
});
```

The next.js config will only load the `@next/eslint-plugin-next` plugin and the recommended rules. To enable the react rules you must enable the react config.

## Svelte

To enable Svelte support, you need to install the `eslint-plugin-svelte` package:

```bash
pnpm add --save-dev eslint-plugin-svelte
```

Then, update your ESLint configuration file to enable the Svelte config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  svelte: true,
});
```

## Solidjs

To enable Solidjs support, you need to enable the Solidjs config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  solidjs: true,
});
```

## Vue

To enable Vue support, you need to install the `eslint-plugin-vue` package:

```bash
pnpm add --save-dev eslint-plugin-vue
```

Then, update your ESLint configuration file to enable the Vue config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  vue: true,
});
```

### Vue 2

Vue 2 has [reached EOL](https://v2.vuejs.org/eol/) and it's not recommended to use it. However, if you still want to use it, you can enable the Vue 2 config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  vue: {
    version: 2,
  },
});
```

## Astro

To enable Astro support, you need to install the `astro-eslint-plugin` package:

```bash
pnpm add --save-dev astro-eslint-plugin
```

Then, update your ESLint configuration file to enable the Astro config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  astro: true,
});
```

Astro can be integrated with other frameworks like React, Vue, Svelte, Solidjs, etc. You can enable the respective configs to lint the code of the framework.

## Testing

To enable testing support, you must enable the `testing` option in the configuration. You can choose between `jest` or `vitest` and it will load the recommended rules for each testing library.

### Testing with Jest

If you are using Jest, install the `eslint-plugin-jest` package:

```bash
pnpm add --save-dev eslint-plugin-jest
```

Then, update your ESLint configuration file to enable the Jest config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  testing: 'jest',
});
```

### Testing with Vitest

If you are using Vitest, install the `eslint-plugin-vitest` package:

```bash
pnpm add --save-dev eslint-plugin-vitest
```

Then, update your ESLint configuration file to enable the Vitest config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  testing: 'vitest',
});
```

### Testing + React

To enable testing with React, you need to enable both testing and react configs. Also, you need to install the `eslint-plugin-testing-library` package and the testing and react plugins:

```bash
pnpm add --save-dev eslint-plugin-testing-library
```

Then, update your ESLint configuration file to enable the React and Testing configs:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  react: true,
  testing: 'jest', // or 'vitest'
});
```
