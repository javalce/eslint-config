import { type Linter } from 'eslint';
import { type Awaitable, type FlatConfigComposer } from 'eslint-flat-config-utils';

import { type ConfigNames, type RuleOptions } from './typegen';

export type Rules = RuleOptions;

export type { ConfigNames };

export type TypedConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  plugins?: Record<string, any>;
};

export interface OptionsConfig {
  typescript?: boolean | string | string[];
  react?: boolean;
  next?: boolean;
  testing?: 'jest' | 'vitest';
  userConfigs?: Awaitable<
    TypedConfigItem | TypedConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]
  >[];
}
