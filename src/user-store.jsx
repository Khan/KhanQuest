var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var { constants } = require("./actions.jsx");
var { ADD_SPELL } = constants;

/* Information about the user state. */
var _user = null;

var dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case ADD_SPELL:
            _user.unlockedExercises.push(action.exerciseName);

        default:
            return true;

        UserStore.emitChange();
    }
});

var UserStore = _({}).extend(
    EventEmitter.prototype,
    {
        getUser: function() {
            if (_user == null) {
                return {
                    unlockedExercises: ["groups-of-tens"]
                };
            }

            return _.clone(_user);
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

module.exports = UserStore;
