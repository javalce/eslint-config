import type { Config, OptionsJSX } from '../types';

import { GLOB_JSX_FILES, GLOB_TSX_FILES } from '../globs';
import { ensureInstalled, renameRules, resolveDefaultExport } from '../utils';

export async function jsx({ a11y }: OptionsJSX = {}): Promise<Config[]> {
  const files = [GLOB_JSX_FILES, GLOB_TSX_FILES];
  const baseConfig: Config[] = [
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: 'jsx/setup',
    },
    {
      name: 'jsx/rules/stylistic',
      files,
      rules: {
        '@stylistic/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
        '@stylistic/jsx-pascal-case': ['error', { allowAllCaps: false }],
        '@stylistic/jsx-self-closing-comp': ['warn', { component: true, html: true }],
        'perfectionist/sort-jsx-props': [
          'warn',
          {
            customGroups: [
              {
                groupName: 'callback',
                elementNamePattern: '^on.+',
              },
            ],
            groups: ['shorthand-prop', 'multiline-prop', 'unknown', 'callback'],
            newlinesBetween: 0,
            order: 'asc',
            type: 'natural',
          },
        ],
      },
    },
  ];

  if (!a11y) {
    return baseConfig;
  }

  ensureInstalled(['eslint-plugin-jsx-a11y-x']);

  const pluginJsxA11y = await resolveDefaultExport(import('eslint-plugin-jsx-a11y-x'));

  return [
    ...baseConfig,
    {
      plugins: {
        'jsx-a11y': pluginJsxA11y,
      },
      name: 'jsx/a11y/setup',
    },
    {
      files,
      rules: {
        ...renameRules(pluginJsxA11y.configs.recommended.rules, { 'jsx-a11y-x': 'jsx-a11y' }),
      },
      name: 'jsx/a11y/rules',
    },
    {
      files,
      name: 'jsx/a11y/rules/overrides',
      rules: {
        ...(typeof a11y === 'object' ? a11y.overrides : {}),
      },
    },
  ];
}
