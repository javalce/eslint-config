import { resolve } from 'node:path';

import { type Linter } from 'eslint';

import { TS_FILES, TSX_FILES } from '../constants';
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
    ? tsconfigPath.map((path) => resolveTsconfigPath(path))
    : resolveTsconfigPath(tsconfigPath);

  const [tseslint, importPlugin] = await Promise.all([
    lazy(import('typescript-eslint')),
    lazy(import('eslint-plugin-import-x')),
  ]);

  const config = tseslint.config({
    files: [TS_FILES, TSX_FILES],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      {
        ...importPlugin.configs.typescript,
        name: 'import-x/typescript',
      },
      eslintTypescriptConfig as Linter.Config,
      eslintExtensionConfig as Linter.Config,
      eslintPluginImportConfig as Linter.Config,
    ],
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
    rules: {
      ...(type === 'app'
        ? {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
          }
        : {}),
    },
    name: 'javalce/typescript/setup',
  });

  return config as TypedConfigItem[];
}

function resolveTsconfigPath(tsconfigPath: string): string {
  return resolve(process.cwd(), tsconfigPath);
}
