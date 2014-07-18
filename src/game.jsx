/** @jsx React.DOM */

var React = require("react");
var Spellbook = require("./spellbook.jsx");
var ActiveSpellbook = require("./active-spellbook.jsx");
var Spell = require("./models/spell.js");
var CombatScreen = require("./combat-screen.jsx");
var Changeable = require("./mixins/changeable.jsx");
var PropCheckBox = require("./prop-check-box.jsx");

var UserStore = require("./user-store.jsx");
var StateFromStore = require("./flux/state-from-store-mixin.js");

var Game = React.createClass({
    mixins: [Changeable],

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
            showSpellbook: false,
            showCombat: false,
        };
    },

    render: function () {
        console.log(this.state.user);
        var spells = _.map(this.state.user.unlockedExercises, (exercise) => {
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
