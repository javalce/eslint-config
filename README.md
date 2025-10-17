# @javalce/eslint-config

[![NPM version](https://img.shields.io/npm/v/@javalce/eslint-config.svg?style=flat-square&labelColor=000000)](https://www.npmjs.com/package/@javalce/eslint-config)
[![License](https://img.shields.io/npm/l/@javalce/eslint-config.svg?style=flat-square&labelColor=000000)](https://github.com/javalce/eslint-config/blob/main/LICENSE)

This configuration is opinionated and it may not fit your needs. You can extend it and override the rules that you don't like.

- [@javalce/eslint-config](#javalceeslint-config)
  - [Features](#features)
  - [Installation](#installation)
  - [Basic Usage](#basic-usage)
  - [Configuration](#configuration)
    - [Overriding rules and extended config](#overriding-rules-and-extended-config)
    - [Ignore files](#ignore-files)
    - [Custom path aliases](#custom-path-aliases)
    - [TypeScript](#typescript)
    - [Angular](#angular)
      - [Customizing selectors](#customizing-selectors)
    - [NgRx](#ngrx)
    - [React](#react)
    - [Next.js](#nextjs)
    - [Svelte](#svelte)
    - [Solidjs](#solidjs)
    - [Vue](#vue)
      - [Vue 2](#vue-2)
    - [TanStack](#tanstack)
    - [Astro](#astro)
    - [Testing](#testing)
      - [Testing with Jest](#testing-with-jest)
      - [Testing with Vitest](#testing-with-vitest)
      - [Testing Library](#testing-library)
  - [Credits](#credits)
  - [License](#license)

## Features

- Supports ESLint v9
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files) file format
- Does not lint `.gitignore` listed files (I think that if you don't want to track a file, you don't want to lint it)
- Designed to work with TypeScript, React, Next.js, Node.js, and more smoothly out of the box
- Automatically loads the config for the framework you are using
- Some rules can be auto-fixed with `eslint --fix`
- Uses some stylistic rules to make your code more readable and consistent

> [!IMPORTANT]
> I like to use Prettier to format my code, so the enabled stylistic rules are the ones that Prettier doesn't format.
>
> If you want to use Prettier, you can use my personal config [@javalce/prettier-config](https://www.npmjs.com/package/@javalce/prettier-config).

## Installation

Install ESLint and this config as dev dependencies:

```bash
pnpm add --save-dev eslint @javalce/eslint-config
```

## Basic Usage

Create an `eslint.config.mjs` file in the root of your project with the following content:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig();
```

By default it uses the ecmaVersion `2023`. If you want to use a different version, you can specify it in the configuration:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  javascript: {
    ecmaVersion: 2022,
  },
});
```

## Configuration

To configure ESLint, you have to use the `defineConfig` function, as shown in the previous section. This function will return the ESLint configuration object.

You have to enable each framework configuration explicitly, otherwise it will not be loaded except for the TypeScript config, which is loaded automatically.

After you enable a framework, if you don't have the required ESLint plugins for this framework installed, ESLint will throw an error when you run it showing you the missing plugins.

For more information about each configuration option, check the respective section.

### Overriding rules and extended config

Some rules are only enabled when you enable specific framework configurations. For example, in TypeScript rules (see [TypeScript](#typescript) for more information) if you want to force functions and methods to have a return type, you can enable the `@typescript-eslint/explicit-function-return-type` rule:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  typescript: {
    overrides: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
});
```

You can also extends the config by adding a plugin that it was not previously included in the preset:

```js
import { defineConfig } from '@javalce/eslint-config';
import { GLOBS_TS_FILES } from '@javalce/eslint-config/globs';
import perfectionist from 'eslint-plugin-perfectionist'

export default defineConfig({
  extends: [
    perfectionist.configs.['recommended-natural'],
  ],
});
```

This way we added a Perfectionist plugin configuration.

### Ignore files

By default, the ESLint configuration will ignore all files in the `.gitignore` file. If you want to ignore additional files, you can pass the `ignores` option to the configuration:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  ignores: ['src/types.d.ts'],
});
```

### Custom path aliases

By default, the configuration sets up two path alias patterns: `@/**` and `~/**`. These aliases are used to group and automatically order imports in your project, making it easier to organize internal modules.

You can customize these aliases using the `import.pathAliases` option in your configuration:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  import: {
    // You can use a string or an array of strings
    pathAliases: ['@/**', '#/**'],
  },
});
```

This will affect the "internal" import group and the order in which they appear according to the `import-x/order` rule. If you don't configure this option, the default aliases will be `@/**` and `~/**`.

### TypeScript

To enable TypeScript support, you only need to install the `typescript` package:

```bash
pnpm add --save-dev typescript
```

By default, it will automatically load the typescript config and the configuration will look for a `tsconfig.json` file in the root of your project.

Some projects use a `tsconfig.eslint.json` file to specify the typescript configuration for ESLint. In that case, it will automatically load the `tsconfig.eslint.json` file if it exists, otherwise it will load the `tsconfig.json` file.

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
  typescript: {
    tsconfigPath: './path/to/tsconfig.custom.json',
  },
});
```

Instead of using the absolute path to the tsconfig file(s) in the configuration, you can only pass the filename(s) and let the configuration resolve the absolute path for you.

### Angular

To enable Angular support, install the following package:

```bash
pnpm add --save-dev angular-eslint
```

Then, update your ESLint configuration file to enable Angular:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  angular: true,
});
```

This enables the recommended rules for Angular and its template parser.

#### Customizing selectors

The eslint plugin for Angular provides two rules to enforce a consistent style for Angular component and directive selectors: `@angular-eslint/directive-selector` and `@angular-eslint/component-selector`.

By default, the configuration enforces the use of `app` as the prefix for both Angular component and directive selectors. It also recommends using an `attribute` selector type with `camelCase` style for directives, and an `element` selector type with `kebab-case` style for components.

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  angular: true,
});
```

This will enforce the following conventions:

- Directives: `<div appMyDirective></div>` (attribute selector, camelCase style)
- Components: `<app-my-component></app-my-component>` (element selector, kebab-case style)

If you want to use a different prefix, selector type, or style, you can customize it using the `angular` option.

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  angular: {
    directive: {
      type: 'attribute',
      prefix: 'ng',
      style: 'camelCase',
    },
    component: {
      type: 'element',
      prefix: 'ng',
      style: 'kebab-case',
    },
  },
});
```

This will enforce the following conventions:

- Directives: `<div ngMyDirective></div>` (attribute selector, camelCase style)
- Components: `<ng-my-component></ng-my-component>` (element selector, kebab-case style)

### NgRx

NgRx is a Reactive State Management library for Angular applications and it provides an ESLint plugin to enforce best practices while using it.

NgRx has rules for:

- Store: RxJS powered global state management for Angular apps, inspired by Redux
- Effects: Side effect model for @ngrx/store
- ComponentStore: Standalone library for managing local/component state
- Operators: Shared RxJS operators for NgRx libraries
- Signals: Reactive store and set of utilities for Angular Signals

To enable NgRx support, you need to install the `eslint-plugin-ngrx` package:

```bash
pnpm add --save-dev eslint-plugin-ngrx
```

Then enable the rules you want:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  ngrx: {
    store: true,
    effects: true,
    componentStore: true,
    operators: true,
    signals: true,
  },
});
```

### React

To enable React support, you need to install the `eslint-plugin-react`, `eslint-plugin-react-hooks` and `eslint-plugin-jsx-a11y` packages:

```bash
pnpm add --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-jsx-a11y
```

Then, update your ESLint configuration file to enable the React config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  react: true,
});
```

### Next.js

To enable Next.js support, you need to install all the react plugins and the `@next/eslint-plugin-next` packages:

```bash
pnpm add --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-jsx-a11y @next/eslint-plugin-next
```

Then, update your ESLint configuration file to enable the react and Next.js config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  react: true,
  next: true,
});
```

This will enable the react rules and the Next.js specific rules.

### Svelte

To enable Svelte support, you need to install the `eslint-plugin-svelte` and `svelte-eslint-parser` packages:

```bash
pnpm add --save-dev eslint-plugin-svelte svelte-eslint-parser
```

Then, update your ESLint configuration file to enable the Svelte config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  svelte: true,
});
```

### Solidjs

To enable Solidjs support, you need to install the `eslint-plugin-solid` package:

```bash
pnpm add --save-dev eslint-plugin-solid
```

Then, update your ESLint configuration file to enable the Solidjs config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  solidjs: true,
});
```

### Vue

To enable Vue support, you need to install the `eslint-plugin-vue` and `vue-eslint-parser` package:

```bash
pnpm add --save-dev eslint-plugin-vue vue-eslint-parser
```

Then, update your ESLint configuration file to enable the Vue config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  vue: true,
});
```

#### Vue 2

Vue 2 has [reached EOL](https://v2.vuejs.org/eol/) and it's not recommended to use it. However, if you still want to use it, you can enable the Vue 2 config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  vue: {
    version: 2,
  },
});
```

### TanStack

[TanStack](https://tanstack.com/) provides powerful tools for building web applications.

The [@tanstack/query](https://tanstack.com/query/latest) and [@tanstack/router](https://tanstack.com/router/latest) libraries have ESLint plugins to enforce best practices while using them.

To enable TanStack Query and Router support, you need to install the `@tanstack/eslint-plugin-query` and `@tanstack/eslint-plugin-router` packages:

```bash
pnpm add --save-dev @tanstack/eslint-plugin-query @tanstack/eslint-plugin-router
```

Then enable the rules you want:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  tanstack: {
    query: true,
    router: true,
  },
});
```

### Astro

To enable Astro support, you need to install the `astro-eslint-plugin`, `astro-eslint-parser` and `eslint-plugin-jsx-a11y` package:

```bash
pnpm add --save-dev astro-eslint-plugin astro-eslint-parser eslint-plugin-jsx-a11y
```

Then, update your ESLint configuration file to enable the Astro config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  astro: true,
});
```

Astro can be integrated with other frameworks like React, Vue, Svelte, Solidjs, etc. You can enable the respective configs to lint the code of the framework.

### Testing

To enable testing support, you must enable the `test` option in the configuration. You can choose between `jest` or `vitest` and it will load the recommended rules for each testing library.

#### Testing with Jest

If you are using Jest, install the `eslint-plugin-jest` package:

```bash
pnpm add --save-dev eslint-plugin-jest
```

Then, update your ESLint configuration file to enable the Jest config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  test: {
    framework: 'jest',
  },
});
```

#### Testing with Vitest

If you are using Vitest, install the `eslint-plugin-vitest` package:

```bash
pnpm add --save-dev eslint-plugin-vitest
```

Then, update your ESLint configuration file to enable the Vitest config:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  test: {
    framework: 'vitest',
  },
});
```

#### Testing Library

Testing Library helps you to test UI components, so to enable it you need to install the `eslint-plugin-testing-library` package:

```bash
pnpm add --save-dev eslint-plugin-testing-library
```

Then, enable the testing library:

```js
import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  angular: true,
  react: true,
  vue: true,
  svelte: true,
  test: {
    framework: 'vitest',
    testingLibrary: true,
  },
});
```

Testing Library will enable the recommended rules for the specific framework you are using.

## Credits

- [@antfu/eslint-config](https://github.com/antfu/eslint-config) - source codes [MIT](https://github.com/antfu/eslint-config/blob/main/LICENSE)

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [Javier Valero](https://github.com/javalce)
