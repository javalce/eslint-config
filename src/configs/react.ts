import type { OptionsReact, TypedConfigItem } from '../types';

import { isPackageExists } from 'local-pkg';

import { GLOB_SRC_FILES } from '../globs';
import jsxA11Rules from '../rules/jsx-a11y';
import reactRules from '../rules/react';
import { ensureInstalled, resolveDefaultExport } from '../utils';

const REACT_ROUTER_PACKAGES = [
  '@react-router/node',
  '@react-router/react',
  '@react-router/serve',
  '@react-router/dev',
];
const NEXT_PACKAGES = ['next'];

export async function react({ overrides }: OptionsReact = {}): Promise<TypedConfigItem[]> {
  ensureInstalled([
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
    'eslint-plugin-jsx-a11y',
  ]);

  const [pluginReact, pluginReactHooks, pluginReactRefresh, pluginJsxA11y] = await Promise.all([
    resolveDefaultExport(import('eslint-plugin-react')),
    resolveDefaultExport(import('eslint-plugin-react-hooks')),
    resolveDefaultExport(import('eslint-plugin-react-refresh')),
    resolveDefaultExport(import('eslint-plugin-jsx-a11y')),
  ]);

  const isUsingReactRouter = REACT_ROUTER_PACKAGES.some((pkg) => isPackageExists(pkg));
  const isUsingNextJs = NEXT_PACKAGES.some((pkg) => isPackageExists(pkg));

  return [
    {
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
        'jsx-a11y': pluginJsxA11y,
      },
      name: 'react/setup',
    },
    ...([
      {
        settings: {
          react: {
            version: 'detect',
          },
        },
        rules: {
          ...pluginReact.configs.recommended.rules,
          ...pluginReactHooks.configs['recommended-latest'].rules,
          'react-refresh/only-export-components': [
            'warn',
            {
              allowConstantExport: true,
              allowExportNames: [
                ...(() => {
                  if (isUsingNextJs) {
                    return [
                      'dynamic',
                      'dynamicParams',
                      'revalidate',
                      'fetchCache',
                      'runtime',
                      'preferredRegion',
                      'maxDuration',
                      'config',
                      'generateStaticParams',
                      'metadata',
                      'generateMetadata',
                      'viewport',
                    ];
                  }

                  if (isUsingReactRouter) {
                    return [
                      'meta',
                      'links',
                      'headers',
                      'loader',
                      'action',
                      'clientLoader',
                      'clientAction',
                      'handle',
                      'shouldRevalidate',
                    ];
                  }

                  return [];
                })(),
              ],
            },
          ],
          ...pluginJsxA11y.flatConfigs.recommended.rules,
        },
        name: 'react/rules',
      },
      reactRules,
      jsxA11Rules,
      {
        name: 'react/rules/overrides',
        rules: {
          ...overrides,
        },
      },
    ].map((config) => ({
      ...config,
      files: [GLOB_SRC_FILES],
    })) as TypedConfigItem[]),
  ];
}
