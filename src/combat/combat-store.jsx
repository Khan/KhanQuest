var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("../flux/app-dispatcher.js");

var CombatConstants = require("./combat-constants.js");

var CHANGE_EVENT = "change";

var CombatEngineStates = {
    AWAITING_PLAYER_INPUT: "AWAITING_PLAYER",
    RUNNING: "RUNNING_TURN"
};

var _entities = {};
var _turnOrder = [];
var _turnIndex = 0;
var _state = CombatEngineStates.RUNNING;

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

        handleAbility: function(ability, source, target) {
            combatLog("Ability use: ", ability);

            // Simple stuff. Just use the power as damage to the target.
            var damage = ability.power || 0;
            this.damageEntity(target, damage);
            combatstore._emitChange();
        },

        fizzleSpell: function(spell) {
            combatLog("Fizzled spell: ", spell);
        },

        playerCast: function(spell, success, target) {
            if (success) {
                this.handleAbility(spell, EntityStore.getPlayer(), target);
            } else {
                // show the fizzle animation
                this.fizzleSpell(spell);
            }

            _state = CombatEngineStates.RUNNING;
            _turnIndex += 1;
            this.takeTurn();
        },

        takeTurn: function() {
            var currentEntity = CombatStore.CombatEngine.getCurrentEntity();
            if (currentEntity.isPlayer()) {
                _state = CombatEngineStates.AWAITING_PLAYER_INPUT;
                combatLog("Players turn, waiting...");
            } else {
                // Not the player, some ai monster
                var abilityToUse = CombatStore._chooseAbility(currentEntity);
                var player = EntityStore.getPlayer();
                CombatStore._handleAbility(abilityToUse, currentEntity, player);

                // Advance the turn
                _turnIndex += 1;
            }

            if (_state === CombatEngineStates.RUNNING) {
                this.takeTurn();
            }
            CombatStore._emitChange();
        },

        getCurrentEntityId: function() {
            return _turnOrder[_turnIndex % _turnOrder.length];
        },

        getCurrentEntity: function() {
            return _entities[CombatStore.CombatEngine.getCurrentEntityId];
        },

        /**
        * Choose an ability from the entities abilities, using priority and
        * cooldowns
        */
        chooseAbility: function(entity) {
            return _.find(entity.abilities, () => true);
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

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;

        switch (action.actionType) {
            case CombatConstants.START_COMBAT:
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

                CombatStore.CombatEngine.startTurns();
                break;

            case CombatConstants.PLAYER_CAST_SPELL:
                var {spell, success, target} = action;
                CombatStore.CombatEngine.playerCast(spell, success, target);
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
