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
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new) file format
- Does not lint `.gitignore` listed files (I think that if you don't want to track a file, you don't want to lint it)
- Designed to work with TypeScript, React, Next.js, Node.js, and more
- Some rules can be auto-fixed with `eslint --fix`
- Stylistic rules are disabled because they are intented to be used with Prettier (the formatter I like to use)
- A few stylistic rules are enabled because they are not covered by Prettier

## Installation

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

Instead of using the passing the path to the tsconfig file(s) in the configuration, you can only pass the filename(s) and let the configuration resolve the absolute path for you.

## React

Update your ESLint configuration file to enable the React config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  react: true,
});
```

### TypeScript + React

To be able to use TypeScript with React, you need to enable both TypeScript and React configs:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  typescript: true,
  react: true,
});
```

> [!NOTE]
> When you enable both TypeScript and React configs, it will automatically disable some TypeScript rules.

#### TypeScript React Rules

This configuration will turn off some rules that I think are a bit problematic when using TypeScript with React.

- `@typescript-eslint/explicit-function-return-type`: This rule is turned off because it's troublesome to define the return type of custom React hooks, for example.
- `@typescript-eslint/no-confusing-void-expression`: This rule is turned off because of jsx expressions that return `void` are common in React.
- `@typescript-eslint/no-floating-promises`: This rule is turned off because it's common to use promises in React components.
- `@typescript-eslint/no-non-null-assertion`: This rule is turned off because it's common to use non-null assertions in React components.
- `@typescript-eslint/no-shadow`: This rule is turned off because it's common to shadow variables in React components. For example, when you destructure props or in a callback function.

## Next.js

To enable Next.js support, you need to install the `@next/eslint-plugin-next` package in a next.js project:

```bash
# If you use npm
npm install --save-dev @next/eslint-plugin-next

# If you use yarn
yarn add --dev @next/eslint-plugin-next

# If you use pnpm
pnpm add --save-dev @next/eslint-plugin-next
```

Then, update your ESLint configuration file to enable the Next.js config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  react: true,
  next: true,
});
```

The next.js config will only load the `@next/eslint-plugin-next` plugin and the recommended rules. To enable the react rules you must enable the react config.

## Testing

To enable testing support, you must enable the `testing` option in the configuration. You can choose between `jest` or `vitest`:

### Testing with Jest

If you are using Jest, it will load the recommended and style rules for Jest:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  testing: 'jest',
});
```

### Testing with Vitest

If you are using Vitest, it will load the recommended rules for Vitest:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  testing: 'vitest',
});
```

### Testing + React

To enable testing with React, you need to enable both testing and react configs. It will load the recommended rules of the `@testing-library/react` plugin:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  react: true,
  testing: 'jest', // or 'vitest'
});
```
