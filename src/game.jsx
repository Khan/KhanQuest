/** @jsx React.DOM */

var React = require("react");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var { Actions, GameViews } = require("./actions.jsx");
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
            currentView: {
                store: GameStore,
                fetch: (store) => store.getCurrentView()
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

    startCombat: function() {
        var forestTrollStats = MonsterStore.getById("forest_troll");
        var forestTroll = EntityStore.createEntity(forestTrollStats);
        CombatActions.startCombat([forestTroll]);
    },

    endCombat: function() {
        CombatActions.endCombat();
    },

    render: function () {
        return <div>
            <div className="debug-bar">
                <button onClick={this.endCombat}>
                    Show Map
                </button>
                <button onClick={this.startCombat}>
                    Start Combat
                </button>
                <PropCheckBox
                    showDialog={this.props.showDialog}
                    label="Show Dialog"
                    onChange={this.props.onChange} />
            </div>
            <div className="row">
                <ReactCSSTransitionGroup transitionName="screen">
                {this.state.currentView === GameViews.MAP &&
                    this._renderMap()}
                {this.state.currentView === GameViews.COMBAT &&
                    this._renderCombat()}
                {this.state.currentView === GameViews.SPELLBOOK &&
                    this._renderSpellbook()}
                </ReactCSSTransitionGroup>
            </div>
        </div>;
    },

    _renderMap: function() {
        return <div key="map" className="row-item">
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
        var problemIndex = this.state.user.problemIndex;

        return <div key="combat" className="row-item">
            <div className="fight-graphics">
                <CombatView />
            </div>
            <div className="combat">
                <CombatScreen exerciseName={activeExercise}
                              problemIndex={problemIndex} />
            </div>
            {this.props.showDialog && <Dialog scene="scene1" />}
        </div>;
    },

    _renderSpellbook: function() {
        var exerciseNames = this.state.user.unlockedExercises;
        var onChooseSpell = function(exerciseName) {
            Actions.setActiveSpell(exerciseName);
            Actions.closeSpellbook();
        };

        return <div key="spellbook" className="row-item">
            <Spellbook
                exerciseNames={exerciseNames}
                onClick={onChooseSpell} />
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
