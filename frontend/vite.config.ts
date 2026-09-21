import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { copyFileSync, existsSync } from 'fs';

function generate404HtmlPlugin(): Plugin {
  return {
    name: 'generate-404-html',
    writeBundle() {
      const distIndex = resolve(__dirname, 'dist/index.html');
      const dist404 = resolve(__dirname, 'dist/404.html');
      if (existsSync(distIndex)) {
        copyFileSync(distIndex, dist404);
        console.log('[build] Successfully generated dist/404.html for Vercel 404 HTTP status handling');
      } else {
        console.error('[build] Error: dist/index.html does not exist during writeBundle');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), generate404HtmlPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    // Disable PostCSS config file discovery to avoid parent-dir tailwind.config.js conflicts
    postcss: {},
  },
  build: {
    target: 'es2022',
    cssMinify: true,
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        // The single ~2MB bundle was shipping GSAP/Swiper/Framer Motion/Supabase/React Query
        // to every route, including simple pages that never touch them. Splitting vendor code
        // by library lets the browser cache each independently and only fetch what a given
        // page's code-split chunks actually import — no behavior change, smaller initial payload.
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-animation': ['gsap', '@gsap/react', 'framer-motion'],
          'vendor-swiper': ['swiper'],
          'vendor-data': ['@tanstack/react-query', '@supabase/supabase-js'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});