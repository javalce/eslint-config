import type { Linter } from 'eslint';

import fs from 'node:fs/promises';

import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import { angular } from '@/configs/angular';
import { astro } from '@/configs/astro';
import { comments } from '@/configs/comments';
import { imports } from '@/configs/imports';
import { javascript } from '@/configs/javascript';
import { jest } from '@/configs/jest';
import { nextjs } from '@/configs/nextjs';
import { ngrx } from '@/configs/ngrx';
import { perfectionist } from '@/configs/perfectionist';
import { react } from '@/configs/react';
import { solid } from '@/configs/solidjs';
import { stylistic } from '@/configs/stylistic';
import { svelte } from '@/configs/svelte';
import { tanstackQuery, tanstackRouter } from '@/configs/tanstack';
import { testingLibrary } from '@/configs/testing-library';
import { typescript } from '@/configs/typescript';
import { unicorn } from '@/configs/unicorn';
import { vitest } from '@/configs/vitest';
import { vue } from '@/configs/vue';
import { combine } from '@/utils';

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
