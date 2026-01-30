import type { Config, OptionsJSX } from '../types';

import { GLOB_JSX_FILES, GLOB_TSX_FILES } from '../globs';
import { ensureInstalled, resolveDefaultExport } from '../utils';

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
  ];

  if (!a11y) {
    return baseConfig;
  }

  ensureInstalled(['eslint-plugin-jsx-a11y']);

  const pluginJsxA11y = await resolveDefaultExport(import('eslint-plugin-jsx-a11y'));

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
        ...pluginJsxA11y.flatConfigs.recommended.rules,
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
