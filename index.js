module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	var moduleRequest = "!!" + remainingRequest;
	return [
		'var React = require("react");',
		'var component;',
		'var desc = {',
		'  statics: {',
		'    willTransitionTo: function (transition, params, query, callback) {',
		'      debugger; require.ensure([], function() {',
		'        require(' + JSON.stringify(moduleRequest) + ');',
		'        callback && callback();',
		'      });',
		'    }',
		'  },',
		'  loadComponent: function(callback) {',
		'    var component = null;',
		'    require.ensure([], function() {',
		'      component = require(' + JSON.stringify(moduleRequest) + ');',
		'      callback && callback(component);',
		'    });',
		'    return component;',
		'  },',
		'};',
		'var mixinReactProxy = require(' + JSON.stringify(require.resolve("./mixinReactAnimatableProxy")) + ');',
		'mixinReactProxy(React, desc);',
		'module.exports = React.createClass(desc);',
		'module.exports.Mixin = desc;'
	].join("\n");
};
