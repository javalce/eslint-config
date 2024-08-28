import { fixupPluginRules } from '@eslint/compat';
import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginImport from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import jsxA11Rules from '../rules/jsx-a11y';
import reactRules from '../rules/react';
import reactTypescriptRules from '../rules/typescript/react';
import { type ConfigItem } from '../types';

export async function react({ typescript }: { typescript: boolean }): Promise<ConfigItem[]> {
  const config: ConfigItem[] = [
    mergeConfigs(reactPlugin.configs.flat.recommended as ConfigItem, {
      name: 'react',
    }),
    {
      plugins: {
        'react-hooks': fixupPluginRules(reactHooksPlugin),
      },
      rules: {
        ...reactHooksPlugin.configs.recommended.rules,
      },
      name: 'react-hooks',
    },
    jsxA11yPlugin.flatConfigs.recommended as ConfigItem,
    {
      settings: eslintPluginImport.configs.react.settings,
      languageOptions: {
        parserOptions: eslintPluginImport.configs.react.parserOptions,
      },
      name: 'import-x/react',
    },
    reactRules,
    jsxA11Rules,
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
      name: 'react/version',
    },
  ];

  if (typescript) {
    config.push(reactTypescriptRules);
  }

  return config;
}
