import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        "name": 'Vite + Vue',
        "description": "A PWA demo built with Vite and vite pwa",
        "theme_color": "#242424",
        icons: [
          {
            "src": "/vite.svg",
            "sizes": "192x192",
            "type": "image/svg+xml"
          },
          {
            "src": "/vite.svg",
            "sizes": "512x512",
            "type": "image/svg+xml"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /someInterface/i, // 接口缓存 此处填你想缓存的接口正则匹配
            handler: 'CacheFirst',
            options: {
              cacheName: 'interface-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            },
          },
          {
            urlPattern: /(.*?)\.(js|css|ts|html)/, // js /css /ts静态资源缓存
            handler: 'StaleWhileRevalidate',//从缓存读取并发送网络请求更新缓存
            options: {
              cacheName: 'js-css-html-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            },
          },
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
            handler: 'CacheFirst',//缓存优先
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 30,//最多缓存数量，超过会按照LRU原则删除
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            },
          },
        ],
      },
      devOptions: {
        // 如果想在`vite dev`命令下调试PWA, 必须启用它
        enabled: true,
        // Vite在dev模式下会使用浏览器原生的ESModule，将type设置为`"module"`与原先的保持一致
        type: "module"
      }
    })
  ]
  , css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/css/base.less";',
      },
    },
  },
  server: {
    host: "0.0.0.0"
  },
  base: './'
})
