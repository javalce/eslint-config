import { defineConfig } from './src/index';

export default defineConfig({
  type: 'lib',
  extends: [
    {
      files: ['src/rules/**/*.ts'],
      rules: {
        'sort-keys': 'error',
        'import-x/no-default-export': 'off',
      },
    },
  ],
});
