/** @jsx React.DOM */

var React = require("react");
var D = React.createClass({
	render: function() {
		// Can be changed and updated without full page refresh
		return <p>This is component D.</p>;
	}
});

module.exports = D;