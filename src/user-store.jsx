var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var { constants } = require("./actions.jsx");
var { ADD_SPELL } = constants;

/* Information about the user state. */
var _user = null;

var defaultUser = () => {
    return {
        unlockedExercises: []
    };
};

var dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case ADD_SPELL:
            if (_user == null) {
                _user = defaultUser();
            }
            _user.unlockedExercises.push(action.exerciseName);
            break;

        default:
            return true;
    }

    UserStore.emitChange();
    return true;
});

var UserStore = _({}).extend(
    EventEmitter.prototype,
    {
        getUser: function() {
            if (_user == null) {
                return defaultUser();
            }

            return _.clone(_user);
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

module.exports = UserStore;
