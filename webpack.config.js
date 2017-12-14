var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var SRC_DIR = path.resolve(__dirname, "src");
var DIST_DIR = path.resolve(__dirname, "dist");

module.exports = {
	entry: path.resolve(SRC_DIR, "app.js"),
	output: {
		path: DIST_DIR,
		filename: "bundle.js"
	},
	module: {
    loaders: [
      // JS files
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: "babel-loader",
			},
      // HTML files
      {
        test: /\.html$/,
        loader: 'html-loader',
      }
		]
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_DIR, "index.html")
    })
  ],
};
