import { NEXT_PACKAGES, REACT_ROUTER_PACKAGES, SRC_FILES } from '../constants';
import jsxA11Rules from '../rules/jsx-a11y';
import reactRules from '../rules/react';
import { type TypedConfigItem } from '../types';
import { hasPackage, lazy } from '../utils';

export async function react(): Promise<TypedConfigItem[]> {
  const [reactPlugin, reactHooksPlugin, reactRefreshPlugin, jsxA11yPlugin, eslintPluginImport] =
    await Promise.all([
      lazy(import('eslint-plugin-react')),
      lazy(import('eslint-plugin-react-hooks')),
      lazy(import('eslint-plugin-react-refresh')),
      lazy(import('eslint-plugin-jsx-a11y')),
      lazy(import('eslint-plugin-import-x')),
    ]);

  const isUsingReactRouter = REACT_ROUTER_PACKAGES.some(hasPackage);
  const isUsingNextJs = NEXT_PACKAGES.some(hasPackage);

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
        settings: eslintPluginImport.flatConfigs.react.settings,
        languageOptions: eslintPluginImport.flatConfigs.react.languageOptions,
        name: 'react/import',
      },
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
                    return ['meta', 'links', 'headers', 'loader', 'action'];
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
    ].map((config) => ({
      ...config,
      files: [SRC_FILES],
    })) as TypedConfigItem[]),
  ];
}
