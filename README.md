# react-proxy-loader

Wraps a react component in a proxy component to enable Code Splitting (loads a react component and its dependencies on demand).

## installation

`npm install react-proxy-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` js
var Component = require("react-proxy!./Component");
// => returns the proxied component (It loads on demand.)
// (webpack creates an additional chunk for this component and its dependencies)

var ComponentProxyMixin = require("react-proxy!./Component").Mixin;
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

## Asynchronous module loading with animatable routes

Optionally it can be combine with [react-router](https://github.com/rackt/react-router) and React's [TransitionGroup](http://facebook.github.io/react/docs/animation.html) to animate between asynchronous loaded modules.

``` js
var React = require('react/addons');
var Router = require('react-router');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var Link = Router.Link;

// when the route is triggered, it will load the module before displaying anything on the DOM
var ComponentProxyMixin = require("react-proxy!./Component").Mixin;
var ComponentProxy = React.createClass({
  mixins: [ComponentProxyMixin]
});

var App = React.createClass({
  mixins: [Router.State],
  render: function() {
    var activeRouteName = this.getPath() || '/';
    // wrap the react router handler in a css transition group with a name to the css class
    return (
      <div>
        <CSSTransitionGroup transitionName="fade">
          <RouteHandler key={activeRouteName}/>
        </CSSTransitionGroup>
        <Link to="component">async load and animate new route</Link>
      </div>
    );
  }
});

var routes = (
  <Route handler={Main}>
    <Route name="component" handler={ComponentProxy}/>
  </Route>
);

Router.run(routes, 
  function (Handler) {
    React.render(<Handler/>, content);
});
```
```css
.fade-enter {
  opacity: 0.01
  transition: opacity 0.5s ease-in 1.3s
}
.fade-enter.fade-enter-active {
  opacity: 1
}
.fade-leave {
  opacity: 1
  transition: opacity 1.5s ease-in
}
.fade-leave.fade-leave-active {
  opacity: 0.01
}
```


# License

MIT (http://www.opensource.org/licenses/mit-license.php)
