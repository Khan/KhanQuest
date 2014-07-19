/** @jsx React.DOM */

var React = require("react");
var { Actions } = require("./actions.jsx");
var Spellbook = require("./spellbook.jsx");
var Dialog = require("./dialog.jsx");
var CombatScreen = require("./combat-screen.jsx");
var Map = require("./map.jsx");

var Changeable = require("./mixins/changeable.jsx");
var PropCheckBox = require("./prop-check-box.jsx");

var UserStore = require("./user-store.jsx");
var GameStore = require("./game-store.jsx");
var CombatStore = require("./combat/combat-store.jsx");
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
            },
            combatState: {
                store: CombatStore,
                fetch: (store) => store.getState()
            }
        })
    ],

    getDefaultProps: function() {
        return {
            showSpellbook: true,
            showCombat: false,
        };
    },

    render: function () {
        return <div>
            <div className="debug-bar">
                <button onClick={() => Actions.changeGameState({state: "MAP"})}>
                    Show Map
                </button>
                <button onClick={() => Actions.changeGameState({state: "COMBAT"})}>
                    Show Combat
                </button>
                <PropCheckBox
                    showDialog={this.props.showDialog}
                    label="Show Dialog"
                    onChange={this.props.onChange} />
            </div>
            <div className="row">
                {this.state.game.state === "MAP" && this._renderMap()}
                {this.state.game.state === "COMBAT" && this._renderCombat()}
                {this.state.game.state === "SPELLBOOK" && this._renderSpellbook()}
            </div>
        </div>;
    },

    _renderMap: function() {
        return <div>
            <button onClick={() => Actions.setCurrentMap("overworld")}
                    type="button">
                overworld
            </button>
            <button onClick={() => Actions.setCurrentMap("cave")}
                    type="button">
                cave
            </button>

            <Map />
        </div>;
    },

    _renderCombat: function() {
        var activeExercise = this.state.user.activeExercise;

        return <div>
            <div className="fight-graphics" style={{float: "left"}}>
                <img title="cool graphics go here"
                     src="http://placekitten.com/400/400" />
            </div>
            <div className="combat">
                {this.state.combatState === "ATTACK" &&
                    <CombatScreen exerciseName={activeExercise} />}
            </div>
            {this.props.showDialog && <Dialog scene="scene1" />}
        </div>;
    },

    _renderSpellbook: function() {
        var exerciseNames = this.state.user.unlockedExercises;
        var onChooseSpell = function(exerciseName) {
            Actions.setActiveSpell(exerciseName);
            Actions.changeGameState({state: "COMBAT"});
        };

        return <Spellbook
            exerciseNames={exerciseNames}
            onClick={onChooseSpell} />;
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
