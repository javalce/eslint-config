import { defineConfig } from './src/index';

export default defineConfig({
  type: 'lib',
  overrides: [
    {
      files: ['src/rules/**/*.ts'],
      rules: {
        'sort-keys': 'error',
      },
    },
  ],
});
