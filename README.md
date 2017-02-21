[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![chat][chat]][chat-url]

<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" vspace="" hspace="25"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>React Proxy Loader</h1>
  <p>Wraps a react component in a proxy component to enable Code Splitting (loads a react component and its dependencies on demand).<p>
</div>

<h2 align="center">Install</h2>

```bash
npm install react-proxy-loader`
```

<h2 align="center">Usage</h2>

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` js
var Component = require("react-proxy-loader!./Component");
// => returns the proxied component (It loads on demand.)
// (webpack creates an additional chunk for this component and its dependencies)

var ComponentProxyMixin = require("react-proxy-loader!./Component").Mixin;
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

<h2 align="center">Configuration</h2>

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
				loader: "react-proxy-loader"
			}
		]
	}
};
```

### Chunk name

You can give the chunk a name with the `name` query parameter:

``` js
var Component = require("react-proxy-loader?name=chunkName!./Component");
```

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/react-proxy-loader.svg
[npm-url]: https://npmjs.com/package/react-proxy-loader

[deps]: https://david-dm.org/webpack-contrib/react-proxy-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/react-proxy-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
