/** @jsx React.DOM */

var _ = require("underscore");
var React = require("react");

var Animation = require("./animation.jsx");

var SNOW = "SNOW";
var FOG = "FOG";
var RAIN = "RAIN";
var DARK = "DARK";

var WeatherRenderer = React.createClass({

    propTypes: {
        type: React.PropTypes.oneOf([
            SNOW,
            FOG,
            RAIN,
            DARK
        ])
    },

    getParticleCloudForType: function (props) {
        props = props || this.props;
        var animProps = {
            size: [props.width, props.height]
        };

        switch (props.type) {
            case SNOW:
                return new Animation.SnowFlakeCloud(animProps);

            case FOG:
                return new Animation.FogParticleCloud(animProps);

            case RAIN:
            case DARK:
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

        if (this.props.type === DARK) {
            return <div>
                <Animation.DarkRenderer
                    width={this.props.width}
                    height={this.props.height} />;
                <Animation.ParticleCloudRenderer
                    particleCloud={this.getParticleCloudForType()}
                    style={canvasStyle} />;
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
    DARK
};
