const { defineConfig } = require('@vue/cli-service')
const TerserWebpackPlugin = require('terser-webpack-plugin');
const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin")
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const CDNs = {
  css: [
    "https://unpkg.com/animate.css@4.1.1/animate.min.css",
    "https://unpkg.com/bootstrap@5.3.1/dist/css/bootstrap.min.css",
    "https://unpkg.com/bootstrap-icons@1.10.0/font/bootstrap-icons.css",
    "https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css",
    "https://unpkg.com/print-js@1.6.0/dist/print.css"
  ],
  js: [
    "https://unpkg.com/compressorjs@1.2.1",
    "https://unpkg.com/cropperjs@1.5.12",
    "https://unpkg.com/print-js@1.6.0"
  ]
}

module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // open: true,
    // host: "",
    port: "2023",
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''// 本地转发到target地址，实现跨域处理
        }
      }
    },
  },
  configureWebpack: {
    // devtool: "source-map",
    resolve: {
      fallback: {
        crypto: false,
        fs: false
      }
    },
    plugins: [
      new NodePolyfillWebpackPlugin(),
      new CompressionWebpackPlugin({
        // deleteOriginalAssets: process.env.NODE_ENV !== 'development' // 删除原文件
      }),
    ],
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        minSize: 2048,// 默认超过2k就抽离
        enforceSizeThreshold: 10240,
        cacheGroups: {
          //第三方库抽离
          vendor: {
            test: /node_modules/,
            name(module) {
              const pkg = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (!pkg) {
                return;
              }
              return `npm.${pkg[1].replace('@', '')}`;
            },
          },
        }
      },
      // minimize: true,
      minimizer: [
        new TerserWebpackPlugin(),
      ],
      // sideEffects和usedExports是两种不同的优化方式。
      // usedExports: true, // 识别无用代码 未使用的导出内容不会被生成 usedExports 依赖于 terser 去检测语句中的副作用。
      // sideEffects: true,  // 开启副作用标识功能 sideEffects更为有效是因为它允许跳过整个模块/文件和整个文件子树。
    },
    externals: {
      'print-js': 'printJS',
      './cptable': 'var cptable' // 为了解决xlsx-style插件的报错
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].CDNs = CDNs;
      return args
    });
    if (process.env.NODE_ENV === 'test') {
      new BundleAnalyzerPlugin()
    }
    // if (process.env.NODE_ENV !== 'development') {
      // https://www.jianshu.com/p/865813b7cbb6
      // config.plugins.delete('prefetch')
      // config.plugins.delete('preload');


      // config.plugin("compression-webpack-plugin").use('compression-webpack-plugin', [{
      //   deleteOriginalAssets: false // 删除原文件
      // }]);



    // }
  }
})
