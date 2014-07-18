var allSpells = require("../data/spells.json");
var _ = require("underscore");

var SpellRepository = {
    "measuring-lengths-1": function () {
        console.log("Casting " + this.displayName);
    },
    "multiplying-fractions": function () {
        console.log("Casting " + this.displayName);
    }
};

function Spell (exerciseName) {
    this.exerciseName = exerciseName;
    _.extend(this, allSpells[exerciseName]);
    this.cast = SpellRepository[exerciseName].bind(this);
}

module.exports = Spell;
