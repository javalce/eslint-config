import eslintPluginAstro from 'eslint-plugin-astro';

import { type TypedConfigItem } from '../types';

export function astro(): TypedConfigItem[] {
  const config = [
    ...eslintPluginAstro.configs['flat/recommended'],
    ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  ];

  const jsxA11yConfig = config.find((item) => item.name === undefined) ?? {};
  const index = config.indexOf(jsxA11yConfig);

  config.splice(index, 1, {
    name: 'astro/jsx-a11y',
    ...jsxA11yConfig,
  });

  return [...new Set(config)];
}
