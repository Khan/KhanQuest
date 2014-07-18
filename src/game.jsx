/** @jsx React.DOM */

var React = require("react");
var Spellbook = require("./spellbook.jsx");
var Spell = require("./models/spell.js");

var Game = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        var stateChanged = !_.isEqual(this.state, nextState);
        var propsChanged = !_.isEqual(this.props, nextProps);
        return propsChanged || stateChanged;
    },

    propTypes: {
        map: React.PropTypes.object,
        user: React.PropTypes.object
    },

    getDefaultProps: {
        user: {
            unlockedExercises: ["measuring-lengths-1"]
        }
    },

    render: function () {
        var spells = _.map(this.props.user.unlockedExercises, Spell);
        return <div>
            <Spellbook spells={spells} />
        </div>;
    }
});

module.exports = Game;
