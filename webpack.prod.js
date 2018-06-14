const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: true,
        warnings: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
})