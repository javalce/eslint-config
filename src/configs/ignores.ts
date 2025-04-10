import fs from 'node:fs';
import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import { globalIgnores } from 'eslint/config';

import { type TypedConfigItem } from '../types';

export function ignores({ files }: { files?: string[] }): TypedConfigItem[] {
  const cwd = process.cwd();
  const gitignorePath = path.join(cwd, '.gitignore');

  const config: TypedConfigItem[] = [];

  if (fs.existsSync(gitignorePath)) {
    config.push({
      ...includeIgnoreFile(gitignorePath),
      name: 'gitignore',
    });
  }

  if (files) {
    config.push({
      ...globalIgnores(files),
      name: 'ignores',
    });
  }

  return config;
}
