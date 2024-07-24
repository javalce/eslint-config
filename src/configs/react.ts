import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginImport from 'eslint-plugin-import-x';
import reactPlugin from 'eslint-plugin-react';

import reactRules from '../rules/react';
import { type TypedFlatConfigItem } from '../types';

export async function react(): Promise<TypedFlatConfigItem[]> {
  return [
    mergeConfigs(reactPlugin.configs.flat.recommended, {
      name: 'react',
    }),
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
      name: 'react/version',
    },
    {
      settings: eslintPluginImport.configs.react.settings,
      languageOptions: {
        parserOptions: eslintPluginImport.configs.react.parserOptions,
      },
      name: 'import-x/react',
    },
    reactRules,
  ];
}
