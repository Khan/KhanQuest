var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var { constants } = require("./actions.jsx");
var { CHANGE_STATE } = constants;

/* Information about the user state. */

var _game = {
    state: "MAP"
};


var dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case CHANGE_STATE:
            _game.state = action.state;
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
        getGame: function() {
            return _.clone(_game);
        },

        addChangeListener: function(callback) {
            this.on("change", callback);
        },

        removeChangeListener: function(callback) {
            this.off("change", callback);
        },

        emitChange: function() {
            this.emit("change");
        }
    }
);

module.exports = GameStore;
