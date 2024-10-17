import type { PackageJson } from 'type-fest';

import path from 'node:path';

import fs from 'fs-extra';

export function getPackageInfo(): PackageJson {
  const packageJsonPath = path.join('package.json');

  return fs.readJsonSync(packageJsonPath) as PackageJson;
}
