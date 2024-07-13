import javalce from './src/index';

export default javalce([
  {
    ignores: ['dist'],
  },
  {
    files: ['src/rules/**/*.ts'],
    rules: {
      'sort-keys': 'error',
    },
  },
]);
