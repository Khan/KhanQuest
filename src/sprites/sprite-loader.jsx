var Sprite = require('./sprite.jsx').Sprite;
var Resources = require('./sprite.jsx').Resources;

var testJSON = JSON.stringify([
    {
        id: 'default',
        url: 'resources/default.png',
        pos: [0, 0],
        size: [128, 128],
        speed: 1,
        frameIndices: [0],
        dir: 'horizontal',
        once: false,
        scale: 1
    },
    {
        id: 'red-mage-die',
        url: 'resources/redmagedie.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0, 1, 2, 3],
        dir: 'horizontal',
        once: true,
        scale: 2
    }
]);

var _spriteDict = {};

var load = function(json) {
    var rawSpriteObjects = JSON.parse(json);
    rawSpriteObjects.forEach((spriteObject) =>
        _spriteDict[spriteObject.id] = spriteObject);
};

load(testJSON);

var SpriteLoader = {
    getNewSpriteById: function(spriteId) {
        return new Sprite(_spriteDict[spriteId]);
    },

    // returns a promise
    loadSprites: function(spriteIds) {
        var urls = spriteIds.map(
            (spriteId) => _spriteDict[spriteId].url);
        return Resources.loadAll(urls);
    },

    debug: _spriteDict
};

module.exports = SpriteLoader;
