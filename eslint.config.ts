import { defineConfig } from './src/index';

export default defineConfig({
  typescript: true,
  userConfigs: [
    {
      ignores: ['dist'],
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/require-await': 'off',
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
