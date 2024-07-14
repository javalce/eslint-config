import { defineConfig } from './src/index';

export default defineConfig({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
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
