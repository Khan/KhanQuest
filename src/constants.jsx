var MAP_WIDTH_BLOCKS = 30;
var MAP_HEIGHT_BLOCKS = 18;
var BLOCK = 32;

module.exports = {
    BOSS: 1,
    WALL: 2,
    OBJECT: 5,
    DOOR: 4,
    START: 3,
    GRASS: "GRASS", // TODO grass is where you can be attacked?
    EMPTY: 0,

    MAP_WIDTH_BLOCKS,
    MAP_HEIGHT_BLOCKS,
    MAP_WIDTH_PX: MAP_WIDTH_BLOCKS * BLOCK,
    MAP_HEIGHT_PX: MAP_HEIGHT_BLOCKS * BLOCK,

    BLOCK
};
