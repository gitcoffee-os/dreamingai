/**
 * Copyright (c) 2025-2099 GitCoffee All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isFastBuild = mode === 'fast'
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
        '~/*': resolve(__dirname, 'src/*'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      // 启用多线程构建
      minify: isFastBuild ? false : 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      // 启用 gzip 压缩
      reportCompressedSize: true,
      // 配置缓存
      cacheDir: './node_modules/.vite-cache',
      // 快速构建模式下禁用源映射
      sourcemap: !isFastBuild,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          format: 'es', // 使用ES模块格式
          inlineDynamicImports: false,
          // 配置代码分割
          manualChunks: isFastBuild ? undefined : {
            // 将第三方依赖打包到单独的 chunk
            vendor: ['vue', 'vue-router', 'pinia', 'ant-design-vue'],
            // 将国际化相关代码打包到单独的 chunk
            i18n: ['vue-i18n'],
            // 将 UI 组件打包到单独的 chunk
            ui: ['@gitcoffee/search-ui', '@gitcoffee/chatbot-ui']
          }
        }
      },
      assetsDir: 'assets',
      base: '/'
    },
    server: {
      port: 5173,
      open: false,
      // 开发服务器优化
      fs: {
        strict: false
      },
      watch: {
        ignored: ['**/node_modules/**', '**/dist/**']
      },
      proxy: {
        // 配置 code.exmay.com 搜索 API 的代理
        '/api/search': {
          target: 'https://code.exmay.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/search/, '/exmay/api/ugc/article/search'),
          secure: false
        }
      }
    }
  }
})
