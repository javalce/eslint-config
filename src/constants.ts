export const JS_FILES = '**/*.?([cm])js';

export const JSX_FILES = '**/*.?([cm])jsx';

export const TS_FILES = ['**/*.?([cm])ts'];

export const TSX_FILES = ['**/*.?([cm])tsx'];

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
