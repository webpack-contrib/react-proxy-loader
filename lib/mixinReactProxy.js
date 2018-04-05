/* eslint no-param-reassign: off */
module.exports = function mixin(React, desc) {
  desc.displayName = 'ReactProxy';
  desc.render = function render() {
    const Component = this.state.component;
    if (Component) {
      return React.createElement(Component, this.props, this.props.children);
    } else if (this.renderUnavailable) {
      return this.renderUnavailable();
    }
    return null;
  };

  desc.getInitialState = function getStat() {
    return { component: this.loadComponent() };
  };

  desc.componentDidMount = function didMount() {
    if (!this.state.component) {
      this.loadComponent((component) => {
        if (this.isMounted()) {
          this.setState({ component });
        }
      });
    }
  };
};
