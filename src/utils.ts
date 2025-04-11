import process from 'node:process';
import { fileURLToPath } from 'node:url';

import chalk from 'chalk';
import { isPackageExists } from 'local-pkg';

import { type Awaitable, type TypedConfigItem } from './types';

const scopeUrl = fileURLToPath(new URL('.', import.meta.url));
const isCwdInScope = isPackageExists('@javalce/eslint-config');

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[]
): Promise<TypedConfigItem[]> {
  const resolved = await Promise.all(configs);

  return resolved.flat();
}

export async function lazy<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- we're using dynamic import
  return (resolved as any).default ?? resolved;
}

export function ensureInstalled(...packages: string[]): void {
  if (process.env.CI || !process.stdout.isTTY || !isCwdInScope) return;

  const missingPackages = packages.filter(
    (pkg) => pkg && !isPackageExists(pkg, { paths: [scopeUrl] }),
  );

  if (missingPackages.length === 0) return;

  const packageList = missingPackages.join(', ');
  const message = `The following packages are missing: ${packageList}. Please install them to proceed.`;

  // eslint-disable-next-line no-console -- we're using console.error to log missing packages
  console.error(chalk.red(message));
  process.exit(1);
}
