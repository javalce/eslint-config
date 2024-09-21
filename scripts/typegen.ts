import fs from 'node:fs/promises';

import { type Linter } from 'eslint';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import { astro } from '../src/configs/astro';
import { javascript } from '../src/configs/javascript';
import { jest } from '../src/configs/jest';
import { nextjs } from '../src/configs/nextjs';
import { react } from '../src/configs/react';
import { solidjs } from '../src/configs/solidjs';
import { svelte } from '../src/configs/svelte';
import { typescript } from '../src/configs/typescript';
import { vitest } from '../src/configs/vitest';
import { combine } from '../src/utils';

const configs = (await combine(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  javascript({ ecmaVersion: 2021 }),
  typescript({ tsconfigPath: 'tsconfig.json' }),
  react({ typescript: true }),
  nextjs(),
  astro(),
  svelte({ typescript: true }),
  solidjs({ typescript: true }),
  jest({ react: true }),
  vitest({ react: true }),
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
