/** @jsx React.DOM */

var React = require("react");
var Spell = require("./models/spell");

var SpellBadge = React.createClass({
    propTypes: {
        exerciseName: React.PropTypes.string,
        onClick: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            exerciseName: null,
            onClick: function() { }
        };
    },

    _getClassName: function () {
        var className = "spell-badge";
        if (this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    },

    _renderImage: function () {
        var spell = new Spell(this.props.exerciseName);

        var asset = spell.displayName.toLowerCase().replace(/ /, '-');
        var url = "/static/img/spells/" + asset + ".png";
        return <img className="icon" src={url} />;
    },

    render: function () {
        var spell = new Spell(this.props.exerciseName);

        var inlineBlock = {
            display: "inline-block"
        };

        return <div
                className={this._getClassName()}
                onClick={this.handleClick}>
            <div style={inlineBlock}>{this._renderImage()}</div>
            <div style={inlineBlock} className="content">
                <div className="title">{spell.displayName}</div>
                <div className="description">{spell.description}</div>
            </div>
        </div>;
    },

    handleClick: function() {
        this.props.onClick(this.props.exerciseName);
    }
});

module.exports = SpellBadge;
