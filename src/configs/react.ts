import { type Linter } from 'eslint';

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
    ...[
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
    ].map((conf) => ({
      ...conf,
      files: [SRC_FILES],
    })),
  ] satisfies TypedConfigItem[];
}
