/** @jsx React.DOM */

var React = require("react");
var RP = React.PropTypes

var Perseus = require("perseus");
var CombatExerciseRenderer = require("./combat-exercise-renderer.jsx");
var Spell = require("./models/spell.js");
var Mersenne = require('mersenne');


var CombatExercise = React.createClass({
    propTypes: {
        exerciseName: RP.string.isRequired,
        problemIndex: RP.number.isRequired
    },

    getInitialState: function() {
        return {
            content: null
        };
    },

    componentWillMount: function() {
        this._loadSpell();
    },

    componentWillReceiveProps: function(nextProps) {
        var problemChanging = (
            nextProps.exerciseName !== this.props.exerciseName ||
            nextProps.problemIndex !== this.props.problemIndex);
        if (problemChanging) {
            this._loadSpell();
        }
    },

    render: function() {
        if (this.state.content) {
            return <div>
                <CombatExerciseRenderer
                    content={this.state.content}
                    onAttack={this.props.onAttack}
                    onFailedAttack={this.props.onFailedAttack} />
            </div>;
        } else {
            return <div>
                Summoning spell...
            </div>;
        }
    },

    shuffle: function(items, seed) {
        // mersenne wants a numeric seed
        var seed = _.map(this.props.exerciseName, c => c.charCodeAt())
        Mersenne.seed_array(seed);

        // _.shuffle with seeded mersenne
        var rand;
        var index = 0;
        var shuffled = [];
        _.each(items, function(item) {
            rand = Mersenne.rand(index++);
            shuffled[index - 1] = shuffled[rand];
            shuffled[rand] = item;
        });
        return shuffled;
    },

    _loadSpell: function() {
        $.ajax({
            url: "http://www.khanacademy.org/api/v1/exercises/" +
                this.props.exerciseName,
            cache: false
        }).then((exercise) => {
            var items = exercise.all_assessment_items;
            var shuffledItems = this.shuffle(items);
            var index = this.props.problemIndex % items.length;
            var item = shuffledItems[index];
            return $.ajax({
                url: "http://www.khanacademy.org/api/v1/assessment_items/" +
                    item.id +
                    "?version=" +
                    item.sha,
                cache: false
            });
        }).then((item) => {
            if (!this.isMounted()) {
                // avoid errors when clicking quickly
                return;
            }
            // TODO(aria): Make this not break everything if we've received new
            // props
            this.setState({content: JSON.parse(item.item_data)});
        }, (err) => {
            console.error("ERROR LOADING ITEM: ", err);
        });
    }
});

module.exports = CombatExercise;
