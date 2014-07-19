/** @jsx React.DOM */

var _ = require("underscore");
var React = require("react");

var AnimationTimingEngine = require("./animation-timing-engine.jsx");

var timingEngine = new AnimationTimingEngine();

class Particle {
    constructor(options) {
        options = options || {};
        this.options = _.defaults({}, options, {
            velocity: [-2.5 + Math.random() * 5, -15 + Math.random() * 10],
            //colors
            generateR: () => Math.round(Math.random() * 255),
            generateG: () => Math.round(Math.random() * 255),
            generateB: () => Math.round(Math.random() * 255),
            radiusBase: 10,
            radiusVariance: 20,
            lifeBase: 20,
            lifeVariance: 10,
            pos: [0, 0]
        });

        this.life = this.options.lifeBase +
            Math.random() * this.options.lifeVariance;
        this.remaining_life = this.life;
        this.location = this.options.pos.slice();
        this.radius = this.options.radiusBase +
            Math.random() * this.options.radiusVariance;
    }

    // we expect time in ms to start at 0, this will always correspond to the
    // first frame
    render(ctx, time) {
        ctx.beginPath();
        this.opacity = Math.round(this.remaining_life / this.life * 100) / 100;

        var r = this.options.generateR(this.opacity);
        var g = this.options.generateG(this.opacity);
        var b = this.options.generateB(this.opacity);

        //a gradient instead of white fill
        var gradient = ctx.createRadialGradient(this.location[0],
            this.location[1], 0, this.location[0], this.location[1],
            this.radius);
        gradient.addColorStop(0, "rgba("+ r + ", " + g + ", " + b + ", " +
            this.opacity + ")");
        gradient.addColorStop(0.5, "rgba("+ r + ", " + g + ", " + b + ", " +
            this.opacity + ")");
        gradient.addColorStop(1, "rgba("+ r + ", " + g + ", " + b + ", 0)");
        ctx.fillStyle = gradient;
        ctx.arc(this.location[0], this.location[1], this.radius, Math.PI * 2,
            false);
        ctx.fill();

        //lets move the particles
        this.remaining_life--;
        this.radius--;
        this.location[0] += this.options.velocity[0];
        this.location[1] += this.options.velocity[1];
    }
}

class ParticleCloud {
    constructor(options) {
        var defaultSize = 500;
        options = options || {};
        this.options = _.defaults({}, options, {
            size: [defaultSize, defaultSize],
            scale: 1,
            pos: [defaultSize / 2, defaultSize - 50],
            numParticles: 100,
        });
        this.particles = _(this.options.numParticles).times(() => {
            return new Particle(this.options);
        });
    }

    scaledSize() {
        return [this.options.size[0] * this.options.scale,
                this.options.size[1] * this.options.scale];
    }

    render(ctx, time) {
        var newParticles = _.map(this.particles, (particle, i) => {
            particle.render(ctx, time);

            //regenerate particles
            if (particle.remaining_life < 0 || particle.radius < 0)
            {
                //a brand new particle replacing the dead one
                return new Particle(this.options);
            } else {
                return particle;
            }
        });
        this.particles = newParticles;
    }
}

var ParticleCloudRenderer = React.createClass({
    propTypes: {
        particleCloud: React.PropTypes.instanceOf(ParticleCloud).isRequired
    },

    getDefaultProps: function () {
        // Colors for fire particles
        var fire = {
            generateR: () => {
                return 250;
            },
            generateG: (decay) => {
                var sqr = decay * decay;
                return Math.round(200 * sqr + Math.random() * 10 * (1 - sqr));
            },
            generateB: () => 0
        };

        return {
            particleCloud: new ParticleCloud(fire)
        };
    },

    _insertIntoParticleClouds: function() {
        this.index = timingEngine.addUpdatable(this);
    },

    _removeFromParticleClouds: function() {
        timingEngine.removeUpdatable(this.index);
    },

    update: function(dt) {
        if (this.ctx) {
            var scaledSize = this.props.particleCloud.scaledSize();
            this.ctx.clearRect(0, 0, scaledSize[0], scaledSize[1]);
            this.props.particleCloud.render(this.ctx, this.time);
            this.time += dt;
        }
    },

    componentDidMount: function() {
        this.ctx = this.getDOMNode().getContext('2d');
        this.time = 0;

        this._insertIntoParticleClouds();
    },

    componentWillUnmount: function() {
        this._removeFromParticleClouds();
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.particleCloud !== this.props.particleCloud) {
            this._removeFromParticleClouds();
            this._insertIntoParticleClouds(nextProps.particleCloud);
            this.time = 0;
        }
    },

    render: function() {
        var canvasSize = this.props.particleCloud.scaledSize();
        return <canvas width={canvasSize[0]} height={canvasSize[1]}></canvas>;
    }
});

timingEngine.start();

module.exports = {
    ParticleCloud: ParticleCloud,
    ParticleCloudRenderer: ParticleCloudRenderer
};
