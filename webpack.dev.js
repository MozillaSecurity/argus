const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.common.js')
module.exports = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
