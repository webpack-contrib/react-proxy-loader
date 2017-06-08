var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.getOptions(this) || {};
	var moduleRequest = "!!" + remainingRequest;

	return [
		'var React = require("react");',
		'var component;',
		'var desc = {',
		'	loadComponent: function(callback) {',
		'		if(!component) {',
		'			require.ensure([], function() {',
		'				component = require(' + loaderUtils.stringifyRequest(this, moduleRequest) + ');',
		'				if (component && component.default) component = component.default;',
		'				if(callback) callback(component);',
		'			}' + (query.name ? ', ' + JSON.stringify(query.name) : '') + ');',
		'		} else if(callback) callback(component);',
		'		return component;',
		'	},',
		'};',
		'var mixinReactProxy = require(' + loaderUtils.stringifyRequest(this, require.resolve("./mixinReactProxy")) + ');',
		'module.exports = mixinReactProxy(React, desc);',
		'module.exports.Mixin = desc;'
	].join("\n");
};
