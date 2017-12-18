const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'build', 'public');

const extractTextPlugin = new ExtractTextPlugin({filename: 'main.css'});

module.exports = {
  entry: path.resolve(SRC_DIR, 'index.js'),
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      // JS files
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        loader: 'babel-loader'
      },
      // HTML files
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // Style files
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader']
      },
      // Images
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }, {
        test: /\.svg$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    extractTextPlugin,
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_DIR, 'index.html')
    }),
    new CleanWebpackPlugin([DIST_DIR])
  ]
};
