/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

var src = path.join(__dirname, '..', 'src');
var dist = path.join(__dirname, '..', 'dist');

module.exports = {
  entry: [path.join(src, 'index')],
  output: {
    path: dist,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: src
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        preloaders: [
          'image-webpack'
        ],
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ]
  },
  imageWebpackLoader: {
    bypassOnDebug: true,
    progressive: false,
    optimizationLevel: 7,
    interlacted: false,
  }
};
