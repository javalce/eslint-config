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
const REACT_COMPILER_PACKAGES = ['babel-plugin-react-compiler'];

export async function react({
  reactCompiler = REACT_COMPILER_PACKAGES.some((pkg) => isPackageExists(pkg)),
  overrides,
}: OptionsReact = {}): Promise<TypedConfigItem[]> {
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

  const files = [GLOB_SRC_FILES];

  return [
    {
      name: 'react/setup',
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
      },
    },
    {
      name: 'react/settings',
      files,
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      name: 'react/rules/react',
      files,
      rules: {
        ...pluginReact.configs.recommended.rules,
      },
    },
    {
      files,
      ...reactRules,
    },
    {
      name: 'react/rules/react-hooks',
      files,
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        ...(reactCompiler
          ? {
              'react-hooks/config': 'error',
              'react-hooks/error-boundaries': 'error',
              'react-hooks/component-hook-factories': 'error',
              'react-hooks/gating': 'error',
              'react-hooks/globals': 'error',
              'react-hooks/immutability': 'error',
              'react-hooks/preserve-manual-memoization': 'error',
              'react-hooks/purity': 'error',
              'react-hooks/refs': 'error',
              'react-hooks/set-state-in-effect': 'error',
              'react-hooks/set-state-in-render': 'error',
              'react-hooks/static-components': 'error',
              'react-hooks/unsupported-syntax': 'warn',
              'react-hooks/use-memo': 'error',
              'react-hooks/incompatible-library': 'warn',
            }
          : {}),
      },
    },
    {
      name: 'react/rules/react-refresh',
      files,
      rules: {
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
    },
    {
      files,
      name: 'react/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
