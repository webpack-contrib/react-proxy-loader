# react-proxy-loader

Wraps a react component in a proxy component to enable Code Splitting (loads a react component and its dependencies on demand).

## installation

`npm install react-proxy-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` js
var Component = require("react-proxy?name=componentName!./Component");
// => returns the proxied component (It loads on demand.)
// (webpack creates an additional chunk for this component and its dependencies 
giving it a name of 'componentName')

var ComponentProxyMixin = require("react-proxy?name=componentName!./Component").Mixin;
// => returns a mixin for the proxied component
// (This allows you to setup rendering for the loading state for the proxy)
var ComponentProxy = React.createClass({
	mixins: [ComponentProxyMixin],
	renderUnavailable: function() {
		return <p>Loading...</p>;
	}
});
```

The proxy is a react component. All properties are transferred to the wrapped component.

Instead of (or in addition to) inlining the loader call you can also specify the proxied components in your configuration:

``` js
module.exports = {
	module: {
		loaders: [
			/* ... */
			{
				test: [
					/component\.jsx$/, // select component by RegExp
					/\.async\.jsx$/, // select component by extension
					"/abs/path/to/component.jsx" // absolute path to component
				],
				loader: "react-proxy"
			}
		]
	}
};
```

# License

MIT (http://www.opensource.org/licenses/mit-license.php)
