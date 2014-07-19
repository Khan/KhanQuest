/** @jsx React.DOM */

var React = require("react");
var _ = require("underscore");
var SpellBadge = require("./spell-badge.jsx");
var Spell = require("./models/spell");

var Spellbook = React.createClass({
    propTypes: {
        exerciseName: React.PropTypes.arrayOf(React.PropTypes.string),
        onClick: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            exerciseName: [],
            onClick: function () { }
        };
    },

    render: function () {
        return <div className="spellbook">
            <div id="border">
                <h1 id="banner">SPELLBOOK</h1>
                <div className="separator" />
                {_.map(this.props.exerciseNames, (exerciseName, i) => {
                    return <SpellBadge exerciseName={exerciseName}
                        key={i}
                        onClick={this.props.onClick} />;
                })}
            </div>
        </div>;
    }
});

module.exports = Spellbook;
