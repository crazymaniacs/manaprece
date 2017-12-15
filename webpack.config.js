var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var SRC_DIR = path.resolve(__dirname, "src");
var DIST_DIR = path.resolve(__dirname, "dist");

var extractTextPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
	entry: path.resolve(SRC_DIR, "index.js"),
	output: {
		path: DIST_DIR,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			// JS files
			{
				test: /\.(js|jsx)$/,
				include: SRC_DIR,
				loader: "babel-loader"
			},
			// HTML files
			{
				test: /\.html$/,
				loader: "html-loader"
			},
      // Style files
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	plugins: [
		extractTextPlugin,
		new HtmlWebpackPlugin({
			template: path.resolve(SRC_DIR, "index.html")
		}),
		new CleanWebpackPlugin([DIST_DIR])
	]
};
