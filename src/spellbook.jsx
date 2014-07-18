/** @jsx React.DOM */

var _ = require("underscore");
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

    _renderImage: function () {
        var url = "/static/img/spells/" + this.props.spell.exerciseName + ".jpg";
        return <img className="spell-badge" src={url} />;
    },

    render: function () {
        return <div>
            {this._renderImage()}
            {this.props.spell.displayName}
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
                return <SpellBadge spell={spell} key={i} />;
            })}
        </div>;
    }
});

module.exports = Spellbook;
