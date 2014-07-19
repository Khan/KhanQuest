var AppDispatcher = require("../flux/app-dispatcher.js");
var CombatConstants = require("./combat-constants.js");

var CombatActions = {
    startCombat: function(monsterEntityIds) {
        AppDispatcher.handleViewAction({
            actionType: CombatConstants.START_COMBAT,
            monsterIds: monsterEntityIds
        });
    },

    useAbility: function(ability, sourceId, targetId) {
        AppDispatcher.handleViewAction({
            actionType: CombatConstants.USE_ABILITY,
            ability: ability,
            sourceId: sourceId,
            targetId: targetId
        });
    },

    castSpell: function(spell, success, target) {
        AppDispatcher.handleViewAction({
            actionType: CombatConstants.PLAYER_CAST_SPELL,
            spell: spell,
            success: success,
            target: target
        });
    }
};

module.exports = CombatActions;
