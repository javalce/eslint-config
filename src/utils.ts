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
  if (path) return path;

  const main = 'tsconfig.json';
  const eslint = 'tsconfig.eslint.json';

  if (fs.existsSync(main)) {
    const raw = fs.readFileSync(main, 'utf-8');
    const content = JSON.parse(raw) as Record<string, unknown>;

    if (Array.isArray(content.references) && content.references.length > 0) {
      return main;
    }
  }

  return fs.existsSync(eslint) ? eslint : main;
}

export function resolveRelativePath(relativePath: string): string {
  return resolve(process.cwd(), relativePath);
}
