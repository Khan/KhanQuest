/** @jsx React.DOM */

var React = require("react");
var RP = React.PropTypes;
var KUIButton = require("./components/button.jsx");

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
        var end = this.state.index === this._getScene().lines.length - 1;
        var message = end ? "Close" : "Next";
        return <div className="dialog-view">
            <div style={{position: "relative"}}>
                <div className="speaker">{line.speaker}</div>
                <div className="line">{line.line}</div>
                <div className="forward">
                    <KUIButton type="submit"
                        label={message}
                        type="button"
                        domainSlug="economics-finance-domain"
                        width="140px"
                        onClick={this.onForward} />
                </div>
            </div>
        </div>;
    },

    onForward: function() {
        var scene = this._getScene();

        if (this.state.index === scene.lines.length - 1) {
            Actions.hideDialog();
        } else {
            this.setState({ index: this.state.index + 1 });
        }
    }
});

module.exports = Dialog;
