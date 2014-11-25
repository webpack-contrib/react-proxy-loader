var React = require("react");
var LinkedStateMixin = require("react/lib/LinkedStateMixin");

var A = require("./a");

var B = require("react-proxy!./b");

var C = require("react-proxy!./c");

var D = React.createClass({
	mixins: [require("react-proxy?async!./d").Mixin],
	renderUnavailable: function() {
		return <p>Loading...</p>;
	}
});

var App = React.createClass({
	mixins: [LinkedStateMixin],
	getInitialState: function() {
		return {
			view: ""
		};
	},
	render: function() {
		return (
			<div>
				<select valueLink={this.linkState("view")}>
					<option value=""></option>
					<option value="a">A (Without loader)</option>
					<option value="b">B (With loader)</option>
					<option value="c1">C (With loader and async) param</option>
					<option value="c2">C (With loader and async) other param</option>
					<option value="d">D (With loader, async and as mixin)</option>
				</select>
				<div>
					{(function() {
						switch(this.state.view) {
						case "a": return <A />;
						case "b": return <B />;
						case "c1": return <C param="param"/>;
						case "c2": return <C param="other param"/>;
						case "d": return <D />;
						}
						return <div />;
					}.call(this))}
				</div>
			</div>
		);
	}
});

React.render(<App />, document.body);
