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
      // Перенаправление всех запросов с запуском с http://atum.minsk.isida.by:11480
    //   '^/(.*)': {
    //     target: 'http://atum.minsk.isida.by:11480',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/(.*)/, '/portal/$1'),
    //   },
    // },

    proxy: {
       // Перенаправление всех запросов с запуском с  http://localhost:5173/
      '/portal': {
        target: 'http://atum.minsk.isida.by:11480',
        // доп опции (не обязательно)
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

  // конфиг для импорта компонентов через '@'
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   },
  //   extensions: ['.vue', '.js', '.ts'],
  // },


  // конфиг продакшн сборки для билда в разные файлы
  // build: {
  //   rollupOptions: {
  //     input: {
  //       // точка входа vue в production mode
  //       // main: './indexVue.html',
  //       // точка входа vue в development mode
  //       next: './index.html'
  //     },
  //     output:{
  //       //разбивает главный модуль на меньшие кусочки, чтобы не превысить лимит памяти на один chunk
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           return id.toString().split('node_modules/')[1].split('/')[0].toString();
  //         }
  //       }
  //     }
  //   }
  // }
  // кастомный конфиг для продакш сборки
  build: {
    outDir: 'dist', // папка, в которую будут собраны файлы
    assetsDir: 'assets', // папка для ассетов (например, изображений)
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name].[hash].js', // шаблон для имен JS файлов
        chunkFileNames: 'assets/js/[name].[hash].js', // шаблон для имен чанков
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name].[hash][extname]' // шаблон для имен CSS файлов
          }
          return 'assets/[name].[hash][extname]'
        },
      },
    },
  }
})