import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

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
        icon: 'https://vitejs.dev/logo.svg',
        match: ['https://www.135editor.com/*'],
      },
    }),
  ],
});
