var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var { constants } = require("./actions.jsx");
var { FETCH_MAP_DATA, MOVE, SET_MAP } = constants;
var { MONSTER, WALL, OBJECT, DOOR, GRASS, EMPTY } = require("./constants.jsx");

var MAPS = {
    overworld: "overworld.json",
    cave: "cave.json",
    salinterior: "salinterior.json",
    cottage: "cottage.json",
    fortress: "fortress.json"
};

var _currentMap = "cave";

// metadata about each map:
// { overworld: object, cave: object }
var _manifests = {};

// the tiles are located in a few images
var _tileImages = {};

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

        getCurrentMap: function() {
            return _currentMap;
        },

        getInteractionForLocation: function({ x, y }) {
            var manifest = _manifests[_currentMap];
            var layer = _(manifest.layers)
                .findWhere({ name: "interaction layer" });
            var tileset = _(manifest.tilesets)
                .findWhere({ name: "interaction" });

            var tileIx = y * layer.width + x;
            var tileId = layer.data[tileIx];

            // no interaction
            if (tileId === 0) {
                return EMPTY;
            } else {
                // ?
                return tileId - tileset.firstgid + 1;
            }
        },

        addChangeListener: function(callback) {
            this.on("change", callback);
        },

        removeChangeListener: function(callback) {
            this.removeListener("change", callback);
        },

        emitChange: function() {
            this.emit("change");
        }
    }
);

module.exports = MapStore;
