import { isPackageExists } from 'local-pkg';

import { GLOB_SRC_FILES } from '../globs';
import jsxA11Rules from '../rules/jsx-a11y';
import reactRules from '../rules/react';
import { type OptionsReact, type TypedConfigItem } from '../types';
import { ensureInstalled, lazy } from '../utils';

const REACT_ROUTER_PACKAGES = [
  '@react-router/node',
  '@react-router/react',
  '@react-router/serve',
  '@react-router/dev',
];
const NEXT_PACKAGES = ['next'];

export async function react({ overrides }: OptionsReact = {}): Promise<TypedConfigItem[]> {
  ensureInstalled(
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
    'eslint-plugin-jsx-a11y',
  );

  const [reactPlugin, reactHooksPlugin, reactRefreshPlugin, jsxA11yPlugin] = await Promise.all([
    lazy(import('eslint-plugin-react')),
    lazy(import('eslint-plugin-react-hooks')),
    lazy(import('eslint-plugin-react-refresh')),
    lazy(import('eslint-plugin-jsx-a11y')),
  ]);

  const isUsingReactRouter = REACT_ROUTER_PACKAGES.some((pkg) => isPackageExists(pkg));
  const isUsingNextJs = NEXT_PACKAGES.some((pkg) => isPackageExists(pkg));

  return [
    {
      plugins: {
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
        'react-refresh': reactRefreshPlugin,
        'jsx-a11y': jsxA11yPlugin,
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
          ...reactPlugin.configs.flat.recommended.rules,
          ...reactHooksPlugin.configs.recommended.rules,
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
          ...jsxA11yPlugin.flatConfigs.recommended.rules,
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
    ...(isUsingReactRouter
      ? ([
          // React router requires default exports for routes and layouts.
          {
            files: ['**/*.[jt]sx', '*/routes.[jt]s'],
            rules: {
              'import-x/no-default-export': 'off',
            },
            name: 'react/rules/no-default-export',
          },
        ] satisfies TypedConfigItem[])
      : []),
  ];
}
