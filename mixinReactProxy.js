module.exports = function(desc) {
	desc.displayName = "ReactProxy";
	desc.render = function() {
		var Component = this.state.component;
		if(Component) {
			return this.transferPropsTo(Component(null, this.props.children));
		} else if(this.renderUnavailable) {
			return this.renderUnavailable()
		} else {
			return this._renderUnavailable()
		}
	};
	desc.getInitialState = function() {
		return { component: this.loadComponent() };
	};
	desc.componentDidMount = function() {
		if(!this.state.component) {
			this.loadComponent(function(component) {
				this.setState({ component: component });
			}.bind(this));
		}
	};
};
