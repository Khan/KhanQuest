/** @jsx React.DOM */

var React = require('react');

var StateFromStore = require('../flux/state-from-store-mixin.js');

var CombatActions = require('./combat-actions.js');
var CombatStore = require('./combat-store.jsx');

var SpriteLoader = require('../sprites/sprite-loader.jsx');
var SpriteRenderer = require('../sprites/sprite.jsx').SpriteRenderer;

var CombatEntity = React.createClass({
    propTypes: {
        // should be entity
        entity: React.PropTypes.object.isRequired,
        isPlayer: React.PropTypes.bool.isRequired
    },

    componentWillMount: function() {
        this.sprites = {};
    },

    _getOrCreateSpriteForState: function(state) {
        if (!(state in this.sprites)) {
            // need to create sprite
            var spriteId = this.props.entity.sprites[state];
            this.sprites[state] = SpriteLoader.getNewSpriteById(spriteId);
        }
        return this.sprites[state];
    },

    render: function() {
        //need to render sprite, healthbar
        var spriteState = this.props.entity.spriteState;

        var sprite = this._getOrCreateSpriteForState(spriteState);
        return <SpriteRenderer sprite={sprite} flipX={this.props.isPlayer} />;
    }
});

var CombatView = React.createClass({
    mixins: [StateFromStore({
        entities: {
            store: CombatStore,
            fetch: (store) => store.getEntities()
        },
        loading: {
            store: CombatStore,
            fetch: (store) => store.getIsLoading()
        }
    })],

    renderPlayer: function() {
        return <CombatEntity isPlayer={true} entity={this.state.entities[0]} />;
    },

    renderEnemies: function() {
        var enemies = _.filter(this.state.entities,
                               (entity) => !entity.isPlayer());
        return enemies.map((enemyEntity, i) =>
                           <CombatEntity entity={enemyEntity}
                                         key={i} isPlayer={false} />);
    },

    render: function() {
        if (this.state.loading) {
            return <span>Loading</span>;
        } else {
            var player = this.renderPlayer();
            var enemies = this.renderEnemies();

            return <div classNam="combat-background">
                {player}
                {enemies}
            </div>;
        }
    }
});

module.exports = CombatView;
