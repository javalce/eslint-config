import { defineConfig } from './src/index';

export default defineConfig({
  typescript: true,
  userConfigs: [
    {
      ignores: ['dist'],
    },
    {
      files: ['src/rules/**/*.ts'],
      rules: {
        'sort-keys': 'error',
      },
    },
  ],
});
