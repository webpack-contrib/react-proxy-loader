// Run with "webpack-dev-server --hot --inline --colors"

var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: "./app",
	output: {
		path: path.join(__dirname, "output"),
		filename: "bundle.js"
	},
	resolveLoader: {
		alias: {
			"react-proxy": path.join(__dirname, "..")
		}
	},
	resolve: {
		extensions: ["", ".jsx", ".js"]
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader" }
		]
	}
};
