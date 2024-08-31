import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/libserver.ts'], // Ajuste para o arquivo de entrada correto
  format: ['esm'], // Gera módulos ES
  outDir: 'dist',
  splitting: true,
  sourcemap: true,
  clean: true
});
