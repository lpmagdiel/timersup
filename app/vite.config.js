import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['1024.png', '512.png', '256.png', '192.png', '152.png', '144.png', '128.png', '114.png', '64.png', '32.png'],
      manifest: {
        name: 'TimersUp',
        short_name: 'TimersUp',
        description: 'Track your time and earnings',
        theme_color: '#0F1110',
        background_color: '#0F1110',
        display: 'standalone',
        icons: [
          {
            src: '1024.png',
            sizes: '1024x1024',
            type: 'image/png'
          },
          {
             src: '512.png',
             sizes: '512x512',
             type: 'image/png' 
          },
          {
            src: '256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '114.png',
            sizes: '114x114',
            type: 'image/png'
          },
          {
            src: '64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: '32.png',
            sizes: '32x32',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
