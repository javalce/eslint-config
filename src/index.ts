import type { OptionsConfig, TypedConfigItem } from './types';

import { type Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';

import { ignores, javascript, react, typescript } from './configs';
import { jest } from './configs/jest';
import { nextjs } from './configs/nextjs';
import { vitest } from './configs/vitest';
import { type ConfigNames } from './typegen';
import { hasPackage } from './utils';

export function defineConfig(
  options: OptionsConfig,
): FlatConfigComposer<TypedConfigItem, ConfigNames> {
  const {
    typescript: enableTypeScript = hasPackage('typescript'),
    react: reactFlag,
    testing: enableTesting,
    userConfigs = [],
  } = options;

  const configs: Awaitable<TypedConfigItem[]>[] = [];

  configs.push(ignores(), javascript());

  const tsconfigPath = typeof enableTypeScript !== 'boolean' ? enableTypeScript : 'tsconfig.json';

  const enableReact = Boolean(reactFlag);
  const enableNext = reactFlag === 'next';

  if (enableTypeScript) {
    configs.push(
      typescript({
        tsconfigPath,
      }),
    );
  }

  if (enableReact) {
    configs.push(
      react({
        typescript: Boolean(enableTypeScript),
      }),
    );
  }

  if (enableNext) {
    configs.push(nextjs());
  }

  if (enableTesting === 'jest') {
    configs.push(
      jest({
        react: enableReact,
      }),
    );
  }

  if (enableTesting === 'vitest') {
    configs.push(
      vitest({
        react: enableReact,
      }),
    );
  }

  let composer = new FlatConfigComposer<TypedConfigItem, ConfigNames>();

  composer = composer.append(...configs, ...(userConfigs as any));

  return composer;
}
