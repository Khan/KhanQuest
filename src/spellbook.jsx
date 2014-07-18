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

    render: function () {
        return <div>
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
