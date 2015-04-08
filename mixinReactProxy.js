module.exports = function(React, desc) {
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
				if(this.isMounted()) {
					this.setState({ component: component });
				}
			}.bind(this));
		}
	};
};
