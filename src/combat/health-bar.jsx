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

        var className = React.addons.classSet({
            'health-bar-container': true,
            'full-health': pc >= 100
        })

        return <div className={className}>
            <span>{currentHealth}</span>
            <div className="health-bar">
                <div className="filled" style={{width: width}} />
            </div>
        </div>;
    }
});

module.exports = HealthBar;
