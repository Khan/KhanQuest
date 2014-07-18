/** @jsx React.DOM */

var _ = require("underscore");
var Spell = require("./models/spell");

var SpellBadge = React.createClass({
    propTypes: {
        spell: React.propTypes.instanceOf(Spell)
    },

    render: function () {
        return <div>
            {this.props.spell.displayName}
        </div>;
    }
});

var Spellbook = React.createClass({
    propTypes: {
        spells: React.propTypes.arrayOf(
            React.propTypes.instanceOf(Spell)
        )
    },

    getDefaultProps: function () {
        return {
            spells: []
        };
    },

    render: function () {
        return <div>
            {_.map(this.props.spells, SpellBadge)}
        </div>;
    }
});

module.exports = Spellbook;
