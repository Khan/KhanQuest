/** @jsx React.DOM */

var React = require("react");
var Spellbook = require("./spellbook.jsx");
var SpellBadge = require("./spell-badge.jsx");

var ActiveSpellbook = React.createClass({
    getDefaultProps: function () {
        return {
            currentSpell: null,
            spells: []
        };
    },

    render: function () {
        var currentSpell = <SpellBadge
                className="selected"
                spell={this.props.currentSpell} />;
        var spellbook = <Spellbook spells={this.props.spells} />;
        return <div className="active-spellbook">
            {this.props.currentSpell && currentSpell}
            {spellbook}
        </div>;
    }
});

module.exports = ActiveSpellbook;
