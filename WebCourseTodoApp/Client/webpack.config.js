'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules|lib/,
    loader: 'babel-loader?cacheDirectory=true',
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader'
    ]
  },
  { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
  { test: /\.ttf$/, loader: 'file-loader' },
  { test: /\.eot$/, loader: 'file-loader' },
  { test: /\.(png|jpg|gif|ico|svg)$/, loader: 'file-loader?name=images/[name].[ext]' },
];

module.exports = {
  entry: {
    app: [ 'babel-polyfill', 'whatwg-fetch', 'index.js' ]
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: [ 'src', 'node_modules' ]
  },
  output: {
    path: path.join(__dirname, 'bin'),
    filename: '[name].js'
  },
  module: {
    rules: rules
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new HtmlWebpackPlugin({ title: 'Web App Template', template: 'src/index.html' }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' }
    ])
  ],
  resolveLoader: {
    modules: [ 'node_modules', 'etc' ]
  }
};
