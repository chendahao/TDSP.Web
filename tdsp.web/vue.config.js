const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  devServer: {
    proxy: {
      // '/auth': {
      //   target: 'http://192.168.1.27:8090',
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/api/navenv': {
      //   target: 'http://192.168.1.27:8090',
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/api/stat': {
      //   target: 'http://192.168.1.27:8090',
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/api': {
      //   target: 'http://192.168.1.27:8090',
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/maps': {
      //   target: 'http://192.168.1.27:8090',
      //   changeOrigin: true
      // }
      // '/auth': {
      //   target: 'http://114.115.174.109:8022',
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/api/navenv': {
      //   target: 'http://114.115.174.109:8022',
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/api/stat': {
      //   target: 'http://114.115.174.109:8022',
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/api': {
      //   target: 'http://114.115.174.109:8022',
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/maps': {
      //   target: 'http://114.115.174.109:8022',
      //   changeOrigin: true
      // }
      '/auth': {
        target: 'http://220.194.226.187:8080',
        ws: true,
        changeOrigin: true
      },
      '/api/navenv': {
        target: 'http://220.194.226.187:8080',
        ws: true,
        changeOrigin: true
      },
      '/api/stat': {
        target: 'http://220.194.226.187:8080',
        ws: true,
        changeOrigin: true
      },
      '/api/base': {
        target: 'http://192.168.1.23:8004',
        ws: true,
        changeOrigin: true
      },
      '/api/sch': {
        target: 'http://192.168.1.23:8004',
        ws: true,
        changeOrigin: true
      },
      '/maps': {
        target: 'http://220.194.226.187:8080',
        changeOrigin: true
      }
    }
  },
  // 不输出 map 文件
  productionSourceMap: false,
  // build时 超过10K的打包成gzip 减小体积
  configureWebpack: config => {
    const configNew = {}
    if (process.env.NODE_ENV === 'production') {
      configNew.plugins = [
        // bundle
        new BundleAnalyzerPlugin({
          analyzerMode: 'disabled',
          generateStatsFile: true,
          statsOptions: { source: false }
        }),
        // gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: true
        })
      ]

      const projectName = 'psc'
      configNew.output = {
        filename: `js/[name].[contenthash:8].${projectName}.js`,
        chunkFilename: `js/[name].[contenthash:8].${projectName}.js`
      }
    }

    return configNew
  }
}
