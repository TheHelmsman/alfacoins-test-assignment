import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import rollupPluginIconfont from 'rollup-plugin-iconfont';

const plugins = [
  rollupPluginIconfont({
    // build icon fonts
    fontName: 'UI Icons',
    svgs: './src/assets/fonts/ui-icons/*.svg',
    fontsOutput: './src/assets/iconfont',
    cssOutput: './src/assets/iconfont/index.scss',
    htmlOutput: false,
    jsOutput: false,
    cssPrefix: 'ui-icon-',
  }),
  vue(),
  checker({
    vueTsc: true, // check typescript errors
    overlay: false, // checker diagnostic panel is hidden
    enableBuild: false, // checker is enable in the only 'development' mode
  }),
  splitVendorChunkPlugin(),
];

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    server: {
      port: 8082,
    },
    plugins,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/index.scss"; @import "@/assets/iconfont/index.scss";`,
        },
      },
    },
    build: {
      target: 'esnext',
      minify: !isDev,
      sourcemap: isDev,
      emptyOutDir: false,
      outDir: './dist',
      rollupOptions: {
        treeshake: !isDev,
      },
    },
  };
});
