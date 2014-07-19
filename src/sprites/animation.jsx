/** @jsx React.DOM */

var _ = require("underscore");
var React = require("react");

var AnimationTimingEngine = require("./animation-timing-engine.jsx");

var timingEngine = new AnimationTimingEngine();


function generateRandom(min, max){
    return Math.random() * (max - min) + min;
}

class FogParticle {
    constructor(options) {
        options = options || {};
        this.options = _.defaults({}, options, {
            initialVelocity: [generateRandom(-2, 2), generateRandom(-2, 2)],
            radius: 5,
            pos: [0, 0]
        });
        this.velocity = this.options.initialVelocity.slice();
        this.location = this.options.pos.slice();
    }

    render(ctx, time) {
        // Draw fog image
        if (this.image) {
            ctx.drawImage(this.image, this.location[0] - 128,
                this.location[1] - 128);
            this.location[0] += this.velocity[0];
            this.location[1] += this.velocity[1];
        }
    }
}

class FogParticleCloud {
    constructor(options) {
        var defaultSize = 1000;
        options = options || {};
        this.options = _.defaults({}, options, {
            size: [defaultSize, defaultSize],
            scale: 1,
            numParticles: 50,
        });
        this.particles = _(this.options.numParticles).times(() => {
            return new FogParticle(_.extend({
                pos: [
                    generateRandom(0, this.options.size[0]),
                    generateRandom(0, this.options.size[1])
                ],
            }, this.options));
        });
        var imageObj = new Image();
        imageObj.onload = () => {
            this.particles.forEach(function(particle) {
                particle.image = imageObj;
            });
        };
        imageObj.src = "http://www.blog.jonnycornwell.com/wp-content/uploads/2012/07/Smoke10.png";
    }

    scaledSize() {
        return [this.options.size[0] * this.options.scale,
                this.options.size[1] * this.options.scale];
    }

    render(ctx, time) {
        _.each(this.particles, (particle) => {
            particle.render(ctx, time);

            // Check if has crossed the right edge
            if (particle.location[0] >= this.options.size[0]) {
                particle.velocity[0] = -particle.velocity[0];
                particle.location[0] = this.options.size[0];
            }
            // Check if has crossed the left edge
            else if (particle.x <= 0) {
                particle.velocity[0] = -particle.velocity[0];
                particle.location[0] = 0;
            }

            // Check if has crossed the bottom edge
            if (particle.location[1] >= this.options.size[1]) {
                particle.velocity[1] = -particle.velocity[1];
                particle.location[1] = this.options.size[1];
            }

            // Check if has crossed the top edge
            else if (particle.location[1] <= 0) {
                particle.velocity[1] = -particle.velocity[1];
                particle.location[1] = 0;
            }
        });
    }
}


class RainDrop {
    constructor(options) {
        options = options || {};
        this.options = _.defaults({}, options, {
            velocity: [Math.random() * 5, 15 + Math.random() * 10],
            heightBase: 4,
            heightVariance: 4,
            widthBase: 1,
            widthVariance: 1,
            pos: [0, 0]
        });
        this.location = this.options.pos.slice();
        this.height = this.options.heightBase +
            Math.random() * this.options.heightVariance;
        this.width = this.options.widthBase +
            Math.random() * this.options.widthVariance;
    }

    render(ctx, time, options) {
        var centerX = this.location[0] + this.width / 2;
        var centerY = this.location[1] + this.height / 2;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY - this.height/2); // A1

        ctx.bezierCurveTo(
            centerX + this.width/2, centerY - this.height/2, // C1
            centerX + this.width/2, centerY + this.height/2, // C2
            centerX, centerY + this.height/2
        ); // A2

        ctx.bezierCurveTo(
            centerX - this.width/2, centerY + this.height/2, // C3
            centerX - this.width/2, centerY - this.height/2, // C4
            centerX, centerY - this.height/2
        ); // A1

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
        ctx.closePath();

        // Move particles using cool angle mechanics
        this.location[0] += this.options.velocity[0];
        this.location[1] += this.options.velocity[1];
    }
}

class RainCloud {
    constructor(options) {
        var defaultSize = 1000;
        options = options || {};
        this.options = _.defaults({}, options, {
            size: [defaultSize, defaultSize],
            scale: 1,
            numParticles: 2000,
        });
        this.particles = _(this.options.numParticles).times(() => {
            return new RainDrop(_.extend({
                pos: [
                    generateRandom(0, this.options.size[0]),
                    generateRandom(0, this.options.size[1])
                ],
            }, this.options));
        });
    }

    scaledSize() {
        return [this.options.size[0] * this.options.scale,
                this.options.size[1] * this.options.scale];
    }

    render(ctx, time) {
        var newParticles = _.map(this.particles, (particle, i) => {
            particle.render(ctx, time);

            // Regenerate if drops fly off screen
            if (particle.location[0] > this.options.size[0] + 5 ||
                particle.location[0] < -this.options.size[0] - 5 ||
                particle.location[1] > this.options.size[1])
            {
                //a brand new particle replacing the dead one
                return new RainDrop(_.extend({
                    pos: [Math.random() * this.options.size[0] , -10],
                }, this.options));
            } else {
                return particle;
            }
        });
        this.particles = newParticles;
    }
}

class SnowFlake {
    constructor(options) {
        options = options || {};
        this.options = _.defaults({}, options, {
            radiusBase: 1,
            radiusVariance: 4,
            pos: [0, 0]
        });
        this.location = this.options.pos.slice();
        this.radius = this.options.radiusBase +
            Math.random() * this.options.radiusVariance;
    }

    render(ctx, time, options) {
        ctx.beginPath();
        ctx.moveTo(this.location[0], this.location[1]);
        ctx.arc(this.location[0], this.location[1], this.radius, 0, Math.PI*2);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.arc(this.location[0], this.location[1], this.radius, Math.PI * 2,
            false);
        ctx.fill();

        // Move particles using cool angle mechanics
        this.location[0] += Math.sin(options.angle) * 2;
        this.location[1] += Math.cos(options.angle +
            this.options.numParticles) + 1 + this.radius / 2;
    }
}

class SnowFlakeCloud {
    constructor(options) {
        var defaultSize = 1000;
        options = options || {};
        this.options = _.defaults({}, options, {
            size: [defaultSize, defaultSize],
            scale: 1,
            numParticles: 500,
        });
        // Angle of rotation for the cloud
        this.angle = 0;
        this.particles = _(this.options.numParticles).times(() => {
            // Snowflakes spawn at random locations
            return new SnowFlake(_.extend({
                pos: [
                    generateRandom(0, this.options.size[0]),
                    generateRandom(0, this.options.size[1])
                ]
            }, this.options));
        });
    }

    scaledSize() {
        return [this.options.size[0] * this.options.scale,
                this.options.size[1] * this.options.scale];
    }

    render(ctx, time) {
        this.angle += 0.005;

        var newParticles = _.map(this.particles, (particle, i) => {
            particle.render(ctx, time, {
                angle: this.angle
            });

            // Regenerate if flake flies off screen
            if (particle.location[0] > this.options.size[0] + 5 ||
                particle.location[0] < -this.options.size[0] - 5 ||
                particle.location[1] > this.options.size[1])
            {
                var position;
                if (i % 3 > 0) {
                    position = [Math.random() * this.options.size[0], -10];
                } else if (Math.sin(this.angle) > 0) {
                    position = [-5, Math.random() * this.options.size[1]];
                } else {
                    position = [
                        this.options.size[0] + 5,
                        Math.random() * this.options.size[1]
                    ];
                }
                //a brand new particle replacing the dead one
                return new SnowFlake(_.extend({
                    pos: position,
                }, this.options));
            } else {
                return particle;
            }
        });
        this.particles = newParticles;
    }
}

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
        var defaultSize = 1000;
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
            particleCloud: new FogParticleCloud({})
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
        return <canvas
            width={canvasSize[0]}
            height={canvasSize[1]}
            style={this.props.style} />;
    }
});

timingEngine.start();

module.exports = {
    ParticleCloud: ParticleCloud,
    SnowFlakeCloud: SnowFlakeCloud,
    FogParticleCloud: FogParticleCloud,
    RainCloud: RainCloud,
    ParticleCloudRenderer: ParticleCloudRenderer
};
