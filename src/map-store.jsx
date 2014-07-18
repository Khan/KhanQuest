var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var { constants } = require("./actions.jsx");
var { FETCH_MAP_DATA, MOVE, SET_MAP } = constants;

var MAPS = {
    overworld: "overworld.json",
    cave: "cave.json"
};

var _currentMap = "cave";

// metadata about each map:
// { overworld: object, cave: object }
var _manifests = {};

// the tiles are located in a few images
var _tileImages = {};

var _currentLocation = {x: 10, y: 10};

var _bounds = {};

var clamp = function(n, min, max) {
    return Math.max(min, Math.min(n, max));
};

var updateBounds = function() {
    // TODO smart constraints
    var x = clamp(_currentLocation.x, 0, 50);
    var y = clamp(_currentLocation.y, 0, 50);

    _currentLocation = { x, y };
}

var dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case FETCH_MAP_DATA:
            _(MAPS).each((manifestName, mapName) => {
                $.getJSON(`/art/${manifestName}`).done(obj => {
                    _manifests[mapName] = obj;
                    _tileImages[mapName] = [];
                    _(obj.tilesets)
                        .each(set => {
                            var img = new Image();
                            img.src = `/art/${set.image}`;
                            img.onload = () => {
                                MapStore.emitChange();
                            };
                            _tileImages[mapName].push(img);
                        });
                });
            });
            break;

        case MOVE:
            // TODO constrain movement!
            if (action.direction === "UP") {
                _currentLocation.y--;
            } else if (action.direction === "DOWN") {
                _currentLocation.y++;
            } else if (action.direction === "LEFT") {
                _currentLocation.x--;
            } else if (action.direction === "RIGHT") {
                _currentLocation.x++;
            }
            updateBounds();
            break;

        case SET_MAP:
            // TODO clear previous map!
            _currentMap = action.name;
            break;

        default:
            return true;
    }

    MapStore.emitChange();
    return true;
});

var MapStore = _({}).extend(
    EventEmitter.prototype,
    {
        getLayers: function() {
            if (_manifests[_currentMap] == null) {
                return [];
            }

            return _(_manifests[_currentMap].layers)
                .map((layer, i) => {
                    return {
                        layer,
                        scene: _manifests[_currentMap],
                        images: _tileImages[_currentMap]
                    };
                });
        },

        getLocation: function() {
            return _currentLocation;
        },

        getCurrentMap: function() {
            return _currentMap;
        },

        addChangeListener: function(callback) {
            this.on("change", callback);
        },

        removeChangeListener: function(callback) {
            this.off("change", callback);
        },

        emitChange: function() {
            this.emit("change");
        }
    }
);

module.exports = MapStore;
