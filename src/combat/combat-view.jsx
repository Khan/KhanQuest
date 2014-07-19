/** @jsx React.DOM */

var React = require('react');

var StateFromStore = require('../flux/state-from-store-mixin.js');

var CombatActions = require('./combat-actions.js');
var CombatStore = require('./combat-store.jsx');

var SpriteStore = require('../sprites/sprite-store.jsx');
var SpriteRenderer = require('../sprites/sprite.jsx').SpriteRenderer;

var CombatEntity = React.createClass({
    propTypes: {
        // should be entity
        entity: React.PropTypes.object
    },

    componentWillMount: function() {
        this.sprites = {};
    },

    _getOrCreateSpriteForState: function(state) {
        if (!(state in this.sprites)) {
            // need to create sprite
            var spriteId = this.props.entity.sprites[state];
            this.sprites[state] = SpriteStore.getNewSpriteById(spriteId);
        }
        return this.sprites[state];
    },

    render: function() {
        //need to render sprite, healthbar
        var spriteState = this.props.entity.spriteState;

        var sprite = this._getOrCreateSpriteForState(spriteState);
        return <SpriteRenderer sprite={sprite} />;
    }
});

var CombatView = React.createClass({
    mixins: [StateFromStore({
        entities: {
            store: CombatStore,
            fetch: (store) => store.getEntities()
        }
    })],

    renderPlayer: function() {
        return <CombatEntity entity={this.state.entities[0]} />;
    },

    renderEnemies: function() {
        return [];
    },

    render: function() {
        var player = this.renderPlayer();
        var enemies = this.renderEnemies();

        return <div classNam="combat-background">
            {player}
            {enemies}
        </div>;
    }
});

module.exports = CombatView;
