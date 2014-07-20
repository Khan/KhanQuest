var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var { constants, GameViews } = require("./actions.jsx");
var MapStore = require("./map-store.jsx");
var { CHANGE_STATE, START_COMBAT, MOVE, SET_LOCATION } = constants;
var { BOSS, WALL, OBJECT, DOOR, GRASS } = require("./constants.jsx");
var CombatConstants = require("./combat/combat-constants.js");
var {assert} = require("./utils.jsx");
var Mersenne = require("mersenne");

/* Information about the user state. */

// The dialog currently visible
var _dialog = null;

var _view = GameViews.MAP;

var _inCombat = false;

var _playerLocation = {x: 10, y: 10};
var _playerDirection = "RIGHT";
var _lastLeftRight = "RIGHT";
var _lastStepStateTime = 0;

var flipLeftRight = function(leftRight) {
    if (leftRight === "LEFT") { return "RIGHT"; }
    if (leftRight === "RIGHT") { return "LEFT"; }
    return leftRight;
}

var stepState = function(direction) {

    // move one block in that direction
    var candidateLocation = _.clone(_playerLocation);
    switch (direction) {
        case "UP":
            candidateLocation.y--;
            // switch directions while moving upwards
            if (_playerDirection === direction) {
                _lastLeftRight = flipLeftRight(_lastLeftRight);
            }
            break;

        case "DOWN":
            candidateLocation.y++;
            // switch directions while moving upwards
            if (_playerDirection === direction) {
                _lastLeftRight = flipLeftRight(_lastLeftRight);
            }
            break;

        case "LEFT":
            candidateLocation.x--;
            _lastLeftRight = direction;
            break;

        case "RIGHT":
            candidateLocation.x++;
            _lastLeftRight = direction;
            break;
    }
    _playerDirection = direction;

    // consult the interaction layer to see if we can go that direction or if
    // we triggered an action!
    var interaction = MapStore.getInteractionForLocation(candidateLocation);

    switch (interaction) {
        case BOSS:
            // TODO real boss
            var forestTrollStats = MonsterStore.getById("forest_troll");
            var forestTroll = EntityStore.createEntity(forestTrollStats);
            CombatActions.startCombat([forestTroll]);
            break;

        case WALL:
            // can't go that way. just don't update the state.
            break;

        case OBJECT:
            Actions.mapInteraction();
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
                var forestTrolls = _.times(3, () => EntityStore.createEntity(forestTrollStats));
                CombatActions.startCombat(forestTrolls);
            }

        default:
            _playerLocation = candidateLocation;
    }
}


var dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case MOVE:
            var currentTime = new Date().getTime();
            if (currentTime - _lastStepStateTime > 100) {
                stepState(action.direction);
                _lastStepStateTime = new Date().getTime();
                setTimeout(() => {_lastStepStateTime = new Date().getTime();}, 100);
            } else {
                return true;
            }
            break;

        case SET_LOCATION:
            _playerLocation = action.location;
            break;

        case CombatConstants.START_COMBAT:
            AppDispatcher.waitFor([CombatStore.dispatcherIndex], () => {
                assert(!_inCombat, "Can't start combat while you're in combat!");
                _inCombat = true;
                _view = GameViews.COMBAT;
                GameStore.emitChange();
            });
            break;

        case CombatConstants.END_COMBAT:
            assert(_inCombat, "Can't end combat when you're not in combat.");
            _inCombat = false;
            _view = GameViews.MAP;
            break;

        case constants.OPEN_SPELLBOOK:
            assert(_inCombat, "Can't open the spellbook outside of combat");
            _view = GameViews.SPELLBOOK;
            break;

        case constants.CLOSE_SPELLBOOK:
            assert(_inCombat, "Can't close the spellbook outside of combat");
            _view = GameViews.COMBAT;
            break;

        case constants.SHOW_DIALOG:
            _dialog = action.scene;
            break;

        case constants.HIDE_DIALOG:
            _dialog = null;
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

        getInCombat: function() {
            return _inCombat;
        },

        getLocation: function() {
            return _playerLocation;
        },

        getDirection: function() {
            return _playerDirection;
        },

        getLastLeftRight: function() {
            return _lastLeftRight;
        },

        getDialog: function() {
            return _dialog;
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
