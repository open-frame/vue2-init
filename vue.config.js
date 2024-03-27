const { defineConfig } = require('@vue/cli-service')
const AutoComponents = require('unplugin-vue-components/webpack');
const UnoCSS = require('unocss/webpack').default;
// const AutoImport = require('unplugin-auto-import/webpack')
// const { ElementUiResolver } = require('unplugin-vue-components/resolvers')
const TerserWebpackPlugin = require('terser-webpack-plugin');
const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin")
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');





const CDNs = {
  css: [
    // "https://unpkg.com/animate.css@4.1.1/animate.min.css",
    // "https://unpkg.com/bootstrap@5.3.1/dist/css/bootstrap.min.css",
    // "https://unpkg.com/bootstrap-icons@1.10.0/font/bootstrap-icons.css",
    // "https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css",
    // "https://unpkg.com/print-js@1.6.0/dist/print.css"
  ],
  js: [
    "https://webapi.amap.com/maps?v=2.0&key=a0d073450dad9a6bc15a73f0722c917c",
  ]
}

module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // open: true,
    // host: "",
    port: 2020,
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
    // devtool: process.env.NODE_ENV === "development" ? "source-map" : "",
    module: {
      rules: [
        // {
        //   test: /\.worker\.(c|m)?js$/i,
        //   use: [
        //     {
        //       loader: "worker-loader",
        //     }
        //   ],
        // },
      ],
    },
    resolve: {
      fallback: {
        crypto: false,
        fs: false
      }
    },
    plugins: [
      UnoCSS(),
      new NodePolyfillWebpackPlugin(),
      new MomentLocalesPlugin({ localesToKeep: ['zh-cn'] }),
      new CompressionWebpackPlugin({
        // deleteOriginalAssets: process.env.NODE_ENV !== 'development' // 删除原文件
      }),
      // AutoImport.default({
      //   resolvers: [ElementUiResolver()]
      // }),
      AutoComponents({
        // resolvers: [ElementUiResolver()]
      })
    ],
    // https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks
    optimization: {
      realContentHash: true,
      // nodeEnv: false,
      runtimeChunk: true,
      usedExports: 'global',
      // 依赖切片：https://webpack.docschina.org/plugins/split-chunks-plugin/#optimizationsplitchunks
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
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin(),
      ],
      // sideEffects和usedExports是两种不同的优化方式。
      // usedExports: true, // 识别无用代码 未使用的导出内容不会被生成 usedExports 依赖于 terser 去检测语句中的副作用。
      // sideEffects: true,  // 开启副作用标识功能 sideEffects更为有效是因为它允许跳过整个模块/文件和整个文件子树。
    },
    externals: {
      'AMap': 'AMap',
      './cptable': 'var cptable' // 为了解决xlsx-style插件的报错
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].CDNs = CDNs;
      return args
    });
    if (process.env.npm_lifecycle_event === 'analyzer') {
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
    }
    // if (process.env.npm_lifecycle_event === 'build:test') {
    //   /* process.env.VUE_APP_ORIGIN = 'https://clwdev.edo-iot.com';
    //      process.env.VUE_APP_BASE_URL = "https://clwdev.edo-iot.com/yscar"; */
    //   /* config.plugin('define').tap(args => {
    //     args[0]["process.env"].VUE_APP_ORIGIN = 'https://clwdev.edo-iot.com';
    //     args[0]["process.env"].VUE_APP_BASE_URL = "https://clwdev.edo-iot.com/yscar";
    //     return args;
    //   }); */
    // }
    /* if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(args => {
        // console.log(args[0]);
        // args[0].terserOptions.compress.drop_console = false;
        // args[0].terserOptions.format.comments = false;
        return args
      })

      // https://www.jianshu.com/p/865813b7cbb6
      // config.plugins.delete('prefetch')
      // config.plugins.delete('preload');




    // } */
  }
})
