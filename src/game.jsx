/** @jsx React.DOM */

var React = require("react");
var Spellbook = require("./spellbook.jsx");
var Spell = require("./models/spell.js");
var Changeable = require("./mixins/changeable.jsx");
var PropCheckBox = require("./prop-check-box.jsx");

var Game = React.createClass({
    mixins: [Changeable],

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
        },
        showSpellbook: false,
    },

    render: function () {
        var spells = _.map(this.props.user.unlockedExercises, (exercise) => {
            return new Spell(exercise);
        });
        return <div>
            <PropCheckBox
                showSpellbook={this.props.showSpellbook}
                onChange={this.onChange} />
            {this.props.showSpellbook && <Spellbook spells={spells} />}
        </div>;
    }
});

var StatefulGame = React.createClass({
    getInitialState: function() {
        return {
            onChange: this.setState
        };
    },

    render: function() {
        return Game(this.state);
    }
});

module.exports = StatefulGame;
