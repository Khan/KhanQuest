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
        var className = "icon";
        if (this.props.spell.type) {
            className += " " + this.props.spell.type;
        }
        return className;
    },

    _renderImage: function () {
        var asset = this.props.spell.displayName.toLowerCase().replace(/ /, '-');
        var url = "/static/img/spells/" + asset + ".png";
        return <img className={this._getIconClassName()} src={url} />;
    },

    render: function () {
        var inlineBlock = {
            display: "inline-block"
        };

        return <div className={this._getClassName()}>
            <div style={inlineBlock}>{this._renderImage()}</div>
            <div style={inlineBlock} className="content">
                <div className="title">{this.props.spell.displayName}</div>
                <div className="description">{this.props.spell.description}</div>
            </div>
        </div>;
    }
});

module.exports = SpellBadge;
