import type { Linter } from 'eslint';

import type { OptionsAngular, TypedConfigItem } from '../types';

import { parser as tsParser } from 'typescript-eslint';

import { GLOB_HTML_FILES, GLOB_TS_FILES } from '../globs';
import { ensureInstalled, resolveDefaultExport } from '../utils';

export async function angular(options: OptionsAngular = {}): Promise<TypedConfigItem[]> {
  ensureInstalled(['angular-eslint']);

  const angularEslint = await resolveDefaultExport(import('angular-eslint'));

  function createAngularConfig(name: string, rules: TypedConfigItem['rules']): TypedConfigItem {
    return {
      name,
      files: [GLOB_TS_FILES],
      languageOptions: {
        parser: tsParser,
        sourceType: 'module',
      },
      processor: angularEslint.processInlineTemplates,
      rules,
    };
  }

  function createAngularTemplateConfig(
    name: string,
    rules: TypedConfigItem['rules'],
  ): TypedConfigItem {
    return {
      name,
      files: [GLOB_HTML_FILES],
      languageOptions: {
        parser: angularEslint.templateParser as Linter.Parser,
      },
      rules,
    };
  }

  return [
    {
      name: 'angular/setup',
      plugins: {
        '@angular-eslint': angularEslint.tsPlugin,
        '@angular-eslint/template': angularEslint.templatePlugin,
      },
    },
    createAngularConfig('angular/typescript/rules', {
      ...angularEslint.configs.tsRecommended
        .map((i) => i.rules)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
          ...options.directive,
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
          ...options.component,
        },
      ],
    }),
    createAngularConfig('angular/typescript/rules/overrides', {
      ...options.overrides?.typescript,
    }),
    createAngularTemplateConfig('angular/template/rules', {
      ...angularEslint.configs.templateRecommended
        .map((i) => i.rules)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      ...angularEslint.configs.templateAccessibility
        .map((i) => i.rules)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
    }),
    createAngularTemplateConfig('angular/template/rules/overrides', {
      ...options.overrides?.template,
    }),
  ];
}
