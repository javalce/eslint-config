import fs from 'node:fs/promises';

import { type Linter } from 'eslint';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import { astro } from '../src/configs/astro';
import { comments } from '../src/configs/comments';
import { imports } from '../src/configs/imports';
import { javascript } from '../src/configs/javascript';
import { jest } from '../src/configs/jest';
import { nextjs } from '../src/configs/nextjs';
import { react } from '../src/configs/react';
import { solid } from '../src/configs/solidjs';
import { stylistic } from '../src/configs/stylistic';
import { svelte } from '../src/configs/svelte';
import { testingLibrary } from '../src/configs/testing-library';
import { typescript } from '../src/configs/typescript';
import { unicorn } from '../src/configs/unicorn';
import { vitest } from '../src/configs/vitest';
import { vue } from '../src/configs/vue';
import { CUSTOM_PATH_ALIASES, DEFAULT_ECMA_VERSION } from '../src/constants';
import { combine } from '../src/utils';

const configs = (await combine(
  {
    plugins: {
      '': {
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- eslint rules
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  javascript({ ecmaVersion: DEFAULT_ECMA_VERSION }),
  comments(),
  imports({ pathAliases: CUSTOM_PATH_ALIASES }),
  stylistic(),
  unicorn(),
  typescript({ pathAliases: CUSTOM_PATH_ALIASES, tsconfigPath: 'tsconfig.json' }),
  react(),
  nextjs(),
  astro({ typescript: true }),
  svelte({ typescript: true }),
  solid({ typescript: true }),
  vue({ typescript: true }),
  jest(),
  vitest({ typescript: true }),
  testingLibrary({ react: true, vue: true }),
)) as Linter.Config[];

const configNames = configs.map((i) => i.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
`;

await fs.writeFile('src/typegen.d.ts', dts);
