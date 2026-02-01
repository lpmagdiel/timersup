import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-icon.svg'],
      manifest: {
        name: 'TimersUp',
        short_name: 'TimersUp',
        description: 'Track your time and earnings',
        theme_color: '#39ab92',
        icons: [
          {
            src: 'pwa-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
             src: 'pwa-icon.svg',
             sizes: '192x192',
             type: 'image/svg+xml' 
          }
        ]
      }
    })
  ],
})
