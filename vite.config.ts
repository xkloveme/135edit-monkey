import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: '135编辑器VIP采集',
        namespace: "http://tampermonkey.net/",
        description:
          "在用户打开135编辑器,获取VIP模版脚本.",
        author: 'xkloveme',
        icon: 'https://www.135editor.com/favicon.ico',
        match: ['https://www.135editor.com/*'],
        homepage: "https://github.com/xkloveme",
        homepageURL: "https://github.com/xkloveme/135edit-monkey",
        updateURL: "https://cdn.staticaly.com/gh/xkloveme/135edit-monkey/gh-pages/135edit-monkey.user.js"
      },
      build: {
        externalGlobals: {
          jquery: [
            '$',
            (version) =>
              `https://cdn.jsdelivr.net/npm/jquery@${version}/dist/jquery.min.js`,
          ],
        },
      },
    }),
  ],
});
