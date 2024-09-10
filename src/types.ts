import { type Linter } from 'eslint';

import { type ConfigNames, type RuleOptions } from './typegen';

export type Awaitable<T> = T | Promise<T>;

export type Rules = RuleOptions;

export type { ConfigNames };

export type TypedConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  plugins?: Record<string, unknown>;
};

export interface OptionsConfig {
  typescript?: boolean | string | string[];
  react?: boolean | 'next';
  testing?: 'jest' | 'vitest';
  overrides?: (TypedConfigItem | Linter.Config)[];
}
