import type { TypedConfigItem, VueVersion } from '../types';

import { VUE_FILES } from '../constants';
import { lazy } from '../utils';

export async function vue({
  typescript,
  version = 3,
}: {
  typescript: boolean;
  version?: VueVersion;
}): Promise<TypedConfigItem[]> {
  const pluginVue = await lazy(import('eslint-plugin-vue'));

  const config: TypedConfigItem[] = [
    ...((version === 3
      ? pluginVue.configs['flat/recommended']
      : pluginVue.configs['flat/vue2-recommended']) as TypedConfigItem[]),
    {
      name: 'javalce/vue',
      files: [VUE_FILES],
      languageOptions: {
        globals: {},
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'vue/block-order': [
          'error',
          {
            order: ['script', 'template', 'style'],
          },
        ],
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        // this is deprecated
        'vue/component-tags-order': 'off',
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/define-macros-order': [
          'error',
          {
            order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
          },
        ],
        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-dupe-keys': 'off',
        'vue/no-empty-pattern': 'error',
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
        ],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-setup-props-reactivity-loss': 'off',
        'vue/no-sparse-arrays': 'error',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-v-bind': 'error',
        'vue/no-v-html': 'off',
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': ['error', { nonwords: false, words: true }],
        'vue/html-self-closing': [
          'warn',
          {
            html: { void: 'always', normal: 'always', component: 'always' },
            math: 'always',
            svg: 'always',
          },
        ],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-quotes': 'off',
        'vue/html-indent': 'off',
      },
    },
  ];

  if (typescript) {
    const tseslint = await lazy(import('typescript-eslint'));

    config.push({
      name: 'javalce/vue/typescript',
      files: [VUE_FILES],
      languageOptions: {
        parserOptions: {
          extraFileExtensions: ['.vue'],
          parser: tseslint.parser,
          sourceType: 'module',
        },
      },
    } as TypedConfigItem);
  }

  return config;
}
