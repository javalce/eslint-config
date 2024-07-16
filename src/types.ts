import { Linter } from 'eslint';
import { Awaitable } from 'eslint-flat-config-utils';

export type TypedFlatConfigItem = Omit<Linter.FlatConfig, 'plugins'> & {
  plugins?: Record<string, any>;
};

export interface TypeScriptOptions {
  tsconfigPath: string | string[];
}

export interface OptionsConfig {
  typescript?: boolean | TypeScriptOptions;
  userConfigs?: Awaitable<TypedFlatConfigItem[] | Linter.FlatConfig[]>;
}
