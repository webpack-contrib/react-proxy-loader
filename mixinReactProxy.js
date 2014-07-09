module.exports = function(desc) {
	desc.displayName = "ReactProxy";
	desc.render = function() {
		var Component = this.state.component;
		if(Component) {
			return this.transferPropsTo(Component({
				__ReactProxyOldState: this._oldState
			}, this.props.children));
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
		this._proxyEnsureComponent();
	};
	desc.setComponent = function(component) {
		if(this._renderedComponent) {
			this._oldState = this._renderedComponent.state;
		}
		this.setState({ component: component });
	};
	desc._proxyEnsureComponent = function() {
		if(!this.state.component) {
			this.loadComponent(function(component) {
				this.setComponent(component);
			}.bind(this));
		}
	};
};
