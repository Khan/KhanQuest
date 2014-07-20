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
        isSelectable: React.PropTypes.bool.isRequired,
        active: React.PropTypes.bool.isRequired
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

        if (!('active' in this.sprites)) {
            this.sprites['active'] = SpriteLoader.getNewSpriteById(
                'current-turn-halo');
        }

        var className = React.addons.classSet({
            entity: true,
            selectable: this.props.isSelectable
        });
        return <div className={className} onClick={this.handleClick}>
            <SpriteRenderer sprite={sprite} flipX={this.props.isPlayer} />
            {this.props.active ?
                <SpriteRenderer className="active-halo"
                                sprite={this.sprites['active']} />: null}
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
        },
        activeEntity: {
            store: CombatStore,
            fetch: (store) => store.CombatEngine.getCurrentEntity()
        },
        message: {
            store: CombatStore,
            fetch: (store) => store.getCombatMessage()
        }
    })],

    renderEntity: function(entity) {
        var isSelectable = !entity.isPlayer() && this.state.selectingTarget;
        return <CombatEntity isPlayer={entity.isPlayer()}
                             entity={entity}
                             isSelectable={isSelectable}
                             active={entity === this.state.activeEntity}/>;
    },

    render: function() {
        var inner;
        if (this.state.loading) {
            inner = <span>Loading</span>;
        } else {
            inner = _.map(this.state.entities, this.renderEntity);
        }

        var message = null;
        if (this.state.message) {
            message = <div className="combat-message">
                {this.state.message}
            </div>;
        }

        return <div className="combat-background">
            {inner}
            {message}
        </div>;
    }
});

module.exports = CombatView;
