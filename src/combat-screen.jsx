/** @jsx React.DOM */

var React = require("react");
var RP = React.PropTypes;

var CombatExercise = require("./combat-exercise.jsx");
var ActiveSpell = require("./active-spell.jsx");

var CombatStore = require("./combat/combat-store.jsx");
var StateFromStore = require("./flux/state-from-store-mixin.js");

var CombatScreen = React.createClass({
    propTypes: {
        exerciseName: RP.string,
        problemIndex: RP.number
    },

    mixins: [StateFromStore({
        combatMessage: {
            store: CombatStore,
            fetch: (store) => store.getCombatMessage()
        }
    })],

    render: function() {
        var exerciseName = this.props.exerciseName;

        if (this.state.combatMessage) {
            return <div />;
        }

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
