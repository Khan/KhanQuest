var Dispatcher = require('./dispatcher.js');

var AppDispatcher = _.extend({}, Dispatcher.prototype, {
    /**
    * A bridge function between the views and the dispatcher, marking the
    * action as a view action.
    * @param  {Object} action The data coming from the view.
    */
    handleViewAction: function(action) {
        console.log(action);
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    },

    /**
    * A bridge function between the server and the dispatcher, marking the
    * action as a server action.
    * @param  {Object} action The data coming from the view.
    */
    handleServerAction: function(action) {
        this.dispatch({
            source: 'SERVER_ACTION',
            action: action
        });
    }
});

module.exports = AppDispatcher;
