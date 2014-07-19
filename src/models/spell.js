var SpellStore = require("../spell-store.jsx");
var _ = require("underscore");

/* Grab data from spell.json datastore. */
function Spell (exerciseName) {
    this.exerciseName = exerciseName;
    _.extend(this, SpellStore.getById(exerciseName));
}

module.exports = Spell;
