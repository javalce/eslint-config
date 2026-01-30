import { defineConfig } from './src/index';

export default defineConfig(
  {
    type: 'lib',
  },
  [
    {
      files: ['src/rules/**/*.ts'],
      rules: {
        'sort-keys': 'error',
      },
    },
  ],
);
