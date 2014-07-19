/** @jsx React.DOM */

var React = require("react");
var CombatExercise = require("./combat-exercise.jsx");
var ActiveSpell = require("./active-spell.jsx");
var UserStore = require("./user-store.jsx");
var StateFromStore = require("./flux/state-from-store-mixin.js");

var CombatScreen = React.createClass({
    mixins: [
        StateFromStore({
            user: {
                store: UserStore,
                fetch: (store) => store.getUser()
            }
        })
    ],

    getDefaultProps: function() {
        return {
            exerciseName: "groups-of-tens",
        };
    },

    getInitialState: function() {
        return {
            onAttack: this.successfulAttack,
            problemIndex: 0
        };
    },

    onAttack: function() {
        console.log("onAttack");
        this.nextProblem();
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
        var exerciseName = this.state.user.activeExercise;

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
