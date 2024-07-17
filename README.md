# @javalce/eslint-config

<a aria-label="NPM version" href="https://www.npmjs.com/package/@javalce/eslint-config">
  <img alt="" src="https://img.shields.io/npm/v/@javalce/eslint-config.svg?style=flat-square&labelColor=000000">
</a>
<a aria-label="License" href="https://github.com/javalce/eslint-config/blob/main/LICENSE">
  <img alt="" src="https://img.shields.io/npm/l/@javalce/eslint-config.svg?style=flat-square&labelColor=000000">
</a>

## Features

- Designed to work with TypeScript
- Some rules can be auto-fixed with `eslint --fix`
- Some stylistic rules are disabled because they are intented to be used with Prettier. You can use my personal config [@javalce/prettier-config](https://www.npmjs.com/package/@javalce/prettier-config)
- Supports ESLint v9 or v8.40.0+
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new) file format
- Does not lint `.gitignore` listed files

## Installation

> [!IMPORTANT]
> ESLint is a peer dependency of this package, and it must be installed separately.

```bash
# If you use npm
npm install --save-dev eslint @javalce/eslint-config

# If you use yarn
yarn add --dev eslint @javalce/eslint-config

# If you use pnpm
pnpm add --save-dev eslint @javalce/eslint-config
```

## Usage

Create an `eslint.config.mjs` file in the root of your project with the following content:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({});
```

## TypeScript

To enable TypeScript support, first you need to install the `typescript` package:

```bash
# If you use npm
npm install --save-dev typescript

# If you use yarn
yarn add --dev typescript

# If you use pnpm
pnpm add --save-dev typescript
```

Then, update your ESLint configuration file to enable the TypeScript config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  typescript: true,
});
```

By default, the configuration will look for a `tsconfig.json` file in the root of your project. If you want to use a different file, you can specify it in the configuration:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  typescript: {
    tsconfigPath: './path/to/tsconfig.json',
  },
});
```

Or you can use multiple tsconfig files:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  typescript: {
    tsconfigPath: ['./path/to/tsconfig.json', './path/to/another/tsconfig.json'],
  },
});
```

> [!NOTE]
> You can also simply pass the name of the tsconfig file(s) without the path, because it will resolve the absolute path for you.
>
> It will resolve to the root of your project.
