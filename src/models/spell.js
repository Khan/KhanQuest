var allSpells = require("../data/spells.json");
var _ = require("underscore");

/* Spell casting. Defaults to logging that you've casted it! */
var allSpellNames = _.keys(allSpells);
var defaultSpell = function (spellName) {
    return function () {
        console.log("Casting " + spellName);
    };
};
var defaultCasts = _.object(allSpellNames, _.map(allSpellNames, defaultSpell));
var SpellRepository = {
    "measuring-lengths-1": function () {
        console.log("Custom cast of " + this.displayName);
    }
};
_.defaults(SpellRepository, defaultCasts);

/* Grab data from spell.json datastore. */
function Spell (exerciseName) {
    this.exerciseName = exerciseName;
    _.extend(this, allSpells[exerciseName]);
    console.log(exerciseName);
    this.cast = SpellRepository[exerciseName].bind(this);
}

module.exports = Spell;
