import type { Config } from '../types';

import fs from 'node:fs';
import path from 'node:path';

import { globalIgnores, includeIgnoreFile } from 'eslint/config';

import { GLOB_EXCLUDE_FILES } from '../globs';

export function ignores({ files = [] }: { files?: string[] }): Config[] {
  const cwd = process.cwd();
  const gitignorePath = path.join(cwd, '.gitignore');

  return [
    ...(fs.existsSync(gitignorePath)
      ? [includeIgnoreFile(gitignorePath, 'eslint/gitignores')]
      : []),
    globalIgnores([...GLOB_EXCLUDE_FILES, ...files], 'eslint/ignores'),
  ];
}
