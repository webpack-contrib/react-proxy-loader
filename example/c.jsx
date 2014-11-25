/** @jsx React.DOM */

var React = require("react");
var C = React.createClass({
	mixins: [require("react/lib/LinkedStateMixin")],
	getInitialState: function() {
		return { text: "Text" };
	},
	render: function() {
		return (
			<div>
				<p>This is component C ({this.props.param}).</p>
				<input valueLink={this.linkState("text")} />
			</div>
		);
	}
});

module.exports = C;
