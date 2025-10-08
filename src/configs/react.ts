import type { OptionsReact, TypedConfigItem } from '../types';

import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import { isPackageExists } from 'local-pkg';

import { GLOB_SRC_FILES } from '../globs';
import jsxA11Rules from '../rules/jsx-a11y';
import reactRules from '../rules/react';

const REACT_ROUTER_PACKAGES = [
  '@react-router/node',
  '@react-router/react',
  '@react-router/serve',
  '@react-router/dev',
];
const NEXT_PACKAGES = ['next'];

export function react({ overrides }: OptionsReact = {}): TypedConfigItem[] {
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
