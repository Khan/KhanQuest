/** @jsx React.DOM */

var React = require("react");
var CombatExercise = require("./combat-exercise.jsx");
var ActiveSpell = require("./active-spell.jsx");
var CombatAction = require("./combat/combat-actions.js");
var Spell = require('./models/spell.js');
var EntityStore = require('./entity.jsx')

var CombatScreen = React.createClass({
    getDefaultProps: function() {
        return {
            exerciseName: "groups-of-tens",
        };
    },

    getInitialState: function() {
        return {
            problemIndex: 0
        };
    },

    onAttack: function() {
        console.log("onAttack");
        this.nextProblem();
        var spell = new Spell(this.props.exerciseName);
        CombatAction.castSpell(spell, true, EntityStore.getPlayer());
    },

    onFailedAttack: function() {
        console.log("onFailedAttack");
        this.nextProblem();
    },

    nextProblem: function() {
        var problemIndex = this.state.problemIndex;
        problemIndex++;
        this.setState({problemIndex});
    },

    render: function() {
        var exerciseName = this.props.exerciseName;

        return <div>
            <ActiveSpell exerciseName={exerciseName} />
            {exerciseName && <CombatExercise
                                exerciseName={exerciseName}
                                onAttack={this.onAttack}
                                onFailedAttack={this.onFailedAttack}
                                problemIndex={this.state.problemIndex} />}
        </div>;
    }
});

module.exports = CombatScreen;
