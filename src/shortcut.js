// Some ideas:
// * Wrapping a Shortcut around a button or something makes it automatically
// take on that button's effect
// * Restrict firing to the most specific element
//   * could sort valid elements using `.contains`?
// * simplified syntax for just one action

// TODO: find a better way to add this? the npm mousetrap repo is pretty out of
// date.
var Mousetrap = require("../lib/mousetrap.js");
require("../lib/mousetrap-global-bind.js");

var React = require("react");

var ShortcutRegistry = (function() {

    // Mousetrap only allows us to bind a single callback to a key combination,
    // so we wrap around it in order to avoid annoying situations where adding
    // or removing a shortcut could wipe out another one, and also to allow for
    // scoped shortcuts.
    var registered = {};

    var concatHandlers = function(handlers) {
        return function(e) {
            handlers.forEach(function(handler) {
                if (handler.scope === null ||
                        handler.scope.contains(e.target)) {
                    handler.onTrigger(e);
                }
            });
        };
    };

    var rebindTrigger = function(trigger) {
        var newCallback = concatHandlers(registered[trigger]);
        Mousetrap.bindGlobal(trigger, newCallback);
    };

    var register = function(shortcut) {
        var trigger = shortcut.trigger;
        var onTrigger = shortcut.onTrigger;
        var id = shortcut.id;
        var scope = shortcut.scope;
        if (registered[trigger] === undefined) {
            registered[trigger] = [];
        }
        registered[trigger].push({
            onTrigger: onTrigger,
            id: id,
            scope: scope
        });

        rebindTrigger(trigger);
    };

    var unregister = function(trigger, id) {
        registered[trigger] = registered[trigger].filter(function(entry) {
            return entry.id !== id;
        });

        rebindTrigger(trigger);
    };

    return {
        register: register,
        unregister: unregister
    };
})();

var makeCounter = function() {
    var i = 0;
    return function() { return i++; };
};

var getUniqueId = makeCounter();

var Shortcut = React.createClass({
    getDefaultProps: function() {
        return {
            actions: {}
        };
    },

    getInitialState: function() {
        return {
            id: getUniqueId()
        };
    },

    componentDidMount: function() {
        this._register(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        this._unregister();
        this._register(nextProps);
    },

    componentWillUnmount: function() {
        this._unregister();
    },

    _register: function(props) {
        var self = this;
        Object.keys(props.actions).forEach(function(trigger) {
            var handler = props.actions[trigger].handler;
            self._registerSingle(trigger, handler, self._scope());
        })
    },

    _scope: function() {
        return this.props.children ? this.getDOMNode() : null;
    },

    _registerSingle: function(trigger, handler, scope) {
        ShortcutRegistry.register({
            trigger: trigger,
            onTrigger: handler,
            id: this.state.id,
            scope: scope
        });
    },

    _unregister: function() {
        var self = this;
        Object.keys(this.props.actions).forEach(function(trigger) {
            ShortcutRegistry.unregister(trigger, self.state.id);
        })
    },

    render: function() {
        return React.DOM.span(null, this.props.children);
    }
});

module.exports = Shortcut;
