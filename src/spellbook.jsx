/** @jsx React.DOM */

var _ = require("underscore");
var Spell = require("./models/spell");

var Badge = React.createClass({
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
        if (this.props.spell.type) {
            className += " " + this.props.spell.type;
        }
        return className;
    },

    _renderImage: function () {
        var url = "/static/img/spells/" + this.props.spell.exerciseName + ".jpg";
        return <img className={this._getClassName()} src={url} />;
    },

    render: function () {
        var inlineBlock = {
            display: "inline-block"
        };

        return <div style={{marginBottom: 10}}>
            <div style={inlineBlock}>{this._renderImage()}</div>
            <div style={inlineBlock}>
                <div>{this.props.spell.displayName}</div>
                <div>{this.props.spell.caption}</div>
                <div>{this.props.spell.description}</div>
            </div>
        </div>;
    }
});

var Spellbook = React.createClass({
    propTypes: {
        spells: React.PropTypes.arrayOf(
            React.PropTypes.instanceOf(Spell)
        )
    },

    getDefaultProps: function () {
        return {
            spells: []
        };
    },

    render: function () {
        return <div className="spellbook">
            {_.map(this.props.spells, (spell, i) => {
                return <Badge spell={spell} key={i} />;
            })}
        </div>;
    }
});

module.exports = Spellbook;
