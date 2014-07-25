var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.parseQuery(this.query);
	var moduleRequest = "!!" + require.resolve("bundle-loader") + "?lazy!" + remainingRequest;
	return [
		'var React = require("react");',
		'var ReactTextComponent = require("react/lib/ReactTextComponent.js");',
		'var desc = {',
		'	loadComponent: function(callback) {',
		'		var ret;',
		'		require(' + JSON.stringify(moduleRequest) + ')(function(component) {',
		'			ret = component;',
		'			if(callback) callback(component);',
		'		});',
		'		return ret;',
		'	},',
		'	_renderUnavailable: function() {',
		'		return new ReactTextComponent("")',
		'	}',
		'};',
		'var mixinReactProxy = require(' + JSON.stringify(require.resolve("./mixinReactProxy")) + ');',
		'mixinReactProxy(desc);',
		'module.exports = React.createClass(desc);',
		'module.exports.Mixin = desc;'
	].join("\n");
};
