/** @jsx React.DOM */

var React = require("react");
var Perseus = require("perseus");
var CombatExerciseRenderer = require("./combat-exercise-renderer.jsx");

var CombatExercise = React.createClass({
    propTypes: {
        spellName: React.PropTypes.string.isRequired,
        onAttack: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            spellName: "groups-of-tens",
            onAttack: function() { }
        };
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
        if (nextProps.spellName !== this.props.spellName) {
            this._loadSpell();
        }
    },

    render: function() {
        if (this.state.content) {
            return <div>
                <CombatExerciseRenderer
                    content={this.state.content}
                    onAttack={this.props.onAttack} />;
            </div>;
        } else {
            return <div>
                Summoning spell...
            </div>;
        }
    },

    _loadSpell: function() {
        $.ajax({
            url: "http://www.khanacademy.org/api/v1/exercises/" +
                this.props.spellName,
            cache: false
        }).then((exercise) => {
            var items = exercise.all_assessment_items;
            var index = _.random(0, items.length - 1);
            var item = items[index];
            return $.ajax({
                url: "http://www.khanacademy.org/api/v1/assessment_items/" +
                    item.id +
                    "?version=" +
                    item.sha,
                cache: false
            });
        }).then((item) => {
            // TODO(aria): Make this not break everything if we've received new
            // props
            this.setState({
                content: item.item_data
            });
        }, (err) => {
            console.error("ERROR LOADING ITEM: ", err);
        });
    }
});

module.exports = CombatExercise;
