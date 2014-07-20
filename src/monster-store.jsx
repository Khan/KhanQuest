/**
 * A key-value store to hold the monster stats. Loads a json file full of them
 * and provides id-based access. This is not a flux datastore.
 */

var testJSON = JSON.stringify([
    {
        id: "forest_troll",
        sprites: {
            idle: "troll-whelp-idle",
            attack: "troll-whelp-attack",
            damaged: "troll-whelp-damaged",
            dead: "default"
        },
        hp: 100,
        fire_resist: 0,
        frost_resist: 0,
        arcane_resist: 0,
        magic_resist: 0,
        armor: 15,
        physical: 42,
        abilities: [
            {
                id: "club",
                animation: {self: "", target: ""},
                category: "attack",
                type: "physical",
                priority: 1,
                power: 10,
                cooldown: 0
            },
            {
                id: "massive_smash",
                animation: {self: "", target: ""},
                category: "attack",
                type: "physical",
                power: 20,
                priority: 0,
                cooldown: 3
            },
            {
                id: "regenerate",
                animation: {self: "", target: ""},
                category: "buff",
                type: "magical_heal",
                power: 10,
                priority: 0,
                cooldown: 4
            }
        ]
    },
    {
        id: "direwolf",
        sprites: {
            idle: "direwolf-idle",
            attack: "default",
            dead: "default"
        },
        hp: 50,
        fire_resist: 10,
        frost_resist: 50,
        arcane_resist: 0,
        magic_resist: 0,
        armor: 20,
        physical: 42,
        abilities: [
            {
                id: "bite",
                animation: {self: "", target: ""},
                category: "attack",
                type: "physical",
                priority: 1,
                power: 10,
                cooldown: 0
            }
        ]
    },
    {
        id: "spider",
        sprites: {
            idle: "spider-idle",
            attack: "spider-attack",
            damaged: "spider-die",
            dead: "spider-die"
        },
        hp: 50,
        fire_resist: 10,
        frost_resist: 50,
        arcane_resist: 0,
        magic_resist: 0,
        armor: 20,
        physical: 42,
        abilities: [
            {
                id: "poison",
                animation: {self: "", target: ""},
                category: "attack",
                type: "arcane",
                priority: 1,
                power: 10,
                cooldown: 0
            }
        ]
    }
]);

var _monsterDict = {};

var load = function(json) {
    var rawMonsterObjects = JSON.parse(json);
    rawMonsterObjects.forEach((monsterObject) =>
        _monsterDict[monsterObject.id] = monsterObject);
};

load(testJSON);

var MonsterStore = {
    getById: function(monsterId) {
        return _monsterDict[monsterId];
    },

    debug: _monsterDict
};

module.exports = MonsterStore;
