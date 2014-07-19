var assert = function(cond, msg) {
    if (!cond) {
        throw `assert failed: $msg`;
    }
};

module.exports = {assert}
