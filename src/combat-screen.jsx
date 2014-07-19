/** @jsx React.DOM */

var React = require("react");
var RP = React.PropTypes;

var CombatExercise = require("./combat-exercise.jsx");
var ActiveSpell = require("./active-spell.jsx");


var CombatScreen = React.createClass({
    propTypes: {
        exerciseName: RP.string,
        problemIndex: RP.number
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
