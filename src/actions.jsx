var AppDispatcher = require("./flux/app-dispatcher.js");

var constants = {
    FETCH_MAP_DATA: "FETCH_MAP_DATA",
    MOVE: "MOVE",
    ADD_SPELL: "ADD_SPELL",
    START_COMBAT: "START_COMBAT",
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

    startCombat: function(enemies) {
        AppDispatcher.handleViewAction({
            actionType: constants.START_COMBAT,
            enemies: enemies
        });
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
