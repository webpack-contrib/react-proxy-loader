var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	return [
		'var React = require("react");',
		'var ReactTextComponent = require("react/lib/ReactTextComponent.js");',
		'var desc = {',
		'	loadComponent: function(callback) {},',
		'	_renderUnavailable: function() {',
		'		return new ReactTextComponent("");',
		'	}',
		'};',
		'var mixinReactProxy = require(' + JSON.stringify(require.resolve("./mixinReactProxy")) + ');',
		'mixinReactProxy(desc);',
		'module.exports = React.createClass(desc);',
		'module.exports.Mixin = desc;'
	].join("\n");
};
