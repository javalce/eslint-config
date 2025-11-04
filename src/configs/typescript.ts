import type { OptionsProjectType, OptionsTypescript, TypedConfigItem } from '../types';

import tseslint from 'typescript-eslint';

import { GLOB_ASTRO_TS_FILES, GLOB_TS_FILES, GLOB_TSX_FILES } from '../globs';
import eslintTypescriptConfig from '../rules/typescript';
import eslintExtensionConfig from '../rules/typescript/extension';
import { createTypescriptImportRules } from '../rules/typescript/import';
import eslintStylisticConfig from '../rules/typescript/stylistic';

export function typescript({
  tsconfigPath = 'tsconfig.json',
  type,
  overrides,
}: OptionsTypescript & OptionsProjectType = {}): TypedConfigItem[] {
  function makeParser(types: boolean, files: string[], ignores?: string[]): TypedConfigItem {
    return {
      files,
      ...(ignores ? { ignores } : {}),
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          sourceType: 'module',
          ...(types
            ? {
                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {}),
        },
      },
      name: `typescript/${types ? 'parser/types' : 'parser'}`,
    };
  }

  return [
    {
      plugins: {
        '@typescript-eslint': tseslint.plugin,
      },
      name: 'typescript/setup',
    },
    makeParser(false, [GLOB_TS_FILES, GLOB_TSX_FILES]),
    makeParser(true, [GLOB_TS_FILES, GLOB_TSX_FILES], GLOB_ASTRO_TS_FILES),
    ...([
      {
        ...tseslint.configs.eslintRecommended,
        name: 'typescript/rules/eslint-recommended',
      },
      {
        ...tseslint.configs.strictTypeChecked.at(-1),
        name: 'typescript/rules/strict-type-checked',
      },
      eslintTypescriptConfig,
      {
        ...tseslint.configs.stylisticTypeChecked.at(-1),
        name: 'typescript/rules/stylistic-type-checked',
      },
      eslintStylisticConfig,
      eslintExtensionConfig,
      ...(type === 'app'
        ? [
            {
              rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-floating-promises': 'off',
              },
              name: 'typescript/rules/app',
            },
          ]
        : []),
      createTypescriptImportRules(),
      {
        name: 'typescript/rules/overrides',
        rules: {
          ...overrides,
        },
      },
    ].map((config) => ({
      ...config,
      files: [GLOB_TS_FILES, GLOB_TSX_FILES],
      ignores: GLOB_ASTRO_TS_FILES,
    })) as TypedConfigItem[]),
  ];
}
