var AppDispatcher = require("./flux/app-dispatcher.js");

var constants = {
    FETCH_MAP_DATA: "FETCH_MAP_DATA",
    MOVE: "MOVE"
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
     }
};

module.exports = { constants, Actions };
