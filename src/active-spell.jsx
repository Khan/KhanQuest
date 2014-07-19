/** @jsx React.DOM */

var React = require("react");
var { Actions } = require("./actions.jsx");
var SpellBadge = require("./spell-badge.jsx");

var ActiveSpell = React.createClass({

    _openSpellbook: function() {
        Actions.openSpellbook();
    },

    render: function () {
        if (this.props.exerciseName) {
            return <SpellBadge className="selected"
                        exerciseName={this.props.exerciseName}
                        onClick={this._openSpellbook} />;
        } else {
            return <div onClick={this._openSpellbook} className="open-spellbook">
                Click to open spellbook.
            </div>;
        }
    }
});

module.exports = ActiveSpell;
