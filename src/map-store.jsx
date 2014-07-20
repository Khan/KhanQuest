var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var SpriteLoader = require("./sprites/sprite-loader.jsx");
var EntityStore = require("./entity.jsx");
var { constants } = require("./actions.jsx");
var { FETCH_MAP_DATA, MOVE, SET_MAP, NEXT_MAP, MAP_OBJECT_INTERACTION } = constants;
var { MONSTER, WALL, OBJECT, DOOR, START, GRASS, EMPTY } = require("./constants.jsx");
var Weather = require("./sprites/weather.jsx");

var MAPS = {
    overworld: {
        name: "overworld",
        manifestName: "overworld.json",
        weather: Weather.SNOW
    },
    desert: {
        name: "desert",
        manifestName: "desert.json",
        weather: null
    },
    cave: {
        name: "cave",
        manifestName: "cave.json",
        weather: Weather.FOG
    },
    salinterior: {
        name: "salinterior",
        manifestName: "salinterior.json",
        weather: null
    },
    cottage: {
        name: "cottage",
        manifestName: "cottage.json",
        weather: Weather.RAIN
    },
    fortress: {
        name: "fortress",
        manifestName: "fortress.json",
        weather: Weather.SNOW
    }
};

var NEXT_WORLD = {
    overworld: "desert",
    desert: "cave",
    cave: "cottage",
    cottage: "salinterior",
    salinterior: "fortress",

    // TEMP: loop back around
    fortress: "overworld"
};

var MAP_OBJECT_INTERACTIONS = {
    salinterior: () => {
        Actions.showDialog("salinterior");
    }
};

var _currentMap = MAPS.cottage;
var _resourcesLoaded = false;

// metadata about each map:
// { overworld: object, cave: object }
var _manifests = {};

// the tiles are located in a few images
var _tileImages = {};

var findStart = function() {
    if (_manifests[_currentMap.name] == null) {
        return { x: 10, y: 10 };
    }

    var interactionTileset = _(_manifests[_currentMap.name].tilesets)
        .findWhere({ name: "interaction" });
    var firstgid = interactionTileset.firstgid;

    var interactionLayer = _(_manifests[_currentMap.name].layers)
        .findWhere({ name: "interaction layer" });

    var ix = 0;
    _(interactionLayer.data).find((item, i) => {
        if (item - firstgid + 1 === START) {
            ix = i;
            return true;
        }
    });

    var x = ix % interactionLayer.width;
    var y = ~~(ix / interactionLayer.width);
    return { x, y };
};

var dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case FETCH_MAP_DATA:
            _(MAPS).each((map, mapName) => {
                var manifestName = map.manifestName;
                $.getJSON(`/art/${manifestName}`).done(obj => {
                    obj.weather = map.weather;
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

        case NEXT_MAP:
            _currentMap = MAPS[NEXT_WORLD[_currentMap.name]];
            Actions.setLocation(findStart());
            break;

        case SET_MAP:
            _currentMap = MAPS[action.name];
            break;

        case MAP_OBJECT_INTERACTION:
            MAP_OBJECT_INTERACTIONS[_currentMap.name]();

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
            if (_manifests[_currentMap.name] == null) {
                return [];
            }

            return _(_manifests[_currentMap.name].layers)
                .map((layer, i) => {
                    return {
                        layer,
                        scene: _manifests[_currentMap.name],
                        images: _tileImages[_currentMap.name]
                    };
                });
        },

        getCurrentMap: function() {
            return _currentMap;
        },

        getIsLoading: function() {
            return !_resourcesLoaded;
        },

        getInteractionForLocation: function({ x, y }) {
            var manifest = _manifests[_currentMap.name];
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

var playerSprites = EntityStore.getPlayer().sprites;
SpriteLoader.loadSprites(_.values(playerSprites)).then(() => {
    _resourcesLoaded = true;
    MapStore.emitChange();
});

module.exports = MapStore;
