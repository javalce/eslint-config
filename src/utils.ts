import { type Awaitable } from 'eslint-flat-config-utils';

import { type TypedConfigItem } from './types';

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[]
): Promise<TypedConfigItem[]> {
  const resolved = await Promise.all(configs);

  return resolved.flat();
}

export function hasPackage(name: string): boolean {
  try {
    // eslint-disable-next-line no-new -- dynamic import
    new URL(name, import.meta.url);

    return true;
  } catch {
    return false;
  }
}
