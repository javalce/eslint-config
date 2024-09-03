import { resolve } from 'node:path';

import eslintPluginImport from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

import { TYPESCRIPT_FILES } from '../constants';
import eslintTypescriptConfig from '../rules/typescript';
import eslintExtensionConfig from '../rules/typescript/extension';
import eslintPluginImportConfig from '../rules/typescript/import';
import { type TypedConfigItem } from '../types';

export async function typescript({
  tsconfigPath,
}: {
  tsconfigPath: string | string[];
}): Promise<TypedConfigItem[]> {
  const project = Array.isArray(tsconfigPath)
    ? tsconfigPath.map((path) => resolveTsconfigPath(path))
    : resolveTsconfigPath(tsconfigPath);

  const config = tseslint.config({
    files: TYPESCRIPT_FILES,
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      {
        ...eslintPluginImport.configs.typescript,
        name: 'import-x/typescript',
      },
      eslintTypescriptConfig,
      eslintExtensionConfig,
      eslintPluginImportConfig,
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
