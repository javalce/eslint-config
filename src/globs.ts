export const GLOB_JS_FILES = '**/*.?([cm])js';

export const GLOB_JSX_FILES = '**/*.?([cm])jsx';

export const GLOB_TS_FILES = '**/*.?([cm])ts';

export const GLOB_TSX_FILES = '**/*.?([cm])tsx';

export const GLOB_SVELTE_FILES = '**/*.svelte';

export const GLOB_VUE_FILES = '**/*.vue';

export const GLOB_ASTRO_FILES = ['*.astro', '**/*.astro'];

export const GLOB_ASTRO_JS_FILES = ['**/*.astro/*.js', '*.astro/*.js'];

export const GLOB_ASTRO_TS_FILES = ['**/*.astro/*.ts', '*.astro/*.ts'];

export const GLOB_HTML_FILES = '**/*.html';

export const GLOB_SRC_FILES_EXT = '?([cm])[jt]s?(x)';

export const GLOB_SRC_FILES = '**/*.?([cm])[jt]s?(x)';

const GLOB_SRC_FILES_TS_EXT = '?([cm])ts?(x)';

export const GLOB_TEST_FILES = [
  `**/__tests__/**/*.${GLOB_SRC_FILES_EXT}`,
  `**/*.spec.${GLOB_SRC_FILES_EXT}`,
  `**/*.test.${GLOB_SRC_FILES_EXT}`,
  `**/*.bench.${GLOB_SRC_FILES_EXT}`,
  `**/*.benchmark.${GLOB_SRC_FILES_EXT}`,
];

export const GLOB_TS_TEST_FILES = [
  `**/__tests__/**/*.${GLOB_SRC_FILES_TS_EXT}`,
  `**/*.spec.${GLOB_SRC_FILES_TS_EXT}`,
  `**/*.test.${GLOB_SRC_FILES_TS_EXT}`,
  `**/*.bench.${GLOB_SRC_FILES_TS_EXT}`,
  `**/*.benchmark.${GLOB_SRC_FILES_TS_EXT}`,
];

export const GLOB_CONFIG_FILES = ['**/*.+(config|conf).?([cm])[jt]s', '**/.*rc.?([cm])[jt]s'];
