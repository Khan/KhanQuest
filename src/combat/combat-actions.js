var AppDispatcher = require("../flux/app-dispatcher.js");
var CombatConstants = require("./combat-constants.js");
var Spell = require("../models/spell.js");
var UserStore = require("../user-store.jsx");

var CombatActions = {
    startCombat: function(monsterEntityIds) {
        AppDispatcher.handleViewAction({
            actionType: CombatConstants.START_COMBAT,
            monsterIds: monsterEntityIds
        });
    },

    endCombat: function() {
        AppDispatcher.handleViewAction({
            actionType: CombatConstants.END_COMBAT,
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

    castSpell: function(spell, success) {
        AppDispatcher.handleViewAction({
            actionType: CombatConstants.PLAYER_CAST_SPELL,
            spell: spell,
            success: success
        });
    },

    successfulAttack: function() {
        // casts spell so that enemies take damage etc
        var exerciseName = UserStore.getUser().activeExercise;
        var spell = new Spell(exerciseName);
        CombatActions.castSpell(spell, true);
    },

    failedAttack: function() {
        // fizzles spell
        var exerciseName = UserStore.getUser().activeExercise;
        var spell = new Spell(exerciseName);
        CombatActions.castSpell(spell, false);
    },

    chooseTarget: function(targetEntity) {
        AppDispatcher.handleViewAction({
            actionType: CombatConstants.PLAYER_CHOOSE_TARGET,
            target: targetEntity
        });
    }
};

module.exports = CombatActions;
