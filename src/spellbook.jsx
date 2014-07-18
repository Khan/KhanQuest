/** @jsx React.DOM */

var React = require("react");
var _ = require("underscore");
var SpellBadge = require("./spell-badge.jsx");
var Spell = require("./models/spell");

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
