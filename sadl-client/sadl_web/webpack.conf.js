// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// Support for Node 0.10
// See https://github.com/webpack/css-loader/issues/144
require('es6-promise').polyfill();

var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var monacoEditorPath = 'node_modules/monaco-editor-core/dev/vs'

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: 'sadl/'
  },
  node: {
    fs: 'empty'
  },
  debug: true,
  bail: true,
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'file-loader' },
      // jquery-ui loads some images
      { test: /\.(jpg|png|gif)$/, loader: 'file-loader' },
      // required to load font-awesome
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.tsx?$/, loader: "ts-loader@2.0.0" }
    ]
  },
  preLoaders: [
    { test: /\.js$/, loader: "source-map-loader" }
  ],
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      'jupyterlab': path.resolve('./node_modules/jupyterlab'),
      'phosphor': path.resolve('./node_modules/phosphor'),
      'vs': path.resolve(monacoEditorPath)
    }
  },
  externals: {
    jquery: '$',
    'jquery-ui': '$'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: monacoEditorPath,
        to: 'vs',
      }
    ])
  ]
}
