/**
 * A key-value store to hold the available spells and associated data.
 * Loads a JSON file and provides id-based access. As with monster-store,
 * this is not a flux datastore!
 */

var testJSON = JSON.stringify({
    /* Fire spells. */
    "area-of-triangles": {
        displayName: "Fire Bolt",
        caption: "(starmap)",
        category: "buff",
        description: "What what what what what what what what what what what what what what what what what what what what.",
        type: "fire",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "area-of-triangles-2": {
        displayName: "Fireball",
        caption: "(starmap)",
        category: "buff",
        description: "What what what what what what what what what what what what what what what what what what what what.",
        type: "fire",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "composing-and-decomposing-shapes": {
        displayName: "Fire Shield",
        caption: "(starmap)",
        category: "buff",
        description: "What what what what what what what what what what what what what what what what what what what what.",
        type: "fire",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    /* Frost spells. */
    "identifying-parts-of-expressions": {
        displayName: "Ice Armor",
        caption: "(starmap)",
        category: "buff",
        description: "What what what what what what what what what what what what what what what what what what what what.",
        type: "frost",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "manipulating-linear-expressions-with-rational-coefficients": {
        displayName: "Ice Lance",
        caption: "(starmap)",
        category: "buff",
        description: "What what what what what what what what what what what what what what what what what what what what.",
        type: "frost",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "interpreting-expressions": {
        displayName: "Blizzard",
        caption: "Interesting caption!",
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
        caption: "(starmap)",
        category: "buff",
        description: "What what what what what what what what what what what what what what what what what what what what.",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "meaning-of-equal-sign-1": {
        displayName: "Charged Bolt",
        caption: "(greensquadron)",
        category: "attack",
        description: "Included to appease Jack.",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "solving-basic-multiplication-and-division-equations": {
        displayName: "Heal",
        caption: "(starmap)",
        category: "buff",
        description: "What what what what what what what what what what what what what what what what what what what what.",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "comparing-with-multiplication": {
        displayName: "Life Steal",
        caption: "(starmap)",
        category: "buff",
        description: "What what what what what what what what what what what what what what what what what what what what.",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "arithmetic_word_problems": {
        displayName: "Time Stop",
        caption: "(starmap)",
        category: "buff",
        description: "What what what what what what what what what what what what what what what what what what what what.",
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

