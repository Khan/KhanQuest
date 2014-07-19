var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var { constants, GameViews } = require("./actions.jsx");
var MapStore = require("./map-store.jsx");
var { CHANGE_STATE, START_COMBAT, MOVE, SET_LOCATION } = constants;
var { MONSTER, WALL, OBJECT, DOOR, GRASS } = require("./constants.jsx");
var CombatConstants = require("./combat/combat-constants.js");
var {assert} = require("./utils.jsx");
var Mersenne = require("mersenne");

/* Information about the user state. */

var _view = GameViews.MAP;

var _inCombat = false;

var _playerLocation = {x: 10, y: 10};

var stepState = function(direction) {

    // move one block in that direction
    var candidateLocation = _.clone(_playerLocation);
    switch (direction) {
        case "UP":
            candidateLocation.y--;
            break;

        case "DOWN":
            candidateLocation.y++;
            break;

        case "LEFT":
            candidateLocation.x--;
            break;

        case "RIGHT":
            candidateLocation.x++;
            break;
    }

    // consult the interaction layer to see if we can go that direction or if
    // we triggered an action!
    var interaction = MapStore.getInteractionForLocation(candidateLocation);

    switch (interaction) {
        case MONSTER:
            // you ran into a monster.
            break;

        case WALL:
            // can't go that way. just don't update the state.
            break;

        case OBJECT:
            // dun-dun-dun-dunnnnn
            break;

        case DOOR:
            Actions.nextMap();
            // how does a door encode where it leads?
            break;

        case GRASS:
            // TODO: make this driven by the map
            // 5% chance of an encounter
            if (Mersenne.rand(20) < 1) {
                var forestTrollStats = MonsterStore.getById("forest_troll");
                var forestTroll = EntityStore.createEntity(forestTrollStats);
                CombatActions.startCombat([forestTroll]);
            }

        default:
            _playerLocation = candidateLocation;
    }
}


var dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case MOVE:
            stepState(action.direction);
            break;

        case SET_LOCATION:
            _playerLocation = action.location;
            break;

        case CombatConstants.START_COMBAT:
            assert(!_inCombat, "shouldn't be in combat");
            _inCombat = true;
            _view = GameViews.COMBAT;
            break;

        case CombatConstants.END_COMBAT:
            assert(_inCombat, "should be in combat");
            _inCombat = false;
            _view = GameViews.MAP;
            break;

        case constants.OPEN_SPELLBOOK:
            assert(_inCombat, "should be in combat");
            _view = GameViews.SPELLBOOK;
            break;

        case constants.CLOSE_SPELLBOOK:
            assert(_inCombat, "should be in combat");
            _view = GameViews.COMBAT;
            break;


        default:
            return true;
    }

    GameStore.emitChange();
    return true;
});

var GameStore = _({}).extend(
    EventEmitter.prototype,
    {
        getCurrentView: function() {
            return _view;
        },

        getLocation: function() {
            return _playerLocation;
        },

        addChangeListener: function(callback) {
            this.on("change", callback);
        },

        removeChangeListener: function(callback) {
            this.removeListener("change", callback);
        },

        emitChange: function() {
            this.emit("change");
        }
    }
);

module.exports = GameStore;
