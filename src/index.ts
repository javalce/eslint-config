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
    react: enableReact,
    next: enableNextjs,
    testing: enableTesting,
    userConfigs = [],
  } = options;

  const configs: Awaitable<TypedConfigItem[]>[] = [];

  configs.push(ignores(), javascript());

  const tsconfigPath = typeof enableTypeScript !== 'boolean' ? enableTypeScript : 'tsconfig.json';

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

  if (enableNextjs) {
    configs.push(nextjs());
  }

  if (enableTesting === 'jest') {
    configs.push(
      jest({
        react: Boolean(enableReact),
      }),
    );
  }

  if (enableTesting === 'vitest') {
    configs.push(
      vitest({
        react: Boolean(enableReact),
      }),
    );
  }

  let composer = new FlatConfigComposer<TypedConfigItem, ConfigNames>();

  composer = composer.append(...configs, ...(userConfigs as any));

  return composer;
}
