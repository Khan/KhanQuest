/** @jsx React.DOM */

var _ = require("underscore");
var React = require("react");

var Animation = require("./animation.jsx");

var SNOW = "SNOW";
var FOG = "FOG";
var RAIN = "RAIN";
var DARKRAIN = "DARKRAIN";
var DARKSNOW = "DARKSNOW";

var WeatherRenderer = React.createClass({

    propTypes: {
        type: React.PropTypes.oneOf([
            SNOW,
            FOG,
            RAIN,
            DARKRAIN,
            DARKSNOW
        ])
    },

    getParticleCloudForType: function (props) {
        props = props || this.props;
        var animProps = {
            size: [props.width, props.height]
        };

        switch (props.type) {
            case SNOW:
            case DARKSNOW:
                return new Animation.SnowFlakeCloud(animProps);

            case FOG:
                return new Animation.FogParticleCloud(animProps);

            case RAIN:
            case DARKRAIN:
                return new Animation.RainCloud(animProps);

            default:
                return null;
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.type !== this.props.type;
    },

    getDefaultProps: function () {
        return {
            type: null
        };
    },

    render: function () {
       var canvasStyle = {
            position: "absolute",
            zIndex: 2
        };

        if (this.props.type === DARKRAIN || this.props.type === DARKSNOW) {
            return <div>
                <Animation.DarkRenderer
                    width={this.props.width}
                    height={this.props.height} />
                <Animation.ParticleCloudRenderer
                    particleCloud={this.getParticleCloudForType()}
                    style={canvasStyle} />
            </div>;
        }

        return <Animation.ParticleCloudRenderer
                    particleCloud={this.getParticleCloudForType()}
                    style={canvasStyle} />;
    }
});

module.exports = {
    WeatherRenderer,
    SNOW,
    RAIN,
    FOG,
    DARKRAIN,
    DARKSNOW
};
