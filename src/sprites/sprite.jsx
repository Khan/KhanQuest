/** @jsx React.DOM */

var _ = require("underscore");
var React = require("react");

var AnimationTimingEngine = require("./animation-timing-engine.jsx");

var Resources = (function() {
    var promises = {};
    var resources = {};

    var _load = function(url) {
        if (!promises[url]) {
            // Create an image and store a promise
            var image = new Image();
            promises[url] = new Promise(function(resolve, reject) {
                image.onload = () => resolve({url, image});
                image.onerror = () => reject({url, image});
                image.src = url;
            });
        }
        return promises[url];
    };

    // returns a promise
    var loadAll = function(arrayOfUrls, cb) {
        var loadPromises = arrayOfUrls.map((url) => _load(url));
        return Promise.all(loadPromises).then((urlImageTuples) => {
            urlImageTuples.forEach((urlImageTuple) => {
                var {url, image} = urlImageTuple;
                resources[url] = image;
                return image;
            });
        });
    };

    var get = function(url) {
        if (url in resources) {
            return resources[url];
        } else {
            throw `Missing sprite for url ${url}. Did you forget to load it?`;
        }
    };

    return {
        loadAll: loadAll,
        get: get
    };
})();

var timingEngine = new AnimationTimingEngine();

class Sprite {
    constructor(options) {
        options = options || {};
        this.options = _.defaults(options, {
            url: "resources/default.png",
            pos: [0, 0],
            size: [128, 128],
            speed: 1,
            once: false,
            frameIndices: [0],
            dir: 'horizontal',
            scale: 1,
        });
    }

    scaledSize() {
        return [this.options.size[0] * this.options.scale,
                this.options.size[1] * this.options.scale];
    }

    // we expect time in ms to start at 0, this will always correspond to the
    // first frame
    render(ctx, time, offset) {
        var offset = offset || [0, 0];
        var frameIndex = null;
        if (this.options.speed > 0) {
            var index = Math.floor(this.options.speed * time);
            var max = this.options.frameIndices.length;
            frameIndex = this.options.frameIndices[index % max];

            if (this.options.once && index >= max) {
                frameIndex = this.options.frameIndices[max - 1];
            }
        } else {
            frameIndex = 0;
        }

        var spritePosition = this.options.pos.slice();
        var xySwitch = this.options.dir === 'horizontal' ? 0 : 1;
        spritePosition[xySwitch] += frameIndex * this.options.size[xySwitch];

        var scaledSize = this.scaledSize();

        ctx.drawImage(
            /*image*/ Resources.get(this.options.url),
            /*sourcex*/ spritePosition[0], /*sourcey*/ spritePosition[1],
            /*sourcew*/ this.options.size[0], /*sourceh*/ this.options.size[1],
            /*canvasx*/ offset[0], /*canvasy*/ offset[1],
            /*canvasw*/ scaledSize[0], /*canvash*/ scaledSize[1]);
    }
}

var SpriteRenderer = React.createClass({
    propTypes: {
        sprite: React.PropTypes.instanceOf(Sprite).isRequired,
        flipX: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            flipX: false
        };
    },

    _insertIntoSprites: function(sprite) {
        this.index = timingEngine.addUpdatable(this);
    },

    _removeFromSprites: function() {
        timingEngine.removeUpdatable(this.index);
    },

    update: function(dt) {
        if (this.ctx) {
            var scaledSize = this.props.sprite.scaledSize();
            this.ctx.clearRect(0, 0, scaledSize[0], scaledSize[1]);
            this.props.sprite.render(this.ctx, this.time);
            this.time += dt;
        }
    },

    componentDidMount: function() {
        this.ctx = this.getDOMNode().getContext('2d');
        var canvasSize = this.props.sprite.scaledSize();
        if (this.props.flipX) {
            this.ctx.scale(-1, 1);
            this.ctx.translate(-canvasSize[0], 0);
        }
        this.time = 0;

        this._insertIntoSprites(this.props.sprite);
    },

    componentWillUnmount: function() {
        this._removeFromSprites();
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.sprite !== this.props.sprite) {
            this._removeFromSprites();
            this._insertIntoSprites(nextProps.sprite);
            this.time = 0;
        }
    },

    render: function() {
        var canvasSize = this.props.sprite.scaledSize();
        return <canvas
            width={canvasSize[0]}
            height={canvasSize[1]}
            style={this.props.style}
            />;
    }
});

timingEngine.start();

module.exports = {
    Resources: Resources,
    Sprite: Sprite,
    SpriteRenderer: SpriteRenderer,
    timingEngine: timingEngine
};
