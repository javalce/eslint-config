import { type Linter } from 'eslint';
import { type Awaitable, type FlatConfigComposer } from 'eslint-flat-config-utils';

import { type ConfigNames, type RuleOptions } from './typegen';

export type Rules = RuleOptions;

export type { ConfigNames };

export type ConfigItem = Linter.Config<Linter.RulesRecord & Rules>;

export interface TypeScriptOptions {
  tsconfigPath: string | string[];
}

export interface OptionsConfig {
  typescript?: boolean | TypeScriptOptions;
  react?: boolean;
  next?: boolean;
  testing?: 'jest' | 'vitest';
  userConfigs?: Awaitable<
    ConfigItem | ConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]
  >[];
}
