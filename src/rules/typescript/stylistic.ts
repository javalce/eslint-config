import type { TypedConfigItem } from '../../types';

const config: TypedConfigItem = {
  name: 'typescript/rules/stylistic-plus',
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
  },
};

export default config;
