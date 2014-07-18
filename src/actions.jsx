var AppDispatcher = require("./app-dispatcher.jsx");

var constants = {
    FETCH_MAP_DATA: "FETCH_MAP_DATA"
};

var Actions = {
     fetchMapData: function() {
         AppDispatcher.handleViewAction({
             actionType: FETCH_MAP_DATA
         });
     }
};

modules.exports = { constants, Actions };
