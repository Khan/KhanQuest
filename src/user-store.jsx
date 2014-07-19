var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var { constants } = require("./actions.jsx");
var { ADD_SPELL, SET_ACTIVE_SPELL, NEXT_PROBLEM } = constants;

/* Information about the user state. */
var _user = null;

var defaultUser = () => {
    return {
        unlockedExercises: [],
        activeExercise: null,
        problemIndex: 0
    };
};

var getOrCreateUser = () => {
    if (_user == null) {
        _user = defaultUser();
    }
    return _user;
};

var dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case ADD_SPELL:
            getOrCreateUser().unlockedExercises.push(action.exerciseName);
            break;

        case SET_ACTIVE_SPELL:
            getOrCreateUser().activeExercise = action.exerciseName;
            break;

        case NEXT_PROBLEM:
            getOrCreateUser().problemIndex += 1;
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
            return _.clone(getOrCreateUser());
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
