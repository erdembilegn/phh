import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      '@utils/api': 'src/utils/api/index.ts',
      '@libs/colors': 'src/libs/colors/index.ts',
      '@libs/text': 'src/libs/text/index.ts',
      '@libs/jotai': 'src/libs/jotai/index.ts',
      '@libs/hooks': 'src/libs/hooks/index.ts',
      '@utils/functions': 'src/utils/functions/index.ts',
      '@utils/const': 'src/utils/const/index.ts',
    },
  },
});
