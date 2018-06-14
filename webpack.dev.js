const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
