/**
 * A key-value store to hold the available spells and associated data.
 * Loads a JSON file and provides id-based access. As with monster-store,
 * this is not a flux datastore!
 */

var testJSON = JSON.stringify({
    "measuring-lengths-1": {
        displayName: "Fireball",
        caption: "Interesting caption!",
        category: "attack",
        description: "This is an epic spell, with tons of good powers, like damage.",
        type: "fire",
        targetType: "all",
        power: 20,
        cooldown: 3
    },

    "groups-of-tens": {
        displayName: "Magic Missile",
        caption: "(greensquadron)",
        category: "attack",
        description: "Included to appease Jack.",
        type: "arcane",
        targetType: "single",
        power: 20,
        cooldown: 3
    },

    "decomposing-fractions": {
        displayName: "Ice Armor",
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

