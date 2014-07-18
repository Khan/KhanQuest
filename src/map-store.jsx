var { constants } = require("./actions.jsx");
var { FETCH_MAP_DATA } = constants;

// metadata about the map
var _manifest = null;

// the tiles are located in a few images
var _tileImages = [];

var _currentLocation = {x: 10, y: 10};

var _bounds = {};

var clamp = function(n, min, max) {
    return Math.max(min, Math.min(n, max));
};

var updateBounds = function() {
    // TODO smart constraints
    var x = clamp(_currentLocation.x - 10, 0, 500);
    var y = clamp(_currentLocation.y - 10, 0, 500);

    _currentLocation = { x, y };
}

var dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action) {
        case FETCH_MAP_DATA:
            $.getJSON("/art/test.json").done(obj => {
                _manifest = obj;
                _(obj.tilesets)
                    .each(set => {
                        // var img = document.createElement("img");
                        var img = new Image();
                        img.src = `/art/${src.image}`;
                        _tileImages.push(img);
                    });
            });

        case MOVE:
            // TODO constrain movement!
            _currentLocation = action.location;
            updateBounds();

        default:
            return true;

        MapStore.emitChange();
    }
});

var MapStore = _({}).extend(
    Backbone.Events,
    {
        getLayers: function() {
            return _(_manifest.tilesets)
                .map((layer, i) => {
                    return {
                        layer,
                        image: _tileImages[i]
                    };
                });
        },

        getBounds: function() {
            return _currentLocation;
        }
    }
);

module.exports = ExerciseStore;
