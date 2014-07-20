var EventEmitter = require("events").EventEmitter;
var Promise = require('bluebird');
var AppDispatcher = require("../flux/app-dispatcher.js");
var utils = require("../utils.jsx");

var CombatConstants = require("./combat-constants.js");

var SpriteLoader = require('../sprites/sprite-loader.jsx');

var CHANGE_EVENT = "change";

var _entities;
var _turnOrder;
var _turnIndex;
var _state;
var _resourcesLoaded;

var combatLog = function() {
    var consoleArgs = ["COMBAT LOG"];
    consoleArgs = consoleArgs.concat(Array.prototype.slice.call(arguments));
    console.log.apply(console, consoleArgs);
};

var FluxDatastore = {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    _emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
}

var CombatStore = _({}).extend(EventEmitter.prototype, FluxDatastore, {
    CombatEngine: {
        startTurns: function() {
            this.takeTurn();
        },

        damageEntity: function(entity, damage) {
            combatLog(`Damage! ${damage} points of damage to `, entity);
            entity.damage(damage);
        },

        handleAbility: function(ability, source, targets) {
            combatLog("Ability use: ", ability);

            // Simple stuff. Just use the power as damage to the target.
            var damage = ability.power || 0;
            targets.forEach((target) => this.damageEntity(target, damage));
            CombatStore._emitChange();
        },

        fizzleSpell: function(spell) {
            combatLog("Fizzled spell: ", spell);
        },

        getImplicitTargets(spell) {
            var livingEntities = _.where(_entities, {state: 'alive'});
            var livingEnemies = _.filter(livingEntities, (e) => !e.isPlayer());

            // if our spell targets all, return errybody
            if (spell.targetType === "all") {
                return livingEnemies;
            }

            // if we are casting a buff, we don't need a target
            if (spell.category !== "attack") {
                return [EntityStore.getPlayer()];
            }

            // no need to target if there is only one enemy
            if (livingEnemies.length == 1) {
                return livingEnemies;
            }

            if (livingEnemies.length < 1) {
                throw "Trying to get an implicit target when there are no living enemies";
            }

            return null;
        },

        // returns a promise
        waitForSelectionFromPlayer: function() {
            this.playerSelectionPromise = new Promise();
            this._state = CombatConstants.CombatEngineStates.PLAYER_SELECTING_TARGET;
        },

        // returns a promise
        getPlayerTarget: function(spell) {
            return new Promise((resolve, reject) => {
                var implicitTargets = this.getImplicitTargets(spell);
                if (!implicitTargets) {
                    this.waitForSelectionFromPlayer().done(resolve, reject);
                } else {
                    resolve(implicitTargets);
                }
            });
        },

        handlePlayerCast: function(spell, success) {
            var castSpell = (targets) => {
                if (success) {
                    var player = EntityStore.getPlayer();
                    this.runAnimationForEntity('attack', player).then(() => {
                        this.handleAbility(spell, player, targets);
                    });
                } else {
                    // show the fizzle animation
                    this.runAnimationForEntity('fizzle', player).then(() => {
                        this.fizzleSpell(spell);
                    });
                }
            }

            return this.getPlayerTarget(spell).then((target) => castSpell(target));
        },

        advanceTurn: function() {
            _state = CombatConstants.CombatEngineStates.RUNNING;
            _turnIndex += 1;
            this.takeTurn();
        },

        takeTurn: function() {
            var currentEntity = CombatStore.CombatEngine.getCurrentEntity();
            if (currentEntity.isPlayer()) {
                _state = CombatConstants.CombatEngineStates.AWAITING_PLAYER_INPUT;
                combatLog("Players turn, waiting...");
            } else {
                // Not the player, some ai monster.
                // Wait a short time then do the action.
                utils.wait(2000).done(() => {
                    var abilityToUse = this.chooseAbility(currentEntity);
                    var player = EntityStore.getPlayer();
                    this.handleAbility(abilityToUse, currentEntity, [player]);
                    this.advanceTurn();
                });
            }
        },

        getCurrentEntityId: function() {
            return _turnOrder[_turnIndex % _turnOrder.length];
        },

        getCurrentEntity: function() {
            return _entities[CombatStore.CombatEngine.getCurrentEntityId()];
        },

        /**
        * Choose an ability from the entities abilities, using priority and
        * cooldowns
        */
        chooseAbility: function(entity) {
            return _.find(entity.abilities, () => true);
        },

        reset: function() {
            _entities = {};
            _turnIndex = 0;
            _turnOrder = [];
            _state = CombatConstants.CombatEngineStates.RUNNING;
        },

        runAnimationForEntity: function(spriteState, entity) {
            var spriteId = entity.sprites[spriteState];
            var spriteTime = SpriteLoader.getSpriteTime(spriteId);

            return new Promise((resolve, reject) => {
                var oldSpriteState = entity.spriteState;
                _.delay(() => {
                    entity.setSpriteState(oldSpriteState);
                    CombatStore._emitChange();
                    resolve();
                }, spriteTime);
                entity.setSpriteState(spriteState);
                CombatStore._emitChange();
            });
        }
    },

    getEntities: function() {
        return _entities;
    },

    getState: function() {
        return _state;
    },

    getCurrentTurn: function() {
        return _entityIdOwningCurrentTurn;
    },

    getIsLoading: function() {
        return !_resourcesLoaded;
    },

    getIsPlayerSelecting: function() {
        return _state === CombatConstants.CombatEngineStates.AWAITING_PLAYER_INPUT;
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;

        switch (action.actionType) {
            case CombatConstants.START_COMBAT:
                CombatStore.CombatEngine.reset();

                _entities = _.extend({}, {"0": EntityStore.getPlayer()});
                action.monsterIds.forEach((id) => {
                    _entities[id] = EntityStore.getById(id);
                });

                _turnOrder = _.keys(_entities)

                combatLog("Starting combat!");
                combatLog("Entities:", _entities);
                combatLog("Turn order:", _turnOrder);
                combatLog("Turn index:", _turnIndex);

                CombatStore._emitChange();

                _resourcesLoaded = false;

                var spriteIds = _.flatten(_.map(_entities, (entity, id) =>
                    _.uniq(_.values(entity.sprites))));

                SpriteLoader.loadSprites(spriteIds).then(() => {
                    _resourcesLoaded = true;
                    CombatStore.CombatEngine.startTurns();
                    CombatStore._emitChange();
                });

                break;

            case CombatConstants.END_COMBAT:
                CombatStore.CombatEngine.reset();
                break;

            case CombatConstants.PLAYER_CAST_SPELL:
                utils.assert(_state == CombatConstants.CombatEngineStates.AWAITING_PLAYER_INPUT,
                       "Got a spell cast when we weren't waiting for one");
                var {spell, success} = action;
                CombatStore.CombatEngine.handlePlayerCast(spell, success).done(
                    CombatStore.advanceTurn);
                break;

            case CombatConstants.PLAYER_CHOOSE_TARGET:
                utils.assert(_state == CombatConstants.CombatEngineStates.AWAITING_PLAYER_INPUT,
                       "Got a target choice when we weren't waiting for one");
                var target = action.target;
                CombatStore.CombatEngine.playerSelectionPromise.resolve(target);
                break;

            case CombatConstants.USE_ABILITY:
                var ability = action.ability;
                var source = _entities[action.sourceId];
                var target = _entities[action.targetId];

                CombatStore._handleAbility(ability, source, target);
                break;
        }
        return true;
    }),

});

module.exports = CombatStore;
