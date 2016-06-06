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
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
        include: src
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        include: src
      }
    ]
  }
};
