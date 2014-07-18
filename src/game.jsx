/** @jsx React.DOM */

var React = require("react");
var { Actions } = require("./actions.jsx");
var Spellbook = require("./spellbook.jsx");
var ActiveSpellbook = require("./active-spellbook.jsx");
var Spell = require("./models/spell.js");
var CombatScreen = require("./combat-screen.jsx");
var Changeable = require("./mixins/changeable.jsx");
var PropCheckBox = require("./prop-check-box.jsx");

var UserStore = require("./user-store.jsx");
var GameStore = require("./game-store.jsx");
var StateFromStore = require("./flux/state-from-store-mixin.js");

var Game = React.createClass({
    mixins: [Changeable],

    mixins: [
        StateFromStore({
            user: {
                store: UserStore,
                fetch: (store) => store.getUser()
            },
            game: {
                store: GameStore,
                fetch: (store) => store.getGame()
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
            <button
                    onClick={() => Actions.startCombat([])}>
                Show Combat
            </button>
            {this.props.showSpellbook && <ActiveSpellbook currentSpell={_.head(spells)} spells={_.rest(spells)} />}
            {this.state.game.state === "COMBAT" && <CombatScreen />}
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
