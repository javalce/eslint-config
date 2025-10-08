import fs from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';

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

export function resolveTsconfig(path?: string): string {
  if (path !== undefined) return path;

  if (fs.existsSync('tsconfig.eslint.json')) return 'tsconfig.eslint.json';

  return 'tsconfig.json';
}

export function resolveRelativePath(relativePath: string): string {
  return resolve(process.cwd(), relativePath);
}
