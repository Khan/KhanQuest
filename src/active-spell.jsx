/** @jsx React.DOM */

var React = require("react");
var { Actions } = require("./actions.jsx");
var SpellBadge = require("./spell-badge.jsx");

var ActiveSpell = React.createClass({

    _openSpellbook: function() {
        Actions.changeGameState({state: "SPELLBOOK"});
    },

    render: function () {
        if (this.props.exerciseName) {
            return <SpellBadge className="selected"
                        exerciseName={this.props.exerciseName}
                        onClick={this._openSpellbook} />;
        } else {
            var style = {
                backgroundColor: "green",
            }
            return <div onClick={this._openSpellbook} style={style}>
                Click to open spellbook.
            </div>;
        }
    }
});

module.exports = ActiveSpell;
