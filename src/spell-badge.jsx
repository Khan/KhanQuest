/** @jsx React.DOM */

var React = require("react");
var Spell = require("./models/spell");

var SpellBadge = React.createClass({
    propTypes: {
        spell: React.PropTypes.instanceOf(Spell)
    },

    getDefaultProps: function () {
        return {
            spell: null
        };
    },

    _getClassName: function () {
        var className = "spell-badge";
        if (this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    },

    _getIconClassName: function () {
        var className = "spell-badge-icon";
        if (this.props.spell.type) {
            className += " " + this.props.spell.type;
        }
        return className;
    },

    _renderImage: function () {
        var url = "/static/img/spells/" + this.props.spell.exerciseName + ".jpg";
        return <img className={this._getIconClassName()} src={url} />;
    },

    render: function () {
        var inlineBlock = {
            display: "inline-block"
        };

        return <div className={this._getClassName()}>
            <div style={inlineBlock}>{this._renderImage()}</div>
            <div style={inlineBlock}>
                <div>{this.props.spell.displayName}</div>
                <div>{this.props.spell.caption}</div>
                <div>{this.props.spell.description}</div>
            </div>
        </div>;
    }
});

module.exports = SpellBadge;
