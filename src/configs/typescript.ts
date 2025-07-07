import { resolve } from 'node:path';

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

import { ASTRO_TS_FILES, TS_FILES, TSX_FILES } from '../constants';
import eslintTypescriptConfig from '../rules/typescript';
import eslintExtensionConfig from '../rules/typescript/extension';
import eslintPluginImportConfig from '../rules/typescript/import';
import eslintStylisticConfig from '../rules/typescript/stylistic';
import { type OptionsProjectType, type OptionsTypescript, type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function typescript({
  tsconfigPath,
  type,
}: OptionsTypescript & OptionsProjectType): Promise<TypedConfigItem[]> {
  const project = Array.isArray(tsconfigPath)
    ? tsconfigPath.map(resolveTsconfigPath)
    : resolveTsconfigPath(tsconfigPath);

  const [tseslint, importPlugin] = await Promise.all([
    lazy(import('typescript-eslint')),
    lazy(import('eslint-plugin-import-x')),
  ]);

  return [
    {
      ...(tseslint.configs.base as TypedConfigItem),
      name: 'typescript/setup',
    },
    ...([
      {
        languageOptions: {
          parserOptions: {
            project,
          },
        },
        settings: {
          'import-x/resolver-next': [
            createTypeScriptImportResolver({
              alwaysTryTypes: true,
              bun: true,
              project,
            }),
          ],
        },
        name: 'typescript/setup/project',
      },
      {
        ...tseslint.configs.eslintRecommended,
        name: 'typescript/rules/recommended',
      },
      {
        ...tseslint.configs.recommendedTypeChecked.at(-1),
        name: 'typescript/rules/recommended-type-checked',
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
      {
        ...importPlugin.configs.typescript,
        name: 'typescript/import/setup',
      },
      eslintPluginImportConfig,
    ].map((config) => ({
      ...config,
      files: [TS_FILES, TSX_FILES],
      ignores: ASTRO_TS_FILES,
    })) as TypedConfigItem[]),
  ];
}

function resolveTsconfigPath(tsconfigPath: string): string {
  return resolve(process.cwd(), tsconfigPath);
}
