/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

var config = require('./webpack.config.base');

config.entry = [
  'webpack-dev-server/client?http://localhost:5000',
  'webpack/hot/dev-server',
].concat(config.entry);

config.devtool = 'eval-source-map';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
