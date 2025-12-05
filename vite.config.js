import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          // Lucide icons (large library)
          'icons': ['lucide-react'],
          // Particles library (heavy)
          'particles': ['@tsparticles/react', '@tsparticles/slim'],
          // Encoder modules grouped by category
          'encoders-core': [
            './src/utils/encoders/computer.js',
            './src/utils/encoders/ciphers.js',
            './src/utils/encoders/classic.js',
          ],
          'encoders-creative': [
            './src/utils/encoders/fun.js',
            './src/utils/encoders/artistic.js',
            './src/utils/encoders/aesthetic.js',
            './src/utils/encoders/effects.js',
          ],
          'encoders-advanced': [
            './src/utils/encoders/patterns.js',
            './src/utils/encoders/forensics.js',
            './src/utils/encoders/scientific.js',
            './src/utils/encoders/modern.js',
          ],
          'encoders-misc': [
            './src/utils/encoders/cultural.js',
            './src/utils/encoders/communication.js',
            './src/utils/encoders/games.js',
            './src/utils/encoders/nature.js',
          ],
        },
      },
    },
    // Increase chunk size warning limit since we're intentionally chunking
    chunkSizeWarningLimit: 300,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.js',
  },
})
