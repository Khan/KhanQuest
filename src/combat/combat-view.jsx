/** @jsx React.DOM */

var React = require('react');

var StateFromStore = require('../flux/state-from-store-mixin.js');

var CombatActions = require('./combat-actions.js');
var CombatStore = require('./combat-store.jsx');

var SpriteLoader = require('../sprites/sprite-loader.jsx');
var SpriteRenderer = require('../sprites/sprite.jsx').SpriteRenderer;
var HealthBar = require('./health-bar.jsx');

var CombatEntity = React.createClass({
    propTypes: {
        // should be entity
        entity: React.PropTypes.object.isRequired,
        isPlayer: React.PropTypes.bool.isRequired,
        isSelectable: React.PropTypes.bool.isRequired
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

    handleClick: function() {
        if (this.props.isSelectable) {
            CombatActions.chooseTarget(this.props.entity);
        }
    },

    render: function() {
        //need to render sprite, healthbar
        var spriteState = this.props.entity.spriteState;

        var sprite = this._getOrCreateSpriteForState(spriteState);

        var className = React.addons.classSet({
            entity: true,
            selectable: this.props.isSelectable
        });
        return <div className={className} onClick={this.handleClick}>
            <SpriteRenderer sprite={sprite} flipX={this.props.isPlayer} />
            <HealthBar entity={this.props.entity} />
        </div>;
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
        },
        selectingTarget: {
            store: CombatStore,
            fetch: (store) => store.getIsPlayerSelecting()
        }
    })],

    renderPlayer: function() {
        return <CombatEntity isPlayer={true}
                             entity={this.state.entities[0]}
                             isSelectable={false} />;
    },

    renderEnemies: function() {
        var enemies = _.filter(this.state.entities,
                               (entity) => !entity.isPlayer());
        return enemies.map(
            (enemyEntity, i) => <CombatEntity
                entity={enemyEntity} key={i} isPlayer={false}
                isSelectable={this.state.selectingTarget} />);
    },

    render: function() {
        var children = [];
        if (this.state.loading) {
            children.push(<span>Loading</span>);
        } else {
            children.push(this.renderPlayer());
            children.push(this.renderEnemies());
        }
        return <div className="combat-background">
            {children}
        </div>;
    }
});

module.exports = CombatView;
