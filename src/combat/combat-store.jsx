var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("../flux/app-dispatcher.js");

var CombatConstants = require("./combat-constants.js");

var CHANGE_EVENT = "change";

var _entities = {};
var _turnOrder = [];
var _turnIndex = 0;
var _state = "ATTACK"; // TODO: Replace this with however we manage whether or
                       // not the user is attacking
var _currentAbility = null;

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

                CombatStore._startTurns();
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

    _startTurns: function() {
        window.setInterval(() => CombatStore._takeTurn(), 500);
    },

    _damageEntity: function(entity, damage) {
        combatLog(`Damage! ${damage} points of damage to `, entity);
        entity.damage(damage);
    },

    _handleAbility: function(ability, source, target) {
        combatLog("Ability use: ", ability);

        // Simple stuff. Just use the power as damage to the target.
        var damage = ability.power || 0;
        CombatStore._damageEntity(target, damage);
        CombatStore._emitChange();
    },

    _takeTurn: function() {
        // horrible type coercion
        var currentEntityIndex = CombatStore._entityIdOwningCurrentTurn();
        var currentEntity = _entities[currentEntityIndex];
        if (currentEntityIndex != 0) {
            // Not the player, some ai monster
            var abilityToUse = CombatStore._chooseAbility(currentEntity);
            var player = EntityStore.getPlayer();
            CombatStore._handleAbility(abilityToUse, currentEntity, player);
        } else {
            combatLog("PLAYER'S TURN! NOOPING");
        }

        // Advance the turn
        _turnIndex += 1;

        CombatStore._emitChange();
    },

    _entityIdOwningCurrentTurn: function() {
        return _turnOrder[_turnIndex % _turnOrder.length];
    },

    /**
     * Choose an ability from the entities abilities, using priority and
     * cooldowns
     */
    _chooseAbility: function(entity) {
        return _.find(entity.abilities, () => true);
    }
});

module.exports = CombatStore;
