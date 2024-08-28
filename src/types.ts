import { type Linter } from 'eslint';
import { type Awaitable, type FlatConfigComposer } from 'eslint-flat-config-utils';

import { type ConfigNames, type RuleOptions } from './typegen';

export type Rules = RuleOptions;

export type { ConfigNames };

export type TypedFlatConfigItem = Omit<Linter.FlatConfig<Linter.RulesRecord & Rules>, 'plugins'> & {
  plugins?: Record<string, any>;
};

export interface TypeScriptOptions {
  tsconfigPath: string | string[];
}

export interface OptionsConfig {
  typescript?: boolean | TypeScriptOptions;
  react?: boolean;
  next?: boolean;
  testing?: 'jest';
  userConfigs?: Awaitable<
    TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.FlatConfig[]
  >[];
}
