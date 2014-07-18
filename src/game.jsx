/** @jsx React.DOM */

var React = require("react");

var Game = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        var stateChanged = !_.isEqual(this.state, nextState);
        var propsChanged = !_.isEqual(this.props, nextProps);
        return propsChanged || stateChanged;
    },

    propTypes: {
        map: React.PropTypes.object,
        user: React.PropTypes.object
    },

    render: function() {
        return <div/>;
    }
});

module.exports = Game;
