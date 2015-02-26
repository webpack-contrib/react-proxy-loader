var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	var queryString = this.query || "",
		query = loaderUtils.parseQuery(queryString),
		moduleRequest = "!!" + remainingRequest;

	return [
		'var React = require("react");',
		'var component;',
		'var desc = {',
		'	loadComponent: function(callback) {',
		'		if(!component) {',
		'			require.ensure([], function() {',
		'				component = require(' + JSON.stringify(moduleRequest) + ');',
		'				if(callback) callback(component);',
		'			}' + (query.name ? ', "' + query.name + '"' : '') + ');',
		'		} else if(callback) callback(component);',
		'		return component;',
		'	},',
		'};',
		'var mixinReactProxy = require(' + JSON.stringify(require.resolve("./mixinReactProxy")) + ');',
		'mixinReactProxy(React, desc);',
		'module.exports = React.createClass(desc);',
		'module.exports.Mixin = desc;'
	].join("\n");
};
