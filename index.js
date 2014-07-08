var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.parseQuery(this.query);
	var async = query.async || query.lazy;
	var moduleRequest = "!!" + (async ? require.resolve("bundle-loader") + "?lazy!" : "") + remainingRequest;
	return [
		'var React = require("react");',
		'var ReactTextComponent = require("react/lib/ReactTextComponent.js");',
		'var desc = {',
		'	loadComponent: function(callback) {'
	].concat(
		async ? [
		'		var ret;',
		'		require(' + JSON.stringify(moduleRequest) + ')(function(component) {',
		'			ret = component;',
		'			if(callback) callback(component);',
		'		});',
		'		return ret;'
		] : [
		'		return require(' + JSON.stringify(moduleRequest) + ');'
		]
	).concat([
		'	},',
		'	_renderUnavailable: function() {',
		'		return new ReactTextComponent("")',
		'	}',
		'};',
		'var mixinReactProxy = require(' + JSON.stringify(require.resolve("./mixinReactProxy")) + ');',
		'mixinReactProxy(desc);',
		'if(module.hot) {',
		'	var mountedComponents = [];',
		'	module.hot.accept(' + JSON.stringify(moduleRequest) + ', function() {',
		'		mountedComponents.forEach(function(c) {',
		'			c.setComponent(c.loadComponent());',
		'			c._proxyEnsureComponent();',
		'		});',
		'	});',
		'	desc.componentWillMount = function() {',
		'		mountedComponents.push(this);',
		'	};',
		'	desc.componentWillUnmount = function() {',
		'		mountedComponents.splice(mountedComponents.indexOf(this), 1)',
		'	};',
		'}',
		'module.exports = React.createClass(desc);',
		'module.exports.Mixin = desc;'
	]).join("\n");
};