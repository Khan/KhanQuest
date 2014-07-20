/** @jsx React.DOM */

// mostly copied from
// * https://gist.github.com/shaneriley/4078905
// * http://hashrocket.com/blog/posts/using-tiled-and-canvas-to-render-game-screens

var React = require("react");
var _ = require("underscore");
var Shortcut = require("./shortcut.js");
var Weather = require("./sprites/weather.jsx");

var { Actions } = require("./actions.jsx");

var GameStore = require("./game-store.jsx");
var MapStore = require("./map-store.jsx");
var EntityStore = require("./entity.jsx");
var SpriteLoader = require("./sprites/sprite-loader.jsx");
var { SpriteRenderer } = require("./sprites/sprite.jsx");

var StateFromStore = require("./flux/state-from-store-mixin.js");

var Avatar = new Image();
Avatar.src = "/static/img/red-mage+female.png";

var Map = React.createClass({
    propTypes: {
    },

    mixins: [
        StateFromStore({
            layers: {
                store: MapStore,
                fetch: (store) => store.getLayers()
            },
            isLoading: {
                // TODO: put this in the map store too?
                store: MapStore,
                fetch: (store) => store.getIsLoading()
            },
            location: {
                store: GameStore,
                fetch: (store) => store.getLocation()
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
    },

    render: function() {

        var up = {
            handler: (e) => { Actions.move("UP"); e.preventDefault(); },
            description: ""
        };

        var left = {
            handler: (e) => { Actions.move("LEFT"); e.preventDefault(); },
            description: ""
        };

        var down = {
            handler: (e) => { Actions.move("DOWN"); e.preventDefault(); },
            description: ""
        };

        var right = {
            handler: (e) => { Actions.move("RIGHT"); e.preventDefault(); },
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
            width: 1000,
            height: 1000
        };
        var absolute = {
            position: "absolute"
        };
        var above = _.extend({ zIndex: 2 }, absolute);
        return <div style={mapStyle}>
            <Shortcut actions={actions} />
            <Weather.WeatherRenderer
                width={1000}
                height={1000}
                style={above}
                type={Weather.SNOW} />
            <canvas ref="canvas" width={1000} height={1000} style={absolute} />
            {this.renderPlayer()};
        </div>;
    },

    draw: function() {
        var canvas = this.refs.canvas.getDOMNode();
        this.context = canvas.getContext('2d');

        // layers are stored bottom to top, so we can render in order
        var renderableLayers = _(this.state.layers)
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
        var y = location.y * size - 16;
        var sprite = this.playerSprites.UP;
        return <SpriteRenderer
            sprite={sprite}
            flipX={false}
            style={{
                position: 'absolute',
                top: y,
                left: x
            }}/>;
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

            this.context.drawImage(images[tilesetIx], img_x, img_y, size, size,
                s_x, s_y, size, size);
      });
    },

    componentDidUpdate: function(newProps, newState) {
        this.draw();
    },

    componentDidMount: function() {
        this.draw();
    }
});

module.exports = Map;
