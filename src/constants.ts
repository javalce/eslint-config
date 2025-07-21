import { type EcmaVersion } from './types';

export const DEFAULT_ECMA_VERSION: EcmaVersion = 2023;

export const JS_FILES = '**/*.?([cm])js';

export const JSX_FILES = '**/*.?([cm])jsx';

export const TS_FILES = '**/*.?([cm])ts';

export const TSX_FILES = '**/*.?([cm])tsx';

export const SVELTE_FILES = '**/*.svelte';

export const VUE_FILES = '**/*.vue';

export const ASTRO_FILES = '**/*.astro';

export const ASTRO_JS_FILES = ['**/*.astro/*.js', '*.astro/*.js'];

export const ASTRO_TS_FILES = ['**/*.astro/*.ts', '*.astro/*.ts'];

export const HTML_FILES = '**/*.html';

export const SRC_FILES_EXT = '?([cm])[jt]s?(x)';

export const SRC_FILES = '**/*.?([cm])[jt]s?(x)';

const SRC_FILES_TS_EXT = '?([cm])ts?(x)';

export const TESTING_FILES = [
  `**/__tests__/**/*.${SRC_FILES_EXT}`,
  `**/*.spec.${SRC_FILES_EXT}`,
  `**/*.test.${SRC_FILES_EXT}`,
  `**/*.bench.${SRC_FILES_EXT}`,
  `**/*.benchmark.${SRC_FILES_EXT}`,
];

export const TS_TESTING_FILES = [
  `**/__tests__/**/*.${SRC_FILES_TS_EXT}`,
  `**/*.spec.${SRC_FILES_TS_EXT}`,
  `**/*.test.${SRC_FILES_TS_EXT}`,
  `**/*.bench.${SRC_FILES_TS_EXT}`,
  `**/*.benchmark.${SRC_FILES_TS_EXT}`,
];

export const CONFIG_FILES = ['**/*.+(config|conf).?([cm])[jt]s', '**/.*rc.?([cm])[jt]s'];

export const REACT_ROUTER_PACKAGES = [
  '@react-router/node',
  '@react-router/react',
  '@react-router/serve',
  '@react-router/dev',
];

export const NEXT_PACKAGES = ['next'];

export const CUSTOM_PATH_ALIASES = ['@/**', '~/**'];
