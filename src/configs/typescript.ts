import type { OptionsProjectType, OptionsTypescript, TypedConfigItem } from '../types';

import tseslint from 'typescript-eslint';

import { GLOB_ASTRO_TS_FILES, GLOB_TS_FILES, GLOB_TSX_FILES } from '../globs';
import eslintTypescriptConfig from '../rules/typescript';
import eslintExtensionConfig from '../rules/typescript/extension';
import typescriptImportConfig from '../rules/typescript/import';

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

  const files = [GLOB_TS_FILES, GLOB_TSX_FILES];
  const ignores = GLOB_ASTRO_TS_FILES;

  return [
    {
      plugins: {
        '@typescript-eslint': tseslint.plugin,
      },
      name: 'typescript/setup',
    },
    makeParser(false, files),
    makeParser(true, files, ignores),
    {
      ...tseslint.configs.eslintRecommended,
      files,
      ignores,
      name: 'typescript/rules/eslint-recommended',
    },
    {
      ...tseslint.configs.strictTypeChecked.at(-1),
      files,
      ignores,
      name: 'typescript/rules/strict-type-checked',
    },
    {
      ...eslintTypescriptConfig,
      files,
      ignores,
    },
    {
      ...tseslint.configs.stylisticTypeChecked.at(-1),
      files,
      ignores,
      name: 'typescript/rules/stylistic-type-checked',
    },
    {
      ...eslintExtensionConfig,
      files,
      ignores,
    },
    ...(type === 'app'
      ? [
          {
            files,
            ignores,
            rules: {
              '@typescript-eslint/explicit-function-return-type': 'off',
              '@typescript-eslint/no-floating-promises': 'off',
            },
            name: 'typescript/rules/app',
          },
        ]
      : []),
    {
      ...typescriptImportConfig,
      files,
      ignores,
    },
    {
      name: 'typescript/rules/overrides',
      files,
      ignores,
      rules: {
        ...overrides,
      },
    },
  ];
}
