import { Linter } from 'eslint';

export type TypedFlatConfigItem = Omit<Linter.FlatConfig<Linter.RulesRecord>, 'plugins'> & {
  plugins?: Record<string, any>;
};
