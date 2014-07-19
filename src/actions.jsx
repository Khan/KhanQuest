var AppDispatcher = require("./flux/app-dispatcher.js");

var GameViews = {
    MAP: "MAP",
    COMBAT: "COMBAT",
    SPELLBOOK: "SPELLBOOK",
    INVENTORY: "INVENTORY"
};

var constants = {
    FETCH_MAP_DATA: "FETCH_MAP_DATA",
    MOVE: "MOVE",
    ADD_SPELL: "ADD_SPELL",
    SET_ACTIVE_SPELL: "SET_ACTIVE_SPELL",
    SHOW_DIALOG: "SHOW_DIALOG",
    SET_MAP: "SET_MAP",
    OPEN_SPELLBOOK: "OPEN_SPELLBOOK",
    CLOSE_SPELLBOOK: "CLOSE_SPELLBOOK"
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
    },

    closeSpellbook: function() {
        AppDispatcher.handleViewAction({
            actionType: constants.CLOSE_SPELLBOOK
        });
    },

    openSpellbook: function() {
        AppDispatcher.handleViewAction({
            actionType: constants.OPEN_SPELLBOOK
        });
    }

};

module.exports = { constants, Actions, GameViews };
