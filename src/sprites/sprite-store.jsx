var Sprite = require('./sprite.jsx').Sprite;

var testJSON = JSON.stringify([
    {
        id: 'default',
        url: 'resources/default.png',
        pos: [0, 0],
        size: [128, 128],
        speed: 1,
        once: false,
        frameIndices: [0],
        dir: 'horizontal',
        once: false
    },
    {
        id: 'red-mage-die',
        url: 'resources/redmagedie.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0, 1, 2, 3],
        dir: 'horizontal',
        once: true
    }
]);

var _spriteDict = {};

var load = function(json) {
    var rawSpriteObjects = JSON.parse(json);
    rawSpriteObjects.forEach((spriteObject) =>
        _spriteDict[spriteObject.id] = spriteObject);
};

load(testJSON);

var SpriteStore = {
    getById: function(spriteId) {
        return new Sprite(_spriteDict[spriteId]);
    },

    debug: _spriteDict
};

module.exports = SpriteStore;
