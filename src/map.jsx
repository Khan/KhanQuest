/** @jsx React.DOM */

// mostly copied from
// * https://gist.github.com/shaneriley/4078905
// * http://hashrocket.com/blog/posts/using-tiled-and-canvas-to-render-game-screens

var React = require("react");
var _ = require("underscore");
var Shortcut = require("./shortcut.js");

var MapStore = require("./map-store.jsx");

var StateFromStore = require("./flux/state-from-store-mixin.js");

var Map = React.createClass({
    propTypes: {
    },

    mixins: [
        StateFromStore({
            layers: {
                store: MapStore,
                fetch: store => store.getLayers()
            }
        })
    ],

    getInitialState: function() {
        return { images: [] };
    },

    render: function() {

        var actions = {
            "w": {
                handler: () => { console.log("Up!"); },
                description: ""
            },
            "s": {
                handler: () => { console.log("Down!"); },
                description: ""
            }
        };

        return <div>
            <Shortcut actions={actions} />
            <canvas ref="canvas" width={1000} height={1000} />
        </div>;
    },

    draw: function() {
        var canvas = this.refs.canvas.getDOMNode();
        this.context = canvas.getContext('2d');
        this.bounds = MapStore.getBounds();

        // layers are stored bottom to top, so we can render in order
        var renderableLayers = _(this.state.layers)
            .filter(layer => layer.layer.name !== "interaction layer");

        _(renderableLayers).each(this.renderLayer);
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

    componentDidUpdate: function() {
        this.draw();
    },

    componentDidMount: function() {
        this.draw();
    }
});

module.exports = Map;
