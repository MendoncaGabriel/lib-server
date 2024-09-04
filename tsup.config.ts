import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/libserver.ts'], 
  format: ['esm'],
  outDir: 'build',
  splitting: false, 
  sourcemap: false, 
  minify: true, 
  dts: true
  // clean: true 
});
