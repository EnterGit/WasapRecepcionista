import * as esbuild from 'esbuild';

console.log("⚡ [ESBUILD] Compilando React Web Dashboard para producción en navegador...");

await esbuild.build({
  entryPoints: ['src/web/main.tsx'],
  bundle: true,
  outfile: 'dist/web/bundle.js',
  loader: { '.tsx': 'tsx', '.ts': 'ts', '.css': 'css' },
  minify: false,
  sourcemap: true,
  format: 'esm',
  target: ['es2020']
});

console.log("✅ Bundle Web de React generado exitosamente en dist/web/bundle.js!");
