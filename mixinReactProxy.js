"use strict";

module.exports = function MixinFactory(React, desc) {
	"use strict";
	
	desc.displayName = "ReactProxy";

	desc.render = function() {
		var Component = this.state.component;
		if(Component) {
			return React.createElement(Component, this.props, this.props.children);
		} else if(this.renderUnavailable) {
			return this.renderUnavailable();
		} else {
			return null;
		}
	};

	desc.getInitialState = function() {
		return { component: this.loadComponent() };
	};

	desc.componentDidMount = function() {
		if(!this.state.component) {
			this.loadComponent(function(component) {
				if(!this.__react_proxy_unmounted) {
					this.setState({ component: component });
				}
			}.bind(this));
		}
	};

	desc.componentWillUnmount = function() {
		this.__react_proxy_unmounted = true;
	}
	
	if (!React.Component) {
		return React.createClass(desc);
	}
	
	//Return a ReactProxy "class" in ES5 syntax.
	return function (_React$Component) {
		ReactProxy.prototype = Object.create(_React$Component.prototype, { 
			constructor: { 
				value: ReactProxy, 
				enumerable: false, 
				writable: true, 
				configurable: true 
			} }); 

		Object.setPrototypeOf 
			? Object.setPrototypeOf(ReactProxy, _React$Component) 
			: ReactProxy.__proto__ = _React$Component;

		
		function ReactProxy() {
			var call = (ReactProxy.__proto__ || Object.getPrototypeOf(ReactProxy)).apply(this, arguments);
			var _this = call && (typeof call === "object" || typeof call === "function") ? call : this;

			_this.state = {};
			return _this;
		}
		
		var classProperties = Object.keys(desc).map(function(key) {
			return {
				key: key,
				value: desc[key]
			};
		})
		
		Object.defineProperties(ReactProxy.prototype, protoProps);
		
		return ReactProxy;
	}(React.Component);
};
