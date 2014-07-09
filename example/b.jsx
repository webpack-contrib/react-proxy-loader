/** @jsx React.DOM */

var React = require("react");
var B = React.createClass({
	render: function() {
		// Can be changed and updated without full page refresh
		return <p>This is component <strong>B</strong>.</p>;
	}
});

module.exports = B;