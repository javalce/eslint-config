import { type Linter } from 'eslint';

import { type ConfigNames, type RuleOptions } from './typegen';

export type Awaitable<T> = T | Promise<T>;

export interface Rules extends RuleOptions {}

export type { ConfigNames };

export type EcmaVersion =
  | 5
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 2024
  | 2025;

export type TypedConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, unknown>;
};

export type VueVersion = 2 | 3;

export interface VueOptions {
  /**
   * Vue version. Apply different rules set from `eslint-plugin-vue`.
   *
   * @default 3
   */
  vueVersion?: VueVersion;
}

export type ProjectType = 'app' | 'lib';

export interface OptionsTypescript {
  /**
   * Provides the path(s) to the TypeScript configuration file(s) for type linting
   *
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath: string | string[];
}

export interface OptionsHasTypescript {
  typescript?: boolean;
}

export interface OptionsProjectType {
  /**
   * The type of the project, either 'app' or 'lib'.
   *
   * @default 'app'
   */
  type?: ProjectType;
}

export interface OptionsPathAliases {
  /**
   * Custom path aliases to use in the project.
   **/
  pathAliases: string | string[];
}

export interface OptionsConfig extends OptionsProjectType {
  /**
   * La versión de ECMAScript a usar para el parsing.
   *
   * @default DEFAULT_ECMA_VERSION (2023)
   */
  ecmaVersion?: EcmaVersion;
  /**
   * List of glob patterns for files/directories to ignore.
   *
   * @default []
   * @see https://eslint.org/docs/latest/use/configure/ignore
   */
  ignores?: string[];
  /**
   * Configure the path aliases for the import plugin.
   */
  import?: OptionsPathAliases;
  /**
   * Enable TypeScript support.
   *
   * @default auto-detect based on the dependencies
   * @see {@link OptionsTypescript}
   */
  typescript?: boolean | OptionsTypescript;
  /**
   * Enable Angular support.
   *
   * Requires installing:
   * - `angular-eslint`
   *
   * @default false
   */
  angular?: boolean;
  /**
   * Enable React support.
   *
   * Requires installing:
   * - `eslint-plugin-react`
   * - `eslint-plugin-react-hooks`
   * - `eslint-plugin-react-refresh`
   * - `eslint-plugin-jsx-a11y`
   *
   * @default false
   */
  react?: boolean;
  /**
   * Enable Next.js support.
   *
   * Requires enabling `react` support as well.
   *
   * Requires installing:
   * - `@next/eslint-plugin-next`
   *
   * @default false
   */
  next?: boolean;
  /**
   * Enable Astro support.
   *
   * Requires installing:
   * - `eslint-plugin-astro`
   *
   * Requires installing for formatting .astro with prettier:
   * - `prettier-plugin-astro`
   *
   * @default false
   */
  astro?: boolean;
  /**
   * Enable Svelte support.
   *
   * Requires installing:
   * - `eslint-plugin-svelte`
   *
   * @default false
   */
  svelte?: boolean;
  /**
   * Enable SolidJS support.
   *
   * Requires installing:
   * - `eslint-plugin-solid`
   *
   * @default false
   */
  solidjs?: boolean;
  /**
   * Enable Vue support.
   *
   * Requires installing:
   * - `eslint-plugin-vue`
   *
   * @default false
   */
  vue?: boolean | VueOptions;
  /**
   * Enable testing framework support.
   *
   * Requires installing:
   * - `eslint-plugin-jest` (for Jest)
   * - `@vitest/eslint-plugin` (for Vitest)
   *
   * @default undefined
   */
  testing?: 'jest' | 'vitest';
  /**
   * Provide additional overrides for the ESLint configuration.
   *
   * @default []
   */
  overrides?: Array<TypedConfigItem | Linter.Config>;
}
