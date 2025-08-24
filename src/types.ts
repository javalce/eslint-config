import { type Linter } from 'eslint';

import { type ConfigNames, type RuleOptions } from './typegen';

export type Awaitable<T> = T | Promise<T>;

type RuleKeys =
  | '@angular-eslint'
  | '@angular-eslint/template'
  | '@ngrx'
  | '@next/next'
  | '@stylistic'
  | '@typescript-eslint'
  | 'astro'
  | 'eslint'
  | 'eslint-comments'
  | 'import-x'
  | 'jest'
  | 'jsx-a11y'
  | 'react'
  | 'react-hooks'
  | 'react-refresh'
  | 'solid'
  | 'svelte'
  | 'testing-library'
  | 'unicorn'
  | 'vitest'
  | 'vue';

/**
 * Produce the key when `K` must be a top-level rule name (no plugin/namespace).
 * Returns the key or `never` when it contains a slash.
 */
type TopLevelRule<K extends string> = K extends `${string}/${string}` ? never : K;

/** If `K` starts with `${Prefix}/...` returns the full key, otherwise `never`. */
type RuleWithPrefix<Prefix extends string, K extends string> = K extends `${Prefix}/${string}`
  ? K
  : never;

/** Exclude a specific sub-namespace (e.g. `${Prefix}/template/...`). */
type ExcludeSubnamespace<
  K extends string,
  Prefix extends string,
  Sub extends string,
> = K extends `${Prefix}/${Sub}/${string}` ? never : K;

/**
 * Decide the mapped key for a given `Prefix`:
 * - for 'eslint' return only top-level keys (no slash)
 * - if `Prefix` contains a subpath (like '@angular-eslint/template') match keys with that exact prefix
 * - otherwise (base prefix) match keys starting with `${Prefix}/`;
 *   when `Prefix` is '@angular-eslint' exclude the 'template' sub-namespace
 */
type KeyForPrefix<Prefix extends RuleKeys, K extends string> = Prefix extends 'eslint'
  ? TopLevelRule<K>
  : Prefix extends `${string}/${string}`
    ? RuleWithPrefix<Prefix, K>
    : Prefix extends '@angular-eslint'
      ? ExcludeSubnamespace<RuleWithPrefix<Prefix, K>, Prefix, 'template'>
      : RuleWithPrefix<Prefix, K>;

type ExtractRules<Prefix extends RuleKeys, AllRules extends RuleOptions = RuleOptions> = {
  [K in keyof AllRules as K extends string ? KeyForPrefix<Prefix, K> : never]: AllRules[K];
};

interface Rules extends RuleOptions {}

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

export interface OptionsEcmaVersion {
  /**
   * La versión de ECMAScript a usar para el parsing.
   *
   * @default DEFAULT_ECMA_VERSION (2023)
   */
  ecmaVersion?: EcmaVersion;
}

type ProjectType = 'app' | 'lib';

export interface OptionsProjectType {
  /**
   * The type of the project, either 'app' or 'lib'.
   *
   * @default 'app'
   */
  type?: ProjectType;
}

interface OptionsOverrides<T extends RuleKeys> {
  overrides?: ExtractRules<T>;
}

export interface OptionsJavascript extends OptionsOverrides<'eslint'> {}

export interface OptionsEslintComments extends OptionsOverrides<'eslint-comments'> {}

export interface OptionsStylistic extends OptionsOverrides<'@stylistic'> {}

export interface OptionsUnicorn extends OptionsOverrides<'unicorn'> {}

export interface OptionsPathAliases {
  /**
   * Custom path aliases to use in the project.
   **/
  pathAliases?: string | string[];
}

export interface OptionsImport extends OptionsPathAliases, OptionsOverrides<'import-x'> {}

export interface OptionsTypescript {
  /**
   * Provides the path(s) to the TypeScript configuration file(s) for type linting
   *
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[];
  overrides?: ExtractRules<'@typescript-eslint'>;
}

export interface OptionsHasTypescript {
  typescript?: boolean;
}

interface OptionsAngularSelector {
  /**
   * The selector type for Angular directives or components.
   */
  type?: string | Array<'element' | 'attribute'>;
  /**
   * The prefix for the selector, which can be a string or an array of strings.
   */
  prefix?: string | unknown[];
  /**
   * The style of the selector, which can be either 'camelCase' or 'kebab-case'.
   * This determines how the selector is formatted.
   */
  style?: 'camelCase' | 'kebab-case';
}

export interface OptionsAngular {
  /**
   * The prefix for Angular selectors, which can be a string or an array of strings.
   * This prefix is used for both directives and components.
   */
  selector?: OptionsAngularSelector['prefix'];
  /**
   * The options for Angular directives.
   * This allows customization of the selector type, prefix, and style for directives.
   */
  directive?: OptionsAngularSelector;
  /**
   * The options for Angular components.
   * This allows customization of the selector type, prefix, and style for components.
   */
  component?: OptionsAngularSelector;
  overrides?: {
    typescript?: ExtractRules<'@typescript-eslint'>;
    template?: ExtractRules<'@angular-eslint/template'>;
  };
}

export interface OptionsNgrx extends OptionsOverrides<'@ngrx'> {
  store?: boolean;
  effects?: boolean;
  componentStore?: boolean;
  operators?: boolean;
  signals?: boolean;
}

export interface OptionsReact
  extends OptionsOverrides<'react' | 'react-hooks' | 'react-refresh' | 'jsx-a11y'> {}

export interface OptionsNext extends OptionsOverrides<'@next/next'> {}

export interface OptionsAstro extends OptionsOverrides<'astro' | 'jsx-a11y'> {}

export interface OptionsSvelte extends OptionsOverrides<'svelte'> {}

export interface OptionsSolid extends OptionsOverrides<'solid'> {}

type VueVersion = 2 | 3;

export interface OptionsVue extends OptionsOverrides<'vue'> {
  /**
   * Vue version. Apply different rules set from `eslint-plugin-vue`.
   *
   * @default 3
   */
  version?: VueVersion;
}

export interface OptionsTestingLibrary extends OptionsOverrides<'testing-library'> {}

interface OptionsHasTestingLibrary {
  testingLibrary?: boolean | OptionsTestingLibrary;
}

export interface OptionsJest extends OptionsOverrides<'jest'> {}

interface OptionsHasJest extends OptionsJest, OptionsHasTestingLibrary {
  framework: 'jest';
}

export interface OptionsVitest extends OptionsOverrides<'vitest'> {}

interface OptionsHasVitest extends OptionsVitest, OptionsHasTestingLibrary {
  framework: 'vitest';
}

type OptionsTest = OptionsHasJest | OptionsHasVitest;

export interface OptionsConfig extends OptionsEcmaVersion, OptionsProjectType {
  /**
   * Core rules.
   */
  javascript?: OptionsJavascript;
  /**
   * List of glob patterns for files/directories to ignore.
   *
   * @default []
   * @see https://eslint.org/docs/latest/use/configure/ignore
   */
  ignores?: string[];
  /**
   * ESLint comments plugin options.
   */
  comments?: OptionsEslintComments;
  /**
   * Configure the path aliases for the import plugin.
   */
  import?: OptionsImport;
  /**
   * Stylistic plugin options.
   */
  stylistic?: OptionsStylistic;
  /**
   * Unicorn plugin options.
   */
  unicorn?: OptionsUnicorn;
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
  angular?: boolean | OptionsAngular;
  /**
   * Enable NgRx support.
   *
   * Requires installing:
   * - `@ngrx/eslint-plugin`
   *
   * @default false
   */
  ngrx?: OptionsNgrx;
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
  react?: boolean | OptionsReact;
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
  next?: boolean | OptionsNext;
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
  astro?: boolean | OptionsAstro;
  /**
   * Enable Svelte support.
   *
   * Requires installing:
   * - `eslint-plugin-svelte`
   *
   * @default false
   */
  svelte?: boolean | OptionsSvelte;
  /**
   * Enable SolidJS support.
   *
   * Requires installing:
   * - `eslint-plugin-solid`
   *
   * @default false
   */
  solid?: boolean | OptionsSolid;
  /**
   * Enable Vue support.
   *
   * Requires installing:
   * - `eslint-plugin-vue`
   *
   * @default false
   */
  vue?: boolean | OptionsVue;
  /**
   * Enable testing framework support.
   *
   * @default undefined
   */
  test?: OptionsTest;
  /**
   * Provides additional configuration objects for the ESLint configuration.
   *
   * @default []
   */
  extends?: Linter.Config[];
}
