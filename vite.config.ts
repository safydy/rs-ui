import { defineConfig } from 'vite';
import type { UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: [
        "src/components/**/*.ts",
        "src/components/**/*.tsx",
        "src/main.tsx"
      ],
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        'src/App.tsx',
        '**/stories/**',
        'src/test/**'
      ]
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'RsUI',
      fileName: (format) => `rs-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
  // Configure Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  }
} as UserConfigExport);