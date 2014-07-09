module.exports = {
	componentWillMount: function() {
		if(this.props.__ReactProxyOldState)
			this.setState(this.props.__ReactProxyOldState);
	}
};
