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
