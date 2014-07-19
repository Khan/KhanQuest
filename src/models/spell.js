var allSpells = require("../data/spells.json");
var _ = require("underscore");

/* Grab data from spell.json datastore. */
function Spell (exerciseName) {
    this.exerciseName = exerciseName;
    _.extend(this, allSpells[exerciseName]);
}

module.exports = Spell;
