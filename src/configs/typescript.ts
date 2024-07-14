import { resolve } from 'node:path';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginImport from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

import eslintTypescriptConfig from '../rules/typescript';
import eslintExtensionConfig from '../rules/typescript/extension';
import eslintPluginImportConfig from '../rules/typescript/import';
import { TypedFlatConfigItem, TypeScriptOptions } from '../types';
import { TYPESCRIPT_FILES } from '../utils/constants';

export default function typescript({ tsconfigPath }: TypeScriptOptions): TypedFlatConfigItem[] {
  const project = Array.isArray(tsconfigPath)
    ? tsconfigPath.map((path) => resolveTsconfigPath(path))
    : resolveTsconfigPath(tsconfigPath);

  const config = tseslint.config(
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project,
        },
      },
    },
  );

  return [
    mergeConfigs(...(config as TypedFlatConfigItem[]), {
      files: TYPESCRIPT_FILES,
      ...eslintPluginImport.configs.typescript,
      ...eslintTypescriptConfig,
      ...eslintExtensionConfig,
      ...eslintPluginImportConfig,
      settings: {
        'import-x/resolver': {
          typescript: {
            project,
          },
        },
      },
    }),
  ];
}

function resolveTsconfigPath(tsconfigPath: string): string {
  return resolve(process.cwd(), tsconfigPath);
}
