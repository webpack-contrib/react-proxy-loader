module.exports = function(desc) {
	desc.displayName = "ReactProxy";
	desc.render = function() {
		var Component = this.state.component;
		if(Component) {
			return this.transferPropsTo(Component(this.props.children));
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
	desc.componentDidUpdate = function() {
		if(this._oldState) {
			deserializeState(this._renderedComponent, this._oldState);
			this._oldState = null;
		}
	};
	desc.setComponent = function(component) {
		if(this._renderedComponent) {
			this._oldState = serializeState(this._renderedComponent);
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

function serializeState(component) {
	var store = {};
	_serializeState(component, store);
	return store;
}

function _serializeState(component, store) {
	// Ignore empty state + children
	if(!component._renderedComponent && !component._renderedChildren && !component.state) return;

	// Store information
	store[component._rootNodeID + "-" + component._mountDepth] = {
		displayName: component.constructor.displayName,
		state: component.state,
		children: component._renderedChildren && component._renderedChildren.length
	};

	// Process children
	if(component._renderedComponent)
		_serializeState(component._renderedComponent, store);
	if(component._renderedChildren) {
		for(var id in component._renderedChildren) {
			_serializeState(component._renderedChildren[id], store);
		}
	}
}

function deserializeState(component, store) {
	var entry = store[component._rootNodeID + "-" + component._mountDepth];

	// Validate state
	if(entry.displayName !== component.constructor.displayName) return;
	if(typeof entry.children === "number" && !component._renderedChildren) return;
	if(typeof entry.children !== "number" && component._renderedChildren) return;
	if(component._renderedChildren && entry.children !== component._renderedChildren.length) return;

	// Inject state
	component.setState(entry.state);

	// Update state for sub components
	if(component._renderedComponent)
		deserializeState(component._renderedComponent, store);
	if(component._renderedChildren) {
		for(var id in component._renderedChildren) {
			deserializeState(component._renderedChildren[id], store);
		}
	}
}