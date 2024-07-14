import { resolve } from 'node:path';
import javalce from './src/index';

const project = resolve(__dirname, 'tsconfig.json');

export default javalce(
  {
    typescript: true,
  },
  [
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
);
