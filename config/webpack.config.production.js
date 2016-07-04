/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
var S3Plugin = require('webpack-s3-plugin')

var config = require('./webpack.config.base');

config.dev = 'source-map';

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]);

if (process.env.WEBPACK_DEPLOY) {
  console.log('Configuring for deployment');
  config.plugins.push(new S3Plugin({
    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    s3UploadOptions: {
      Bucket: process.env.AWS_DEPLOY_BUCKET,
      CacheControl: 'public, max-age=300'
    },
    cloudfrontInvalidateOptions: {
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      Items: ['/*']
    },
    basePath: 'dist',
  }));
}

module.exports = config;
