import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'], 
  format: ['esm'],
  outDir: '../',
  splitting: true,
  sourcemap: true,
  // clean: true
});