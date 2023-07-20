const { defineConfig } = require('@vue/cli-service')
const TerserWebpackPlugin = require('terser-webpack-plugin');
const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin")
const CompressionWebpackPlugin = require('compression-webpack-plugin');


module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    host: getIpAddress(),
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
    if (process.env.NODE_ENV !== 'development') {
      // https://www.jianshu.com/p/865813b7cbb6
      // config.plugins.delete('prefetch')
      // config.plugins.delete('preload');

      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);

      // config.plugin("compression-webpack-plugin").use('compression-webpack-plugin', [{
      //   deleteOriginalAssets: false // 删除原文件
      // }]);



    }
  }
})






// 获取当前机器的ip地址
function getIpAddress() {
  const os = require('os');
  const ifaces = os.networkInterfaces()

  for (let dev in ifaces) {
    let iface = ifaces[dev]
    for (let i = 0; i < iface.length; i++) {
      let { family, address, internal } = iface[i]
      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        return address
      }
    }
  }
}
