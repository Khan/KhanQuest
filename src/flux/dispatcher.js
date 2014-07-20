var Promise = require("bluebird");
Promise.longStackTraces();

var _callbacks = [];
var _promises = [];

/**
 * Add a promise to the queue of callback invocation promises.
 * @param {Function} callback The Store's registered callback.
 * @param {Object} payload The data from the Action.
 */
var _addPromise = function(callback, payload) {
    _promises.push(Promise.resolve().then(function() {
        if (callback(payload)) {
            return payload;
        } else {
            throw new Error("Dispatcher callback unsuccessful");
        }
    }));
};

/**
 * Empty the queue of callback invocation promises.
 */
var _clearPromises = function() {
    _promises = [];
};

var Dispatcher = function() {};
Dispatcher.prototype = _.extend(Dispatcher.prototype, {
    /**
     * Register a Store's callback so that it may be invoked by an action.
     * @param {Function} callback The callback to be registered.
     * @return {number} The index of the callback within the _callbacks array.
     */
    register: function(callback) {
        _callbacks.push(callback);
        return _callbacks.length - 1; // index
    },

    /**
     * dispatch
     * @param  {Object} payload The data from the action.
     */
    dispatch: function(payload) {
        _callbacks.forEach(function(callback) {
            _addPromise(callback, payload);
        });
        Promise.all(_promises).then(_clearPromises).done();
    },

    /**
     * A datastore can use this to wait on other datastores before continuing.
     * Unfortunately, this implementation is too simple to do things like
     * managing chains of dependencies or detecting dependency cycles.
     * @param  {Array} promisesIndexes
     * @param  {Function} callback
     */
    waitFor: function(promiseIndexes, callback) {
        var selectedPromises = _promises.filter(function(/*object*/ _, /*number*/ j) {
            return promiseIndexes.indexOf(j) !== -1;
        });
        Promise.all(selectedPromises).then(callback).done();
    }
});

module.exports = Dispatcher;
