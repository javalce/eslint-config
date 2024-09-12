import { resolve } from 'node:path';

import { type Linter } from 'eslint';
import eslintPluginImport from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

import { TS_FILES, TSX_FILES } from '../constants';
import eslintTypescriptConfig from '../rules/typescript';
import eslintExtensionConfig from '../rules/typescript/extension';
import eslintPluginImportConfig from '../rules/typescript/import';
import { type TypedConfigItem } from '../types';

export function typescript({
  tsconfigPath,
}: {
  tsconfigPath: string | string[];
}): TypedConfigItem[] {
  const project = Array.isArray(tsconfigPath)
    ? tsconfigPath.map((path) => resolveTsconfigPath(path))
    : resolveTsconfigPath(tsconfigPath);

  const config = tseslint.config({
    files: [TS_FILES, TSX_FILES],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      {
        ...eslintPluginImport.configs.typescript,
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
    name: 'javalce/typescript/setup',
  });

  return config as TypedConfigItem[];
}

function resolveTsconfigPath(tsconfigPath: string): string {
  return resolve(process.cwd(), tsconfigPath);
}
