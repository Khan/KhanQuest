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
    ADJUST_COUNTERS: "ADJUST_COUNTERS",
    SHOW_DIALOG: "SHOW_DIALOG",
    HIDE_DIALOG: "HIDE_DIALOG",
    SHOW_SPELL_SPLASH: "SHOW_SPELL_SPLASH",
    HIDE_SPELL_SPLASH: "HIDE_SPELL_SPLASH",
    SET_MAP: "SET_MAP",
    OPEN_SPELLBOOK: "OPEN_SPELLBOOK",
    CLOSE_SPELLBOOK: "CLOSE_SPELLBOOK",
    NEXT_PROBLEM: "NEXT_PROBLEM",
    NEXT_MAP: "NEXT_MAP",
    SET_LOCATION: "SET_LOCATION",
    MAP_OBJECT_INTERACTION: "MAP_OBJECT_INTERACTION"
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

    setLocation: function(location) {
        AppDispatcher.handleViewAction({
            actionType: constants.SET_LOCATION,
            location
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

    adjustCounters: function(exerciseName) {
        AppDispatcher.handleViewAction({
            actionType: constants.ADJUST_COUNTERS,
            exerciseName: exerciseName
        });
    },

    showDialog: function(scene) {
        AppDispatcher.handleViewAction({
            actionType: constants.SHOW_DIALOG,
            scene: scene
        });
    },

    hideDialog: function() {
        AppDispatcher.handleViewAction({
            actionType: constants.HIDE_DIALOG
        });
    },

    showSpellSplash: function(exerciseName, description, videoURL) {
        AppDispatcher.handleViewAction({
            actionType: constants.SHOW_SPELL_SPLASH,
            exerciseName: exerciseName,
            description: description,
            videoURL: videoURL
        });
    },

    hideSpellSplash: function() {
        AppDispatcher.handleViewAction({
            actionType: constants.HIDE_SPELL_SPLASH
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
    },

    nextProblem: function() {
        AppDispatcher.handleViewAction({
            actionType: constants.NEXT_PROBLEM
        });
    },

    nextMap: function() {
        AppDispatcher.handleViewAction({
            actionType: constants.NEXT_MAP
        });
    },

    mapInteraction: function() {
        AppDispatcher.handleViewAction({
            actionType: constants.MAP_OBJECT_INTERACTION
        });
    }
};

module.exports = { constants, Actions, GameViews };
