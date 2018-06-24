const webpack = require('webpack')
const merge = require('webpack-merge')

const base = require('./webpack.config.base.js')

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new (require('uglifyjs-webpack-plugin'))({
      uglifyOptions: {
        warnings: false
      }
    })
  ]
})
