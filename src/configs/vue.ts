import type { OptionsHasTypescript, OptionsVue, TypedConfigItem } from '../types';

import { VUE_FILES } from '../constants';
import { ensureInstalled, lazy } from '../utils';

export async function vue({
  typescript,
  version = 3,
  overrides,
}: OptionsHasTypescript & OptionsVue = {}): Promise<TypedConfigItem[]> {
  ensureInstalled('eslint-plugin-vue', 'vue-eslint-parser');

  const [pluginVue, vueParser] = await Promise.all([
    lazy(import('eslint-plugin-vue')),
    lazy(import('vue-eslint-parser')),
  ]);

  return [
    {
      name: 'vue/setup',
      languageOptions: {
        globals: {
          computed: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          defineProps: 'readonly',
          onMounted: 'readonly',
          onUnmounted: 'readonly',
          reactive: 'readonly',
          ref: 'readonly',
          shallowReactive: 'readonly',
          shallowRef: 'readonly',
          toRef: 'readonly',
          toRefs: 'readonly',
          watch: 'readonly',
          watchEffect: 'readonly',
        },
      },
      plugins: {
        vue: pluginVue,
      },
    },
    {
      name: 'vue/rules',
      files: [VUE_FILES],
      languageOptions: {
        parser: vueParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: typescript ? (await lazy(import('typescript-eslint'))).parser : null,
          sourceType: 'module',
        },
      },

      rules: {
        ...pluginVue.configs.base.rules,
        ...(version === 2
          ? {
              ...pluginVue.configs['vue2-essential'].rules,
              ...pluginVue.configs['vue2-strongly-recommended'].rules,
              ...pluginVue.configs['vue2-recommended'].rules,
            }
          : {
              ...pluginVue.configs['flat/essential']
                .map((c) => c.rules)
                .reduce((acc, c) => ({ ...acc, ...c }), {}),
              ...pluginVue.configs['flat/strongly-recommended']
                .map((c) => c.rules)
                .reduce((acc, c) => ({ ...acc, ...c }), {}),
              ...pluginVue.configs['flat/recommended']
                .map((c) => c.rules)
                .reduce((acc, c) => ({ ...acc, ...c }), {}),
            }),
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
        // stylistic rules
        'vue/array-bracket-spacing': ['error', 'never'],
        'vue/arrow-spacing': ['error', { after: true, before: true }],
        'vue/block-spacing': ['error', 'always'],
        'vue/block-tag-newline': [
          'error',
          {
            multiline: 'always',
            singleline: 'always',
          },
        ],
        'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'vue/comma-dangle': ['error', 'always-multiline'],
        'vue/comma-spacing': ['error', { after: true, before: false }],
        'vue/comma-style': ['error', 'last'],
        'vue/html-comment-content-spacing': [
          'error',
          'always',
          {
            exceptions: ['-'],
          },
        ],
        'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
        'vue/keyword-spacing': ['error', { after: true, before: true }],
        'vue/object-curly-newline': 'off',
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        'vue/operator-linebreak': ['error', 'before'],
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/quote-props': ['error', 'consistent-as-needed'],
        'vue/space-in-parens': ['error', 'never'],
        'vue/template-curly-spacing': 'error',
        // accesibility rules
        'vue-a11y/alt-text': 'error',
        'vue-a11y/anchor-has-content': 'error',
        'vue-a11y/aria-props': 'error',
        'vue-a11y/aria-role': 'error',
        'vue-a11y/aria-unsupported-elements': 'error',
        'vue-a11y/click-events-have-key-events': 'error',
        'vue-a11y/form-control-has-label': 'error',
        'vue-a11y/heading-has-content': 'error',
        'vue-a11y/iframe-has-title': 'error',
        'vue-a11y/interactive-supports-focus': 'error',
        'vue-a11y/label-has-for': 'error',
        'vue-a11y/media-has-caption': 'warn',
        'vue-a11y/mouse-events-have-key-events': 'error',
        'vue-a11y/no-access-key': 'error',
        'vue-a11y/no-aria-hidden-on-focusable': 'error',
        'vue-a11y/no-autofocus': 'warn',
        'vue-a11y/no-distracting-elements': 'error',
        'vue-a11y/no-redundant-roles': 'error',
        'vue-a11y/no-role-presentation-on-focusable': 'error',
        'vue-a11y/no-static-element-interactions': 'error',
        'vue-a11y/role-has-required-aria-props': 'error',
        'vue-a11y/tabindex-no-positive': 'warn',
      },
    },
    {
      name: 'vue/rules/overrides',
      files: [VUE_FILES],
      rules: {
        ...overrides,
      },
    },
  ];
}
