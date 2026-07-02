import type { Config, OptionsReact } from '../types';

import { getPackageInfo, isPackageExists } from 'local-pkg';

import { GLOB_ASTRO_TS_FILES, GLOB_SRC_FILES, GLOB_TS_FILES, GLOB_TSX_FILES } from '../globs';
import { ensureInstalled, resolveDefaultExport } from '../utils';

export async function react({
  typeAware: isTypeAware = isPackageExists('typescript'),
  overrides,
}: OptionsReact & { typeAware?: boolean } = {}): Promise<Config[]> {
  ensureInstalled(['@eslint-react/eslint-plugin']);

  const [pluginReact] = await Promise.all([
    resolveDefaultExport(import('@eslint-react/eslint-plugin')),
  ]);

  const plugins = pluginReact.configs.all.plugins!;

  const reactVersion = await getPackageInfo('react', { paths: [process.cwd()] }).then(
    (info) => info?.version,
  );
  const isReact19OrNewer = reactVersion
    ? Number.parseInt(reactVersion.split('.')[0], 10) >= 19
    : false;

  const files = [GLOB_SRC_FILES];

  return [
    {
      name: 'react/setup',
      plugins: {
        react: plugins['@eslint-react'],
      },
    },
    {
      name: 'react/settings',
      files,
      settings: {
        react: {
          version: 'detect',
          importSource: 'react',
          polymorphicPropName: 'as',
        },
      },
    },
    {
      name: 'react/rules',
      files,
      rules: {
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
        'react/no-direct-mutation-state': 'error',
        'react/no-forward-ref': 'warn',
        'react/no-missing-key': 'error',
        'react/no-nested-component-definitions': 'error',
        'react/no-nested-lazy-component-declarations': 'error',
        'react/no-set-state-in-component-did-mount': 'warn',
        'react/no-set-state-in-component-did-update': 'warn',
        'react/no-set-state-in-component-will-update': 'warn',
        'react/no-unnecessary-use-prefix': 'warn',
        'react/no-unsafe-component-will-mount': 'warn',
        'react/no-unsafe-component-will-receive-props': 'warn',
        'react/no-unsafe-component-will-update': 'warn',
        'react/no-unused-class-component-members': 'warn',
        ...(isReact19OrNewer
          ? {
              'react/no-use-context': 'warn',
            }
          : {}),
        'react/use-state': 'warn',
      },
    },
    ...(isTypeAware
      ? [
          {
            files: [GLOB_TS_FILES, GLOB_TSX_FILES],
            ignores: GLOB_ASTRO_TS_FILES,
            rules: {
              'react/no-implicit-key': 'error',
              'react/no-leaked-conditional-rendering': 'warn',
            },
            name: 'react/rules/type-aware',
          } satisfies Config,
        ]
      : []),
    {
      name: 'react/rules/jsx',
      files,
      rules: {
        'react/jsx-no-children-prop': 'warn',
        'react/jsx-no-children-prop-with-children': 'error',
        'react/jsx-no-comment-textnodes': 'warn',
        'react/jsx-no-key-after-spread': 'error',
        'react/jsx-no-leaked-dollar': 'warn',
        'react/jsx-no-leaked-semicolon': 'warn',
        'react/jsx-no-namespace': 'error',
        'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      },
    },
    {
      name: 'react/rules/dom',
      files,
      rules: {
        'react/dom-no-dangerously-set-innerhtml': 'warn',
        'react/dom-no-dangerously-set-innerhtml-with-children': 'error',
        'react/dom-no-find-dom-node': 'error',
        'react/dom-no-flush-sync': 'error',
        'react/dom-no-hydrate': 'error',
        'react/dom-no-missing-button-type': 'warn',
        'react/dom-no-render': 'error',
        'react/dom-no-render-return-value': 'error',
        'react/dom-no-script-url': 'warn',
        'react/dom-no-string-style-prop': 'warn',
        'react/dom-no-unknown-property': ['error', { ignore: ['css'] }],
        'react/dom-no-unsafe-iframe-sandbox': 'warn',
        'react/dom-no-unsafe-target-blank': 'error',
        'react/dom-no-use-form-state': 'error',
        'react/dom-no-void-elements-with-children': 'error',
      },
    },
    {
      name: 'react/rules/react-hooks',
      files,
      rules: {
        'react/exhaustive-deps': 'warn',
        'react/rules-of-hooks': 'error',
        'react/error-boundaries': 'error',
        'react/globals': 'error',
        'react/immutability': 'error',
        'react/purity': 'error',
        'react/refs': 'error',
        'react/set-state-in-effect': 'error',
        'react/set-state-in-render': 'error',
        'react/static-components': 'error',
        'react/unsupported-syntax': 'warn',
        'react/use-memo': 'error',
      },
    },
    {
      name: 'react/rules/web-api',
      files,
      rules: {
        'react/web-api-no-leaked-event-listener': 'warn',
        'react/web-api-no-leaked-fetch': 'warn',
        'react/web-api-no-leaked-intersection-observer': 'warn',
        'react/web-api-no-leaked-interval': 'warn',
        'react/web-api-no-leaked-resize-observer': 'warn',
        'react/web-api-no-leaked-timeout': 'warn',
      },
    },
    {
      name: 'react/rules/naming-convention',
      files,
      rules: {
        'react/naming-convention-context-name': 'warn',
        'react/naming-convention-id-name': 'warn',
        'react/naming-convention-ref-name': 'warn',
      },
    },
    {
      name: 'react/rules/rsc',
      files,
      rules: {
        'react/rsc-function-definition': 'error',
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
