import { resolve } from 'node:path';
import { defineConfig } from './src/index';

const project = resolve(__dirname, 'tsconfig.json');

export default defineConfig({
  typescript: true,
  userConfigs: [
    {
      ignores: ['dist'],
      settings: {
        'import-x/resolver': {
          typescript: {
            project,
          },
        },
      },
      languageOptions: {
        parserOptions: {
          project,
        },
      },
    },
    {
      files: ['src/rules/**/*.ts'],
      rules: {
        'sort-keys': 'error',
      },
    },
  ],
});
