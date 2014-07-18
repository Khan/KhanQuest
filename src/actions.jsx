var AppDispatcher = require("./flux/app-dispatcher.js");

var constants = {
    FETCH_MAP_DATA: "FETCH_MAP_DATA",
    MOVE: "MOVE",
    ADD_SPELL: "ADD_SPELL"
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
     }
};

module.exports = { constants, Actions };
