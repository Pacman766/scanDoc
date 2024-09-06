import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path, {dirname} from 'path';
import eslint from 'vite-plugin-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    // proxy: {
      // ��������������� ���� �������� � �������� � http://atum.minsk.isida.by:11480
    //   '^/(.*)': {
    //     target: 'http://atum.minsk.isida.by:11480',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/(.*)/, '/portal/$1'),
    //   },
    // },

    proxy: {
       // ��������������� ���� �������� � �������� �  http://localhost:5173/
      '/portal': {
        target: 'http://atum.minsk.isida.by:11480',
        // ��� ����� (�� �����������)
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/portal/, '/portal')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // ������ ��� ������� ����������� ����� '@'
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   },
  //   extensions: ['.vue', '.js', '.ts'],
  // },


  // ������ �������� ������ ��� ����� � ������ �����
  // build: {
  //   rollupOptions: {
  //     input: {
  //       // ����� ����� vue � production mode
  //       // main: './indexVue.html',
  //       // ����� ����� vue � development mode
  //       next: './index.html'
  //     },
  //     output:{
  //       //��������� ������� ������ �� ������� �������, ����� �� ��������� ����� ������ �� ���� chunk
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           return id.toString().split('node_modules/')[1].split('/')[0].toString();
  //         }
  //       }
  //     }
  //   }
  // }
  // ��������� ������ ��� ������� ������
  build: {
    outDir: 'dist', // �����, � ������� ����� ������� �����
    assetsDir: 'assets', // ����� ��� ������� (��������, �����������)
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name].[hash].js', // ������ ��� ���� JS ������
        chunkFileNames: 'assets/js/[name].[hash].js', // ������ ��� ���� ������
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name].[hash][extname]' // ������ ��� ���� CSS ������
          }
          return 'assets/[name].[hash][extname]'
        },
      },
    },
  }
})