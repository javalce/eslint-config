import fs from 'node:fs/promises';

import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import { javascript, react, typescript } from '../src/configs';
import { jest } from '../src/configs/jest';
import { nextjs } from '../src/configs/nextjs';
import { vitest } from '../src/configs/vitest';
import { combine } from '../src/utils';

const configs = await combine(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  javascript(),
  typescript({ tsconfigPath: 'tsconfig.json' }),
  react({ typescript: true }),
  nextjs(),
  jest({ react: true }),
  vitest({ react: true }),
);

const configNames = configs.map((i) => i.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
`;

await fs.writeFile('src/typegen.d.ts', dts);
