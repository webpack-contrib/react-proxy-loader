/** @jsx React.DOM */

var React = require("react");
var C = React.createClass({
	render: function() {
		// Can be changed and updated without full page refresh
		return <p>This is component C ({this.props.param}).</p>;
	}
});

module.exports = C;