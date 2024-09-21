import { createRequire } from 'node:module';

import { type Awaitable, type TypedConfigItem } from './types';

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[]
): Promise<TypedConfigItem[]> {
  const resolved = await Promise.all(configs);

  return resolved.flat();
}

const require = createRequire(import.meta.url);

export function hasPackage(name: string): boolean {
  try {
    require.resolve(name);

    return true;
  } catch {
    return false;
  }
}

export async function lazy<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- we're using dynamic import
  return (resolved as any).default || resolved;
}
