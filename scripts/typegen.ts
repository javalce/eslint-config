import fs from 'node:fs/promises';

import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import { type Linter } from 'eslint';

import { angular } from '../src/configs/angular';
import { astro } from '../src/configs/astro';
import { comments } from '../src/configs/comments';
import { imports } from '../src/configs/imports';
import { javascript } from '../src/configs/javascript';
import { jest } from '../src/configs/jest';
import { nextjs } from '../src/configs/nextjs';
import { ngrx } from '../src/configs/ngrx';
import { react } from '../src/configs/react';
import { solid } from '../src/configs/solidjs';
import { stylistic } from '../src/configs/stylistic';
import { svelte } from '../src/configs/svelte';
import { testingLibrary } from '../src/configs/testing-library';
import { typescript } from '../src/configs/typescript';
import { unicorn } from '../src/configs/unicorn';
import { vitest } from '../src/configs/vitest';
import { vue } from '../src/configs/vue';
import { type TypedConfigItem } from '../src/types';

function combine(...configs: Array<TypedConfigItem | TypedConfigItem[]>): TypedConfigItem[] {
  return configs.flat();
}

const configs = combine(
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
  testingLibrary({
    angular: true,
    react: true,
    svelte: true,
    vue: true,
  }),
) as Linter.Config[];

const dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
});

await fs.writeFile('src/typegen.d.ts', dts);
