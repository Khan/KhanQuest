/** @jsx React.DOM */

var _ = require("underscore");
var Spell = require("./models/spell");

var Badge = React.createClass({
    propTypes: {
        spell: React.PropTypes.instanceOf(Spell)
    },

    getDefaultProps: function () {
        return {
            spell: null
        };
    },

    _renderImage: function () {
        var url = "/static/img/spells/" + this.props.spell.exerciseName + ".jpg";
        return <img className="spell-badge" src={url} />;
    },

    render: function () {
        return <div style={{marginBottom: 10}}>
            {this._renderImage()}
            <div style={{display: "inline-block"}}>
                <div>{this.props.spell.displayName}</div>
                <div>{this.props.spell.caption}</div>
                <div>{this.props.spell.description}</div>
            </div>
        </div>;
    }
});

var Spellbook = React.createClass({
    propTypes: {
        spells: React.PropTypes.arrayOf(
            React.PropTypes.instanceOf(Spell)
        )
    },

    getDefaultProps: function () {
        return {
            spells: []
        };
    },

    render: function () {
        return <div className="spellbook">
            {_.map(this.props.spells, (spell, i) => {
                return <Badge spell={spell} key={i} />;
            })}
        </div>;
    }
});

module.exports = Spellbook;
