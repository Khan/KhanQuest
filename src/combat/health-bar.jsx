/** @jsx React.DOM */

var React = require("react");
var RP = React.PropTypes;


var HealthBar = React.createClass({
    propTypes: {
        entity: RP.object.isRequired
    },

    render: function() {
        var currentHealth = Math.max(this.props.entity.health, 0);
        var maxHealth = this.props.entity.hp
        var pc = 100 * currentHealth / maxHealth;
        var width = `${pc}%`;

        var classes = "health-bar";
        if (pc >= 100) {
            classes += " full-health"
        }

        return <div className={classes}>
            <div className="filled" style={{width: width}} />
            {currentHealth}
        </div>;
    }
});

module.exports = HealthBar;
