import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/editor/' : '/',
  build: {
    outDir: '../static/editor',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [
    VueRouter({
      routesFolder: 'src/pages',
      dts: 'src/typed-router.d.ts',
    }),
    vue(),
    UnoCSS(),
    VueDevTools(),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core',
        'pinia',
        { dayjs: [['default', 'dayjs']] },
      ],
      resolvers: [TDesignResolver({ library: 'vue-next' })],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [TDesignResolver({ library: 'vue-next' })],
      dts: 'src/components.d.ts',
    }),
  ],
  server: {
    host: true,
  },
})
