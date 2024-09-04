import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/libserver.ts'], // ou qualquer arquivo de entrada principal
  format: ['esm'],
  outDir: 'build',
  splitting: false, // Desativa o splitting para gerar um único arquivo
  sourcemap: false, // Desativa a geração de mapas de origem
  minify: true, // Habilita a minificação
  // clean: true // Limpa a pasta de saída antes de gerar os arquivos
});
