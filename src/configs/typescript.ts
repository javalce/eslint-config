import { resolve } from 'node:path';

import { ASTRO_TS_FILES, TS_FILES, TSX_FILES } from '../constants';
import eslintTypescriptConfig from '../rules/typescript';
import eslintExtensionConfig from '../rules/typescript/extension';
import eslintPluginImportConfig from '../rules/typescript/import';
import { type ProjectType, type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function typescript({
  tsconfigPath,
  type = 'app',
}: {
  tsconfigPath: string | string[];
  type?: ProjectType;
}): Promise<TypedConfigItem[]> {
  const project = Array.isArray(tsconfigPath)
    ? tsconfigPath.map(resolveTsconfigPath)
    : resolveTsconfigPath(tsconfigPath);

  const [tseslint, importPlugin] = await Promise.all([
    lazy(import('typescript-eslint')),
    lazy(import('eslint-plugin-import-x')),
  ]);

  const config = [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      ...importPlugin.configs.typescript,
      name: 'import-x/typescript',
    },
    eslintTypescriptConfig,
    eslintExtensionConfig,
    eslintPluginImportConfig,
    {
      languageOptions: {
        parserOptions: {
          project,
        },
      },
      settings: {
        'import-x/resolver': {
          typescript: {
            project,
          },
        },
      },
      rules:
        type === 'app'
          ? {
              '@typescript-eslint/explicit-function-return-type': 'off',
              '@typescript-eslint/no-floating-promises': 'off',
            }
          : {},
      name: 'javalce/typescript/setup',
    },
  ] as TypedConfigItem[];

  return config.map((config) => ({
    ...config,
    files: [TS_FILES, TSX_FILES],
    ignores: ASTRO_TS_FILES,
  }));
}

function resolveTsconfigPath(tsconfigPath: string): string {
  return resolve(process.cwd(), tsconfigPath);
}
