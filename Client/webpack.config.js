const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    script: path.resolve(__dirname, './src/javascripts/script.js'),
  },
  mode: 'production',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, '../', 'server/public'),
    filename: 'javascripts/[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/html/index.html",
      filename: "html/index.html",
      chunks: ['script']
    }),
    new HtmlWebpackPlugin({
      template: "src/html/about.html",
      filename: "html/about.html",
      chunks: ['script']
    }),
    new HtmlWebpackPlugin({
      template: "src/html/contact.html",
      filename: "html/contact.html",
      chunks: ['script']
    }),
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, "src"),
          from: '*.html',
          to: 'html/[name].html',
          noErrorOnMissing: true
        },
        {
          context: path.resolve(__dirname, "src","images"),
          from: '**/*',
          to: 'images/[name][ext]',
          noErrorOnMissing: true
        },
        {
          context: path.resolve(__dirname, "src", "stylesheets"),
          from: '**/*',
          to: 'stylesheets/[name][ext]',
          noErrorOnMissing: true
        }
      ]
    })
  ]
};