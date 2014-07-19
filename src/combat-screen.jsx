/** @jsx React.DOM */

var React = require("react");
var CombatExercise = require("./combat-exercise.jsx");

var CombatScreen = React.createClass({
    propTypes: {
        user: React.PropTypes.object,
        enemy: React.PropTypes.object,
    },

    getDefaultProps: function() {
        return {
        };
    },

    getInitialState: function() {
        return {
            spellName: "groups-of-tens",
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
        return <div>
            <CombatExercise onAttack={this.onAttack}
                            onFailedAttack={this.onFailedAttack}
                            problemIndex={this.state.problemIndex} />
        </div>;
    }
});

module.exports = CombatScreen;
