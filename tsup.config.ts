import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  shims: true,
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  cjsInterop: true,
  minify: true,
});
