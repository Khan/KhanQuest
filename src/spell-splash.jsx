/** @jsx React.DOM */

var React = require("react");
var SpellBadge = require("./spell-badge.jsx");

var SpellSplash = React.createClass({
    getDefaultProps: function() {
        return {
            exerciseName: null,
            description: "",
            videoURL: "",
            onClick: function() { }
        };
    },

    render: function() {
        return <div className="new-spell" onClick={this.props.onClick}>
            <div className="splash-title">You have acquired a new spell.</div>
            <SpellBadge exerciseName={this.props.exerciseName} />
            <div className="splash-description">{this.props.description}</div>
            <br/>
            <iframe frameBorder="0" scrolling="yes" width="410" height="315" src={this.props.videoURL} allowFullScreen></iframe>
        </div>;
    }
});

module.exports = SpellSplash;
