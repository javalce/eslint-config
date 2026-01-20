import type { Linter } from 'eslint';

import type { RuleOptions } from './typegen';

export type Awaitable<T> = T | Promise<T>;

type RuleKeys =
  | '@angular-eslint'
  | '@angular-eslint/template'
  | '@ngrx'
  | '@next/next'
  | '@stylistic'
  | '@tanstack/query'
  | '@tanstack/router'
  | '@typescript-eslint'
  | 'astro'
  | 'eslint'
  | 'eslint-comments'
  | 'import-x'
  | 'jest'
  | 'jsx-a11y'
  | 'perfectionist'
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

export type TypedConfigItem = Omit<Linter.Config, 'plugins'> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, unknown>;

  /**
   * An object containing the configured rules. When `files` or `ignores` are
   * specified, these rule configurations are only available to the matching files.
   */
  rules?: Rules;
};

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

export interface OptionsJavascript extends OptionsOverrides<'eslint'> {
  /**
   * La versión de ECMAScript a usar para el parsing.
   *
   * @default 2023
   */
  ecmaVersion?: EcmaVersion;
}

export interface OptionsEslintComments extends OptionsOverrides<'eslint-comments'> {}

export interface OptionsStylistic extends OptionsOverrides<'@stylistic'> {}

export interface OptionsUnicorn extends OptionsOverrides<'unicorn'> {}

export interface OptionsImport extends OptionsOverrides<'import-x'> {}

export interface OptionsPerfectionist extends OptionsOverrides<'perfectionist'> {}

export interface OptionsJSXA11y extends OptionsOverrides<'jsx-a11y'> {}

export interface OptionsJSX {
  /**
   * Enable JSX accessibility rules.
   *
   * Requires installing:
   * - `eslint-plugin-jsx-a11y`
   *
   * Can be a boolean or an object for custom options and overrides.
   * @default false
   */
  a11y?: boolean | OptionsJSXA11y;
}

export interface OptionsTsconfigPath {
  /**
   * Provides the path(s) to the TypeScript configuration file(s) for type linting
   *
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string;
}

export interface OptionsTypescript
  extends OptionsTsconfigPath, OptionsOverrides<'@typescript-eslint'> {}

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

export interface OptionsReact extends OptionsOverrides<'react' | 'react-hooks' | 'react-refresh'> {
  reactCompiler?: boolean;
}

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

export interface OptionsTanstackQuery extends OptionsOverrides<'@tanstack/query'> {}

export interface OptionsTanstackRouter extends OptionsOverrides<'@tanstack/router'> {}

export interface OptionsTanstack {
  /**
   * Enable Tanstack Query support.
   *
   * Requires installing:
   * - `@tanstack/eslint-plugin-query`
   *
   * @default false
   */
  query?: boolean | OptionsTanstackQuery;

  /**
   * Enable Tanstack Router support.
   *
   * Requires installing:
   * - `@tanstack/eslint-plugin-router`
   *
   * @default false
   */
  router?: boolean | OptionsTanstackRouter;
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

export interface OptionsConfig extends OptionsProjectType {
  /**
   * Core rules.
   */
  js?: OptionsJavascript;
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
   * Configure the perfectionist plugin.
   */
  perfectionist?: OptionsPerfectionist;
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
  ts?: boolean | OptionsTypescript;
  /**
   * Enable JSX related rules.
   *
   * Passing an object to enable JSX accessibility rules.
   *
   * @default true
   */
  jsx?: boolean | OptionsJSX;
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
   * - `@eslint-react/eslint-plugin`
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
   * Enable Tanstack ESLint plugins support.
   */
  tanstack?: OptionsTanstack;
  /**
   * Enable testing framework support.
   *
   * Requires installing:
   * - `eslint-plugin-jest` (for Jest)
   * - `@vitest/eslint-plugin` (for Vitest)
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
