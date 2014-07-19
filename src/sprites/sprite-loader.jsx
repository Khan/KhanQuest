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
    },
    {
        id: 'red-mage-idle',
        url: 'resources/red-mage.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
        dir: 'horizontal',
        once: false,
        scale: 2
    },
    {
        id: 'red-mage-attack-staff',
        url: 'resources/red-mage.png',
        pos: [144, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0, 1, 0],
        dir: 'horizontal',
        once: false,
        scale: 2
    },
    {
        id: 'red-mage-attack-magic',
        url: 'resources/red-mage.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0, 1, 0],
        dir: 'horizontal',
        once: true,
        scale: 2
    },
    {
        id: 'red-mage-damaged',
        url: 'resources/red-mage.png',
        pos: [296, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0],
        dir: 'horizontal',
        once: true,
        scale: 2
    },
    {
        id: 'red-mage-die-female',
        url: 'resources/red-mage-female.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [5, 6, 7, 8],
        dir: 'horizontal',
        once: true,
        scale: 2
    },
    {
        id: 'red-mage-idle-female',
        url: 'resources/red-mage-female.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0, 4, 4, 4, 4, 0, 0, 0, 0, 0],
        dir: 'horizontal',
        once: false,
        scale: 2
    },
    {
        id: 'red-mage-attack-staff-female',
        url: 'resources/red-mage-female.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [1, 2, 3, 2, 3],
        dir: 'horizontal',
        once: false,
        scale: 2
    },
    {
        id: 'red-mage-attack-magic-female',
        url: 'resources/red-mage-female.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [1, 2, 3, 3],
        dir: 'horizontal',
        once: true,
        scale: 2
    },
    {
        id: 'red-mage-damaged-female',
        url: 'resources/red-mage-female.png',
        pos: [296, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0],
        dir: 'horizontal',
        once: true,
        scale: 2
    },
    {
        id: 'troll-whelp-idle',
        url: 'resources/troll-whelp.png',
        pos: [360, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2 , 1],
        dir: 'horizontal',
        once: false,
        scale: 2
    },
    {
        id: 'troll-whelp-attack',
        url: 'resources/troll-whelp.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [0, 1, 2],
        dir: 'horizontal',
        once: true,
        scale: 2
    },
    {
        id: 'troll-whelp-damaged',
        url: 'resources/troll-whelp.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [3, 4, 3],
        dir: 'horizontal',
        once: true,
        scale: 2
    },
    {
        id: 'direwolf-idle',
        url: 'resources/direwolf.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [3, 4, 5, 6, 5, 4],
        dir: 'horizontal',
        once: false,
        scale: 2
    },
    {
        id: 'spider-idle',
        url: 'resources/spider.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [1, 2, 3, 4],
        dir: 'horizontal',
        once: false,
        scale: 2
    },
    {
        id: 'spider-attack',
        url: 'resources/spider.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [5, 6, 7, 8, 9],
        dir: 'horizontal',
        once: false,
        scale: 2
    },
    {
        id: 'spider-die',
        url: 'resources/spider.png',
        pos: [0, 0],
        size: [72, 72],
        speed: 0.005,
        frameIndices: [10, 11, 12, 13],
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

    // return the time it takes for the sprite to run once
    getSpriteTime: function(spriteId) {
        var spriteInfo = _spriteDict[spriteId];
        return spriteInfo.frameIndices.length / spriteInfo.speed;
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
