/** @jsx React.DOM */

var React = require("react");
var RP = React.PropTypes;

var DialogData = require("./data/dialog.json");

var Dialog = React.createClass({
    propTypes: {
        scene: RP.string.isRequired,
    },

    getInitialState: function() {
        return {
            index: 0
        };
    },

    _getScene: function() {
        return DialogData[this.props.scene];
    },

    _getLine: function() {
        var lines = this._getScene().lines;
        return lines[this.state.index];
    },

    render: function() {
        var line = this._getLine();
        return <div>
            <div className="speaker">{line.speaker}</div>
            <div className="line">{line.line}</div>
            <button className="back"
                    type="button"
                    onClick={this.onBack}>&lt;</button>
            <button className="forward"
                    type="button"
                    onClick={this.onForward}>&gt;</button>
        </div>;
    },

    onForward: function() {
        var scene = this._getScene();
        var index = Math.min(scene.lines.length - 1,
                             this.state.index + 1);
        this.setState({index});
    },

    onBack: function() {
        var index = Math.max(0, this.state.index - 1);
        this.setState({index});
    }

});

module.exports = Dialog;
