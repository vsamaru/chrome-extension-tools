import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '../../plugin-testOptionsProvider'
import { defineConfig } from 'vite'
import _manifest from './manifest.json'

const { preambleCode } = react

const manifest = defineManifest(_manifest)

export default defineConfig({
  build: { minify: false },
  clearScreen: false,
  logLevel: 'error',
  plugins: [crx({ manifest, contentScripts: { preambleCode } }), react()],
})
