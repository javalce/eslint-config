import fs from 'node:fs';
import path from 'node:path';

import { handleError } from './handle-error';

export function getEslintConfigPath(): string {
  const configFiles = ['eslint.config.js', 'eslint.config.cjs', 'eslint.config.mjs'];

  const eslintFile = configFiles.find((file) => fs.existsSync(path.resolve(process.cwd(), file)));

  if (eslintFile === undefined) {
    handleError('ESLint config file not found');
  }

  // @ts-expect-error -- undefined is handled above
  return path.join(process.cwd(), eslintFile);
}
