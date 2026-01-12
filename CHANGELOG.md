## [0.21.3](https://github.com/javalce/eslint-config/compare/v0.21.2...v0.21.3) (2026-01-12)

## [0.21.2](https://github.com/javalce/eslint-config/compare/v0.21.1...v0.21.2) (2026-01-11)

### Bug Fixes

- update import sorting groups and newline settings in perfectionist config ([5613864](https://github.com/javalce/eslint-config/commit/56138643b4545341500a7c59d93cfb7c00c61f3d))

## [0.21.1](https://github.com/javalce/eslint-config/compare/v0.21.0...v0.21.1) (2025-11-17)

### Bug Fixes

- use correct import resolvers ([383b73b](https://github.com/javalce/eslint-config/commit/383b73baf6f5ab63369a045fe35e0f2f3c341673))

# [0.21.0](https://github.com/javalce/eslint-config/compare/v0.20.1...v0.21.0) (2025-11-16)

### Bug Fixes

- update explicit-function-return-type rule to allow higher-order functions and IIFEs ([bb51c84](https://github.com/javalce/eslint-config/commit/bb51c840fd827b6684aea0616844014353d2dc52))
- update newline-after-import rule to enforce a single newline after imports ([f2d5d79](https://github.com/javalce/eslint-config/commit/f2d5d79a697f4566020727aa12a95910db7ad6a6))

### Features

- add JSX configuration with accessibility rules support ([7499fe6](https://github.com/javalce/eslint-config/commit/7499fe6c7daff49bd3106183dace83c81d5593fb))

## [0.20.1](https://github.com/javalce/eslint-config/compare/v0.20.0...v0.20.1) (2025-11-12)

### Bug Fixes

- add main and types fields to package.json for better module resolution ([4da0473](https://github.com/javalce/eslint-config/commit/4da0473a4bd5cdc89288f7eb7781abece63daf96))
- set fixedExtension option to false on tsdown to allow .js exports ([422c737](https://github.com/javalce/eslint-config/commit/422c73721ef9908b878f901ff4f1e327dead76eb))

# [0.20.0](https://github.com/javalce/eslint-config/compare/v0.19.1...v0.20.0) (2025-11-10)

### Reverts

- "refactor: update import paths to use alias '@' for improved readability" ([37b33e0](https://github.com/javalce/eslint-config/commit/37b33e028af282fa7b79993d550141bad4e4331d))

## [0.19.1](https://github.com/javalce/eslint-config/compare/v0.19.0...v0.19.1) (2025-11-04)

### Bug Fixes

- use tsconfigPath directly instead of resolving it in typescript config ([6695aa6](https://github.com/javalce/eslint-config/commit/6695aa61296529d4f92c822f07bc0f9abad8ebc4))

# [0.19.0](https://github.com/javalce/eslint-config/compare/v0.18.1...v0.19.0) (2025-10-17)

### Bug Fixes

- update package existence check to use correct scope URL ([389e828](https://github.com/javalce/eslint-config/commit/389e828fd938c9d865ebc47714e58082c8bfd5e0))

### Features

- add support for Tanstack Query and Router ESLint plugins ([f8cc771](https://github.com/javalce/eslint-config/commit/f8cc771626bb4ec11d0c0aff9e03a85fffc26244))

### Reverts

- bring back async ESLint config functions and ensure package installation ([f052242](https://github.com/javalce/eslint-config/commit/f052242eb49a84449998c8d41f2a15a6518c610e))

## [0.18.1](https://github.com/javalce/eslint-config/compare/v0.18.0...v0.18.1) (2025-10-17)

### Bug Fixes

- add tsconfigRootDir to typescript parser options ([5b543f2](https://github.com/javalce/eslint-config/commit/5b543f25ea91f6d1d4e2c1762fdeb663f0a4ff2b))
- improve resolveTsconfig function logic for better path resolution ([ed686ce](https://github.com/javalce/eslint-config/commit/ed686ce69f8fcc5dc7042b461b8d192bc6162ee0))

# [0.18.0](https://github.com/javalce/eslint-config/compare/v0.17.1...v0.18.0) (2025-10-08)

### Bug Fixes

- set default value for overrides in perfectionist function ([79fc604](https://github.com/javalce/eslint-config/commit/79fc6044d1abee1c784712a724a5082d8e8ac612))

### Features

- add comprehensive React Hooks rules ([a98a152](https://github.com/javalce/eslint-config/commit/a98a1522ce24ba30dec007f145d2807d80a780ca))
- add perfectionist config to type generation ([3e8d975](https://github.com/javalce/eslint-config/commit/3e8d9755a4892ff296a0531ddcade34164af4e22))
- add perfectionist ESLint plugin configuration and types ([b4bc3ed](https://github.com/javalce/eslint-config/commit/b4bc3ed51d5cbd3a53fbce060c5533694301a834))

## [0.17.1](https://github.com/javalce/eslint-config/compare/v0.17.0...v0.17.1) (2025-10-08)

### Features

- enforce separate type imports and add warning for import type side effects ([5849993](https://github.com/javalce/eslint-config/commit/5849993386a495f9bb0f24612cfff58305406176))

# [0.17.0](https://github.com/javalce/eslint-config/compare/v0.16.1...v0.17.0) (2025-09-12)

### Bug Fixes

- update astro glob patterns to support array format for better file matching ([827885e](https://github.com/javalce/eslint-config/commit/827885e6142f7c16349ed6d9343fea6d4ab93b3b))
- update configuration for no-empty-object-type rule to allow interfaces with single extends ([eb60b66](https://github.com/javalce/eslint-config/commit/eb60b664c27e64c4a83326f119cdb27b10c63dab))

### Features

- add tsconfigPath support and enhance path resolution in imports configuration ([4d97db1](https://github.com/javalce/eslint-config/commit/4d97db13cc19b60313f2125a9645cd2712f3e091))
- enhance import configuration with TypeScript support and improve resolver settings ([910b841](https://github.com/javalce/eslint-config/commit/910b8418b3797a135d1dbc87692a5bb8458ce55c))
- remove selector option from angular config ([02af506](https://github.com/javalce/eslint-config/commit/02af506dc761931a44daa8ee5d2343cdf44bf37e))

## [0.16.1](https://github.com/javalce/eslint-config/compare/v0.16.0...v0.16.1) (2025-08-25)

# [0.16.0](https://github.com/javalce/eslint-config/compare/v0.15.2...v0.16.0) (2025-08-25)

### Features

- add NgRx support to ESLint configuration ([a7033da](https://github.com/javalce/eslint-config/commit/a7033da12bea83be8e844fd5a2c836db3a24f1f7))
- add support for angular and svelte options in testing library configuration ([d25487b](https://github.com/javalce/eslint-config/commit/d25487babf0e8603afbe28504b265c3e228ed2ec))
- add support for rule overrides in ESLint configurations ([1748f70](https://github.com/javalce/eslint-config/commit/1748f70b8f94fd065bcd7c33d746923915da0df3))
- add support for testing framework overrides in ESLint configuration ([81f58a6](https://github.com/javalce/eslint-config/commit/81f58a6a1f43ea6901f01ac62d7bb35f90d5046b))
- drop commonjs compatibility ([07eec8f](https://github.com/javalce/eslint-config/commit/07eec8f98ec4d1bbee551af9cb023dbc608518f7))

## [0.15.2](https://github.com/javalce/eslint-config/compare/v0.15.1...v0.15.2) (2025-07-22)

### Bug Fixes

- move directive and component selector rules to the correct location in angular config ([11aa513](https://github.com/javalce/eslint-config/commit/11aa513b953dbad923d6301aad37d190d1c8e1ce))

## [0.15.1](https://github.com/javalce/eslint-config/compare/v0.15.0...v0.15.1) (2025-07-22)

### Bug Fixes

- set angular-eslint dependency as optional ([cb83f6e](https://github.com/javalce/eslint-config/commit/cb83f6e191d54ce990550b6229d2051e9077342a))

### Features

- add Angular options for selector, directive, and component customization ([133deed](https://github.com/javalce/eslint-config/commit/133deed34fa3a186c47e301cb660e3ecd1bda629))

# [0.15.0](https://github.com/javalce/eslint-config/compare/v0.14.0...v0.15.0) (2025-07-21)

### Bug Fixes

- add core-web-vitals rules to nextjs ESLint configuration and remove unused stub declaration ([2098e88](https://github.com/javalce/eslint-config/commit/2098e88b7d45eb56667429fafd4d88f0088e748f))
- remove .npmrc and update file nesting patterns in VSCode settings ([9dc777d](https://github.com/javalce/eslint-config/commit/9dc777dad8e46e2f2501a1ff8a62aaeb20f13482))

### Features

- add additional return values for React Router configuration ([407beae](https://github.com/javalce/eslint-config/commit/407beaea9a3136ae839981ea4d7b4e1142173756))
- add Angular support to ESLint configuration and update related files ([e473678](https://github.com/javalce/eslint-config/commit/e47367824a74cd4c53a3d739689187e7ff2ef1c0))
- add stylistic and accessibility rules to Vue ESLint configuration ([c789444](https://github.com/javalce/eslint-config/commit/c78944442de4514e20f5f9c517196f0f1273e459))

## 0.14.0 (2025-07-11)

- build: update dependescies ([8d4e46a](https://github.com/javalce/eslint-config/commit/8d4e46a))
- fix: add custom path aliases to imports in type generation script ([8719d1a](https://github.com/javalce/eslint-config/commit/8719d1a))
- docs: update documentation for custom path aliases in ESLint configuration ([6c636b0](https://github.com/javalce/eslint-config/commit/6c636b0))
- feat: add normalizeStringArray function for string array normalization ([fbf97f3](https://github.com/javalce/eslint-config/commit/fbf97f3))
- feat: add support for custom path aliases in ESLint configuration ([a7ff2c4](https://github.com/javalce/eslint-config/commit/a7ff2c4))
- feat: remove ESLint rule for lines between class members ([3adb0a3](https://github.com/javalce/eslint-config/commit/3adb0a3))

## 0.13.0 (2025-07-07)

- docs: improve JSDoc comments for defineConfig and OptionsConfig interfaces ([3f7f772](https://github.com/javalce/eslint-config/commit/3f7f772))
- docs: remove unnecessary empty object from defineConfig export ([512a841](https://github.com/javalce/eslint-config/commit/512a841))
- refactor: replace shorthand array syntax with Array<T> for better readability ([0c56896](https://github.com/javalce/eslint-config/commit/0c56896))
- refactor: update function signatures for improved type safety ([13abd8c](https://github.com/javalce/eslint-config/commit/13abd8c))
- feat: add rule to disable use of empty object type in TypeScript unless it's an interface ([423dea4](https://github.com/javalce/eslint-config/commit/423dea4))
- feat: reorganize TypeScript options interfaces for improved clarity and structure ([bdf0636](https://github.com/javalce/eslint-config/commit/bdf0636))
- build: update dependencies ([061119f](https://github.com/javalce/eslint-config/commit/061119f))

## [0.12.3](https://github.com/javalce/eslint-config/compare/v0.12.2...v0.12.3) (2025-06-16)

### Features

- update 'prefer-lowercase-title' rule configuration to include options for jest and vitest ([f971d96](https://github.com/javalce/eslint-config/commit/f971d9646014238558eeca5f6aacbea15edaa033))

## [0.12.2](https://github.com/javalce/eslint-config/compare/v0.12.1...v0.12.2) (2025-06-04)

### Features

- add stylistic-plus rule configuration for TypeScript ([6569d72](https://github.com/javalce/eslint-config/commit/6569d7291b4fc117be91b6b2d758a5a8bc2ad81d))

## [0.12.1](https://github.com/javalce/eslint-config/compare/v0.12.0...v0.12.1) (2025-06-03)

### Bug Fixes

- update no-misused-promises rule configuration for better promise handling ([5c735eb](https://github.com/javalce/eslint-config/commit/5c735eb811b7e23d0e7d948db34469707732dcff))

# [0.12.0](https://github.com/javalce/eslint-config/compare/v0.11.4...v0.12.0) (2025-05-29)

### Bug Fixes

- replace fs-extra with node:fs and remove chalk dependency ([7aef54b](https://github.com/javalce/eslint-config/commit/7aef54b498caa6e1f1f5ddecc9cf7793041211f9))
- update exports structure in package.json for better module resolution ([7b8082b](https://github.com/javalce/eslint-config/commit/7b8082be37b00dc09b3b65f6f91aca9565530359))
- update prettier configuration for TypeScript support ([c7dc551](https://github.com/javalce/eslint-config/commit/c7dc551504123c8c7d050d52a6b88e2d71f6a54a))

### Features

- remove CLI ([03587d1](https://github.com/javalce/eslint-config/commit/03587d1dc9df9f2bb7ac7b25ad31b200f2d12472))

## [0.11.4](https://github.com/javalce/eslint-config/compare/v0.11.3...v0.11.4) (2025-05-07)

### Bug Fixes

- update no-default-export rule for React Router ([cc9ecea](https://github.com/javalce/eslint-config/commit/cc9eceaaed3e268792a8a8cb63f3454309f85ef7))

## [0.11.3](https://github.com/javalce/eslint-config/compare/v0.11.2...v0.11.3) (2025-05-06)

### Features

- add no-default-export rule to imports and react configurations ([907043c](https://github.com/javalce/eslint-config/commit/907043c12d411de5e309c52e03d0429e07c6a5a0))

## [0.11.2](https://github.com/javalce/eslint-config/compare/v0.11.1...v0.11.2) (2025-04-15)

### Bug Fixes

- add 'eslint-plugin-jsx-a11y' to ensureInstalled function in react config ([c41c45b](https://github.com/javalce/eslint-config/commit/c41c45b6e17aab09acb7e335b8de13f56a56a837))
- add ignore pattern for routing file conventions in unicorn filename case rule ([277dc00](https://github.com/javalce/eslint-config/commit/277dc0045063dbe6de14f68ad802e1f8beef88b0))
- replace 'node:fs' with 'fs-extra' for improved file system operations ([5e7eb29](https://github.com/javalce/eslint-config/commit/5e7eb298dff6989a95a164baac640a6327c2e18d))

## [0.11.1](https://github.com/javalce/eslint-config/compare/v0.11.0...v0.11.1) (2025-04-11)

### Bug Fixes

- add ensureInstalled function to validate required ESLint plugins across configurations ([5d51aef](https://github.com/javalce/eslint-config/commit/5d51aef4e26cbd92d8775144b85f62d7667dd6cf))
- update CLI commands ([450ce09](https://github.com/javalce/eslint-config/commit/450ce098f0b2c6395d3e93931da569e445fa6e80))
- update ESLint configuration to use local-pkg for package existence checks ([c0a4f8c](https://github.com/javalce/eslint-config/commit/c0a4f8c267a3a4b057a850b50254e2083e750d68))

# [0.11.0](https://github.com/javalce/eslint-config/compare/v0.10.1...v0.11.0) (2025-04-10)

### Bug Fixes

- move app-specific TypeScript rules to a separate configuration ([b2e8d2e](https://github.com/javalce/eslint-config/commit/b2e8d2ec00808db31266d51ec3645a9539cf0954))
- update vue configuration ([064c8ce](https://github.com/javalce/eslint-config/commit/064c8ce68a0e38a7dc818224cd321f0ce049cec1))

### Features

- add automatic configuration enable ([0cd8b97](https://github.com/javalce/eslint-config/commit/0cd8b97b9c6575c5499edf2ed59e4c3297d1b2da))
- add eslint-plugin-react-refresh and integrate with react configuration ([56522dc](https://github.com/javalce/eslint-config/commit/56522dc6a3b4d51d3d7d69d233df054d1332a286))
- add package constants ([8756861](https://github.com/javalce/eslint-config/commit/8756861c942d51e9e78d8b7e5182fb6c2ba02679))
- add rule to prevent misuse of promises ([1ea645f](https://github.com/javalce/eslint-config/commit/1ea645f9c9b4301694ef9072e10aca55c628b66e))

## [0.10.1](https://github.com/javalce/eslint-config/compare/v0.10.0...v0.10.1) (2025-04-01)

# [0.10.0](https://github.com/javalce/eslint-config/compare/v0.9.0...v0.10.0) (2025-03-25)

### Bug Fixes

- update eslint-plugin-import-x config for react ([02aade9](https://github.com/javalce/eslint-config/commit/02aade9a4fa431d63065cd829e988c7a3f1d8f7b))
- update Svelte ESLint configuration to use recommended rules ([a63d9c7](https://github.com/javalce/eslint-config/commit/a63d9c7dc2c18540ed6fa02ccc441d5c8a5169b9))
- update Vue ESLint configurations ([5b8447f](https://github.com/javalce/eslint-config/commit/5b8447f57ff13445394b5416ec7ad5832fefc849))
- use nullish coalescing operator for default export resolution in lazy function ([804dadf](https://github.com/javalce/eslint-config/commit/804dadfdfe3fb17f6fe23bbfc08b69e5cbe00baa))

### Features

- add option to ignore specific files ([09c5dc0](https://github.com/javalce/eslint-config/commit/09c5dc0f9738f4fae6ff30833451390ae4d9e768))
- add zod for schema validation in CLI commands ([073a241](https://github.com/javalce/eslint-config/commit/073a24143bc8fca56dc24c742f4792e08fbfa5a6))
- enhance init command with framework and testing options using zod validation ([96121a8](https://github.com/javalce/eslint-config/commit/96121a81fdf302830807076ad2f945b09ac4e5d9))
- update TypeScript configuration resolution to check for tsconfig.eslint.json ([9a3a767](https://github.com/javalce/eslint-config/commit/9a3a7677ddc9e2ab7b3e19ff573ebedf8bce96d1))

# [0.9.0](https://github.com/javalce/eslint-config/compare/v0.8.5...v0.9.0) (2025-01-20)

### Bug Fixes

- eslint errors ([6c4006f](https://github.com/javalce/eslint-config/commit/6c4006f14788ae909a424585daa8b74c8629c910))

## [0.8.5](https://github.com/javalce/eslint-config/compare/v0.8.4...v0.8.5) (2025-01-09)

### Bug Fixes

- ignore Astro TS files in TypeScript ESLint configuration ([dc1d72d](https://github.com/javalce/eslint-config/commit/dc1d72d1679b5bd570522834ab2a8410a0fcd39f))
- update file patterns for Astro JS and TS constants to include additional matches ([6b9f41c](https://github.com/javalce/eslint-config/commit/6b9f41ca037fe1fd1d384294c2359c7682609f4f))

## [0.8.4](https://github.com/javalce/eslint-config/compare/v0.8.3...v0.8.4) (2024-12-30)

### Bug Fixes

- add typings for vitest eslint plugin and clean up javascript config ([dadfb50](https://github.com/javalce/eslint-config/commit/dadfb50e67054a708149c359e23720d54a6b6abc))

### Features

- enhance init command to include project type selection and improve prompts ([4638405](https://github.com/javalce/eslint-config/commit/4638405ed6d9034858f4e13a0441cacbce1cf1f4))

## [0.8.3](https://github.com/javalce/eslint-config/compare/v0.8.2...v0.8.3) (2024-12-10)

### Bug Fixes

- update typegen script ([159b172](https://github.com/javalce/eslint-config/commit/159b172b20da5ccc0fa62c4f129e09f57551d047))

### Features

- add rule to enforce template literal expressions to be of string type ([566b9da](https://github.com/javalce/eslint-config/commit/566b9da893b92b81a4503189476d5879871b97a1))
- enhance vitest configuration to support TypeScript type checking ([e39dd0d](https://github.com/javalce/eslint-config/commit/e39dd0daf3b0e31fc9f33f2efd20d581220966f1))

## [0.8.2](https://github.com/javalce/eslint-config/compare/v0.8.1...v0.8.2) (2024-11-28)

### Features

- update default ECMAScript version to 2023 ([6f61b52](https://github.com/javalce/eslint-config/commit/6f61b520e43b05c0a800c0c8eb9f1c38b28eec93))

## [0.8.1](https://github.com/javalce/eslint-config/compare/v0.8.0...v0.8.1) (2024-11-26)

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
