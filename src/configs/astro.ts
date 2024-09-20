import eslintPluginAstro from 'eslint-plugin-astro';

import { type TypedConfigItem } from '../types';

export function astro(): TypedConfigItem[] {
  return [
    ...eslintPluginAstro.configs['flat/recommended'],
    ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  ];
}
