import fs from 'node:fs';
import path from 'node:path';

export function findEslintConfigFile(): string | undefined {
  const configFiles = ['eslint.config.js', 'eslint.config.cjs', 'eslint.config.mjs'];

  return configFiles.find((file) => fs.existsSync(path.resolve(process.cwd(), file)));
}
