module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	return [
		'var React = require("react");',
		'var desc = {',
		'	loadComponent: function(callback) {}',
		'};',
		'var mixinReactProxy = require(' + JSON.stringify(require.resolve("./mixinReactProxy")) + ');',
		'module.exports = mixinReactProxy(React, desc);',
		'module.exports.Mixin = desc;'
	].join("\n");
};
