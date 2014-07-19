/** @jsx React.DOM */

var _ = require("underscore");
var React = require("react");

var Animation = require("./animation.jsx");

var SNOW = "SNOW";
var FOG = "FOG";
var RAIN = "RAIN";

var WeatherRenderer = React.createClass({

    propTypes: {
        type: React.PropTypes.oneOf([
            SNOW,
            FOG,
            RAIN
        ])
    },

    getParticleCloudForType: function (props) {
        props = props || this.props;
        var cloudProps = {
            size: [props.width, props.height]
        };

        switch (props.type) {
            case SNOW:
                return new Animation.SnowFlakeCloud(cloudProps);

            case FOG:
                return new Animation.FogParticleCloud(cloudProps);

            case RAIN:
                return new Animation.RainCloud(cloudProps);

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

        return <Animation.ParticleCloudRenderer
                    particleCloud={this.getParticleCloudForType()}
                    style={canvasStyle} />;
    }
});

module.exports = {
    WeatherRenderer,
    SNOW,
    RAIN,
    FOG
};
