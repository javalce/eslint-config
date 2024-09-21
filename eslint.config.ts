import { defineConfig } from './src/index';

export default defineConfig({
  solidjs: true,
  overrides: [
    {
      files: ['src/rules/**/*.ts'],
      rules: {
        'sort-keys': 'error',
      },
    },
  ],
});
