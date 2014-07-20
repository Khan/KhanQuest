/** @jsx React.DOM */

// mostly copied from
// * https://gist.github.com/shaneriley/4078905
// * http://hashrocket.com/blog/posts/using-tiled-and-canvas-to-render-game-screens

var React = require("react");
var _ = require("underscore");
var Shortcut = require("./shortcut.js");
var Weather = require("./sprites/weather.jsx");

var { Actions } = require("./actions.jsx");
var { MAP_WIDTH_PX, MAP_HEIGHT_PX, BLOCK } = require("./constants.jsx");

var GameStore = require("./game-store.jsx");
var MapStore = require("./map-store.jsx");
var EntityStore = require("./entity.jsx");
var SpriteLoader = require("./sprites/sprite-loader.jsx");
var { SpriteRenderer } = require("./sprites/sprite.jsx");

var StateFromStore = require("./flux/state-from-store-mixin.js");

var Avatar = new Image();
Avatar.src = "/static/img/red-mage+female.png";

var walkDuration = 100;

// given the player's x, y coordinates and the dimensions of the map, return
// the { x: [0..940], y: [0..720] } coordinates of the player on the screen
var characterPosOnScreen = function({ x, y }, { width, height }) {
    // if we're within 50 px of the edge move away from the center
    var finalX;
    if (x < 50) {
        finalX = x;
    } else if (x > width - 50) {
        finalX = width - x;
    } else {
        finalX = 50;
    }

    var finalY;
    if (y < 50) {
        finalY = y;
    } else if (y > width - 50) {
        finalY = width - y;
    } else {
        finalY = 50;
    }

    return { x: finalX, y: finalY };
};

var Map = React.createClass({
    propTypes: {
    },

    mixins: [
        StateFromStore({
            currentMap: {
                store: MapStore,
                fetch: (store) => store.getCurrentMap()
            },
            isLoading: {
                // TODO: put this in the map store too?
                store: MapStore,
                fetch: (store) => store.getIsLoading()
            },
            location: {
                store: GameStore,
                fetch: (store) => store.getLocation()
            },
            direction: {
                store: GameStore,
                fetch: (store) => store.getDirection()
            },
            lastLeftRight: {
                store: GameStore,
                fetch: (store) => store.getLastLeftRight()
            }
        })
    ],

    getInitialState: function() {
        return {
            images: [],
        };
    },

    componentWillMount: function() {
        if (!this.state.isLoading) {
            this.loadSprites();
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        if (this.state.isLoading && !nextState.isLoading) {
            this.loadSprites();
        }
    },

    loadSprites: function() {
        var playerSpriteIds = EntityStore.getPlayer().sprites;
        this.playerSprites = {
            UP: SpriteLoader.getNewSpriteById(playerSpriteIds.up),
            DOWN: SpriteLoader.getNewSpriteById(playerSpriteIds.down),
            LEFT: SpriteLoader.getNewSpriteById(playerSpriteIds.left),
            RIGHT: SpriteLoader.getNewSpriteById(playerSpriteIds.right),
        };
        this.playerWalkSprites = {
            UP: SpriteLoader.getNewSpriteById(playerSpriteIds.walkup),
            DOWN: SpriteLoader.getNewSpriteById(playerSpriteIds.walkdown),
            LEFT: SpriteLoader.getNewSpriteById(playerSpriteIds.walkleft),
            RIGHT: SpriteLoader.getNewSpriteById(playerSpriteIds.walkright),
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (!this.context) {
            return true;
        }
        var stateChanged = !_.isEqual(this.state, nextState);
        var propsChanged = !_.isEqual(this.props, nextProps);
        return propsChanged || stateChanged;
    },

    moveFunction: _.throttle((dir) => {
        Actions.move(dir);
    }, walkDuration),

    render: function() {

        var up = {
            handler: (e) => { this.moveFunction("UP"); e.preventDefault(); },
            description: ""
        };

        var left = {
            handler: (e) => { this.moveFunction("LEFT"); e.preventDefault(); },
            description: ""
        };

        var down = {
            handler: (e) => { this.moveFunction("DOWN"); e.preventDefault(); },
            description: ""
        };

        var right = {
            handler: (e) => { this.moveFunction("RIGHT"); e.preventDefault(); },
            description: ""
        };

        var actions = {
            // qwerty keybinds
            "w": up,
            "a": left,
            "s": down,
            "d": right,

            // colemak binds too
            "f": up,
            "r": left,
            // "s": down,  // same as qwerty
            "t": right,

            up,
            down,
            left,
            right
        };

        var mapStyle = {
            position: "relative",
            width: MAP_WIDTH_PX,
            height: MAP_HEIGHT_PX
        };
        var absolute = {
            position: "absolute"
        };
        var above = _.extend({ zIndex: 2 }, absolute);
        return <div style={mapStyle}>
            <Shortcut actions={actions} />
            {this.state.currentMap.weather &&
                <Weather.WeatherRenderer
                    width={MAP_WIDTH_PX}
                    height={MAP_HEIGHT_PX}
                    style={above}
                    type={this.state.currentMap.weather} />}
            <canvas ref="canvas" width={MAP_WIDTH_PX} height={MAP_HEIGHT_PX} style={absolute} />
            {this.renderPlayer()};
        </div>;
    },

    showMap: function() {
        if (!this.mapcontext) {
            return;
        }

        var canvas = this.refs.canvas.getDOMNode();
        this.context = canvas.getContext('2d');

        var { x, y } = MapStore.getMapOffset();
        this.context.clearRect(0, 0, MAP_WIDTH_PX, MAP_HEIGHT_PX);
        this.context.drawImage(
            this.mapcanvas,

            // position and dimensions to sample from
            x, y,
            MAP_WIDTH_PX, MAP_HEIGHT_PX,

            // position and dimensions to render to
            0, 0,
            MAP_WIDTH_PX, MAP_HEIGHT_PX
        );
    },

    // render this map to mapcanvas / mapcontext
    // double buffering!
    renderNewMap: function() {
        var manifest = MapStore.getManifest();

        // no manifest yet, just bail
        if (!manifest) {
            return;
        }

        var layers = MapStore.getLayers();

        this.mapcanvas = document.createElement("canvas");
        this.mapcanvas.width = manifest.width * BLOCK;
        this.mapcanvas.height = manifest.height * BLOCK;
        this.mapcontext = this.mapcanvas.getContext('2d');

        // layers are stored bottom to top, so we can render in order
        var renderableLayers = _(layers)
            .filter(layer => layer.layer.name !== "interaction layer");

        _(renderableLayers).each(this.renderLayer);
    },

    renderPlayer: function() {
        if (this.state.isLoading) {
            console.log("still loading...");
            return null;
        }
        var size = 32;
        var location = this.state.location;
        var x = location.x * size - 8;
        var y = location.y * size - 32;
        var direction = this.state.direction;
        var sprite = this.state.walking ? this.playerWalkSprites[direction] :
            this.playerSprites[direction];


        // TODO(michelle): There's probably a way to make this less hacky!
        var self = this;
        if (this.state.lastx != x || this.state.lasty != y)
        {
            this.state.lastx = x;
            this.state.lasty = y;
            this.state.walking = true;
            if (this.state.doneWalking)
                clearTimeout(this.state.doneWalking);

            this.state.doneWalking = setTimeout(function () {
                self.state.walking = false;
                self.forceUpdate();
            }, walkDuration * 2);
        }

        var flip = (this.state.lastLeftRight === "LEFT") !== !!sprite.options.flip;
        return <SpriteRenderer
            sprite={sprite}
            flipX={flip}
            style={{
                position: 'absolute',
                top: y,
                left: x,
                transition: `top ${walkDuration}ms linear, left ${walkDuration}ms linear`
            }}
            key="player" />;
    },

    renderLayer: function({ layer, scene, images }) {
        // data: [array of tiles, 1-based, position of sprite from top-left]
        // height: integer, height in number of sprites
        // name: "string", internal name of layer
        // opacity: integer
        // type: "string", layer type (tile, object)
        // visible: boolean
        // width: integer, width in number of sprites
        // x: integer, starting x position
        // y: integer, starting y position

        var size = scene.tilewidth;

        layer.data.forEach((tile_idx, i) => {
            if (!tile_idx) {
                return;
            }

            // Find the tileset we need to draw - the first with "firstgid"
            // less than the index we're looking for.
            var bestIx = 0, bestValue = 0;
            _(scene.tilesets).map((tileset, i) => {
                if (tileset.firstgid <= tile_idx && tileset.firstgid > bestValue) {
                    bestIx = i;
                    bestValue = tileset.firstgid;
                }
            });

            var tilesetIx = bestIx;

            var tile = scene.tilesets[tilesetIx];
            tile_idx -= tile.firstgid;

            var img_x = (tile_idx % (tile.imagewidth / size)) * size;
            var img_y = ~~(tile_idx / (tile.imagewidth / size)) * size;
            var s_x = (i % layer.width) * size;
            var s_y = ~~(i / layer.width) * size;

            this.mapcontext.drawImage(images[tilesetIx], img_x, img_y, size, size,
                s_x, s_y, size, size);
      });
    },

    componentDidUpdate: function(newProps, newState) {
        // draw an entirely new map
        if (!this.mapcontext ||
            newState.currentMap !== this.state.currentMap) {

            this.renderNewMap();
        }

        this.showMap();
    },

    componentDidMount: function() {
        this.renderNewMap();
        this.showMap();
    }
});

module.exports = Map;
