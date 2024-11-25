# [0.8.0](https://github.com/javalce/eslint-config/compare/v0.8.0-beta.4...v0.8.0) (2024-11-25)

### Features

- add project type selection to init command and update ESLint config generation ([2cb675f](https://github.com/javalce/eslint-config/commit/2cb675f696b9a7a99bd9344afcc932fe7a9fb4a8))
- enhance init command with handle cancel ([8ef550e](https://github.com/javalce/eslint-config/commit/8ef550ee844a5eae4131f1b1801b77b4dcc6855f))

# [0.8.0-beta.4](https://github.com/javalce/eslint-config/compare/v0.8.0-beta.3...v0.8.0-beta.4) (2024-11-21)

### Bug Fixes

- allow default exports on Next.js ([8bc1539](https://github.com/javalce/eslint-config/commit/8bc1539b63f9132a24cef583cdef3da86c6cb8d5))

# [0.8.0-beta.3](https://github.com/javalce/eslint-config/compare/v0.8.0-beta.2...v0.8.0-beta.3) (2024-11-20)

### Features

- add support for 'deno' as a package manager and fix typo in spinner message ([fd8695f](https://github.com/javalce/eslint-config/commit/fd8695f4f5889506262d988fdd0939ef8b06a371))
- enhance dependency validation and ESLint configuration checks in add command ([ed423f8](https://github.com/javalce/eslint-config/commit/ed423f84817c787ad10300cf692e10cbaa0bed4d))

# [0.8.0-beta.2](https://github.com/javalce/eslint-config/compare/v0.8.0-beta.1...v0.8.0-beta.2) (2024-11-11)

### Bug Fixes

- correct dependency handling and adjust ESLint config filename order ([943ef85](https://github.com/javalce/eslint-config/commit/943ef852bdc0ca2019a06bf4a649d996ee55ce7a))

# [0.8.0-beta.1](https://github.com/javalce/eslint-config/compare/v0.7.1...v0.8.0-beta.1) (2024-10-22)

### Bug Fixes

- remove library option from CLI init and update dependency handling ([3ceb538](https://github.com/javalce/eslint-config/commit/3ceb538fe1ca59c55a08aae3b0fbdc9c3dc3d530))
- update dependencies for Next.js framework and remove redundant dependency handling ([ae43f5f](https://github.com/javalce/eslint-config/commit/ae43f5fdd49323e4827c5c03f6b0cab768ea4fa1))

### Features

- add CLI commands for project initialization and config management, and update dependencies ([09bef79](https://github.com/javalce/eslint-config/commit/09bef7960ab536f352d54f88df0509e45516920d))
- add CLI entry point and enhance CLI execution flow ([6f466c1](https://github.com/javalce/eslint-config/commit/6f466c151e686892714262a84286115df481556a))
- add Zod validation for CLI init options and define frameworks/constants ([e16f971](https://github.com/javalce/eslint-config/commit/e16f97170311561008242962b8a5a1782c5c132e))
- enhance CLI 'add' command with ESLint config checks and dependency installation ([29e9180](https://github.com/javalce/eslint-config/commit/29e9180b03ddcae8f56c60cecf6f7688d9de7778))
- enhance CLI initialization with dynamic ESLint config generation and dependency management ([e22b2d6](https://github.com/javalce/eslint-config/commit/e22b2d6f6c86028c63c2944df3be7d7509bb9bc6))
- implement CLI logger and basic signal handling ([b1ae12d](https://github.com/javalce/eslint-config/commit/b1ae12d943f83d0420a8d9fdac6d2cfc42a142d9))

## [0.7.1](https://github.com/javalce/eslint-config/compare/v0.7.0...v0.7.1) (2024-10-16)

### Bug Fixes

- configurec correctly testing-library eslint plugin ([33b04a1](https://github.com/javalce/eslint-config/commit/33b04a1e8edc4395c638821bfb174445bcb014ec))
- remove unused typescript option on react config ([a126cee](https://github.com/javalce/eslint-config/commit/a126ceefe1fe9ace9a2e1fb7c7cf9acaccf28699))

# [0.7.0](https://github.com/javalce/eslint-config/compare/v0.6.2...v0.7.0) (2024-10-08)

### Features

- add project type support and update TypeScript rules configuration ([8039d3b](https://github.com/javalce/eslint-config/commit/8039d3b8378c94a7879be02b9eb98d13e5719f34))
- add rule to allow empty classes with decorators in TypeScript ([7825cc5](https://github.com/javalce/eslint-config/commit/7825cc5fee48228b1180d6a78513042ebf62ab54))
- add stylistic rules for class member spacing and extra semicolons ([9b18876](https://github.com/javalce/eslint-config/commit/9b18876ba264e704ffe331d06944bad9ff3be434))
- add support for project type in options configuration ([97be693](https://github.com/javalce/eslint-config/commit/97be6934a56d9c69c7983fcf9a92ec4fd62092a2))
- remove TypeScript ESLint configuration for React rules ([90682c8](https://github.com/javalce/eslint-config/commit/90682c8f4f3471a12f4565494cc89a9dd88c9a52))

## [0.6.2](https://github.com/javalce/eslint-config/compare/v0.6.1...v0.6.2) (2024-09-25)

### Bug Fixes

- update testing configuration to handle jest and vitest separately ([6128691](https://github.com/javalce/eslint-config/commit/6128691fe0e7f5d212f9b6a4bd5623a8c499fefc))

## [0.6.1](https://github.com/javalce/eslint-config/compare/v0.6.0...v0.6.1) (2024-09-23)

### Bug Fixes

- disable deprecated eslint rule in typegen script ([9ee2ec9](https://github.com/javalce/eslint-config/commit/9ee2ec9517852c349a72f1f972fe31d4026fc7fd))
- update Vue config to use parserOptions and set sourceType to module ([efcd387](https://github.com/javalce/eslint-config/commit/efcd3878c389986a78336f0a8978d974cfe01f4a))

### Features

- add custom Vue rules and configuration for improved linting ([397da1c](https://github.com/javalce/eslint-config/commit/397da1cc0c1c3030e28e7aa938e370654c306d26))
- add vue-eslint-parser and local-pkg for improved Vue linting support ([c056d89](https://github.com/javalce/eslint-config/commit/c056d891d04e5a7d0e9702d7c15a8b016d5fcd5f))
- integrate testing-library configuration for Jest and Vitest ([4380072](https://github.com/javalce/eslint-config/commit/4380072105ad52bffbfa79f3ceeb9c0004769dd8))

# [0.6.0](https://github.com/javalce/eslint-config/compare/v0.5.0...v0.6.0) (2024-09-21)

### Features

- add SolidJS support with ESLint configuration and update type definitions ([db1c9f7](https://github.com/javalce/eslint-config/commit/db1c9f7bb20b4418e3f85bcb3e95f960fc9d9f39))
- add Svelte support with ESLint configuration and update type definitions ([22c8239](https://github.com/javalce/eslint-config/commit/22c823961d9ae12759990d4cf06aa87549d24818))
- add Vue support with ESLint configuration and update type definitions ([c890990](https://github.com/javalce/eslint-config/commit/c890990d98b478f974fdbdbbb5a43c6409f620ae))
- update ESLint peer dependencies and make several plugins optional ([0938e01](https://github.com/javalce/eslint-config/commit/0938e01dca6c5be1b51b8634fba73d9849cf9bfa))

# [0.5.0](https://github.com/javalce/eslint-config/compare/v0.4.3...v0.5.0) (2024-09-20)

### Features

- add Astro support to ESLint configuration ([6a02fa0](https://github.com/javalce/eslint-config/commit/6a02fa03559b1c3eab33858d72f29f36f7a3d53f))
- disable specific TypeScript rules for better compatibility ([ca0dced](https://github.com/javalce/eslint-config/commit/ca0dcedb6ac18c967c414175394ce057dfca93cb))
- use official vitest plugin for eslint ([eb4056b](https://github.com/javalce/eslint-config/commit/eb4056b27c35b8215eb1798900e4ff68f153916d))

## [0.4.3](https://github.com/javalce/eslint-config/compare/v0.4.2...v0.4.3) (2024-09-16)

### Features

- enable lazy loading for Next.js ESLint plugin ([b9db418](https://github.com/javalce/eslint-config/commit/b9db418a72cfca717be278364263d0488c654136))

## [0.4.2](https://github.com/javalce/eslint-config/compare/v0.4.1...v0.4.2) (2024-09-12)

### Bug Fixes

- restrict file paths for react configuration ([8b2d600](https://github.com/javalce/eslint-config/commit/8b2d600efb35eda194ceb61b589f35c6d59169d4))

### Features

- allow to choose ecma version instead of a fixed one ([ed6121f](https://github.com/javalce/eslint-config/commit/ed6121fc9e8d974f22df75ba734da466c3399532))

## [0.4.1](https://github.com/javalce/eslint-config/compare/v0.4.0...v0.4.1) (2024-09-10)

### Bug Fixes

- update types ([25de47c](https://github.com/javalce/eslint-config/commit/25de47c5d55bb6711df967359bff16729451174a))
- update typing errors ([a9a3fa3](https://github.com/javalce/eslint-config/commit/a9a3fa36013126459aae7ceb8962ef1101437cfa))

### Features

- disable import-x/no-default-export for config files ([d311e0a](https://github.com/javalce/eslint-config/commit/d311e0a050afaf461841bb1c8bc0e44a3bfe6432))

# [0.4.0](https://github.com/javalce/eslint-config/compare/v0.3.2...v0.4.0) (2024-09-03)

### Bug Fixes

- update typing errors ([3328406](https://github.com/javalce/eslint-config/commit/3328406a67e770d8bb91ec22f1f11161add16ed9))

### Features

- add testing option for jest ([c9f34d2](https://github.com/javalce/eslint-config/commit/c9f34d2309e4573a84da4a7b147b857d58b3fe24))
- add testing option for vitest ([b7f2af2](https://github.com/javalce/eslint-config/commit/b7f2af236f632e9bef7c03511b6e5b1d8234b1e2))
- enable TypeScript by default in defineConfig options ([025b00d](https://github.com/javalce/eslint-config/commit/025b00d8a54e4aa9ac18a3611595f1f20cc1aa1e))

## [0.3.2](https://github.com/javalce/eslint-config/compare/v0.3.1...v0.3.2) (2024-08-27)

### Bug Fixes

- check if can import babel from next ([c4f92ca](https://github.com/javalce/eslint-config/commit/c4f92caf910bd497ac74c0437bcb59e13e726bc2))
- get correct babel opttions for nextjs config ([b6fc0cd](https://github.com/javalce/eslint-config/commit/b6fc0cd5c910ff9bbaa102d7b5a0e6a5d591f9c7))

## [0.3.1](https://github.com/javalce/eslint-config/compare/v0.3.0...v0.3.1) (2024-07-30)

### Bug Fixes

- correct package import ([d2bf189](https://github.com/javalce/eslint-config/commit/d2bf18913f848f66c66ebf408e866a74b8765224))

# [0.3.0](https://github.com/javalce/eslint-config/compare/v0.2.0...v0.3.0) (2024-07-30)

### Features

- add support for Next.js in eslint configuration ([8ee29b8](https://github.com/javalce/eslint-config/commit/8ee29b84a9fb879d1d47a5fcb5e2e7f5d4c0d8ac))

# [0.2.0](https://github.com/javalce/eslint-config/compare/v0.2.0-beta.5...v0.2.0) (2024-07-30)

# [0.2.0-beta.5](https://github.com/javalce/eslint-config/compare/v0.2.0-beta.4...v0.2.0-beta.5) (2024-07-26)

### Bug Fixes

- update react-hooks plugin configuration to fix compatibility issues ([5182382](https://github.com/javalce/eslint-config/commit/5182382b9a0becb0a5d37c86ecfc7a8d5316bacb))

# [0.2.0-beta.4](https://github.com/javalce/eslint-config/compare/v0.2.0-beta.3...v0.2.0-beta.4) (2024-07-26)

### Bug Fixes

- use default eslint parser for javascript and jsx files ([9dbb2fc](https://github.com/javalce/eslint-config/commit/9dbb2fc3adaf5321891a0352c829ab278e4b23f6))

# [0.2.0-beta.3](https://github.com/javalce/eslint-config/compare/v0.2.0-beta.2...v0.2.0-beta.3) (2024-07-26)

### Bug Fixes

- configure correctly eslint-plugin-react-hooks ([9d6e321](https://github.com/javalce/eslint-config/commit/9d6e321ad1c50b926e33b7772a19c5895cba0d53))

# [0.2.0-beta.2](https://github.com/javalce/eslint-config/compare/v0.2.0-beta.1...v0.2.0-beta.2) (2024-07-26)

# [0.2.0-beta.1](https://github.com/javalce/eslint-config/compare/v0.1.4...v0.2.0-beta.1) (2024-07-26)

### Bug Fixes

- rebuild pnpm-lock.yaml after merge ([e3b6081](https://github.com/javalce/eslint-config/commit/e3b6081ed69820069ff064b522cfd71cb2316d8e))
- update typegen script ([632e173](https://github.com/javalce/eslint-config/commit/632e173588891ebf61a019d4aa2c883b179b7f53))
- use flat config instead of legacy config for eslint-plugin-jsx-a11y ([7d99195](https://github.com/javalce/eslint-config/commit/7d9919501fa564d01c6038d9e8943cd9aa31f7ed))

### Features

- add eslint-plugin-jsx-a11y ([b78b295](https://github.com/javalce/eslint-config/commit/b78b295db0b3cc6d7ae12db24a3c90f42e6022e7))
- add eslint-plugin-react-hooks ([703f612](https://github.com/javalce/eslint-config/commit/703f612c76f2cfeaf6c567d264120d7d762b998c))
- add React configuration to project ([1c61535](https://github.com/javalce/eslint-config/commit/1c615355d4dfd6486223a6c33123e3e23293464b))
- add TypeScript support to React configuration ([c56fad1](https://github.com/javalce/eslint-config/commit/c56fad186d199f2f4060d97da421c7e06489dfdf))

## [0.1.4](https://github.com/javalce/eslint-config/compare/v0.1.3...v0.1.4) (2024-07-24)

### Bug Fixes

- remove ignores property in javascript config ([dee297f](https://github.com/javalce/eslint-config/commit/dee297fdf7be42358e6b27eb39ce188ece5acaf8))

## [0.1.3](https://github.com/javalce/eslint-config/compare/v0.1.2...v0.1.3) (2024-07-22)

### Bug Fixes

- move @stylistic/eslint-plugin from devDependencies to dependencies ([ff8eb27](https://github.com/javalce/eslint-config/commit/ff8eb2703c39fb9eb595ee5e7a46e791b3bbdc82))

## [0.1.2](https://github.com/javalce/eslint-config/compare/v0.1.1...v0.1.2) (2024-07-19)

### Features

- migrate stylistic deprecated rules ([7bbecf7](https://github.com/javalce/eslint-config/commit/7bbecf7e3b838777c62953bb7b52808e0be24bbc))
- remove eslint-config-prettier as is unused and most rules are deprecated ([9078cc1](https://github.com/javalce/eslint-config/commit/9078cc11b6d7391f38c18d47e53454ad14584c96))

## [0.1.1](https://github.com/javalce/eslint-config/compare/v0.1.0...v0.1.1) (2024-07-17)

# 0.1.0 (2024-07-17)

### Bug Fixes

- configure correctly eslint for javascript and typescript ([a07fad2](https://github.com/javalce/eslint-config/commit/a07fad2c7b4cae00e8fef4b0ae8b195ff9d74fdc))
- fix JavaScript ESLint configuration ([8f1dfc7](https://github.com/javalce/eslint-config/commit/8f1dfc7948691b85d1a81a7d208e2708004736d3))
- update constants patterns ([18ec7f6](https://github.com/javalce/eslint-config/commit/18ec7f6aa50d3e869335436f98de528db7e0c811))
- update eslint configuration for TypeScript ([f84743c](https://github.com/javalce/eslint-config/commit/f84743c6377a579b125c0cee89857e787b6fbe13))
- update eslint-plugin-import configuration to use recommended rules ([045f64c](https://github.com/javalce/eslint-config/commit/045f64ce419d3a28f70f3ea91cb84963e7ff40d6))
- use import instead of require ([fa699df](https://github.com/javalce/eslint-config/commit/fa699dfafd368a69b26d17d4bf8fe64d0f1652cc))

### Features

- add ESLint configuration and rules for linting JavaScript files ([7836f2e](https://github.com/javalce/eslint-config/commit/7836f2ebacbfa08fbfccb2e9208055e0d6c81409))
- add TypeScript as a peerDependencies ([1b092fa](https://github.com/javalce/eslint-config/commit/1b092faa2291dd2c197f80d6259b53adb34b97db))
- add TypeScript configuration and rules for linting TypeScript files ([10575a4](https://github.com/javalce/eslint-config/commit/10575a453d793c8bbfd738e163cc8c5df1d9108b))
- autodetect tsconfig.json file ([08eb364](https://github.com/javalce/eslint-config/commit/08eb364a55acc4e24b28a89610fb8343b595dd63))
- use gitignore to eslude files from linting ([c346c89](https://github.com/javalce/eslint-config/commit/c346c89e4508361f6fbdef5bf42162f5a3bf0371))
