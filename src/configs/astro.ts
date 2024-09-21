import { type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function astro(): Promise<TypedConfigItem[]> {
  const astroPlugin = await lazy(import('eslint-plugin-astro'));

  return [
    ...astroPlugin.configs['flat/recommended'],
    ...astroPlugin.configs['flat/jsx-a11y-recommended'],
  ];
}
