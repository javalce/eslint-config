import type { Linter } from 'eslint';

import fs from 'node:fs/promises';

import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import { angular } from '../src/configs/angular';
import { astro } from '../src/configs/astro';
import { comments } from '../src/configs/comments';
import { imports } from '../src/configs/imports';
import { javascript } from '../src/configs/javascript';
import { jest } from '../src/configs/jest';
import { nextjs } from '../src/configs/nextjs';
import { ngrx } from '../src/configs/ngrx';
import { perfectionist } from '../src/configs/perfectionist';
import { react } from '../src/configs/react';
import { solid } from '../src/configs/solidjs';
import { stylistic } from '../src/configs/stylistic';
import { svelte } from '../src/configs/svelte';
import { tanstackQuery, tanstackRouter } from '../src/configs/tanstack';
import { testingLibrary } from '../src/configs/testing-library';
import { typescript } from '../src/configs/typescript';
import { unicorn } from '../src/configs/unicorn';
import { vitest } from '../src/configs/vitest';
import { vue } from '../src/configs/vue';
import { combine } from '../src/utils';

// function combine(...configs: Array<TypedConfigItem | TypedConfigItem[]>): TypedConfigItem[] {
//   return configs.flat();
// }

const configs = (await combine(
  {
    plugins: {
      '': {
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- eslint rules
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  javascript(),
  comments(),
  imports(),
  perfectionist(),
  stylistic(),
  unicorn(),
  typescript(),
  angular(),
  ngrx(),
  react(),
  nextjs(),
  astro(),
  svelte(),
  solid(),
  vue(),
  jest(),
  vitest(),
  tanstackQuery(),
  tanstackRouter(),
  testingLibrary({
    angular: true,
    react: true,
    svelte: true,
    vue: true,
  }),
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
