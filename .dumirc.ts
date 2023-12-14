import { defineConfig } from 'dumi';

export default defineConfig({
  apiParser: {},
  base: '/xhy-react/',
  publicPath: '/xhy-react/',
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
  },
  outputPath: 'dist',
  themeConfig: {
    name: 'XHY-React',
    footer: 'Copyright © 2023 Powered by xianghengyu 1420734331@qq.com'
  },
  favicons: [
    'https://img0.baidu.com/it/u=215236253,1509382571&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  ],
  logo: 'https://img0.baidu.com/it/u=215236253,1509382571&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
});
