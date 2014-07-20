var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("./flux/app-dispatcher.js");
var SpriteLoader = require("./sprites/sprite-loader.jsx");
var EntityStore = require("./entity.jsx");
var { constants } = require("./actions.jsx");
var { SET_LOCATION, FETCH_MAP_DATA, MOVE, SET_MAP, NEXT_MAP, MAP_OBJECT_INTERACTION } = constants;
var { MONSTER, WALL, OBJECT, DOOR, START, GRASS, EMPTY, MAP_WIDTH_BLOCKS, MAP_HEIGHT_BLOCKS } = require("./constants.jsx");
var Weather = require("./sprites/weather.jsx");

var MAPS = {
    desert: {
        name: "desert",
        manifestName: "desert.json",
        nextWorld: "cave",
        weather: null
    },

    cave: {
        name: "cave",
        manifestName: "cave.json",
        nextWorld: "cottage",
        weather: Weather.FOG
    },

    salinterior: {
        name: "salinterior",
        manifestName: "salinterior.json",
        nextWorld: "darkforest",
        weather: null
    },

    cottage: {
        name: "cottage",
        manifestName: "cottage.json",
        nextWorld: "salinterior",
        weather: Weather.DARKRAIN
    },

    darkforest: {
        name: "darkforest",
        manifestName: "darkforest.json",
        nextWorld: "fortress",
        weather: Weather.DARKSNOW
    },

    fortress: {
        name: "fortress",
        manifestName: "fortress.json",

        // TEMP: loop back around
        nextWorld: "desert",
        weather: Weather.DARKRAIN
    }
};

var MAP_OBJECT_INTERACTIONS = {
    salinterior: () => {
        Actions.showSpellSplash(
            "making-totals-in-different-ways-within-10",
            "This is your first spell, and it's a good one! In order to cast it, you'll need to exercise your mathematical mind. Watching this video might help you out.",
            "https://www.khanacademy.org/embed_video?v=AuX7nPBqDts"
        );
    },
    darkforest: _.once(() => {
        Actions.showDialog("darkforest");
    }),
    cottage: _.once(() => {
        Actions.showDialog("approach-house");
    })
};

var _currentMap = "cottage";
var _resourcesLoaded = false;
var _tilesLoadedCount = 0;

// the offset of the map and character in the viewport, in *blocks*
var _mapOffset = { x: 0, y: 0 };
var _characterOffset = { x: 0, y: 0 };

// metadata about each map:
// { overworld: object, cave: object }
var _manifests = {};

// the tiles are located in a few images
var _tileImages = {};

var clamp = function(n, min, max) {
    return Math.max(min, Math.min(n, max));
};

var movePositions = function(direction, { width, height }) {
    // offsets measured in blocks, *not pixels*
    var BUFFER = 5;

    if (direction === "LEFT" || direction === "RIGHT") {
        var diff = direction === "LEFT" ? -1 : 1;

        // try to move the character
        _characterOffset.x = clamp(_characterOffset.x + diff,
            0, MAP_WIDTH_BLOCKS);

        var mapX = _mapOffset.x;
        // close to the edge! try to move the map instead of the character
        if (_characterOffset.x < BUFFER ||
            _characterOffset > MAP_WIDTH_BLOCKS - BUFFER) {

                var maxOffX = Math.max(width - MAP_WIDTH_BLOCKS, 0);
                mapX = clamp(mapX + diff, 0, maxOffX);
        }

        // the map moved - the character should not
        if (mapX !== _mapOffset.x) {
            _characterOffset.x -= diff;
        }
    }

    if (direction === "UP" || direction === "DOWN") {
        var diff = direction === "UP" ? -1 : 1;

        // try to move the character
        _characterOffset.y = clamp(_characterOffset.y + diff,
            0, MAP_HEIGHT_BLOCKS);

        var mapY = _mapOffset.y;
        // close to the edge! try to move the map instead of the character
        if (_characterOffset.y < BUFFER ||
            _characterOffset > MAP_HEIGHT_BLOCKS - BUFFER) {

                var maxOffY = Math.max(width - MAP_HEIGHT_BLOCKS, 0);
                mapY = clamp(mapY + diff, 0, maxOffY);
        }

        // the map moved - the character should not
        if (mapY !== _mapOffset.y) {
            _characterOffset.y -= diff;
        }
    }
};

var findStart = function() {
    if (_manifests[_currentMap] == null) {
        return { x: 10, y: 10 };
    }

    var tilesets = _manifests[_currentMap].tilesets;
    var interactionTileset = _(tilesets)
        .findWhere({ image: "tilesets/special.png" });
    if (!interactionTileset) {
        interactionTileset = _(tilesets)
            .findWhere({ image: "../../KhanQuest/art/tilesets/special.png" });
    }
    if (!interactionTileset) {
        interactionTileset = _(tilesets)
            .findWhere({ name: "interaction" });
    }
    if (!interactionTileset) {
        interactionTileset = _(tilesets)
            .findWhere({ name: "special" });
    }
    var firstgid = interactionTileset.firstgid;

    var interactionLayer = _(_manifests[_currentMap].layers)
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
                                _tilesLoadedCount++;
                                MapStore.emitChange();
                            };
                            _tileImages[mapName].push(img);
                        });
                });
            });
            break;

        case MOVE:
            var man = _manifests[_currentMap];
            var dimensions = { width: man.width, height: man.height };

            movePositions(action.direction, dimensions);
            break;

        case SET_LOCATION:
            _characterOffset = action.location;
            break;

        case NEXT_MAP:
            _currentMap = MAPS[_currentMap].nextWorld;
            Actions.setLocation(findStart());
            break;

        case SET_MAP:
            _currentMap = MAPS[action.name].name;
            break;

        case MAP_OBJECT_INTERACTION:
            MAP_OBJECT_INTERACTIONS[_currentMap]();

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

        getManifest: function() {
            return _manifests[_currentMap];
        },

        getTilesLoadedCount: function() {
            return _tilesLoadedCount;
        },

        getCurrentMap: function() {
            return MAPS[_currentMap];
        },

        getMapOffset: function() {
            return _mapOffset;
        },

        getCharacterOffset: function() {
            return _characterOffset;
        },

        getIsLoading: function() {
            return !_resourcesLoaded;
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

var playerSprites = EntityStore.getPlayer().sprites;
SpriteLoader.loadSprites(_.values(playerSprites)).then(() => {
    _resourcesLoaded = true;
    MapStore.emitChange();
});

module.exports = MapStore;
