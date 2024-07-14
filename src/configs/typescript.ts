import eslintPluginImport from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';
import eslintTypescriptConfig from '../rules/typescript';
import eslintExtensionConfig from '../rules/typescript/extension';
import eslintPluginImportConfig from '../rules/typescript/import';
import { TypedFlatConfigItem } from '../types';
import { TYPESCRIPT_FILES } from '../utils/constants';

export default async function typescript(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: TYPESCRIPT_FILES,
      ...tseslint.config(
        ...tseslint.configs.recommendedTypeChecked,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
      ),
      plugins: {
        'import-x': eslintPluginImport.configs.typescript,
      },
      ...eslintTypescriptConfig,
      ...eslintExtensionConfig,
      ...eslintPluginImportConfig,
    },
  ];
}
