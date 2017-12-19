const path = require('path');
const webpack = require('webpack');

const SRC_DIR = path.resolve(__dirname, 'app');

module.exports = {
  entry: ['webpack-hot-middleware/client', SRC_DIR],
  output: {
    path: SRC_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      // JS files
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react-hmre']
        }
      },
      // HTML files
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // Style files
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      },
      {
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
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true
      }
    })
  ]
};
