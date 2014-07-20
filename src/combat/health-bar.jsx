/** @jsx React.DOM */

var React = require("react");
var RP = React.PropTypes;

// var { Actions, GameViews } = require("./actions.jsx");
// var Spellbook = require("./spellbook.jsx");
// var Dialog = require("./dialog.jsx");
// var CombatScreen = require("./combat-screen.jsx");
// var Map = require("./map.jsx");
//
// var Changeable = require("./mixins/changeable.jsx");
// var PropCheckBox = require("./prop-check-box.jsx");
//
// var UserStore = require("./user-store.jsx");
// var GameStore = require("./game-store.jsx");
// var CombatStore = require("./combat/combat-store.jsx");
// var StateFromStore = require("./flux/state-from-store-mixin.js");
// var CombatActions = require('./combat/combat-actions.js');


var HealthBar = React.createClass({
    propTypes: {
        entity: RP.object.isRequired
    },

    render: function() {
        var pc = 100 * this.props.entity.health / this.props.entity.hp;
        var width = `${pc}%`;
        var classes = "health-bar"

        var children = [
            <div className="filled" style={{width: width}} />,
            this.props.entity.health
        ];

        return <div className={classes}>
            {children}
        </div>;
    }
});

module.exports = HealthBar;
