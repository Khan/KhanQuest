/** @jsx React.DOM */

var React = require("react");
var RP = React.PropTypes;

var CombatExercise = require("./combat-exercise.jsx");
var ActiveSpell = require("./active-spell.jsx");
var CombatAction = require("./combat/combat-actions.js");
var Spell = require('./models/spell.js');
var EntityStore = require('./entity.jsx')


var CombatScreen = React.createClass({
    propTypes: {
        exerciseName: RP.string.isRequired,
        problemIndex: RP.number.isRequired
    },

    onAttack: function() {
        var spell = new Spell(this.props.exerciseName);
        CombatAction.castSpell(spell, true, EntityStore.getPlayer());
        Actions.nextProblem();
    },

    onFailedAttack: function() {
        Actions.nextProblem();
    },

    render: function() {
        var exerciseName = this.props.exerciseName;

        return <div>
            <ActiveSpell exerciseName={exerciseName} />
            {exerciseName && <CombatExercise
                                exerciseName={exerciseName}
                                onAttack={this.onAttack}
                                onFailedAttack={this.onFailedAttack}
                                problemIndex={this.props.problemIndex} />}
        </div>;
    }
});

module.exports = CombatScreen;
