var AppDispatcher = require("./flux/app-dispatcher.js");

var constants = {
    FETCH_MAP_DATA: "FETCH_MAP_DATA",
    MOVE: "MOVE",
    ADD_SPELL: "ADD_SPELL",
    SET_ACTIVE_SPELL: "SET_ACTIVE_SPELL",
    CHANGE_STATE: "CHANGE_STATE",
    SHOW_DIALOG: "SHOW_DIALOG",
    SET_MAP: "SET_MAP"
};

var Actions = {
    fetchMapData: function() {
        AppDispatcher.handleViewAction({
            actionType: constants.FETCH_MAP_DATA
        });
    },

    move: function(direction) {
        AppDispatcher.handleViewAction({
            actionType: constants.MOVE,
            direction
        });
    },

    addSpell: function(exerciseName) {
        AppDispatcher.handleViewAction({
            actionType: constants.ADD_SPELL,
            exerciseName: exerciseName
        });
    },

    setActiveSpell: function(exerciseName) {
        AppDispatcher.handleViewAction({
            actionType: constants.SET_ACTIVE_SPELL,
            exerciseName: exerciseName
        });
    },

    changeGameState: function(data) {
        AppDispatcher.handleViewAction(_.extend({
            actionType: constants.CHANGE_STATE
        }, data));
    },

    showDialog: function(scene) {
        AppDispatcher.handleViewAction({
            actionType: constants.SHOW_DIALOG,
            scene: scene
        });
    },

    setCurrentMap: function(name) {
        AppDispatcher.handleViewAction({
            actionType: constants.SET_MAP,
            name
        });
    }
};

module.exports = { constants, Actions };
