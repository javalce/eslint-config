import type { OptionsReact, TypedConfigItem } from '../types';

import { isPackageExists } from 'local-pkg';

import { GLOB_SRC_FILES } from '../globs';
import reactRules from '../rules/react';
import { ensureInstalled, resolveDefaultExport } from '../utils';

const ReactRefreshAllowConstantExportPackages = ['vite'];

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
  ]);

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all([
    resolveDefaultExport(import('eslint-plugin-react')),
    resolveDefaultExport(import('eslint-plugin-react-hooks')),
    resolveDefaultExport(import('eslint-plugin-react-refresh')),
  ]);

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some((pkg) =>
    isPackageExists(pkg),
  );
  const isUsingReactRouter = REACT_ROUTER_PACKAGES.some((pkg) => isPackageExists(pkg));
  const isUsingNext = NEXT_PACKAGES.some((pkg) => isPackageExists(pkg));

  return [
    {
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
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
              allowConstantExport: isAllowConstantExport,
              allowExportNames: [
                ...(() => {
                  if (isUsingNext) {
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
                      'generateViewport',
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
        },
        name: 'react/rules',
      },
      reactRules,
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
