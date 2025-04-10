import { SRC_FILES } from '../constants';
import jsxA11Rules from '../rules/jsx-a11y';
import reactRules from '../rules/react';
import { type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function react(): Promise<TypedConfigItem[]> {
  const [reactPlugin, reactHooksPlugin, jsxA11yPlugin, eslintPluginImport] = await Promise.all([
    lazy(import('eslint-plugin-react')),
    lazy(import('eslint-plugin-react-hooks')),
    lazy(import('eslint-plugin-jsx-a11y')),
    lazy(import('eslint-plugin-import-x')),
  ]);

  return [
    {
      plugins: {
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
        'jsx-a11y': jsxA11yPlugin,
      },
      name: 'react/setup',
    },
    ...([
      {
        settings: eslintPluginImport.flatConfigs.react.settings,
        languageOptions: eslintPluginImport.flatConfigs.react.languageOptions,
        name: 'react/import',
      },
      {
        settings: {
          react: {
            version: 'detect',
          },
        },
        rules: {
          ...reactPlugin.configs.flat.recommended.rules,
          ...reactHooksPlugin.configs.recommended.rules,
          ...jsxA11yPlugin.flatConfigs.recommended.rules,
        },
        name: 'react/rules',
      },
      reactRules,
      jsxA11Rules,
    ].map((config) => ({
      ...config,
      files: [SRC_FILES],
    })) as TypedConfigItem[]),
  ];
}
