"use strict";

//helpers from babel:
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


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
		_inherits(ReactProxy, _React$Component);
		
		function ReactProxy() {
			_classCallCheck(this, ReactProxy);
			var _this = _possibleConstructorReturn(this, (ReactProxy.__proto__ || Object.getPrototypeOf(ReactProxy)).apply(this, arguments));
			_this.state = {};
			return _this;
		}
		
		var classProperties = Object.keys(desc).map(function(key) {
			return {
				key: key,
				value: desc[key]
			};
		})
		
		_createClass(ReactProxy, classProperties);
		
		return ReactProxy;
	}(React.Component);
};
