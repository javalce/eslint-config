import type { Linter } from 'eslint';

import type { Config, OptionsReact } from '../types';

import { isPackageExists } from 'local-pkg';

import { GLOB_SRC_FILES } from '../globs';
import { ensureInstalled, resolveDefaultExport } from '../utils';

const REACT_REFRESH_ALLOW_CONSTANT_EXPORT_PACKAGES = ['vite'];

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
}: OptionsReact = {}): Promise<Config[]> {
  ensureInstalled([
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
  ]);

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all([
    resolveDefaultExport(import('@eslint-react/eslint-plugin')),
    resolveDefaultExport(import('eslint-plugin-react-hooks')),
    resolveDefaultExport(import('eslint-plugin-react-refresh')),
  ]);

  // @ts-expect-error -- TS cannot infer that plugins is defined
  const plugins = (pluginReact.configs.all.plugins as Linter.Config['plugins'])!;

  const isAllowConstantExport = REACT_REFRESH_ALLOW_CONSTANT_EXPORT_PACKAGES.some((pkg) =>
    isPackageExists(pkg),
  );
  const isUsingReactRouter = REACT_ROUTER_PACKAGES.some((pkg) => isPackageExists(pkg));
  const isUsingNext = NEXT_PACKAGES.some((pkg) => isPackageExists(pkg));

  const files = [GLOB_SRC_FILES];

  return [
    {
      name: 'react/setup',
      plugins: {
        react: plugins['@eslint-react'],
        'react-dom': plugins['@eslint-react/dom'],
        'react-hooks': pluginReactHooks,
        'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
        'react-naming-convention': plugins['@eslint-react/naming-convention'],
        'react-refresh': pluginReactRefresh,
        'react-web-api': plugins['@eslint-react/web-api'],
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
      name: 'react/rules',
      files,
      rules: {
        'react/jsx-key-before-spread': 'warn',
        'react/jsx-no-comment-textnodes': 'warn',
        'react/jsx-no-duplicate-props': 'warn',
        'react/jsx-shorthand-boolean': 'warn',
        'react/jsx-shorthand-fragment': 'warn',
        'react/jsx-uses-react': 'warn',
        'react/jsx-uses-vars': 'warn',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-children-count': 'warn',
        'react/no-children-for-each': 'warn',
        'react/no-children-map': 'warn',
        'react/no-children-only': 'warn',
        'react/no-children-to-array': 'warn',
        'react/no-clone-element': 'warn',
        'react/no-component-will-mount': 'error',
        'react/no-component-will-receive-props': 'error',
        'react/no-component-will-update': 'error',
        'react/no-context-provider': 'warn',
        'react/no-create-ref': 'error',
        'react/no-default-props': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-forward-ref': 'warn',
        'react/no-implicit-key': 'warn',
        'react/no-leaked-conditional-rendering': 'warn',
        'react/no-missing-key': 'error',
        'react/no-nested-component-definitions': 'error',
        'react/no-nested-lazy-component-declarations': 'error',
        'react/no-prop-types': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-set-state-in-component-did-mount': 'warn',
        'react/no-set-state-in-component-did-update': 'warn',
        'react/no-set-state-in-component-will-update': 'warn',
        'react/no-string-refs': 'error',
        'react/no-unnecessary-use-prefix': 'warn',
        'react/no-unsafe-component-will-mount': 'warn',
        'react/no-unsafe-component-will-receive-props': 'warn',
        'react/no-unsafe-component-will-update': 'warn',
        'react/no-unused-class-component-members': 'warn',
        'react/no-use-context': 'warn',
        'react/no-useless-forward-ref': 'warn',
        'react/no-useless-fragment': ['warn', { allowExpressions: true }],
        'react/prefer-use-state-lazy-initialization': 'warn',
        'react/prefer-namespace-import': 'error',
      },
    },
    {
      name: 'react/rules/dom',
      files,
      rules: {
        'react-dom/no-dangerously-set-innerhtml': 'warn',
        'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
        'react-dom/no-find-dom-node': 'error',
        'react-dom/no-flush-sync': 'error',
        'react-dom/no-hydrate': 'error',
        'react-dom/no-missing-button-type': 'warn',
        'react-dom/no-namespace': 'error',
        'react-dom/no-render': 'error',
        'react-dom/no-render-return-value': 'error',
        'react-dom/no-script-url': 'warn',
        'react-dom/no-unsafe-iframe-sandbox': 'warn',
        'react-dom/no-unsafe-target-blank': 'error',
        'react-dom/no-use-form-state': 'error',
        'react-dom/no-void-elements-with-children': 'error',
      },
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
      name: 'react/rules/react-hooks-extra',
      files,
      rules: {
        'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn',
      },
    },
    {
      name: 'react/rules/web-api',
      files,
      rules: {
        'react-web-api/no-leaked-event-listener': 'warn',
        'react-web-api/no-leaked-interval': 'warn',
        'react-web-api/no-leaked-resize-observer': 'warn',
        'react-web-api/no-leaked-timeout': 'warn',
      },
    },
    {
      name: 'react/rules/naming-convention',
      files,
      rules: {
        'react-naming-convention/use-state': 'warn',
        'react-naming-convention/component-name': 'warn',
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
                    'generateSitemaps',
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
      name: 'react/rules/stylistic',
      files,
      rules: {
        '@stylistic/jsx-curly-brace-presence': 'warn',
        '@stylistic/jsx-self-closing-comp': 'warn',
        'perfectionist/sort-jsx-props': [
          'warn',
          {
            customGroups: [
              {
                groupName: 'callback',
                elementNamePattern: '^on.+',
              },
              {
                groupName: 'reserved',
                elementNamePattern: '^(children|dangerouslySetInnerHTML|key|ref)$',
              },
            ],
            groups: ['reserved', 'shorthand-prop', 'unknown', 'callback'],
            newlinesBetween: 0,
            order: 'asc',
            type: 'natural',
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
