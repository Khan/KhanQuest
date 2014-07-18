/** @jsx React.DOM */

var React = require("react");
var _ = require("underscore");

var MapStore = require("./map-store.jsx");

var Map = React.createClass({
    propTypes: {
    },

    getInitialState: function() {
        return { images: [] };
    },

    render: function() {
        return <canvas width={1000} height={1000} />;
    },

    draw: function() {
        var canvas = this.getDOMNode();
        this.context = canvas.getContext('2d');
        this.bounds = MapStore.getBounds();

        // layers are stored bottom to top, so we can render in order
        var layers = MapStore.getLayers();
        _(layers).each(this.renderLayer);
    },

    renderLayer: function({ layer, image }) {
      // data: [array of tiles, 1-based, position of sprite from top-left]
      // height: integer, height in number of sprites
      // name: "string", internal name of layer
      // opacity: integer
      // type: "string", layer type (tile, object)
      // visible: boolean
      // width: integer, width in number of sprites
      // x: integer, starting x position
      // y: integer, starting y position

      if (layer.type !== "tilelayer" || !layer.opacity) { return; }

      var size = layer.tilewidth;

      layer.data.forEach(function(tile_idx, i) {
        if (!tile_idx) {
            return;
        }

        var tile = layer.tilesets[0];
        var img_x = (tile_idx % (tile.imagewidth / size)) * size;
        var img_y = ~~(tile_idx / (tile.imagewidth / size)) * size;
        var s_x = (i % layer.width) * size;
        var s_y = ~~(i / layer.width) * size;
        tile_idx--;

        this.context.drawImage(image, img_x, img_y, size, size,
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
