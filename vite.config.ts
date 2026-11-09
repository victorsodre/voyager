import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * DRACOLoader references five decoder files through `new URL(..., import.meta.url)`, so Vite emits
 * all of them. The model only needs the glTF build (DRACO_GLTF_CONFIG); drop the other three.
 */
function onlyGltfDraco(): Plugin {
  const unused = /new URL\( '\.\.\/libs\/draco\/draco_(?:decoder\.wasm|wasm_wrapper\.js|decoder\.js)', import\.meta\.url \)\.toString\(\)/g;
  return {
    name: 'only-gltf-draco',
    enforce: 'pre',
    transform(code, id) {
      if (!id.replaceAll('\\', '/').endsWith('three/examples/jsm/loaders/DRACOLoader.js')) return;
      const count = code.match(unused)?.length ?? 0;
      if (count !== 3) throw new Error(`DRACOLoader mudou (${count} decodificadores fora do glTF); revise vite.config.ts`);
      return code.replace(unused, "''");
    },
  };
}

export default defineConfig({ plugins: [onlyGltfDraco(), react()], base: './', server: { host: '127.0.0.1', port: 4311 } });
