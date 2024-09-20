import { defineConfig } from './src/index';

export default defineConfig({
  astro: true,
  overrides: [
    {
      files: ['src/rules/**/*.ts'],
      rules: {
        'sort-keys': 'error',
      },
    },
  ],
});
