import { type Linter } from 'eslint';
import eslintPluginImport from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import jsxA11Rules from '../rules/jsx-a11y';
import reactRules from '../rules/react';
import reactTypescriptRules from '../rules/typescript/react';
import { type TypedConfigItem } from '../types';

export function react({ typescript }: { typescript: boolean }): TypedConfigItem[] {
  const config: TypedConfigItem[] = [
    {
      ...(reactPlugin.configs.flat.recommended as TypedConfigItem),
      name: 'react',
    },
    {
      plugins: {
        'react-hooks': reactHooksPlugin,
      },
      rules: {
        ...(reactHooksPlugin.configs.recommended.rules as Linter.RulesRecord),
      },
      name: 'react-hooks',
    },
    jsxA11yPlugin.flatConfigs.recommended as TypedConfigItem,
    {
      ...eslintPluginImport.flatConfigs.react,
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
