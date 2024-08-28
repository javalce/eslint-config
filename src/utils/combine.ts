import { type Awaitable } from 'eslint-flat-config-utils';

import { type ConfigItem } from '../types';

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Awaitable<ConfigItem | ConfigItem[]>[]
): Promise<ConfigItem[]> {
  const resolved = await Promise.all(configs);

  return resolved.flat();
}
