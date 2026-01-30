import type { Config } from '../../types';

/**
 * These rules are enabled by `@typescript-eslint`, but we've made the decision
 * to disable them.
 */
const disabledRules: Config['rules'] = {
  // Allow the use of `!` for non-null assertions.
  '@typescript-eslint/no-non-null-assertion': 'off',
  // Normally, it's used by frameworks like Astro or Next.js or bundlers like Vite to reference it's types in a env.d.ts file.
  '@typescript-eslint/triple-slash-reference': 'off',
  // This rule is troublesome when working with too complex types, frameworks like Angular or Svelte, or libraries for that frameworks.
  '@typescript-eslint/unified-signatures': 'off',
};

const config: Config = {
  name: 'typescript/rules/types',
  rules: {
    ...disabledRules,
    /**
     * Enforce a consistent style for array type annotations.
     *
     * 🔧 Fixable - https://typescript-eslint.io/rules/array-type/
     */
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
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
        disallowTypeAnnotations: false,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      },
    ],
    /**
     * Require explicit return types on functions and class methods.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/explicit-function-return-type/
     */
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowIIFEs: true,
      },
    ],
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
    '@typescript-eslint/no-extraneous-class': [
      'error',
      {
        allowConstructorOnly: true,
        allowEmpty: false,
        allowStaticOnly: true,
        allowWithDecorator: true,
      },
    ],
    /**
     * Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers.
     *
     * 🔧 Fixable - https://typescript-eslint.io/rules/no-import-type-side-effects/
     */
    '@typescript-eslint/no-import-type-side-effects': 'warn',
    /**
     * Prevents the misuse of promises in contexts expecting synchronous functions, such as event handlers or boolean conditions.
     *
     * Only allows `Promise<void>` in JSX attributes, such as the common `form.handleSubmit(onSubmit)` from react-hook-form library.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/no-misused-promises/
     */
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksConditionals: true,
        checksSpreads: true,
        checksVoidReturn: false,
      },
    ],
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
     * Enforce template literal expressions to be of string type. Number types are allowed because they are coerced to strings.
     *
     * 🔧 Fixable - https://typescript-eslint.io/rules/restrict-tem@typescript-eslint/restrict-template-expressions/
     */
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowAny: false,
        allowBoolean: false,
        allowNever: false,
        allowNullish: false,
        allowNumber: true,
        allowRegExp: false,
      },
    ],
    /**
     * Require exhaustive checks when using union types in switch statements.
     *
     * This ensures cases are considered when items are later added to a union.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/switch-exhaustiveness-check/
     */
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    /**
     * Prevents loss of `this` context when using class methods as callbacks. Allow static methods to be used as callbacks because they do not rely on `this`.
     *
     * 🔧 Fixable - https://typescript-eslint.io/rules/unbound-method/
     */
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
  },
};

export default config;
