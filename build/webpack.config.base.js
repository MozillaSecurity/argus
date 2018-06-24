const path = require('path')

module.exports = {
  entry: [
    path.join(__dirname, '..', 'src/client/index.js')
  ],
  output: {
    path: path.join(__dirname, '..', 'src/server/public/'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new (require('vue-loader/lib/plugin'))(),
    new (require('html-webpack-plugin'))({
      filename: 'index.html',
      template: path.join(__dirname, '..', 'src/client/assets/index.html'),
      favicon: path.join(__dirname, '..', 'src/client/assets/images/favicon.png'),
      inject: true
    })
  ]
}
