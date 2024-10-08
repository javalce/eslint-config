import { type Linter } from 'eslint';

import { type ConfigNames, type RuleOptions } from './typegen';

export type Awaitable<T> = T | Promise<T>;

export type Rules = RuleOptions;

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

export interface OptionsConfig {
  ecmaVersion?: EcmaVersion;
  typescript?: boolean | string | string[];
  react?: boolean | 'next';
  astro?: boolean;
  svelte?: boolean;
  solidjs?: boolean;
  vue?: boolean | VueOptions;
  testing?: 'jest' | 'vitest';
  type?: ProjectType;
  overrides?: (TypedConfigItem | Linter.Config)[];
}
