import { defineConfig } from './src/index';

export default defineConfig({
  overrides: [
    {
      files: ['src/rules/**/*.ts'],
      rules: {
        'sort-keys': 'error',
      },
    },
  ],
});
