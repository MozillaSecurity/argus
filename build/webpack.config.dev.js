const webpack = require('webpack')
const merge = require('webpack-merge')

const base = require('./webpack.config.base.js')

module.exports = merge(base, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client'
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
})
