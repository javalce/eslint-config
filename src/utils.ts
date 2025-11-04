import type { Awaitable, TypedConfigItem } from '@/types';

import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { isPackageExists } from 'local-pkg';

const scopeUrl = fileURLToPath(new URL('.', import.meta.url));

export const requireModule = createRequire(join(process.cwd(), 'noop.js'));

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Array<Awaitable<TypedConfigItem | TypedConfigItem[]>>
): Promise<TypedConfigItem[]> {
  const resolved = await Promise.all(configs.map((c) => Promise.resolve(c)));

  return resolved.flat();
}

/**
 * Normalizes a value to a string array and optionally applies a callback to each element.
 *
 * @param value - The string or array of strings to normalize.
 * @param callback - Optional. A function to apply to each string in the array.
 * @returns An array of strings, with the callback applied if provided.
 */
export function normalizeStringArray(
  value: string | string[],
  callback?: (value: string) => string,
): string[] {
  const array = Array.isArray(value) ? value : [value];

  return callback ? array.map(callback) : array;
}

export function ensureInstalled(packages: Array<string | undefined>): void {
  if (process.env.CI || !process.stdout.isTTY) return;

  const nonExistingPackages = packages.filter(
    (i) => i && !isPackageExists(i, { paths: [scopeUrl] }),
  ) as string[];

  if (nonExistingPackages.length === 0) return;

  throw new Error(
    `The following packages are required but not installed: ${nonExistingPackages.join(
      ', ',
    )}. Please install them to proceed.`,
  );
}

export async function resolveDefaultExport<T>(
  m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- needed
  return (resolved as any).default ?? resolved;
}
