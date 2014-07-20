/**
 * A key-value store to hold the available spells and associated data.
 * Loads a JSON file and provides id-based access. As with monster-store,
 * this is not a flux datastore!
 */

var testJSON = JSON.stringify({
    /* Fire spells. */
    "area_of_triangles_1": {
        displayName: "Fire Bolt",
        category: "attack",
        description: "Flame. A force as old as time, rendered into a tool of man, and a friend to the novice spellcaster.",
        type: "fire",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "area-of-triangles-2": {
        displayName: "Fireball",
        category: "attack",
        description: "Hurl a ball of molten flame (i.e., a fireball) at your enemy.",
        type: "fire",
        targetType: "all",
        power: 100,
        cooldown: 3
    },

    "composing-and-decomposing-shapes": {
        displayName: "Fire Shield",
        category: "buff",
        description: "Encase yourself in a whirlwind of flame, dealing damage to your opponents and protecting you from harm.",
        type: "fire",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    /* Frost spells. */
    "identifying-parts-of-expressions": {
        displayName: "Ice Armor",
        category: "buff",
        description: "Surround yourself in a hulking shell of icy permafrost.",
        type: "frost",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "manipulating-linear-expressions-with-rational-coefficients": {
        displayName: "Ice Lance",
        category: "attack",
        description: "'Water defies the rules of chemistry and law of physics.' -- Bill Bryson",
        type: "frost",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "interpreting-expressions": {
        displayName: "Blizzard",
        category: "attack",
        description: "This is an epic spell, with tons of good powers, like damage.",
        type: "frost",
        targetType: "all",
        power: 20,
        cooldown: 3
    },

    /* Arcane spells. */
    "making-totals-in-different-ways-within-10": {
        displayName: "Magic Missile",
        category: "attack",
        description: "Harness the powers of wizardry and mathematics to fire a compact energy missile at your opponent.",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "meaning-of-equal-sign-1": {
        displayName: "Charged Bolt",
        category: "attack",
        description: "Energy incarnate.",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "solving-basic-multiplication-and-division-equations": {
        displayName: "Heal",
        category: "attack",
        description: "Restore your health points.",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "comparing-with-multiplication": {
        displayName: "Life Steal",
        category: "attack",
        description: "'Alas, poor Yorick! I knew him, Horatio; a fellow of infinite jest, of most excellent fancy.'",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "arithmetic_word_problems": {
        displayName: "Time Stop",
        category: "buff",
        description: "They say 'Time is money'. Luckily for you, magic is more powerful than money. Stop time and take two turns instead of one on successful cast.",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    }
});

var _spellDict = {};

var load = function(json) {
    _spellDict = JSON.parse(json);
};

load(testJSON);

var SpellStore = {
    getById: function(spellId) {
        return _spellDict[spellId];
    },

    debug: _spellDict
};

module.exports = SpellStore;

