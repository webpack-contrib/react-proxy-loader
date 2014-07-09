/** @jsx React.DOM */

var React = require("react");
var C = React.createClass({
	mixins: [require("react/lib/LinkedStateMixin"), require("react-proxy-loader/KeepStateMixin")],
	getInitialState: function() {
		return { text: "Text" };
	},
	render: function() {
		// Can be changed and updated without full page refresh
		return (
			<div>
				<p>This is component C ({this.props.param}).</p>
				<input valueLink={this.linkState("text")} />
			</div>
		);
	}
});

module.exports = C;
