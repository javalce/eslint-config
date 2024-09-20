import type { OptionsConfig, TypedConfigItem } from './types';

import { astro } from './configs/astro';
import { ignores } from './configs/ignores';
import { javascript } from './configs/javascript';
import { jest } from './configs/jest';
import { nextjs } from './configs/nextjs';
import { react } from './configs/react';
import { typescript } from './configs/typescript';
import { vitest } from './configs/vitest';
import { hasPackage } from './utils';

export async function defineConfig(options: OptionsConfig): Promise<TypedConfigItem[]> {
  const {
    ecmaVersion = 2021,
    typescript: enableTypeScript = hasPackage('typescript'),
    react: reactFlag,
    astro: enableAstro,
    testing: enableTesting,
    overrides = [],
  } = options;

  const configs: TypedConfigItem[][] = [];

  configs.push(ignores(), javascript({ ecmaVersion }));

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
    configs.push(await nextjs());
  }

  if (enableAstro) {
    configs.push(astro());
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

  return [...configs.flat(), ...overrides];
}
