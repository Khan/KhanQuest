var EventEmitter = require("events").EventEmitter;
var Promise = require('bluebird');
var AppDispatcher = require("../flux/app-dispatcher.js");
var utils = require("../utils.jsx");

var CombatConstants = require("./combat-constants.js");
var CombatActions = require("./combat-actions.js");
var { Actions } = require("../actions.jsx");
var UserStore = require("../user-store.jsx");

var SpriteLoader = require('../sprites/sprite-loader.jsx');

var CHANGE_EVENT = "change";

var _entities;
var _turnOrder;
var _turnIndex;
var _state;
var _resourcesLoaded;
var _message;

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
        getLivingEnemies: function() {
            var livingEntities = _.where(_entities, {state: 'alive'});
            return _.filter(livingEntities, (e) => !e.isPlayer());
        },

        startTurns: function() {
            this.takeTurn();
        },

        damageEntity: function(entity, damage) {
            combatLog(`Damage! ${damage} points of damage to `, entity);
            entity.damage(damage);
            return this.runAnimationForEntity('damaged', entity);
        },

        handleAbility: function(ability, source, targets) {
            combatLog("Ability use: ", ability);

            // Simple stuff. Just use the power as damage to the target.
            var damage = ability.power || 0;
            var animationPromises = targets.map((target) => {
                return this.damageEntity(target, damage);
            });
            CombatStore._emitChange();
            return Promise.all(animationPromises);
        },

        fizzleSpell: function(spell) {
            combatLog("Fizzled spell: ", spell);
        },

        getImplicitTargets(spell) {
            var livingEnemies = this.getLivingEnemies();

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
            return new Promise((resolve, reject) => {
                this.resolvePlayerTargets = resolve;
                _state = CombatConstants.CombatEngineStates.PLAYER_SELECTING_TARGET;
                _message = "Choose a target";
                CombatStore._emitChange();
            });
        },

        // returns a promise
        getPlayerTarget: function(spell) {
            return new Promise((resolve, reject) => {
                var implicitTargets = this.getImplicitTargets(spell);
                if (!implicitTargets) {
                    this.waitForSelectionFromPlayer()
                    .done((targets) => {
                        _message = null;
                        _state = CombatConstants.CombatEngineStates.RUNNING;
                        resolve(targets);
                    }, reject);
                } else {
                    resolve(implicitTargets);
                }
            });
        },

        handlePlayerCast: function(spell, success) {
            var castSpell = (targets) => {
                var player = EntityStore.getPlayer();

                // Add power-up to spell and reset counters
                spell.power += UserStore.getCounter(spell.exerciseName);
                Actions.adjustCounters(spell.exerciseName);

                return this.runAnimationForEntity('attack', player).then(() => {
                    return this.handleAbility(spell, player, targets);
                });
            }

            if (success) {
                return this.getPlayerTarget(spell).then((targets) => {
                    return castSpell(targets);
                });
            } else {
                var player = EntityStore.getPlayer();
                return this.runAnimationForEntity('fizzle', player).then(() => {
                    return this.fizzleSpell(spell);
                });
            }
        },

        advanceTurn: function() {
            _turnIndex += 1;
            combatLog("Turn advanced. ", this.getCurrentEntity(), "'s turn'");
            CombatStore._emitChange();
            this.takeTurn();
        },

        takeTurn: function() {
            var currentEntity = CombatStore.CombatEngine.getCurrentEntity();
            if (currentEntity.isPlayer()) {
                _state = CombatConstants.CombatEngineStates.AWAITING_PLAYER_TURN;
                combatLog("Players turn, waiting...");
                CombatStore._emitChange();
            } else {
                // Not the player, some ai monster.
                // Wait a short time then do the action.
                if (currentEntity.state === 'dead') {
                    this.advanceTurn();
                } else {
                    utils.wait(3000).then(() => {
                        var abilityToUse = this.chooseAbility(currentEntity);
                        var player = EntityStore.getPlayer();

                        if (abilityToUse.category === 'attack') {
                            this.runAnimationForEntity('attack', currentEntity)
                            .then(() => {
                                return this.handleAbility(
                                    abilityToUse, currentEntity, [player])
                            })
                            .then(() => {
                                return this.advanceTurn();
                            });
                        } else {
                            this.handleAbility(
                                abilityToUse, currentEntity, [player]);

                            this.advanceTurn();
                        }
                    });
                }
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
            _message = null;
            var player = EntityStore.getPlayer();
            player.heal();
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
        return _state === CombatConstants.CombatEngineStates.PLAYER_SELECTING_TARGET;
    },

    getCombatMessage: function() {
        return _message;
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
                spriteIds.push('current-turn-halo');

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
                utils.assert(_state == CombatConstants.CombatEngineStates.AWAITING_PLAYER_TURN, "Got a spell cast when we weren't waiting for one");
                utils.assert(CombatStore.CombatEngine.getCurrentEntity().isPlayer(), "Casting a spell when it isn't your turn!");

                var {spell, success} = action;
                _state = CombatConstants.CombatEngineStates.RUNNING;
                CombatStore._emitChange();
                CombatStore.CombatEngine.handlePlayerCast(spell, success).done(() => {
                    var livingEnemies = CombatStore.CombatEngine.getLivingEnemies();
                    if (_.isEmpty(livingEnemies)) {
                        _message = "You have KHANquered!";
                        CombatStore._emitChange();
                        utils.wait(5000).then(() => {
                            combatLog("No enemies left! player wins");
                            _message = null;

                            CombatStore._emitChange();
                            CombatActions.endCombat();
                        });
                    } else {
                        CombatStore.CombatEngine.advanceTurn();
                        // TODO(dmnd): display a waiting message instead, then display next problem
                        // at beginning of next turn
                    }
                    Actions.nextProblem();
                });
                break;

            case CombatConstants.PLAYER_CHOOSE_TARGET:
                utils.assert(_state == CombatConstants.CombatEngineStates.PLAYER_SELECTING_TARGET, "Got a target choice when we weren't waiting for one");
                var target = action.target;
                CombatStore.CombatEngine.resolvePlayerTargets([target]);
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
