var Promise = require('bluebird');

var assert = function(cond, msg) {
    if (!cond) {
        throw `assert failed: ${msg}`;
    }
};

var wait = function(ms) {
    return new Promise((resolve, reject) => {
        window.setTimeout(resolve.bind(null, ms), ms);
    });
};

module.exports = {assert, wait};
