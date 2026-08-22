import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: process.env.GITHUB_ACTIONS ? '/skala-vue/' : '/',
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api/krx': {
          target: 'https://data-dbg.krx.co.kr',
          changeOrigin: true,
          rewrite: () => '/svc/apis/sto/ksq_bydd_trd',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyRequest) => {
              proxyRequest.setHeader('AUTH_KEY', env.KRX_AUTH_KEY || env.VITE_KRX_AUTH_KEY)
            })
          },
        },
      },
    },
  }
})
