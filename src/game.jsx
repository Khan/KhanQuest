/** @jsx React.DOM */

var React = require("react");
var Spellbook = require("./spellbook.jsx");
var ActiveSpellbook = require("./active-spellbook.jsx");
var Spell = require("./models/spell.js");
var CombatScreen = require("./combat-screen.jsx");
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

    getDefaultProps: function() {
        return {
            user: {
                unlockedExercises: ["measuring-lengths-1", "groups-of-tens"]
            },
            showSpellbook: false,
            showCombat: false,
        };
    },

    render: function () {
        var spells = _.map(this.props.user.unlockedExercises, (exercise) => {
            return new Spell(exercise);
        });
        return <div>
            <PropCheckBox
                showSpellbook={this.props.showSpellbook}
                label="Show Spellbook"
                onChange={this.props.onChange} />
            <PropCheckBox
                showCombat={this.props.showCombat}
                label="Show Combat"
                onChange={this.props.onChange} />
            {this.props.showSpellbook && <ActiveSpellbook currentSpell={_.head(spells)} spells={_.rest(spells)} />}
            {this.props.showCombat && <CombatScreen />}
        </div>;
    }
});

var StatefulGame = React.createClass({
    getInitialState: function() {
        return {
            onChange: this.setState.bind(this)
        };
    },

    render: function() {
        return Game(this.state);
    }
});

module.exports = StatefulGame;
