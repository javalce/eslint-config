import { Linter } from 'eslint';
import { Awaitable } from 'eslint-flat-config-utils';

export type TypedFlatConfigItem = Omit<Linter.FlatConfig, 'plugins'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is safe
  plugins?: Record<string, any>;
};

export interface TypeScriptOptions {
  tsconfigPath: string | string[];
}

export interface OptionsConfig {
  typescript?: TypeScriptOptions;
  userConfigs?: Awaitable<TypedFlatConfigItem[] | Linter.FlatConfig[]>;
}
