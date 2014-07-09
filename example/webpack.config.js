var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: ["webpack/hot/dev-server", "./app"],
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
		alias: {
			"react-proxy-loader": path.join(__dirname, "..")
		},
		extensions: ["", ".jsx", ".js"]
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader" }
		]
	}
};
