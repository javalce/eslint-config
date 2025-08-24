import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/globs.ts'],
  shims: true,
  format: ['esm'],
  clean: true,
  dts: true,
  minify: true,
});
