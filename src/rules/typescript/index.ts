import type { TypedConfigItem } from '../../types';

/**
 * These rules are enabled by `@typescript-eslint`, but we've made the decision
 * to disable them.
 */
const disabledRules: TypedConfigItem['rules'] = {
  // Normally, it's used by frameworks like Astro or Next.js or bundlers like Vite to reference it's types in a env.d.ts file.
  '@typescript-eslint/triple-slash-reference': 'off',
};

const config: TypedConfigItem = {
  name: 'javalce/typescript',
  rules: {
    ...disabledRules,
    /**
     * Require consistent usage of type exports.
     *
     * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-exports/
     */
    '@typescript-eslint/consistent-type-exports': [
      'warn',
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],
    /**
     * Require consistent usage of type imports.
     *
     * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-imports/
     */
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      },
    ],
    /**
     * Require explicit return types on functions and class methods.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/explicit-function-return-type/
     */
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    /**
     * Require using function property types in method signatures.
     *
     * These have enhanced typechecking, whereas method signatures do not.
     *
     * 🔧 Fixable - https://typescript-eslint.io/rules/method-signature-style/
     */
    '@typescript-eslint/method-signature-style': 'warn',
    /**
     * Require consistent naming conventions.
     *
     * Improves IntelliSense suggestions and avoids name collisions.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/naming-convention/
     */
    '@typescript-eslint/naming-convention': [
      'error',
      // Anything type-like should be written in PascalCase.
      {
        format: ['PascalCase'],
        selector: ['typeLike', 'enumMember'],
      },
      // Interfaces cannot be prefixed with `I`, or have restricted names.
      {
        custom: {
          match: false,
          regex: '^I[A-Z]|^(Interface|Props|State)$',
        },
        format: ['PascalCase'],
        selector: 'interface',
      },
    ],
    /**
     * Do not wrap utility functions in an extra class, instead put them in a top level of an ECMAScript module.
     *
     * Allow empty classes to be used with a decorator. Angular and NestJS use this pattern.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/no-extraneous-class/
     */
    '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
    /**
     * Disallow members of unions and intersections that do nothing or override type information.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/no-redundant-type-constituents/
     */
    '@typescript-eslint/no-redundant-type-constituents': 'warn',
    /**
     * Disallow unnecessary namespace qualifiers.
     *
     * 🔧 Fixable - https://typescript-eslint.io/rules/no-unnecessary-qualifier/
     */
    '@typescript-eslint/no-unnecessary-qualifier': 'warn',
    /**
     * Require using `RegExp.exec()` over `String.match()` for consistency.
     *
     * 🔧 Fixable - https://typescript-eslint.io/rules/prefer-regexp-exec/
     */
    '@typescript-eslint/prefer-regexp-exec': 'warn',
    /**
     * Require Array#sort calls to provide a compare function.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/require-array-sort-compare/
     */
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    /**
     * Require exhaustive checks when using union types in switch statements.
     *
     * This ensures cases are considered when items are later added to a union.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/switch-exhaustiveness-check/
     */
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
  },
};

export default config;
