import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))
const factoryModelTarget = 'https://pub-ad3c98c8c26c4e95ad475279f7257940.r2.dev'
const modelProxy = {
  '/models/park-overview.glb': {
    target: factoryModelTarget,
    changeOrigin: true,
    rewrite: () => '/ff_opt.glb',
  },
  '/models/factory-interior.glb': {
    target: factoryModelTarget,
    changeOrigin: true,
    rewrite: () => '/cheese_optimize.glb',
  },
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(projectRoot, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(projectRoot, './src'),
    },
  },
  server: {
    proxy: modelProxy,
  },
  preview: {
    proxy: modelProxy,
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
