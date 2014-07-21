(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["KAQuest"] = factory();
	else
		root["KAQuest"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	window.Game = __webpack_require__(1);
	window.Sprite = __webpack_require__(6).Sprite;
	window.SpriteRenderer = __webpack_require__(6).SpriteRenderer;
	window.Resources = __webpack_require__(6).Resources;
	window.Map = __webpack_require__(2);
	window.Actions = __webpack_require__(3).Actions;
	window.MonsterStore = __webpack_require__(4);
	window.EntityStore = __webpack_require__(5);
	window.CombatStore = __webpack_require__(8);
	window.CombatActions = __webpack_require__(9);
	window.CombatView = __webpack_require__(10);
	window.ParticleCloudRenderer = __webpack_require__(7).ParticleCloudRenderer;

	window.MapShell = React.createClass({displayName: 'MapShell',
	    render: function() {
	        return React.DOM.div({className: "map-shell"}, 
	            React.DOM.button({onClick: function()  {return Actions.setCurrentMap("desert");}, 
	                    type: "button"}, 
	                "desert"
	            ), 
	            React.DOM.button({onClick: function()  {return Actions.setCurrentMap("cave");}, 
	                    type: "button"}, 
	                "cave"
	            ), 
	            React.DOM.button({onClick: function()  {return Actions.setCurrentMap("salinterior");}, 
	                    type: "button"}, 
	                "salinterior"
	            ), 
	            React.DOM.button({onClick: function()  {return Actions.setCurrentMap("fortress");}, 
	                    type: "button"}, 
	                "fortress"
	            ), 
	            React.DOM.button({onClick: function()  {return Actions.setCurrentMap("darkforest");}, 
	                    type: "button"}, 
	                "darkforest"
	            ), 
	            React.DOM.button({onClick: function()  {return Actions.setCurrentMap("cottage");}, 
	                    type: "button"}, 
	                "cottage"
	            ), 

	            Map(null)
	        );
	    }
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
	var $__0=     __webpack_require__(3),Actions=$__0.Actions,GameViews=$__0.GameViews;
	var Spellbook = __webpack_require__(11);
	var Dialog = __webpack_require__(12);
	var SpellSplash = __webpack_require__(13);
	var CombatScreen = __webpack_require__(14);
	var Map = __webpack_require__(2);

	var Changeable = __webpack_require__(28);
	var PropCheckBox = __webpack_require__(15);

	var UserStore = __webpack_require__(16);
	var GameStore = __webpack_require__(17);
	var CombatStore = __webpack_require__(8);
	var StateFromStore = __webpack_require__(27);
	var CombatActions = __webpack_require__(9);
	var CombatConstants = __webpack_require__(18);

	var Game = React.createClass({displayName: 'Game',
	    mixins: [
	        StateFromStore({
	            user: {
	                store: UserStore,
	                fetch: function(store)  {return store.getUser();}
	            },
	            currentView: {
	                store: GameStore,
	                fetch: function(store)  {return store.getCurrentView();}
	            },
	            inCombat: {
	                store: GameStore,
	                fetch: function(store)  {return store.getInCombat();}
	            },
	            combatState: {
	                store: CombatStore,
	                fetch: function(store)  {return store.getState();}
	            },
	            dialog: {
	                store: GameStore,
	                fetch: function(store)  {
	                    return store.getDialog();
	                }
	            },
	            spellSplash: {
	                store: GameStore,
	                fetch: function(store)  {
	                    return store.getSpellSplash();
	                }
	            }
	        })
	    ],

	    getDefaultProps: function() {
	        return {
	            showSpellbook: true,
	            showCombat: false,
	        };
	    },

	    startCombat: function() {
	        // A few arcane spells...
	        Actions.addSpell("making-totals-in-different-ways-within-10");
	        Actions.addSpell("meaning-of-equal-sign-1");
	        Actions.addSpell("comparing-with-multiplication");

	        // A few fire spells...
	        Actions.addSpell("area_of_triangles_1");
	        Actions.addSpell("area-of-triangles-2");
	        Actions.addSpell("composing-and-decomposing-shapes");

	        // A few frost spells...
	        Actions.addSpell("identifying-parts-of-expressions");
	        Actions.addSpell("manipulating-linear-expressions-with-rational-coefficients");

	        var forestTrollStats = MonsterStore.getById("forest_troll");
	        var monsters = ["direwolf", "spider", "forest_troll"].map(
	            function(id)  {return MonsterStore.getById(id);}).map(
	                function(stats)  {return EntityStore.createEntity(stats);});
	        CombatActions.startCombat(monsters);
	    },

	    showDialog: function() {
	        Actions.showDialog("intro");
	    },

	    endCombat: function() {
	        CombatActions.endCombat();
	    },

	    render: function () {
	        var currentView;
	        if (this.state.currentView === GameViews.MAP) {
	            currentView = window.Map(null);
	        } else if (this.state.currentView === GameViews.COMBAT) {
	            currentView = this._renderCombat();
	        } else if (this.state.currentView === GameViews.SPELLBOOK) {
	            currentView = this._renderSpellbook();
	        }

	        return React.DOM.div(null, 
	            React.DOM.div({className: "debug-bar"}, 
	                React.DOM.button({disabled: this.state.currentView === GameViews.MAP, 
	                        onClick: this.endCombat}, 
	                    "Show Map"
	                ), 
	                React.DOM.button({disabled: this.state.inCombat, onClick: this.startCombat}, 
	                    "Start Combat"
	                ), 
	                React.DOM.button({onClick: this.showDialog}, 
	                    "Show Dialog"
	                ), 
	                React.DOM.button({className: "correct", 
	                        disabled: this.state.combatState !==
	                            CombatConstants.CombatEngineStates.AWAITING_PLAYER_TURN, 
	                        onClick: CombatActions.successfulAttack}, 
	                    "Correct"
	                ), 
	                React.DOM.button({className: "wrong", 
	                        disabled: this.state.combatState !==
	                            CombatConstants.CombatEngineStates.AWAITING_PLAYER_TURN, 
	                        onClick: CombatActions.failedAttack}, 
	                    "Wrong"
	                )
	            ), 
	            React.DOM.div({className: "row"}, 
	                ReactCSSTransitionGroup({transitionName: "screen"}, 
	                    currentView
	                )
	            ), 
	            this.state.spellSplash && SpellSplash({
	                    exerciseName: this.state.spellSplash.exerciseName, 
	                    description: this.state.spellSplash.description, 
	                    videoURL: this.state.spellSplash.videoURL, 
	                    onClick: Actions.hideSpellSplash}), 
	            this.state.dialog && Dialog({scene: this.state.dialog})
	        );
	    },

	    _renderCombat: function() {
	        var activeExercise = this.state.user.activeExercise;
	        var problemIndex = this.state.user.problemIndex;

	        var className = React.addons.classSet({
	            combat: true,
	            invisible: this.state.combatState !== CombatConstants.CombatEngineStates.AWAITING_PLAYER_TURN
	        });
	        return React.DOM.div({key: "combat", className: "row-item"}, 
	            React.DOM.div({className: "fight-graphics"}, 
	                CombatView(null)
	            ), 
	            React.DOM.div({className: className}, 
	                CombatScreen({exerciseName: activeExercise, 
	                              problemIndex: problemIndex})
	            )
	        );
	    },

	    _renderSpellbook: function() {
	        var exerciseNames = this.state.user.unlockedExercises;
	        var onChooseSpell = function(exerciseName) {
	            Actions.setActiveSpell(exerciseName);
	            Actions.closeSpellbook();
	        };

	        return React.DOM.div({key: "spellbook", className: "row-item"}, 
	            Spellbook({
	                exerciseNames: exerciseNames, 
	                onClick: onChooseSpell})
	        );
	    }
	});

	var StatefulGame = React.createClass({displayName: 'StatefulGame',
	    getInitialState: function() {
	        return {
	            onChange: this.setState.bind(this)
	        };
	    },

	    render: function() {
	        return Game(this.state);
	    }
	});

	module.exports = StatefulGame;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	// mostly copied from
	// * https://gist.github.com/shaneriley/4078905
	// * http://hashrocket.com/blog/posts/using-tiled-and-canvas-to-render-game-screens

	var React = __webpack_require__(31);
	var _ = __webpack_require__(32);
	var Shortcut = __webpack_require__(19);
	var Weather = __webpack_require__(20);

	var $__0=    __webpack_require__(3),Actions=$__0.Actions;
	var $__1=      __webpack_require__(21),MAP_WIDTH_PX=$__1.MAP_WIDTH_PX,MAP_HEIGHT_PX=$__1.MAP_HEIGHT_PX,BLOCK=$__1.BLOCK;

	var GameStore = __webpack_require__(17);
	var MapStore = __webpack_require__(22);
	var EntityStore = __webpack_require__(5);
	var SpriteLoader = __webpack_require__(23);
	var $__2=    __webpack_require__(6),SpriteRenderer=$__2.SpriteRenderer;

	var StateFromStore = __webpack_require__(27);

	var Avatar = new Image();
	Avatar.src = "static/img/red-mage+female.png";

	var walkDuration = 100;

	// given the player's x, y coordinates and the dimensions of the map, return
	// the { x: [0..940], y: [0..720] } coordinates of the player on the screen
	var characterPosOnScreen = function($__0   , $__1   ) {var x=$__0.x,y=$__0.y,width=$__1.width,height=$__1.height;
	    // if we're within 50 px of the edge move away from the center
	    var finalX;
	    if (x < 50) {
	        finalX = x;
	    } else if (x > width - 50) {
	        finalX = width - x;
	    } else {
	        finalX = 50;
	    }

	    var finalY;
	    if (y < 50) {
	        finalY = y;
	    } else if (y > width - 50) {
	        finalY = width - y;
	    } else {
	        finalY = 50;
	    }

	    return { x: finalX, y: finalY };
	};

	var Map = React.createClass({displayName: 'Map',
	    propTypes: {
	    },

	    mixins: [
	        StateFromStore({
	            currentMap: {
	                store: MapStore,
	                fetch: function(store)  {return store.getCurrentMap();}
	            },
	            currentWeather: {
	                store: MapStore,
	                fetch: function(store)  {return store.getCurrentWeather();}
	            },
	            mapTilesLoadedCount: {
	                store: MapStore,
	                fetch: function(store)  {return store.getTilesLoadedCount();}
	            },
	            isLoading: {
	                // TODO: put this in the map store too?
	                store: MapStore,
	                fetch: function(store)  {return store.getIsLoading();}
	            },
	            location: {
	                store: GameStore,
	                fetch: function(store)  {return store.getLocation();}
	            },
	            direction: {
	                store: GameStore,
	                fetch: function(store)  {return store.getDirection();}
	            },
	            lastLeftRight: {
	                store: GameStore,
	                fetch: function(store)  {return store.getLastLeftRight();}
	            }
	        })
	    ],

	    getInitialState: function() {
	        return {
	            images: [],
	        };
	    },

	    componentWillMount: function() {
	        if (!this.state.isLoading) {
	            this.loadSprites();
	        }
	    },

	    componentWillUpdate: function(nextProps, nextState) {
	        if (this.state.isLoading && !nextState.isLoading) {
	            this.loadSprites();
	        }
	    },

	    loadSprites: function() {
	        var playerSpriteIds = EntityStore.getPlayer().sprites;
	        this.playerSprites = {
	            UP: SpriteLoader.getNewSpriteById(playerSpriteIds.up),
	            DOWN: SpriteLoader.getNewSpriteById(playerSpriteIds.down),
	            LEFT: SpriteLoader.getNewSpriteById(playerSpriteIds.left),
	            RIGHT: SpriteLoader.getNewSpriteById(playerSpriteIds.right),
	        };
	        this.playerWalkSprites = {
	            UP: SpriteLoader.getNewSpriteById(playerSpriteIds.walkup),
	            DOWN: SpriteLoader.getNewSpriteById(playerSpriteIds.walkdown),
	            LEFT: SpriteLoader.getNewSpriteById(playerSpriteIds.walkleft),
	            RIGHT: SpriteLoader.getNewSpriteById(playerSpriteIds.walkright),
	        };
	    },

	    shouldComponentUpdate: function(nextProps, nextState) {
	        if (!this.context) {
	            return true;
	        }
	        var stateChanged = !_.isEqual(this.state, nextState);
	        var propsChanged = !_.isEqual(this.props, nextProps);
	        return propsChanged || stateChanged;
	    },

	    moveFunction: _.throttle(function(dir)  {
	        Actions.move(dir);
	    }, walkDuration),

	    render: function() {

	        var up = {
	            handler: function(e)  { this.moveFunction("UP"); e.preventDefault(); }.bind(this),
	            description: ""
	        };

	        var left = {
	            handler: function(e)  { this.moveFunction("LEFT"); e.preventDefault(); }.bind(this),
	            description: ""
	        };

	        var down = {
	            handler: function(e)  { this.moveFunction("DOWN"); e.preventDefault(); }.bind(this),
	            description: ""
	        };

	        var right = {
	            handler: function(e)  { this.moveFunction("RIGHT"); e.preventDefault(); }.bind(this),
	            description: ""
	        };

	        var actions = {
	            // qwerty keybinds
	            "w": up,
	            "a": left,
	            "s": down,
	            "d": right,

	            // colemak binds too
	            "f": up,
	            "r": left,
	            // "s": down,  // same as qwerty
	            "t": right,

	            up:up,
	            down:down,
	            left:left,
	            right:right
	        };

	        var mapStyle = {
	            position: "relative",
	            width: MAP_WIDTH_PX,
	            height: MAP_HEIGHT_PX
	        };
	        var absolute = {
	            position: "absolute"
	        };
	        var above = _.extend({ zIndex: 2 }, absolute);
	        return React.DOM.div({style: mapStyle}, 
	            Shortcut({actions: actions}), 
	            this.state.currentWeather &&
	                Weather.WeatherRenderer({
	                    width: MAP_WIDTH_PX, 
	                    height: MAP_HEIGHT_PX, 
	                    style: above, 
	                    type: this.state.currentWeather}), 
	            React.DOM.canvas({ref: "canvas", width: MAP_WIDTH_PX, height: MAP_HEIGHT_PX, style: absolute}), 
	            this.renderPlayer(), ";"
	        );
	    },

	    showMap: function() {
	        if (!this.mapcontext) {
	            return;
	        }

	        var canvas = this.refs.canvas.getDOMNode();
	        this.context = canvas.getContext('2d');

	        var $__0=     MapStore.getMapOffset(),x=$__0.x,y=$__0.y;
	        this.context.clearRect(0, 0, MAP_WIDTH_PX, MAP_HEIGHT_PX);
	        this.context.drawImage(
	            this.mapcanvas,

	            // position and dimensions to sample from
	            x, y,
	            MAP_WIDTH_PX, MAP_HEIGHT_PX,

	            // position and dimensions to render to
	            0, 0,
	            MAP_WIDTH_PX, MAP_HEIGHT_PX
	        );
	    },

	    // render this map to mapcanvas / mapcontext
	    // double buffering!
	    renderNewMap: function() {
	        var manifest = MapStore.getManifest();

	        // no manifest yet, just bail
	        if (!manifest) {
	            return;
	        }

	        var layers = MapStore.getLayers();

	        this.mapcanvas = document.createElement("canvas");
	        this.mapcanvas.width = manifest.width * BLOCK;
	        this.mapcanvas.height = manifest.height * BLOCK;
	        this.mapcontext = this.mapcanvas.getContext('2d');

	        // layers are stored bottom to top, so we can render in order
	        var renderableLayers = _(layers)
	            .filter(function(layer)  {return layer.layer.name !== "interaction layer";});

	        _(renderableLayers).each(this.renderLayer);
	    },

	    renderPlayer: function() {
	        if (this.state.isLoading) {
	            console.log("still loading...");
	            return null;
	        }
	        var size = 32;
	        var location = this.state.location;
	        var x = location.x * size - 8;
	        var y = location.y * size - 32;
	        var direction = this.state.direction;
	        var sprite = this.state.walking ? this.playerWalkSprites[direction] :
	            this.playerSprites[direction];


	        // TODO(michelle): There's probably a way to make this less hacky!
	        var self = this;
	        if (this.state.lastx != x || this.state.lasty != y)
	        {
	            this.state.lastx = x;
	            this.state.lasty = y;
	            this.state.walking = true;
	            if (this.state.doneWalking)
	                clearTimeout(this.state.doneWalking);

	            this.state.doneWalking = setTimeout(function () {
	                self.state.walking = false;
	                if (self.isMounted()) {
	                    self.forceUpdate();
	                }
	            }, walkDuration * 2);
	        }

	        var flip = (this.state.lastLeftRight === "LEFT") !== !!sprite.options.flip;
	        return SpriteRenderer({
	            sprite: sprite, 
	            flipX: flip, 
	            style: {
	                position: 'absolute',
	                top: y,
	                left: x,
	                transition: ("top " + walkDuration + "ms linear, left " + walkDuration + "ms linear")
	            }, 
	            key: "player"});
	    },

	    renderLayer: function($__0    ) {var layer=$__0.layer,scene=$__0.scene,images=$__0.images;
	        // data: [array of tiles, 1-based, position of sprite from top-left]
	        // height: integer, height in number of sprites
	        // name: "string", internal name of layer
	        // opacity: integer
	        // type: "string", layer type (tile, object)
	        // visible: boolean
	        // width: integer, width in number of sprites
	        // x: integer, starting x position
	        // y: integer, starting y position

	        var size = scene.tilewidth;

	        layer.data.forEach(function(tile_idx, i)  {
	            if (!tile_idx) {
	                return;
	            }

	            // Find the tileset we need to draw - the first with "firstgid"
	            // less than the index we're looking for.
	            var bestIx = 0, bestValue = 0;
	            _(scene.tilesets).map(function(tileset, i)  {
	                if (tileset.firstgid <= tile_idx && tileset.firstgid > bestValue) {
	                    bestIx = i;
	                    bestValue = tileset.firstgid;
	                }
	            });

	            var tilesetIx = bestIx;

	            var tile = scene.tilesets[tilesetIx];
	            tile_idx -= tile.firstgid;

	            var img_x = (tile_idx % (tile.imagewidth / size)) * size;
	            var img_y = ~~(tile_idx / (tile.imagewidth / size)) * size;
	            var s_x = (i % layer.width) * size;
	            var s_y = ~~(i / layer.width) * size;

	            this.mapcontext.drawImage(images[tilesetIx], img_x, img_y, size, size,
	                s_x, s_y, size, size);
	      }.bind(this));
	    },

	    componentDidUpdate: function(newProps, newState) {
	        // draw an entirely new map
	        if (!this.mapcontext ||
	            newState.currentMap !== this.state.currentMap ||
	            newState.mapTilesLoadedCount !== this.state.mapTilesLoadedCount) {

	            this.renderNewMap();
	        }

	        this.showMap();
	    },

	    componentDidMount: function() {
	        this.renderNewMap();
	        this.showMap();
	    }
	});

	module.exports = Map;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(26);

	var GameViews = {
	    MAP: "MAP",
	    COMBAT: "COMBAT",
	    SPELLBOOK: "SPELLBOOK",
	    INVENTORY: "INVENTORY"
	};

	var constants = {
	    FETCH_MAP_DATA: "FETCH_MAP_DATA",
	    MOVE: "MOVE",
	    ADD_SPELL: "ADD_SPELL",
	    SET_ACTIVE_SPELL: "SET_ACTIVE_SPELL",
	    ADJUST_COUNTERS: "ADJUST_COUNTERS",
	    SHOW_DIALOG: "SHOW_DIALOG",
	    HIDE_DIALOG: "HIDE_DIALOG",
	    SHOW_SPELL_SPLASH: "SHOW_SPELL_SPLASH",
	    HIDE_SPELL_SPLASH: "HIDE_SPELL_SPLASH",
	    SET_MAP: "SET_MAP",
	    OPEN_SPELLBOOK: "OPEN_SPELLBOOK",
	    CLOSE_SPELLBOOK: "CLOSE_SPELLBOOK",
	    NEXT_PROBLEM: "NEXT_PROBLEM",
	    NEXT_MAP: "NEXT_MAP",
	    SET_LOCATION: "SET_LOCATION",
	    MAP_OBJECT_INTERACTION: "MAP_OBJECT_INTERACTION",
	    SET_WEATHER: "SET_WEATHER"
	};

	var Actions = {
	    fetchMapData: function() {
	        AppDispatcher.handleViewAction({
	            actionType: constants.FETCH_MAP_DATA
	        });
	    },

	    move: function(direction) {
	        AppDispatcher.handleViewAction({
	            actionType: constants.MOVE,
	            direction:direction
	        });
	    },

	    setLocation: function(location) {
	        AppDispatcher.handleViewAction({
	            actionType: constants.SET_LOCATION,
	            location:location
	        });
	    },

	    addSpell: function(exerciseName) {
	        AppDispatcher.handleViewAction({
	            actionType: constants.ADD_SPELL,
	            exerciseName: exerciseName
	        });
	    },

	    setActiveSpell: function(exerciseName) {
	        AppDispatcher.handleViewAction({
	            actionType: constants.SET_ACTIVE_SPELL,
	            exerciseName: exerciseName
	        });
	    },

	    adjustCounters: function(exerciseName) {
	        AppDispatcher.handleViewAction({
	            actionType: constants.ADJUST_COUNTERS,
	            exerciseName: exerciseName
	        });
	    },

	    showDialog: function(scene) {
	        AppDispatcher.handleViewAction({
	            actionType: constants.SHOW_DIALOG,
	            scene: scene
	        });
	    },

	    hideDialog: function() {
	        AppDispatcher.handleViewAction({
	            actionType: constants.HIDE_DIALOG
	        });
	    },

	    showSpellSplash: function(exerciseName, description, videoURL) {
	        AppDispatcher.handleViewAction({
	            actionType: constants.SHOW_SPELL_SPLASH,
	            exerciseName: exerciseName,
	            description: description,
	            videoURL: videoURL
	        });
	    },

	    hideSpellSplash: function() {
	        AppDispatcher.handleViewAction({
	            actionType: constants.HIDE_SPELL_SPLASH
	        });
	    },

	    setCurrentMap: function(name) {
	        AppDispatcher.handleViewAction({
	            actionType: constants.SET_MAP,
	            name:name
	        });
	    },

	    closeSpellbook: function() {
	        AppDispatcher.handleViewAction({
	            actionType: constants.CLOSE_SPELLBOOK
	        });
	    },

	    openSpellbook: function() {
	        AppDispatcher.handleViewAction({
	            actionType: constants.OPEN_SPELLBOOK
	        });
	    },

	    nextProblem: function() {
	        AppDispatcher.handleViewAction({
	            actionType: constants.NEXT_PROBLEM
	        });
	    },

	    nextMap: function() {
	        AppDispatcher.handleViewAction({
	            actionType: constants.NEXT_MAP
	        });
	    },

	    mapInteraction: function() {
	        AppDispatcher.handleViewAction({
	            actionType: constants.MAP_OBJECT_INTERACTION
	        });
	    },

	    setWeather: function() {
	        AppDispatcher.handleViewAction({
	            actionType: constants.SET_WEATHER
	        });
	    }

	};

	module.exports = { constants:constants, Actions:Actions, GameViews:GameViews };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A key-value store to hold the monster stats. Loads a json file full of them
	 * and provides id-based access. This is not a flux datastore.
	 */

	var testJSON = JSON.stringify([
	    {
	        id: "forest_troll",
	        sprites: {
	            idle: "troll-whelp-idle",
	            attack: "troll-whelp-attack",
	            damaged: "troll-whelp-damaged",
	            dead: "default"
	        },
	        hp: 200,
	        fire_resist: 0,
	        frost_resist: 0,
	        arcane_resist: 0,
	        magic_resist: 0,
	        armor: 15,
	        physical: 42,
	        abilities: [
	            {
	                id: "club",
	                animation: {self: "", target: ""},
	                category: "attack",
	                type: "physical",
	                priority: 1,
	                power: 20,
	                cooldown: 0
	            },
	            {
	                id: "massive_smash",
	                animation: {self: "", target: ""},
	                category: "attack",
	                type: "physical",
	                power: 50,
	                priority: 0,
	                cooldown: 3
	            },
	            {
	                id: "regenerate",
	                animation: {self: "", target: ""},
	                category: "buff",
	                type: "magical_heal",
	                power: 10,
	                priority: 0,
	                cooldown: 4
	            }
	        ]
	    },
	    {
	        id: "direwolf",
	        sprites: {
	            idle: "direwolf-idle",
	            attack: "direwolf-attack",
	            damaged: "direwolf-damaged",
	            dead: "default"
	        },
	        hp: 50,
	        fire_resist: 10,
	        frost_resist: 50,
	        arcane_resist: 0,
	        magic_resist: 0,
	        armor: 20,
	        physical: 42,
	        abilities: [
	            {
	                id: "bite",
	                animation: {self: "", target: ""},
	                category: "attack",
	                type: "physical",
	                priority: 1,
	                power: 20,
	                cooldown: 0
	            }
	        ]
	    },
	    {
	        id: "spider",
	        sprites: {
	            idle: "spider-idle",
	            attack: "spider-attack",
	            damaged: "spider-die",
	            dead: "spider-die"
	        },
	        hp: 30,
	        fire_resist: 10,
	        frost_resist: 50,
	        arcane_resist: 0,
	        magic_resist: 0,
	        armor: 20,
	        physical: 42,
	        abilities: [
	            {
	                id: "poison",
	                animation: {self: "", target: ""},
	                category: "attack",
	                type: "arcane",
	                priority: 1,
	                power: 10,
	                cooldown: 0
	            }
	        ]
	    }
	]);

	var _monsterDict = {};

	var load = function(json) {
	    var rawMonsterObjects = JSON.parse(json);
	    rawMonsterObjects.forEach(function(monsterObject) 
	        {return _monsterDict[monsterObject.id] = monsterObject;});
	};

	load(testJSON);

	var MonsterStore = {
	    getById: function(monsterId) {
	        return _monsterDict[monsterId];
	    },

	    debug: _monsterDict
	};

	module.exports = MonsterStore;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var SpriteLoader = __webpack_require__(23);

	/**
	 * An Entity is the instantiation of a monster. It can have slightly tweaked
	 * values for its stats from the base monster, to keep things interesting.
	 */

	    function Entity(entityStats, tweaks) {"use strict";
	        tweaks = tweaks || {};

	        _.each(entityStats, function(val, key)  {
	            switch (key) {
	                case 'abilities':
	                    this.abilities = {};
	                    val.forEach(function(ability)  {
	                        this.abilities[ability.id] = ability;
	                    }.bind(this));
	                    break;
	                default:
	                    if (key in tweaks) {
	                        this[key] = val + tweaks;
	                    } else {
	                        this[key] = val;
	                    }
	                    break;
	            }
	        }.bind(this));

	        this.heal();

	        // cooldowns is a dictionary of ability id -> turns til usable
	        this.cooldowns = {};
	        _.each(this.abilities, function(ability, id)  {
	            // by default, everything starts ready to go
	            this.cooldowns[id] = 0;
	        }.bind(this));

	        this.status = [];

	        // What animation should we be showing?
	        this.spriteState = 'idle';

	        this.state = 'alive';
	    }

	    Entity.prototype.damage=function(damageAmount) {"use strict";
	        this.health -= damageAmount;
	        if (this.health <= 0) {
	            this.state = 'dead';
	            this.spriteState = 'dead';
	        }
	    };

	    Entity.prototype.isPlayer=function() {"use strict";
	        return this.id === 'player';
	    };

	    Entity.prototype.setSpriteState=function(spriteState) {"use strict";
	        this.spriteState = spriteState;
	    };

	    Entity.prototype.heal=function() {"use strict";
	        this.health = this.hp;
	    };


	var testPlayer = new Entity({
	    id: "player",
	    sprites: {
	        idle: 'red-mage-idle-female',
	        attack: 'red-mage-attack-staff-female',
	        fizzle: 'default',
	        damaged: 'red-mage-damaged-female',
	        dead: 'red-mage-die-female',
	        up: 'red-mage-up-female',
	        down: 'red-mage-down-female',
	        left: 'red-mage-left-female',
	        right: 'red-mage-right-female',
	        walkup: 'red-mage-walk-up-female',
	        walkdown: 'red-mage-walk-down-female',
	        walkleft: 'red-mage-walk-left-female',
	        walkright: 'red-mage-walk-right-female'
	    },
	    hp: 200,
	    fire_resist: 0,
	    frost_resist: 0,
	    arcane_resist: 0,
	    magic_resist: 0,
	    armor: 15,
	    physical: 42
	});

	var nextIndex = 1;
	var entities = {};
	var EntityStore = {
	    createEntity: function(entityStats) {
	        var entity = new Entity(entityStats);
	        var index = nextIndex++
	        entities[index] = entity;
	        return index;
	    },

	    getById: function(entityId) {
	        return entities[entityId];
	    },

	    getPlayer: function() {
	        return testPlayer;
	    }
	};

	EntityStore.debug = entities;

	module.exports = EntityStore;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var _ = __webpack_require__(32);
	var React = __webpack_require__(31);

	var AnimationTimingEngine = __webpack_require__(29);

	var Resources = (function() {
	    var promises = {};
	    var resources = {};

	    var _load = function(url) {
	        if (!promises[url]) {
	            // Create an image and store a promise
	            var image = new Image();
	            promises[url] = new Promise(function(resolve, reject) {
	                image.onload = function()  {return resolve({url:url, image:image});};
	                image.onerror = function()  {return reject({url:url, image:image});};
	                image.src = url;
	            });
	        }
	        return promises[url];
	    };

	    // returns a promise
	    var loadAll = function(arrayOfUrls, cb) {
	        var loadPromises = arrayOfUrls.map(function(url)  {return _load(url);});
	        return Promise.all(loadPromises).then(function(urlImageTuples)  {
	            urlImageTuples.forEach(function(urlImageTuple)  {
	                var $__0=   urlImageTuple,url=$__0.url,image=$__0.image;
	                resources[url] = image;
	                return image;
	            });
	        });
	    };

	    var get = function(url) {
	        if (url in resources) {
	            return resources[url];
	        } else {
	            throw ("Missing sprite for url " + url + ". Did you forget to load it?");
	        }
	    };

	    return {
	        loadAll: loadAll,
	        get: get
	    };
	})();

	var timingEngine = new AnimationTimingEngine();


	    function Sprite(options) {"use strict";
	        options = options || {};
	        this.options = _.defaults(options, {
	            url: "resources/default.png",
	            pos: [0, 0],
	            size: [128, 128],
	            speed: 1,
	            once: false,
	            frameIndices: [0],
	            dir: 'horizontal',
	            scale: 1,
	        });
	    }

	    Sprite.prototype.scaledSize=function() {"use strict";
	        return [this.options.size[0] * this.options.scale,
	                this.options.size[1] * this.options.scale];
	    };

	    // we expect time in ms to start at 0, this will always correspond to the
	    // first frame
	    Sprite.prototype.render=function(ctx, time, offset) {"use strict";
	        var offset = offset || [0, 0];
	        var frameIndex = null;
	        if (this.options.speed > 0) {
	            var index = Math.floor(this.options.speed * time);
	            var max = this.options.frameIndices.length;
	            frameIndex = this.options.frameIndices[index % max];

	            if (this.options.once && index >= max) {
	                frameIndex = this.options.frameIndices[max - 1];
	            }
	        } else {
	            frameIndex = 0;
	        }

	        var spritePosition = this.options.pos.slice();
	        var xySwitch = this.options.dir === 'horizontal' ? 0 : 1;
	        spritePosition[xySwitch] += frameIndex * this.options.size[xySwitch];

	        var scaledSize = this.scaledSize();

	        ctx.drawImage(
	            /*image*/ Resources.get(this.options.url),
	            /*sourcex*/ spritePosition[0], /*sourcey*/ spritePosition[1],
	            /*sourcew*/ this.options.size[0], /*sourceh*/ this.options.size[1],
	            /*canvasx*/ offset[0], /*canvasy*/ offset[1],
	            /*canvasw*/ scaledSize[0], /*canvash*/ scaledSize[1]);
	    };


	var SpriteRenderer = React.createClass({displayName: 'SpriteRenderer',
	    propTypes: {
	        sprite: React.PropTypes.instanceOf(Sprite).isRequired,
	        flipX: React.PropTypes.bool,
	        className: React.PropTypes.string
	    },

	    getDefaultProps: function() {
	        return {
	            flipX: false
	        };
	    },

	    getTransform: function() {
	        var canvasSize = this.props.sprite.scaledSize();
	        if (this.props.flipX) {
	            return [-1, 0, 0, 1, canvasSize[0], 0];
	        } else {
	            return [1, 0, 0, 1, 0, 0];
	        }
	    },

	    _insertIntoSprites: function(sprite) {
	        this.index = timingEngine.addUpdatable(this);
	    },

	    _removeFromSprites: function() {
	        timingEngine.removeUpdatable(this.index);
	    },

	    update: function(dt) {
	        if (this.ctx) {
	            var scaledSize = this.props.sprite.scaledSize();
	            this.ctx.setTransform.apply(this.ctx, this.getTransform());
	            this.ctx.clearRect(0, 0, scaledSize[0], scaledSize[1]);
	            this.props.sprite.render(this.ctx, this.time);
	            this.time += dt;
	        }
	    },

	    componentDidMount: function() {
	        this.ctx = this.getDOMNode().getContext('2d');
	        this.time = 0;

	        this._insertIntoSprites(this.props.sprite);
	    },

	    componentWillUnmount: function() {
	        this._removeFromSprites();
	    },

	    componentWillReceiveProps: function(nextProps) {
	        if (nextProps.sprite !== this.props.sprite) {
	            console.log("updating sprite");
	            this._removeFromSprites();
	            this._insertIntoSprites(nextProps.sprite);
	            this.time = 0;
	        }
	    },

	    render: function() {
	        var canvasSize = this.props.sprite.scaledSize();
	        return React.DOM.canvas({
	            className: this.props.className, 
	            width: canvasSize[0], 
	            height: canvasSize[1], 
	            style: this.props.style}
	            );
	    }
	});

	timingEngine.start();

	module.exports = {
	    Resources: Resources,
	    Sprite: Sprite,
	    SpriteRenderer: SpriteRenderer,
	    timingEngine: timingEngine
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var _ = __webpack_require__(32);
	var React = __webpack_require__(31);

	var AnimationTimingEngine = __webpack_require__(29);

	var timingEngine = new AnimationTimingEngine();


	function generateRandom(min, max) {
	    return Math.random() * (max - min) + min;
	}


	    function FogParticle(options) {"use strict";
	        options = options || {};
	        this.options = _.defaults({}, options, {
	            initialVelocity: [generateRandom(-2, 2), generateRandom(-2, 2)],
	            radius: 5,
	            pos: [0, 0]
	        });
	        this.velocity = this.options.initialVelocity.slice();
	        this.location = this.options.pos.slice();
	    }

	    FogParticle.prototype.render=function(ctx, time) {"use strict";
	        // Draw fog image
	        if (this.image) {
	            ctx.drawImage(this.image, this.location[0] - 128,
	                this.location[1] - 128);
	            this.location[0] += this.velocity[0];
	            this.location[1] += this.velocity[1];
	        }
	    };



	    function FogParticleCloud(options) {"use strict";
	        var defaultSize = 1000;
	        options = options || {};
	        this.options = _.defaults({}, options, {
	            size: [defaultSize, defaultSize],
	            scale: 1,
	            numParticles: 50,
	        });
	        this.particles = _(this.options.numParticles).times(function()  {
	            return new FogParticle(_.extend({
	                pos: [
	                    generateRandom(0, this.options.size[0]),
	                    generateRandom(0, this.options.size[1])
	                ],
	            }, this.options));
	        }.bind(this));
	        var imageObj = new Image();
	        imageObj.onload = function()  {
	            this.particles.forEach(function(particle) {
	                particle.image = imageObj;
	            });
	        }.bind(this);
	        imageObj.src = "http://www.blog.jonnycornwell.com/wp-content/uploads/2012/07/Smoke10.png";
	    }

	    FogParticleCloud.prototype.scaledSize=function() {"use strict";
	        return [this.options.size[0] * this.options.scale,
	                this.options.size[1] * this.options.scale];
	    };

	    FogParticleCloud.prototype.render=function(ctx, time) {"use strict";
	        _.each(this.particles, function(particle)  {
	            particle.render(ctx, time);

	            // Check if has crossed the right edge
	            if (particle.location[0] >= this.options.size[0]) {
	                particle.velocity[0] = -particle.velocity[0];
	                particle.location[0] = this.options.size[0];
	            }
	            // Check if has crossed the left edge
	            else if (particle.x <= 0) {
	                particle.velocity[0] = -particle.velocity[0];
	                particle.location[0] = 0;
	            }

	            // Check if has crossed the bottom edge
	            if (particle.location[1] >= this.options.size[1]) {
	                particle.velocity[1] = -particle.velocity[1];
	                particle.location[1] = this.options.size[1];
	            }

	            // Check if has crossed the top edge
	            else if (particle.location[1] <= 0) {
	                particle.velocity[1] = -particle.velocity[1];
	                particle.location[1] = 0;
	            }
	        }.bind(this));
	    };




	    function RainDrop(options) {"use strict";
	        options = options || {};
	        this.options = _.defaults({}, options, {
	            velocity: [Math.random() * 5, 15 + Math.random() * 10],
	            heightBase: 4,
	            heightVariance: 4,
	            widthBase: 1,
	            widthVariance: 1,
	            pos: [0, 0]
	        });
	        this.location = this.options.pos.slice();
	        this.height = this.options.heightBase +
	            Math.random() * this.options.heightVariance;
	        this.width = this.options.widthBase +
	            Math.random() * this.options.widthVariance;
	    }

	    RainDrop.prototype.render=function(ctx, time, options) {"use strict";
	        var centerX = this.location[0] + this.width / 2;
	        var centerY = this.location[1] + this.height / 2;

	        ctx.beginPath();
	        ctx.moveTo(centerX, centerY - this.height/2); // A1

	        ctx.bezierCurveTo(
	            centerX + this.width/2, centerY - this.height/2, // C1
	            centerX + this.width/2, centerY + this.height/2, // C2
	            centerX, centerY + this.height/2
	        ); // A2

	        ctx.bezierCurveTo(
	            centerX - this.width/2, centerY + this.height/2, // C3
	            centerX - this.width/2, centerY - this.height/2, // C4
	            centerX, centerY - this.height/2
	        ); // A1

	        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	        ctx.fill();
	        ctx.closePath();

	        // Move particles using cool angle mechanics
	        this.location[0] += this.options.velocity[0];
	        this.location[1] += this.options.velocity[1];
	    };



	    function RainCloud(options) {"use strict";
	        var defaultSize = 1000;
	        options = options || {};
	        this.options = _.defaults({}, options, {
	            size: [defaultSize, defaultSize],
	            scale: 1,
	            numParticles: 2000,
	        });
	        this.particles = _(this.options.numParticles).times(function()  {
	            return new RainDrop(_.extend({
	                pos: [
	                    generateRandom(0, this.options.size[0]),
	                    generateRandom(0, this.options.size[1])
	                ],
	            }, this.options));
	        }.bind(this));
	    }

	    RainCloud.prototype.scaledSize=function() {"use strict";
	        return [this.options.size[0] * this.options.scale,
	                this.options.size[1] * this.options.scale];
	    };

	    RainCloud.prototype.render=function(ctx, time) {"use strict";
	        var newParticles = _.map(this.particles, function(particle, i)  {
	            particle.render(ctx, time);

	            // Regenerate if drops fly off screen
	            if (particle.location[0] > this.options.size[0] + 5 ||
	                particle.location[0] < -this.options.size[0] - 5 ||
	                particle.location[1] > this.options.size[1])
	            {
	                //a brand new particle replacing the dead one
	                return new RainDrop(_.extend({
	                    pos: [Math.random() * this.options.size[0] , -10],
	                }, this.options));
	            } else {
	                return particle;
	            }
	        }.bind(this));
	        this.particles = newParticles;
	    };



	    function SnowFlake(options) {"use strict";
	        options = options || {};
	        this.options = _.defaults({}, options, {
	            radiusBase: 1,
	            radiusVariance: 4,
	            pos: [0, 0]
	        });
	        this.location = this.options.pos.slice();
	        this.radius = this.options.radiusBase +
	            Math.random() * this.options.radiusVariance;
	    }

	    SnowFlake.prototype.render=function(ctx, time, options) {"use strict";
	        ctx.beginPath();
	        ctx.moveTo(this.location[0], this.location[1]);
	        ctx.arc(this.location[0], this.location[1], this.radius, 0, Math.PI*2);

	        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
	        ctx.arc(this.location[0], this.location[1], this.radius, Math.PI * 2,
	            false);
	        ctx.fill();

	        // Move particles using cool angle mechanics
	        this.location[0] += Math.sin(options.angle) * 2;
	        this.location[1] += Math.cos(options.angle +
	            this.options.numParticles) + 1 + this.radius / 2;
	    };



	    function SnowFlakeCloud(options) {"use strict";
	        var defaultSize = 1000;
	        options = options || {};
	        this.options = _.defaults({}, options, {
	            size: [defaultSize, defaultSize],
	            scale: 1,
	            numParticles: 500,
	        });
	        // Angle of rotation for the cloud
	        this.angle = 0;
	        this.particles = _(this.options.numParticles).times(function()  {
	            // Snowflakes spawn at random locations
	            return new SnowFlake(_.extend({
	                pos: [
	                    generateRandom(0, this.options.size[0]),
	                    generateRandom(0, this.options.size[1])
	                ]
	            }, this.options));
	        }.bind(this));
	    }

	    SnowFlakeCloud.prototype.scaledSize=function() {"use strict";
	        return [this.options.size[0] * this.options.scale,
	                this.options.size[1] * this.options.scale];
	    };

	    SnowFlakeCloud.prototype.render=function(ctx, time) {"use strict";
	        this.angle += 0.005;

	        var newParticles = _.map(this.particles, function(particle, i)  {
	            particle.render(ctx, time, {
	                angle: this.angle
	            });

	            // Regenerate if flake flies off screen
	            if (particle.location[0] > this.options.size[0] + 5 ||
	                particle.location[0] < -this.options.size[0] - 5 ||
	                particle.location[1] > this.options.size[1])
	            {
	                var position;
	                if (i % 3 > 0) {
	                    position = [Math.random() * this.options.size[0], -10];
	                } else if (Math.sin(this.angle) > 0) {
	                    position = [-5, Math.random() * this.options.size[1]];
	                } else {
	                    position = [
	                        this.options.size[0] + 5,
	                        Math.random() * this.options.size[1]
	                    ];
	                }
	                //a brand new particle replacing the dead one
	                return new SnowFlake(_.extend({
	                    pos: position,
	                }, this.options));
	            } else {
	                return particle;
	            }
	        }.bind(this));
	        this.particles = newParticles;
	    };



	    function Particle(options) {"use strict";
	        options = options || {};
	        this.options = _.defaults({}, options, {
	            velocity: [-2.5 + Math.random() * 5, -15 + Math.random() * 10],
	            //colors
	            generateR: function()  {return Math.round(Math.random() * 255);},
	            generateG: function()  {return Math.round(Math.random() * 255);},
	            generateB: function()  {return Math.round(Math.random() * 255);},
	            radiusBase: 10,
	            radiusVariance: 20,
	            lifeBase: 20,
	            lifeVariance: 10,
	            pos: [0, 0]
	        });

	        this.life = this.options.lifeBase +
	            Math.random() * this.options.lifeVariance;
	        this.remaining_life = this.life;
	        this.location = this.options.pos.slice();
	        this.radius = this.options.radiusBase +
	            Math.random() * this.options.radiusVariance;
	    }

	    Particle.prototype.render=function(ctx, time) {"use strict";
	        ctx.beginPath();
	        this.opacity = Math.round(this.remaining_life / this.life * 100) / 100;

	        var r = this.options.generateR(this.opacity);
	        var g = this.options.generateG(this.opacity);
	        var b = this.options.generateB(this.opacity);

	        //a gradient instead of white fill
	        var gradient = ctx.createRadialGradient(this.location[0],
	            this.location[1], 0, this.location[0], this.location[1],
	            this.radius);
	        gradient.addColorStop(0, "rgba("+ r + ", " + g + ", " + b + ", " +
	            this.opacity + ")");
	        gradient.addColorStop(0.5, "rgba("+ r + ", " + g + ", " + b + ", " +
	            this.opacity + ")");
	        gradient.addColorStop(1, "rgba("+ r + ", " + g + ", " + b + ", 0)");
	        ctx.fillStyle = gradient;
	        ctx.arc(this.location[0], this.location[1], this.radius, Math.PI * 2,
	            false);
	        ctx.fill();

	        //lets move the particles
	        this.remaining_life--;
	        this.radius--;
	        this.location[0] += this.options.velocity[0];
	        this.location[1] += this.options.velocity[1];
	    };



	    function ParticleCloud(options) {"use strict";
	        var defaultSize = 1000;
	        options = options || {};
	        this.options = _.defaults({}, options, {
	            size: [defaultSize, defaultSize],
	            scale: 1,
	            pos: [defaultSize / 2, defaultSize - 50],
	            numParticles: 100,
	        });
	        this.particles = _(this.options.numParticles).times(function()  {
	            return new Particle(this.options);
	        }.bind(this));
	    }

	    ParticleCloud.prototype.scaledSize=function() {"use strict";
	        return [this.options.size[0] * this.options.scale,
	                this.options.size[1] * this.options.scale];
	    };

	    ParticleCloud.prototype.render=function(ctx, time) {"use strict";
	        var newParticles = _.map(this.particles, function(particle, i)  {
	            particle.render(ctx, time);

	            //regenerate particles
	            if (particle.remaining_life < 0 || particle.radius < 0)
	            {
	                //a brand new particle replacing the dead one
	                return new Particle(this.options);
	        } else {
	                return particle;
	            }
	        }.bind(this));
	        this.particles = newParticles;
	    };


	var ParticleCloudRenderer = React.createClass({displayName: 'ParticleCloudRenderer',
	    getDefaultProps: function () {
	        // Colors for fire particles
	        var fire = {
	            generateR: function()  {
	                return 250;
	            },
	            generateG: function(decay)  {
	                var sqr = decay * decay;
	                return Math.round(200 * sqr + Math.random() * 10 * (1 - sqr));
	            },
	            generateB: function()  {return 0;}
	        };

	        return {
	            particleCloud: new ParticleCloud(fire)
	        };
	    },

	    _insertIntoParticleClouds: function() {
	        this.index = timingEngine.addUpdatable(this);
	    },

	    _removeFromParticleClouds: function() {
	        timingEngine.removeUpdatable(this.index);
	    },

	    update: function(dt) {
	        if (this.ctx) {
	            var scaledSize = this.props.particleCloud.scaledSize();
	            this.ctx.clearRect(0, 0, scaledSize[0], scaledSize[1]);
	            this.props.particleCloud.render(this.ctx, this.time);
	            this.time += dt;
	        }
	    },

	    componentDidMount: function() {
	        this.ctx = this.getDOMNode().getContext('2d');
	        this.time = 0;

	        this._insertIntoParticleClouds();
	    },

	    componentWillUnmount: function() {
	        this._removeFromParticleClouds();
	    },

	    componentWillReceiveProps: function(nextProps) {
	        if (nextProps.particleCloud !== this.props.particleCloud) {
	            this._removeFromParticleClouds();
	            this._insertIntoParticleClouds(nextProps.particleCloud);
	            this.time = 0;
	        }
	    },

	    render: function() {
	        var canvasSize = this.props.particleCloud.scaledSize();
	        return React.DOM.canvas({
	            width: canvasSize[0], 
	            height: canvasSize[1], 
	            style: this.props.style});
	    }
	});

	var DarkRenderer = React.createClass({displayName: 'DarkRenderer',
	    render: function() {
	        return React.DOM.canvas({style: {position: 'absolute', zIndex: 100}, 
	                       width: this.props.width, 
	                       height: this.props.height});
	    },

	    componentDidMount: function() {
	        var ctx = this.getDOMNode().getContext('2d');
	        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
	        ctx.fillRect(0, 0, this.props.width, this.props.height);
	    }
	});

	timingEngine.start();

	module.exports = {
	    ParticleCloud: ParticleCloud,
	    SnowFlakeCloud: SnowFlakeCloud,
	    FogParticleCloud: FogParticleCloud,
	    RainCloud: RainCloud,
	    ParticleCloudRenderer: ParticleCloudRenderer,
	    DarkRenderer:DarkRenderer
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(33).EventEmitter;
	var Promise = __webpack_require__(42);
	var AppDispatcher = __webpack_require__(26);
	var utils = __webpack_require__(24);

	var CombatConstants = __webpack_require__(18);
	var CombatActions = __webpack_require__(9);
	var $__0=    __webpack_require__(3),Actions=$__0.Actions;
	var UserStore = __webpack_require__(16);

	var SpriteLoader = __webpack_require__(23);

	var CHANGE_EVENT = "change";

	var _entities;
	var _turnOrder;
	var _turnIndex;
	var _state;
	var _resourcesLoaded;
	var _message;

	var combatLog = function() {
	    var consoleArgs = ["COMBAT LOG"];
	    consoleArgs = consoleArgs.concat(Array.prototype.slice.call(arguments));
	    console.log.apply(console, consoleArgs);
	};

	var FluxDatastore = {
	    addChangeListener: function(callback) {
	        this.on(CHANGE_EVENT, callback);
	    },

	    removeChangeListener: function(callback) {
	        this.removeListener(CHANGE_EVENT, callback);
	    },

	    _emitChange: function() {
	        this.emit(CHANGE_EVENT);
	    },
	}

	var CombatStore = _({}).extend(EventEmitter.prototype, FluxDatastore, {
	    CombatEngine: {
	        getLivingEnemies: function() {
	            var livingEntities = _.where(_entities, {state: 'alive'});
	            return _.filter(livingEntities, function(e)  {return !e.isPlayer();});
	        },

	        startTurns: function() {
	            this.takeTurn();
	        },

	        damageEntity: function(entity, damage) {
	            combatLog(("Damage! " + damage + " points of damage to "), entity);
	            entity.damage(damage);
	            return this.runAnimationForEntity('damaged', entity);
	        },

	        handleAbility: function(ability, source, targets) {
	            combatLog("Ability use: ", ability);

	            // Simple stuff. Just use the power as damage to the target.
	            var damage = ability.power || 0;
	            var animationPromises = targets.map(function(target)  {
	                return this.damageEntity(target, damage);
	            }.bind(this));
	            CombatStore._emitChange();
	            return Promise.all(animationPromises);
	        },

	        fizzleSpell: function(spell) {
	            combatLog("Fizzled spell: ", spell);
	        },

	        getImplicitTargets:function(spell) {
	            var livingEnemies = this.getLivingEnemies();

	            // if our spell targets all, return errybody
	            if (spell.targetType === "all") {
	                return livingEnemies;
	            }

	            // if we are casting a buff, we don't need a target
	            if (spell.category !== "attack") {
	                return [EntityStore.getPlayer()];
	            }

	            // no need to target if there is only one enemy
	            if (livingEnemies.length == 1) {
	                return livingEnemies;
	            }

	            if (livingEnemies.length < 1) {
	                throw "Trying to get an implicit target when there are no living enemies";
	            }

	            return null;
	        },

	        // returns a promise
	        waitForSelectionFromPlayer: function() {
	            return new Promise(function(resolve, reject)  {
	                this.resolvePlayerTargets = resolve;
	                _state = CombatConstants.CombatEngineStates.PLAYER_SELECTING_TARGET;
	                _message = "Choose a target";
	                CombatStore._emitChange();
	            }.bind(this));
	        },

	        // returns a promise
	        getPlayerTarget: function(spell) {
	            return new Promise(function(resolve, reject)  {
	                var implicitTargets = this.getImplicitTargets(spell);
	                if (!implicitTargets) {
	                    this.waitForSelectionFromPlayer()
	                    .done(function(targets)  {
	                        _message = null;
	                        _state = CombatConstants.CombatEngineStates.RUNNING;
	                        resolve(targets);
	                    }, reject);
	                } else {
	                    resolve(implicitTargets);
	                }
	            }.bind(this));
	        },

	        handlePlayerCast: function(spell, success) {
	            var castSpell = function(targets)  {
	                var player = EntityStore.getPlayer();

	                // Add power-up to spell and reset counters
	                spell.power += UserStore.getCounter(spell.exerciseName);
	                Actions.adjustCounters(spell.exerciseName);

	                return this.runAnimationForEntity('attack', player).then(function()  {
	                    return this.handleAbility(spell, player, targets);
	                }.bind(this));
	            }.bind(this)

	            if (success) {
	                return this.getPlayerTarget(spell).then(function(targets)  {
	                    return castSpell(targets);
	                });
	            } else {
	                var player = EntityStore.getPlayer();
	                return this.runAnimationForEntity('fizzle', player).then(function()  {
	                    return this.fizzleSpell(spell);
	                }.bind(this));
	            }
	        },

	        advanceTurn: function() {
	            _turnIndex += 1;
	            combatLog("Turn advanced. ", this.getCurrentEntity(), "'s turn'");
	            CombatStore._emitChange();
	            this.takeTurn();
	        },

	        takeTurn: function() {
	            var currentEntity = CombatStore.CombatEngine.getCurrentEntity();
	            if (currentEntity.isPlayer()) {
	                _state = CombatConstants.CombatEngineStates.AWAITING_PLAYER_TURN;
	                combatLog("Players turn, waiting...");
	                CombatStore._emitChange();
	            } else {
	                // Not the player, some ai monster.
	                // Wait a short time then do the action.
	                if (currentEntity.state === 'dead') {
	                    this.advanceTurn();
	                } else {
	                    utils.wait(3000).then(function()  {
	                        var abilityToUse = this.chooseAbility(currentEntity);
	                        var player = EntityStore.getPlayer();

	                        if (abilityToUse.category === 'attack') {
	                            this.runAnimationForEntity('attack', currentEntity)
	                            .then(function()  {
	                                return this.handleAbility(
	                                    abilityToUse, currentEntity, [player])
	                            }.bind(this))
	                            .then(function()  {
	                                return this.advanceTurn();
	                            }.bind(this));
	                        } else {
	                            this.handleAbility(
	                                abilityToUse, currentEntity, [player]);

	                            this.advanceTurn();
	                        }
	                    }.bind(this));
	                }
	            }
	        },

	        getCurrentEntityId: function() {
	            return _turnOrder[_turnIndex % _turnOrder.length];
	        },

	        getCurrentEntity: function() {
	            return _entities[CombatStore.CombatEngine.getCurrentEntityId()];
	        },

	        /**
	        * Choose an ability from the entities abilities, using priority and
	        * cooldowns
	        */
	        chooseAbility: function(entity) {
	            return _.find(entity.abilities, function()  {return true;});
	        },

	        reset: function() {
	            _entities = {};
	            _turnIndex = 0;
	            _turnOrder = [];
	            _state = CombatConstants.CombatEngineStates.RUNNING;
	            _message = null;
	            var player = EntityStore.getPlayer();
	            player.heal();
	        },

	        runAnimationForEntity: function(spriteState, entity) {
	            var spriteId = entity.sprites[spriteState];
	            var spriteTime = SpriteLoader.getSpriteTime(spriteId);

	            return new Promise(function(resolve, reject)  {
	                var oldSpriteState = entity.spriteState;
	                _.delay(function()  {
	                    entity.setSpriteState(oldSpriteState);
	                    CombatStore._emitChange();
	                    resolve();
	                }, spriteTime);
	                entity.setSpriteState(spriteState);
	                CombatStore._emitChange();
	            });
	        }
	    },

	    getEntities: function() {
	        return _entities;
	    },

	    getState: function() {
	        return _state;
	    },

	    getCurrentTurn: function() {
	        return _entityIdOwningCurrentTurn;
	    },

	    getIsLoading: function() {
	        return !_resourcesLoaded;
	    },

	    getIsPlayerSelecting: function() {
	        return _state === CombatConstants.CombatEngineStates.PLAYER_SELECTING_TARGET;
	    },

	    getCombatMessage: function() {
	        return _message;
	    },

	    dispatcherIndex: AppDispatcher.register(function(payload) {
	        var action = payload.action;

	        switch (action.actionType) {
	            case CombatConstants.START_COMBAT:
	                CombatStore.CombatEngine.reset();

	                _entities = _.extend({}, {"0": EntityStore.getPlayer()});
	                action.monsterIds.forEach(function(id)  {
	                    _entities[id] = EntityStore.getById(id);
	                });

	                _turnOrder = _.keys(_entities)

	                combatLog("Starting combat!");
	                combatLog("Entities:", _entities);
	                combatLog("Turn order:", _turnOrder);
	                combatLog("Turn index:", _turnIndex);

	                CombatStore._emitChange();

	                _resourcesLoaded = false;

	                var spriteIds = _.flatten(_.map(_entities, function(entity, id) 
	                    {return _.uniq(_.values(entity.sprites));}));
	                spriteIds.push('current-turn-halo');

	                SpriteLoader.loadSprites(spriteIds).then(function()  {
	                    _resourcesLoaded = true;
	                    CombatStore.CombatEngine.startTurns();
	                    CombatStore._emitChange();
	                });

	                break;

	            case CombatConstants.END_COMBAT:
	                CombatStore.CombatEngine.reset();
	                break;

	            case CombatConstants.PLAYER_CAST_SPELL:
	                utils.assert(_state == CombatConstants.CombatEngineStates.AWAITING_PLAYER_TURN, "Got a spell cast when we weren't waiting for one");
	                utils.assert(CombatStore.CombatEngine.getCurrentEntity().isPlayer(), "Casting a spell when it isn't your turn!");

	                var $__0=   action,spell=$__0.spell,success=$__0.success;
	                _state = CombatConstants.CombatEngineStates.RUNNING;
	                CombatStore._emitChange();
	                CombatStore.CombatEngine.handlePlayerCast(spell, success).done(function()  {
	                    var livingEnemies = CombatStore.CombatEngine.getLivingEnemies();
	                    if (_.isEmpty(livingEnemies)) {
	                        _message = "You have KHANquered!";
	                        CombatStore._emitChange();
	                        utils.wait(5000).then(function()  {
	                            combatLog("No enemies left! player wins");
	                            _message = null;

	                            CombatStore._emitChange();
	                            CombatActions.endCombat();
	                        });
	                    } else {
	                        CombatStore.CombatEngine.advanceTurn();
	                        // TODO(dmnd): display a waiting message instead, then display next problem
	                        // at beginning of next turn
	                    }
	                    Actions.nextProblem();
	                });
	                break;

	            case CombatConstants.PLAYER_CHOOSE_TARGET:
	                utils.assert(_state == CombatConstants.CombatEngineStates.PLAYER_SELECTING_TARGET, "Got a target choice when we weren't waiting for one");
	                var target = action.target;
	                CombatStore.CombatEngine.resolvePlayerTargets([target]);
	                break;

	            case CombatConstants.USE_ABILITY:
	                var ability = action.ability;
	                var source = _entities[action.sourceId];
	                var target = _entities[action.targetId];

	                CombatStore._handleAbility(ability, source, target);
	                break;
	        }
	        return true;
	    }),

	});

	module.exports = CombatStore;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(26);
	var CombatConstants = __webpack_require__(18);
	var Spell = __webpack_require__(30);
	var UserStore = __webpack_require__(16);

	var CombatActions = {
	    startCombat: function(monsterEntityIds) {
	        AppDispatcher.handleViewAction({
	            actionType: CombatConstants.START_COMBAT,
	            monsterIds: monsterEntityIds
	        });
	    },

	    endCombat: function() {
	        AppDispatcher.handleViewAction({
	            actionType: CombatConstants.END_COMBAT,
	        });
	    },

	    useAbility: function(ability, sourceId, targetId) {
	        AppDispatcher.handleViewAction({
	            actionType: CombatConstants.USE_ABILITY,
	            ability: ability,
	            sourceId: sourceId,
	            targetId: targetId
	        });
	    },

	    castSpell: function(spell, success) {
	        AppDispatcher.handleViewAction({
	            actionType: CombatConstants.PLAYER_CAST_SPELL,
	            spell: spell,
	            success: success
	        });
	    },

	    successfulAttack: function() {
	        // casts spell so that enemies take damage etc
	        var exerciseName = UserStore.getUser().activeExercise;
	        var spell = new Spell(exerciseName);
	        CombatActions.castSpell(spell, true);
	    },

	    failedAttack: function() {
	        // fizzles spell
	        var exerciseName = UserStore.getUser().activeExercise;
	        var spell = new Spell(exerciseName);
	        CombatActions.castSpell(spell, false);
	    },

	    chooseTarget: function(targetEntity) {
	        AppDispatcher.handleViewAction({
	            actionType: CombatConstants.PLAYER_CHOOSE_TARGET,
	            target: targetEntity
	        });
	    }
	};

	module.exports = CombatActions;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);

	var StateFromStore = __webpack_require__(27);

	var CombatActions = __webpack_require__(9);
	var CombatStore = __webpack_require__(8);

	var SpriteLoader = __webpack_require__(23);
	var SpriteRenderer = __webpack_require__(6).SpriteRenderer;
	var HealthBar = __webpack_require__(25);

	var CombatEntity = React.createClass({displayName: 'CombatEntity',
	    propTypes: {
	        // should be entity
	        entity: React.PropTypes.object.isRequired,
	        isPlayer: React.PropTypes.bool.isRequired,
	        isSelectable: React.PropTypes.bool.isRequired,
	        active: React.PropTypes.bool.isRequired
	    },

	    componentWillMount: function() {
	        this.sprites = {};
	    },

	    _getOrCreateSpriteForState: function(state) {
	        if (!(state in this.sprites)) {
	            // need to create sprite
	            var spriteId = this.props.entity.sprites[state];
	            this.sprites[state] = SpriteLoader.getNewSpriteById(spriteId);
	        }
	        return this.sprites[state];
	    },

	    handleClick: function() {
	        if (this.props.isSelectable) {
	            CombatActions.chooseTarget(this.props.entity);
	        }
	    },

	    render: function() {
	        //need to render sprite, healthbar
	        var spriteState = this.props.entity.spriteState;

	        var sprite = this._getOrCreateSpriteForState(spriteState);

	        if (!('active' in this.sprites)) {
	            this.sprites['active'] = SpriteLoader.getNewSpriteById(
	                'current-turn-halo');
	        }

	        var className = React.addons.classSet({
	            entity: true,
	            selectable: this.props.isSelectable
	        });
	        return React.DOM.div({className: className, onClick: this.handleClick}, 
	            SpriteRenderer({sprite: sprite, flipX: this.props.isPlayer}), 
	            this.props.active ?
	                SpriteRenderer({className: "active-halo", 
	                                sprite: this.sprites['active']}): null, 
	            HealthBar({entity: this.props.entity})
	        );
	    }
	});

	var CombatView = React.createClass({displayName: 'CombatView',
	    mixins: [StateFromStore({
	        entities: {
	            store: CombatStore,
	            fetch: function(store)  {return store.getEntities();}
	        },
	        loading: {
	            store: CombatStore,
	            fetch: function(store)  {return store.getIsLoading();}
	        },
	        selectingTarget: {
	            store: CombatStore,
	            fetch: function(store)  {return store.getIsPlayerSelecting();}
	        },
	        activeEntity: {
	            store: CombatStore,
	            fetch: function(store)  {return store.CombatEngine.getCurrentEntity();}
	        },
	        message: {
	            store: CombatStore,
	            fetch: function(store)  {return store.getCombatMessage();}
	        }
	    })],

	    renderEntity: function(entity) {
	        var isSelectable = !entity.isPlayer() && this.state.selectingTarget;
	        return CombatEntity({isPlayer: entity.isPlayer(), 
	                             entity: entity, 
	                             isSelectable: isSelectable, 
	                             active: entity === this.state.activeEntity});
	    },

	    render: function() {
	        var inner;
	        if (this.state.loading) {
	            inner = React.DOM.span(null, "Loading");
	        } else {
	            inner = _.map(this.state.entities, this.renderEntity);
	        }

	        var message = null;
	        if (this.state.message) {
	            message = React.DOM.div({className: "combat-message"}, 
	                this.state.message
	            );
	        }

	        return React.DOM.div({className: "combat-background"}, 
	            inner, 
	            message
	        );
	    }
	});

	module.exports = CombatView;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var _ = __webpack_require__(32);
	var SpellBadge = __webpack_require__(34);
	var Spell = __webpack_require__(30);

	var Spellbook = React.createClass({displayName: 'Spellbook',
	    propTypes: {
	        exerciseName: React.PropTypes.arrayOf(React.PropTypes.string),
	        onClick: React.PropTypes.func
	    },

	    getDefaultProps: function () {
	        return {
	            exerciseName: [],
	            onClick: function () { }
	        };
	    },

	    render: function () {
	        return React.DOM.div({className: "spellbook"}, 
	            React.DOM.div({id: "border"}, 
	                React.DOM.h1({id: "banner"}, "SPELLBOOK"), 
	                React.DOM.div({className: "separator"}), 
	                _.map(this.props.exerciseNames, function(exerciseName, i)  {
	                    return SpellBadge({exerciseName: exerciseName, 
	                        key: i, 
	                        onClick: this.props.onClick});
	                }.bind(this))
	            )
	        );
	    }
	});

	module.exports = Spellbook;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var RP = React.PropTypes;
	var KUIButton = __webpack_require__(38);

	var DialogData = __webpack_require__(45);

	var Dialog = React.createClass({displayName: 'Dialog',
	    propTypes: {
	        scene: RP.string.isRequired,
	    },

	    getInitialState: function() {
	        return {
	            index: 0
	        };
	    },

	    _getScene: function() {
	        return DialogData[this.props.scene];
	    },

	    _getLine: function() {
	        var lines = this._getScene().lines;
	        return lines[this.state.index];
	    },

	    render: function() {
	        var line = this._getLine();
	        var end = this.state.index === this._getScene().lines.length - 1;
	        var message = end ? "Close" : "Next";
	        return React.DOM.div({className: "dialog-view"}, 
	            React.DOM.div({style: {position: "relative"}}, 
	                React.DOM.div({className: "speaker"}, line.speaker), 
	                React.DOM.div({className: "line"}, line.line), 
	                React.DOM.div({className: "forward"}, 
	                    KUIButton({type: "submit", 
	                        label: message, 
	                        type: "button", 
	                        domainSlug: "economics-finance-domain", 
	                        width: "140px", 
	                        onClick: this.onForward})
	                )
	            )
	        );
	    },

	    onForward: function() {
	        var scene = this._getScene();

	        if (this.state.index === scene.lines.length - 1) {
	            Actions.hideDialog();
	        } else {
	            this.setState({ index: this.state.index + 1 });
	        }
	    }
	});

	module.exports = Dialog;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var SpellBadge = __webpack_require__(34);

	var SpellSplash = React.createClass({displayName: 'SpellSplash',
	    getDefaultProps: function() {
	        return {
	            exerciseName: null,
	            description: "",
	            videoURL: "",
	            onClick: function() { }
	        };
	    },

	    render: function() {
	        return React.DOM.div({className: "new-spell", onClick: this.props.onClick}, 
	            React.DOM.div({className: "splash-title"}, "You have acquired a new spell."), 
	            SpellBadge({exerciseName: this.props.exerciseName}), 
	            React.DOM.div({className: "splash-description"}, this.props.description), 
	            React.DOM.br(null), 
	            React.DOM.iframe({frameBorder: "0", scrolling: "yes", width: "410", height: "315", src: this.props.videoURL, allowFullScreen: true})
	        );
	    }
	});

	module.exports = SpellSplash;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var RP = React.PropTypes;

	var CombatExercise = __webpack_require__(35);
	var ActiveSpell = __webpack_require__(36);

	var CombatStore = __webpack_require__(8);
	var StateFromStore = __webpack_require__(27);

	var CombatScreen = React.createClass({displayName: 'CombatScreen',
	    propTypes: {
	        exerciseName: RP.string,
	        problemIndex: RP.number
	    },

	    mixins: [StateFromStore({
	        combatMessage: {
	            store: CombatStore,
	            fetch: function(store)  {return store.getCombatMessage();}
	        }
	    })],

	    render: function() {
	        var exerciseName = this.props.exerciseName;

	        if (this.state.combatMessage) {
	            return React.DOM.div(null);
	        }

	        return React.DOM.div(null, 
	            ActiveSpell({exerciseName: exerciseName}), 
	            exerciseName && CombatExercise({
	                                exerciseName: exerciseName, 
	                                onAttack: this.onAttack, 
	                                onFailedAttack: this.onFailedAttack, 
	                                problemIndex: this.props.problemIndex})
	        );
	    }
	});

	module.exports = CombatScreen;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);

	/* A checkbox that syncs its value to props using the
	 * renderer's onChange method, and gets the prop name
	 * dynamically from its props list
	 */
	var PropCheckBox = React.createClass({displayName: 'PropCheckBox',
	    propTypes: {
	        labelAlignment: React.PropTypes.oneOf(["left", "right"])
	    },

	    DEFAULT_PROPS: {
	        label: null,
	        onChange: null,
	        labelAlignment: "left"
	    },

	    getDefaultProps: function() {
	        return this.DEFAULT_PROPS;
	    },

	    propName: function() {
	        var propName = _.find(_.keys(this.props), function(localPropName) {
	            return !_.has(this.DEFAULT_PROPS, localPropName);
	        }, this);

	        if (!propName) {
	            throw new Error("Attempted to create a PropCheckBox with no " +
	                    "prop!");
	        }

	        return propName;
	    },

	    _labelAlignLeft: function() {
	        return this.props.labelAlignment === "left";
	    },

	    render: function() {
	        var propName = this.propName();
	        return React.DOM.label(null, 
	            this._labelAlignLeft() && this.props.label, 
	            React.DOM.input({type: "checkbox", 
	                    checked: this.props[propName], 
	                    onChange: this.toggle}), 
	            !this._labelAlignLeft() && this.props.label
	        );
	    },

	    toggle: function() {
	        var propName = this.propName();
	        var changes = {};
	        changes[propName] = !this.props[propName];
	        this.props.onChange(changes);
	    }
	});

	module.exports = PropCheckBox;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(32);
	var EventEmitter = __webpack_require__(33).EventEmitter;
	var AppDispatcher = __webpack_require__(26);
	var $__0=    __webpack_require__(3),constants=$__0.constants;
	var $__1=       constants,ADD_SPELL=$__1.ADD_SPELL,SET_ACTIVE_SPELL=$__1.SET_ACTIVE_SPELL,NEXT_PROBLEM=$__1.NEXT_PROBLEM,ADJUST_COUNTERS=$__1.ADJUST_COUNTERS;

	/* Information about the user state. */
	var _user = null;

	var defaultUser = function()  {
	    return {
	        unlockedExercises: [],
	        activeExercise: null,
	        problemIndex: 0,
	        exerciseCounters: {}
	    };
	};

	var getOrCreateUser = function()  {
	    if (_user == null) {
	        _user = defaultUser();
	    }
	    return _user;
	};

	var dispatcherIndex = AppDispatcher.register(function(payload) {
	    var action = payload.action;

	    switch (action.actionType) {
	        case ADD_SPELL:
	            if (!_.contains(getOrCreateUser().unlockedExercises, action.exerciseName)) {
	                getOrCreateUser().unlockedExercises.push(action.exerciseName);
	                getOrCreateUser().exerciseCounters[action.exerciseName] = 0;
	                break;
	            } else {
	                console.log("I ALREADY HAVE IT!");
	            }

	        case SET_ACTIVE_SPELL:
	            getOrCreateUser().activeExercise = action.exerciseName;
	            break;

	        case NEXT_PROBLEM:
	            getOrCreateUser().problemIndex += 1;
	            break;

	        case ADJUST_COUNTERS:
	            var user = getOrCreateUser();
	            var unusedExercises = _.filter(user.unlockedExercises,
	                function(exerciseName)  {return exerciseName !== action.exerciseName;});

	            user.exerciseCounters[action.exerciseName] = 0;
	            _.each(unusedExercises, function(exerciseName)  {
	                user.exerciseCounters[exerciseName]++;
	            });
	            break;

	        default:
	            return true;
	    }

	    UserStore.emitChange();
	    return true;
	});

	var UserStore = _({}).extend(
	    EventEmitter.prototype,
	    {
	        getUser: function() {
	            return _.clone(getOrCreateUser());
	        },

	        getCounter: function(exerciseName) {
	            return getOrCreateUser().exerciseCounters[exerciseName];
	        },

	        addChangeListener: function(callback) {
	            this.on("change", callback);
	        },

	        removeChangeListener: function(callback) {
	            this.removeListener("change", callback);
	        },

	        emitChange: function() {
	            this.emit("change");
	        }
	    }
	);

	module.exports = UserStore;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(32);
	var EventEmitter = __webpack_require__(33).EventEmitter;
	var AppDispatcher = __webpack_require__(26);
	var $__0=     __webpack_require__(3),constants=$__0.constants,GameViews=$__0.GameViews;
	var MapStore = __webpack_require__(22);
	var $__1=       constants,CHANGE_STATE=$__1.CHANGE_STATE,START_COMBAT=$__1.START_COMBAT,MOVE=$__1.MOVE,SET_LOCATION=$__1.SET_LOCATION;
	var $__2=        __webpack_require__(21),BOSS=$__2.BOSS,WALL=$__2.WALL,OBJECT=$__2.OBJECT,DOOR=$__2.DOOR,GRASS=$__2.GRASS;
	var CombatConstants = __webpack_require__(18);
	var $__3=  __webpack_require__(24),assert=$__3.assert;
	var Mersenne = __webpack_require__(46);

	/* Information about the user state. */

	// The dialog currently visible
	var _dialog = "intro";

	var _spellSplash = null;

	var _view = GameViews.MAP;

	var _inCombat = false;

	var _playerLocation = {x: 1, y: 9}; // coords to start at during cottage
	var _playerDirection = "RIGHT";
	var _lastLeftRight = "RIGHT";

	var flipLeftRight = function(leftRight) {
	    if (leftRight === "LEFT") { return "RIGHT"; }
	    if (leftRight === "RIGHT") { return "LEFT"; }
	    return leftRight;
	}

	var stepState = function(direction) {

	    // move one block in that direction
	    var candidateLocation = _.clone(_playerLocation);
	    switch (direction) {
	        case "UP":
	            candidateLocation.y--;
	            break;

	        case "DOWN":
	            candidateLocation.y++;
	            break;

	        case "LEFT":
	            candidateLocation.x--;
	            _lastLeftRight = direction;
	            break;

	        case "RIGHT":
	            candidateLocation.x++;
	            _lastLeftRight = direction;
	            break;
	    }
	    _playerDirection = direction;

	    // consult the interaction layer to see if we can go that direction or if
	    // we triggered an action!
	    var interaction = MapStore.getInteractionForLocation(candidateLocation);

	    switch (interaction) {
	        case BOSS:
	            // TODO real boss
	            var forestTrollStats = MonsterStore.getById("forest_troll");
	            var forestTroll = EntityStore.createEntity(forestTrollStats);
	            CombatActions.startCombat([forestTroll]);
	            break;

	        case WALL:
	            // can't go that way. just don't update the state.
	            break;

	        case OBJECT:
	            Actions.mapInteraction();
	            _playerLocation = candidateLocation;
	            break;

	        case DOOR:
	            Actions.nextMap();
	            // how does a door encode where it leads?
	            break;

	        case GRASS:
	        default:
	            if (!MapStore.currentMapIsSafe()) {
	                // 1-3 enemies
	                // wolves or spiders

	                // TODO: make this driven by the map
	                // 5% chance of an encounter
	                if (Mersenne.rand(20) < 1) {
	                    var monsterStats;
	                    if (Mersenne.rand(2) < 1) {
	                        monsterStats = MonsterStore.getById("direwolf");
	                    } else {
	                        monsterStats = MonsterStore.getById("spider");
	                    }

	                    var num = Math.floor(Mersenne.rand(3)) + 1;
	                    var monsters = _.times(num,
	                        function()  {return EntityStore.createEntity(monsterStats);});
	                    CombatActions.startCombat(monsters);
	                }
	            }

	            _playerLocation = candidateLocation;
	    }
	}


	var dispatcherIndex = AppDispatcher.register(function(payload) {
	    var action = payload.action;

	    switch (action.actionType) {
	        case MOVE:
	            stepState(action.direction);
	            break;

	        case SET_LOCATION:
	            _playerLocation = action.location;
	            break;

	        case CombatConstants.START_COMBAT:
	            AppDispatcher.waitFor([CombatStore.dispatcherIndex], function()  {
	                assert(!_inCombat, "Can't start combat while you're in combat!");
	                _inCombat = true;
	                _view = GameViews.COMBAT;
	                GameStore.emitChange();
	            });
	            break;

	        case CombatConstants.END_COMBAT:
	            AppDispatcher.waitFor([CombatStore.dispatcherIndex], function()  {
	                assert(_inCombat, "Can't end combat when you're not in combat.");
	                _inCombat = false;
	                _view = GameViews.MAP;
	                GameStore.emitChange();
	            });
	            break;

	        case constants.OPEN_SPELLBOOK:
	            // give magic missile just in case we don't have it
	            Actions.addSpell("making-totals-in-different-ways-within-10");
	            assert(_inCombat, "Can't open the spellbook outside of combat");
	            _view = GameViews.SPELLBOOK;
	            break;

	        case constants.CLOSE_SPELLBOOK:
	            assert(_inCombat, "Can't close the spellbook outside of combat");
	            _view = GameViews.COMBAT;
	            break;

	        case constants.SHOW_DIALOG:
	            _dialog = action.scene;
	            break;

	        case constants.HIDE_DIALOG:
	            _dialog = null;
	            break;

	        case constants.SHOW_SPELL_SPLASH:
	            _spellSplash = _.pick(action, "exerciseName", "description", "videoURL");
	            Actions.addSpell(action.exerciseName);
	            break;

	        case constants.HIDE_SPELL_SPLASH:
	            _spellSplash = null;
	            break;

	        default:
	            return true;
	    }

	    GameStore.emitChange();
	    return true;
	});

	var GameStore = _({}).extend(
	    EventEmitter.prototype,
	    {
	        getCurrentView: function() {
	            return _view;
	        },

	        getInCombat: function() {
	            return _inCombat;
	        },

	        getLocation: function() {
	            return _playerLocation;
	        },

	        getDirection: function() {
	            return _playerDirection;
	        },

	        getLastLeftRight: function() {
	            return _lastLeftRight;
	        },

	        getDialog: function() {
	            return _dialog;
	        },

	        getSpellSplash: function() {
	            return _.clone(_spellSplash);
	        },

	        addChangeListener: function(callback) {
	            this.on("change", callback);
	        },

	        removeChangeListener: function(callback) {
	            this.removeListener("change", callback);
	        },

	        emitChange: function() {
	            this.emit("change");
	        }
	    }
	);

	module.exports = GameStore;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var CombatConstants = {
	    START_COMBAT: "START_COMBAT",
	    END_COMBAT: "END_COMBAT",
	    USE_ABILITY: "USE_ABILITY",
	    PLAYER_CAST_SPELL: "PLAYER_CAST_SPELL",
	    PLAYER_CHOOSE_TARGET: "PLAYER_CHOOSE_TARGET",

	    CombatEngineStates: {
	        AWAITING_PLAYER_TURN: "AWAITING_PLAYER",
	        PLAYER_SELECTING_TARGET: "SELECTING_TARGET",
	        RUNNING: "RUNNING_TURN"
	    }
	};

	module.exports = CombatConstants;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Some ideas:
	// * Wrapping a Shortcut around a button or something makes it automatically
	// take on that button's effect
	// * Restrict firing to the most specific element
	//   * could sort valid elements using `.contains`?
	// * simplified syntax for just one action

	// TODO: find a better way to add this? the npm mousetrap repo is pretty out of
	// date.
	var Mousetrap = __webpack_require__(39);
	__webpack_require__(40);

	var React = __webpack_require__(31);

	var ShortcutRegistry = (function() {

	    // Mousetrap only allows us to bind a single callback to a key combination,
	    // so we wrap around it in order to avoid annoying situations where adding
	    // or removing a shortcut could wipe out another one, and also to allow for
	    // scoped shortcuts.
	    var registered = {};

	    var concatHandlers = function(handlers) {
	        return function(e) {
	            handlers.forEach(function(handler) {
	                if (handler.scope === null ||
	                        handler.scope.contains(e.target)) {
	                    handler.onTrigger(e);
	                }
	            });
	        };
	    };

	    var rebindTrigger = function(trigger) {
	        var newCallback = concatHandlers(registered[trigger]);
	        Mousetrap.bindGlobal(trigger, newCallback);
	    };

	    var register = function(shortcut) {
	        var trigger = shortcut.trigger;
	        var onTrigger = shortcut.onTrigger;
	        var id = shortcut.id;
	        var scope = shortcut.scope;
	        if (registered[trigger] === undefined) {
	            registered[trigger] = [];
	        }
	        registered[trigger].push({
	            onTrigger: onTrigger,
	            id: id,
	            scope: scope
	        });

	        rebindTrigger(trigger);
	    };

	    var unregister = function(trigger, id) {
	        registered[trigger] = registered[trigger].filter(function(entry) {
	            return entry.id !== id;
	        });

	        rebindTrigger(trigger);
	    };

	    return {
	        register: register,
	        unregister: unregister
	    };
	})();

	var makeCounter = function() {
	    var i = 0;
	    return function() { return i++; };
	};

	var getUniqueId = makeCounter();

	var Shortcut = React.createClass({
	    getDefaultProps: function() {
	        return {
	            actions: {}
	        };
	    },

	    getInitialState: function() {
	        return {
	            id: getUniqueId()
	        };
	    },

	    componentDidMount: function() {
	        this._register(this.props);
	    },

	    componentWillReceiveProps: function(nextProps) {
	        this._unregister();
	        this._register(nextProps);
	    },

	    componentWillUnmount: function() {
	        this._unregister();
	    },

	    _register: function(props) {
	        var self = this;
	        Object.keys(props.actions).forEach(function(trigger) {
	            var handler = props.actions[trigger].handler;
	            self._registerSingle(trigger, handler, self._scope());
	        })
	    },

	    _scope: function() {
	        return this.props.children ? this.getDOMNode() : null;
	    },

	    _registerSingle: function(trigger, handler, scope) {
	        ShortcutRegistry.register({
	            trigger: trigger,
	            onTrigger: handler,
	            id: this.state.id,
	            scope: scope
	        });
	    },

	    _unregister: function() {
	        var self = this;
	        Object.keys(this.props.actions).forEach(function(trigger) {
	            ShortcutRegistry.unregister(trigger, self.state.id);
	        })
	    },

	    render: function() {
	        return React.DOM.span(null, this.props.children);
	    }
	});

	module.exports = Shortcut;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var _ = __webpack_require__(32);
	var React = __webpack_require__(31);

	var Animation = __webpack_require__(7);

	var SNOW = "SNOW";
	var FOG = "FOG";
	var RAIN = "RAIN";
	var DARKRAIN = "DARKRAIN";
	var DARKSNOW = "DARKSNOW";

	var WeatherRenderer = React.createClass({displayName: 'WeatherRenderer',

	    propTypes: {
	        type: React.PropTypes.oneOf([
	            SNOW,
	            FOG,
	            RAIN,
	            DARKRAIN,
	            DARKSNOW
	        ])
	    },

	    getParticleCloudForType: function (props) {
	        props = props || this.props;
	        var animProps = {
	            size: [props.width, props.height]
	        };

	        switch (props.type) {
	            case SNOW:
	            case DARKSNOW:
	                return new Animation.SnowFlakeCloud(animProps);

	            case FOG:
	                return new Animation.FogParticleCloud(animProps);

	            case RAIN:
	            case DARKRAIN:
	                return new Animation.RainCloud(animProps);

	            default:
	                return null;
	        }
	    },

	    shouldComponentUpdate: function(nextProps, nextState) {
	        return nextProps.type !== this.props.type;
	    },

	    getDefaultProps: function () {
	        return {
	            type: null
	        };
	    },

	    render: function () {
	       var canvasStyle = {
	            position: "absolute",
	            zIndex: 2
	        };

	        if (this.props.type === DARKRAIN || this.props.type === DARKSNOW) {
	            return React.DOM.div(null, 
	                Animation.DarkRenderer({
	                    width: this.props.width, 
	                    height: this.props.height}), 
	                Animation.ParticleCloudRenderer({
	                    particleCloud: this.getParticleCloudForType(), 
	                    style: canvasStyle})
	            );
	        }

	        return Animation.ParticleCloudRenderer({
	                    particleCloud: this.getParticleCloudForType(), 
	                    style: canvasStyle});
	    }
	});

	module.exports = {
	    WeatherRenderer:WeatherRenderer,
	    SNOW:SNOW,
	    RAIN:RAIN,
	    FOG:FOG,
	    DARKRAIN:DARKRAIN,
	    DARKSNOW:DARKSNOW
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

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

	    MAP_WIDTH_BLOCKS:MAP_WIDTH_BLOCKS,
	    MAP_HEIGHT_BLOCKS:MAP_HEIGHT_BLOCKS,
	    MAP_WIDTH_PX: MAP_WIDTH_BLOCKS * BLOCK,
	    MAP_HEIGHT_PX: MAP_HEIGHT_BLOCKS * BLOCK,

	    BLOCK:BLOCK
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(33).EventEmitter;
	var AppDispatcher = __webpack_require__(26);
	var SpriteLoader = __webpack_require__(23);
	var EntityStore = __webpack_require__(5);
	var $__0=    __webpack_require__(3),constants=$__0.constants;
	var $__1=         constants,SET_LOCATION=$__1.SET_LOCATION,FETCH_MAP_DATA=$__1.FETCH_MAP_DATA,MOVE=$__1.MOVE,SET_MAP=$__1.SET_MAP,NEXT_MAP=$__1.NEXT_MAP,MAP_OBJECT_INTERACTION=$__1.MAP_OBJECT_INTERACTION;
	var $__2=            __webpack_require__(21),MONSTER=$__2.MONSTER,WALL=$__2.WALL,OBJECT=$__2.OBJECT,DOOR=$__2.DOOR,START=$__2.START,GRASS=$__2.GRASS,EMPTY=$__2.EMPTY,MAP_WIDTH_BLOCKS=$__2.MAP_WIDTH_BLOCKS,MAP_HEIGHT_BLOCKS=$__2.MAP_HEIGHT_BLOCKS;
	var Weather = __webpack_require__(20);

	var MAPS = {
	    desert: {
	        name: "desert",
	        manifestName: "desert.json",
	        nextWorld: "cave",
	        safe: false,
	        weather: null
	    },

	    cave: {
	        name: "cave",
	        manifestName: "cave.json",
	        nextWorld: "cottage",
	        safe: false,
	        weather: Weather.FOG
	    },

	    salinterior: {
	        name: "salinterior",
	        manifestName: "salinterior.json",
	        nextWorld: "darkforest",
	        safe: true,
	        weather: null
	    },

	    cottage: {
	        name: "cottage",
	        manifestName: "cottage.json",
	        nextWorld: "salinterior",
	        safe: true,
	        weather: Weather.RAIN
	    },

	    darkforest: {
	        name: "darkforest",
	        manifestName: "darkforest.json",
	        nextWorld: "cave",
	        weather: Weather.DARKSNOW
	    },

	    fortress: {
	        name: "fortress",
	        manifestName: "fortress.json",
	        safe: false,

	        // TEMP: loop back around
	        nextWorld: "desert",
	        weather: Weather.DARKRAIN
	    }
	};

	var MAP_OBJECT_INTERACTIONS = {
	    salinterior: function()  {
	        Actions.showSpellSplash(
	            "making-totals-in-different-ways-within-10",
	            "This is your first spell, and it's a good one! In order to cast it, you'll need to exercise your mathematical mind. Watching this video might help you out.",
	            "https://www.khanacademy.org/embed_video?v=AuX7nPBqDts"
	        );
	    },
	    darkforest: _.once(function()  {
	        Actions.showDialog("darkforest");
	    }),
	    cottage: _.once(function()  {
	        Actions.showDialog("approach-house");
	        Actions.setWeather();
	    })
	};

	var _currentMap = "cottage";
	var _currentWeather = null;
	var _resourcesLoaded = false;
	var _tilesLoadedCount = 0;

	// the offset of the map and character in the viewport, in *blocks*
	var _mapOffset = { x: 0, y: 0 };
	var _characterOffset = { x: 0, y: 0 };

	// metadata about each map:
	// { overworld: object, cave: object }
	var _manifests = {};

	// the tiles are located in a few images
	var _tileImages = {};

	var clamp = function(n, min, max) {
	    return Math.max(min, Math.min(n, max));
	};

	var movePositions = function(direction, $__0   ) {var width=$__0.width,height=$__0.height;
	    // offsets measured in blocks, *not pixels*
	    var BUFFER = 5;

	    if (direction === "LEFT" || direction === "RIGHT") {
	        var diff = direction === "LEFT" ? -1 : 1;

	        // try to move the character
	        _characterOffset.x = clamp(_characterOffset.x + diff,
	            0, MAP_WIDTH_BLOCKS);

	        var mapX = _mapOffset.x;
	        // close to the edge! try to move the map instead of the character
	        if (_characterOffset.x < BUFFER ||
	            _characterOffset > MAP_WIDTH_BLOCKS - BUFFER) {

	                var maxOffX = Math.max(width - MAP_WIDTH_BLOCKS, 0);
	                mapX = clamp(mapX + diff, 0, maxOffX);
	        }

	        // the map moved - the character should not
	        if (mapX !== _mapOffset.x) {
	            _characterOffset.x -= diff;
	        }
	    }

	    if (direction === "UP" || direction === "DOWN") {
	        var diff = direction === "UP" ? -1 : 1;

	        // try to move the character
	        _characterOffset.y = clamp(_characterOffset.y + diff,
	            0, MAP_HEIGHT_BLOCKS);

	        var mapY = _mapOffset.y;
	        // close to the edge! try to move the map instead of the character
	        if (_characterOffset.y < BUFFER ||
	            _characterOffset > MAP_HEIGHT_BLOCKS - BUFFER) {

	                var maxOffY = Math.max(width - MAP_HEIGHT_BLOCKS, 0);
	                mapY = clamp(mapY + diff, 0, maxOffY);
	        }

	        // the map moved - the character should not
	        if (mapY !== _mapOffset.y) {
	            _characterOffset.y -= diff;
	        }
	    }
	};

	var findStart = function() {
	    if (_manifests[_currentMap] == null) {
	        return { x: 10, y: 10 };
	    }

	    var tilesets = _manifests[_currentMap].tilesets;
	    var interactionTileset = _(tilesets)
	        .findWhere({ image: "tilesets/special.png" });
	    if (!interactionTileset) {
	        interactionTileset = _(tilesets)
	            .findWhere({ image: "../../KhanQuest/art/tilesets/special.png" });
	    }
	    if (!interactionTileset) {
	        interactionTileset = _(tilesets)
	            .findWhere({ name: "interaction" });
	    }
	    if (!interactionTileset) {
	        interactionTileset = _(tilesets)
	            .findWhere({ name: "special" });
	    }
	    var firstgid = interactionTileset.firstgid;

	    var interactionLayer = _(_manifests[_currentMap].layers)
	        .findWhere({ name: "interaction layer" });

	    var ix = 0;
	    _(interactionLayer.data).find(function(item, i)  {
	        if (item - firstgid + 1 === START) {
	            ix = i;
	            return true;
	        }
	    });

	    var x = ix % interactionLayer.width;
	    var y = ~~(ix / interactionLayer.width);
	    return { x:x, y:y };
	};

	var dispatcherIndex = AppDispatcher.register(function(payload) {
	    var action = payload.action;

	    switch (action.actionType) {
	        case FETCH_MAP_DATA:
	            _(MAPS).each(function(map, mapName)  {
	                var manifestName = map.manifestName;
	                $.getJSON(("art/" + manifestName)).done(function(obj)  {
	                    obj.weather = map.weather;
	                    _manifests[mapName] = obj;
	                    _tileImages[mapName] = [];
	                    _(obj.tilesets)
	                        .each(function(set)  {
	                            var img = new Image();
	                            img.src = ("art/" + set.image);
	                            img.onload = function()  {
	                                _tilesLoadedCount++;
	                                MapStore.emitChange();
	                            };
	                            _tileImages[mapName].push(img);
	                        });
	                });
	            });
	            break;

	        case MOVE:
	            var man = _manifests[_currentMap];
	            var dimensions = { width: man.width, height: man.height };

	            movePositions(action.direction, dimensions);
	            break;

	        case SET_LOCATION:
	            _characterOffset = action.location;
	            break;

	        case NEXT_MAP:
	            _currentMap = MAPS[_currentMap].nextWorld;
	            _currentWeather = MAPS[_currentMap].weather;

	            if (_currentMap == "cave") {
	                // add rest of spells
	                // A few arcane spells...
	                Actions.addSpell("meaning-of-equal-sign-1");
	                Actions.addSpell("comparing-with-multiplication");

	                // A few fire spells...
	                Actions.addSpell("area_of_triangles_1");
	                Actions.addSpell("area-of-triangles-2");
	                Actions.addSpell("composing-and-decomposing-shapes");

	                // A few frost spells...
	                Actions.addSpell("identifying-parts-of-expressions");
	                Actions.addSpell("manipulating-linear-expressions-with-rational-coefficients");
	            }

	            Actions.setLocation(findStart());
	            break;

	        case SET_MAP:
	            _currentMap = MAPS[action.name].name;
	            break;

	        case constants.SET_WEATHER:
	            _currentWeather = Weather.DARKRAIN // TODO(dmnd): parameterize
	            MapStore.emitChange();
	            break;

	        case MAP_OBJECT_INTERACTION:
	            MAP_OBJECT_INTERACTIONS[_currentMap]();

	        default:
	            return true;
	    }

	    MapStore.emitChange();
	    return true;
	});

	var MapStore = _({}).extend(
	    EventEmitter.prototype,
	    {
	        getLayers: function() {
	            if (_manifests[_currentMap] == null) {
	                return [];
	            }

	            return _(_manifests[_currentMap].layers)
	                .map(function(layer, i)  {
	                    return {
	                        layer:layer,
	                        scene: _manifests[_currentMap],
	                        images: _tileImages[_currentMap]
	                    };
	                });
	        },

	        getManifest: function() {
	            return _manifests[_currentMap];
	        },

	        getTilesLoadedCount: function() {
	            return _tilesLoadedCount;
	        },

	        currentMapIsSafe: function() {
	            return MAPS[_currentMap].safe;
	        },

	        getCurrentMap: function() {
	            return MAPS[_currentMap];
	        },

	        getCurrentWeather: function() {
	            return _currentWeather;
	        },

	        getMapOffset: function() {
	            return _mapOffset;
	        },

	        getCharacterOffset: function() {
	            return _characterOffset;
	        },

	        getIsLoading: function() {
	            return !_resourcesLoaded;
	        },

	        getInteractionForLocation: function($__0   ) {var x=$__0.x,y=$__0.y;
	            var manifest = _manifests[_currentMap];
	            var layer = _(manifest.layers)
	                .findWhere({ name: "interaction layer" });
	            var tileset = _(manifest.tilesets)
	                .findWhere({ name: "interaction" });

	            var tileIx = y * layer.width + x;
	            var tileId = layer.data[tileIx];

	            // no interaction
	            if (tileId === 0) {
	                return EMPTY;
	            } else {
	                // ?
	                return tileId - tileset.firstgid + 1;
	            }
	        },

	        addChangeListener: function(callback) {
	            this.on("change", callback);
	        },

	        removeChangeListener: function(callback) {
	            this.removeListener("change", callback);
	        },

	        emitChange: function() {
	            this.emit("change");
	        }
	    }
	);

	var playerSprites = EntityStore.getPlayer().sprites;
	SpriteLoader.loadSprites(_.values(playerSprites)).then(function()  {
	    _resourcesLoaded = true;
	    MapStore.emitChange();
	});

	module.exports = MapStore;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite = __webpack_require__(6).Sprite;
	var Resources = __webpack_require__(6).Resources;

	var testJSON = JSON.stringify([
	    {
	        id: 'default',
	        url: 'resources/default.png',
	        pos: [0, 0],
	        size: [128, 128],
	        speed: 0.005,
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
	        id: 'red-mage-up-female',
	        url: 'resources/red-mage-female.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [12],
	        dir: 'horizontal',
	        once: false,
	        scale: 0.75
	    },
	    {
	        id: 'red-mage-down-female',
	        url: 'resources/red-mage-female.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0],
	        dir: 'horizontal',
	        once: false,
	        scale: 0.75
	    },
	    {
	        id: 'red-mage-right-female',
	        url: 'resources/red-mage-female.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0],
	        dir: 'horizontal',
	        once: false,
	        scale: 0.75
	    },
	    {
	        id: 'red-mage-left-female',
	        url: 'resources/red-mage-female.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0],
	        dir: 'horizontal',
	        once: false,
	        scale: 0.75
	    },
	    {
	        id: 'red-mage-walk-up-female',
	        url: 'resources/red-mage-female.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [13, 13, 14, 14],
	        dir: 'horizontal',
	        once: false,
	        scale: 0.75
	    },
	    {
	        id: 'red-mage-walk-down-female',
	        url: 'resources/red-mage-female.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [10, 10, 11, 11],
	        dir: 'horizontal',
	        once: false,
	        scale: 0.75
	    },
	    {
	        id: 'red-mage-walk-right-female',
	        url: 'resources/red-mage-female.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [10, 10, 11, 11],
	        dir: 'horizontal',
	        once: false,
	        scale: 0.75
	    },
	    {
	        id: 'red-mage-walk-left-female',
	        url: 'resources/red-mage-female.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [10, 10, 11, 11],
	        dir: 'horizontal',
	        once: false,
	        scale: 0.75
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
	        frameIndices: [0, 9, 9, 9, 9, 0, 0, 0, 0, 0],
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
	        frameIndices: [0, 0, 0],
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
	        frameIndices: [3, 4, 4, 3],
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
	        frameIndices: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 5, 6, 5, 4],
	        dir: 'horizontal',
	        once: false,
	        scale: 2
	    },
	    {
	        id: 'direwolf-attack',
	        url: 'resources/direwolf.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [0, 7, 0],
	        dir: 'horizontal',
	        once: false,
	        scale: 2
	    },
	    {
	        id: 'direwolf-damaged',
	        url: 'resources/direwolf.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [1, 2, 1],
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
	        frameIndices: [1, 1, 1, 1, 1, 1, 2, 3, 4],
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
	    },
	    {
	        id: 'current-turn-halo',
	        url: 'resources/halo.png',
	        pos: [0, 0],
	        size: [72, 72],
	        speed: 0.005,
	        frameIndices: [0, 1, 2, 3, 4, 5, 6],
	        dir: 'horizontal',
	        once: false,
	        scale: 2
	    },
	]);

	var _spriteDict = {};

	var load = function(json) {
	    var rawSpriteObjects = JSON.parse(json);
	    rawSpriteObjects.forEach(function(spriteObject) 
	        {return _spriteDict[spriteObject.id] = spriteObject;});
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
	            function(spriteId)  {return _spriteDict[spriteId].url;});
	        return Resources.loadAll(urls);
	    },

	    debug: _spriteDict
	};

	module.exports = SpriteLoader;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(42);

	var assert = function(cond, msg) {
	    if (!cond) {
	        throw ("assert failed: " + msg);
	    }
	};

	var wait = function(ms) {
	    return new Promise(function(resolve, reject)  {
	        window.setTimeout(resolve.bind(null, ms), ms);
	    });
	};

	module.exports = {assert:assert, wait:wait};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var RP = React.PropTypes;


	var HealthBar = React.createClass({displayName: 'HealthBar',
	    propTypes: {
	        entity: RP.object.isRequired
	    },

	    render: function() {
	        var currentHealth = Math.max(this.props.entity.health, 0);
	        var maxHealth = this.props.entity.hp
	        var pc = 100 * currentHealth / maxHealth;
	        var width = (pc + "%");

	        var className = React.addons.classSet({
	            'health-bar-container': true,
	            'full-health': pc >= 100
	        })

	        return React.DOM.div({className: className}, 
	            React.DOM.span(null, currentHealth), 
	            React.DOM.div({className: "health-bar"}, 
	                React.DOM.div({className: "filled", style: {width: width}})
	            )
	        );
	    }
	});

	module.exports = HealthBar;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Dispatcher = __webpack_require__(37);

	var AppDispatcher = _.extend({}, Dispatcher.prototype, {
	    /**
	    * A bridge function between the views and the dispatcher, marking the
	    * action as a view action.
	    * @param  {Object} action The data coming from the view.
	    */
	    handleViewAction: function(action) {
	        console.log(action);
	        this.dispatch({
	            source: 'VIEW_ACTION',
	            action: action
	        });
	    },

	    /**
	    * A bridge function between the server and the dispatcher, marking the
	    * action as a server action.
	    * @param  {Object} action The data coming from the view.
	    */
	    handleServerAction: function(action) {
	        this.dispatch({
	            source: 'SERVER_ACTION',
	            action: action
	        });
	    }
	});

	module.exports = AppDispatcher;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A React mixin factory which syncs state with a flux-style datastore. In
	 * order to be compatible with this mixin, the datastore must support the
	 * addition and removal of change event handlers via `addChangeListener` and
	 * `removeChangeListener` respectively.
	 *
	 * The StateFromStore factory function takes a dictionary of stateDescriptors,
	 * which are objects with the following 3 properties:
	 *
	 * store: a Datastore, which must support adding and removing change event
	 * handlers
	 *
	 * getFetchParams: a function which takes props and returns the data required to
	 * fetch the desired state from the store (or null, if no such data is
	 * required).  (This is used for caching -- if the fetchParams do not change
	 * based on prop changes, no fetch will be done).
	 *
	 * fetch: a function which takes the datastore and fetchParams (returned from
	 * the corresponding getFetchParams function), and which returns the new state
	 * value.
	 *
	 *
	 * Example for a component which sets its state.userMission from a
	 * UserMissionStore:
	 *
	 * mixins = [StateFromStore({
	 *     userMission: {
	 *         store: UserMissionStore,
	 *         getFetchParams: function(props) {
	 *             return {missionSlug: props.missionSlug};
	 *         },
	 *         fetch: function(store, fetchParams) {
	 *             store.getBySlug(fetchParams.missionSlug);
	 *         }
	 *     }
	 * })];
	 */

	//TODO(zach): unit test me

	var StateFromStore = function(stateDescriptors) {
	    var storageKey = _.uniqueId("StateFromStoreMixin");

	    var fetch = function(stateKey, fetchParams) {
	        var stateDescriptor = stateDescriptors[stateKey];
	        return stateDescriptor.fetch(stateDescriptor.store, fetchParams);
	    };

	    var setState = function(component, stateKey, stateData) {
	        var newState = {};
	        newState[stateKey] = stateData;
	        component.setState(newState);
	    };

	    /**
	     * Fetch the new state data using the fetch method included in
	     * stateDescriptors. If useCache is true, no fetch will occur if
	     * fetchParams has not changed since the last fetch. If no fetch occurs,
	     * didFetch will be false in the return value.
	     *
	     * @param {Object} component the react component
	     * @param {string} stateKey the key which we are fetching
	     * @param {bool} useCache should we use the fetchParamsCache to guard against
	     * unnecessary fetches?
	     * @param {Object} [props] the props to use for fetchParams. If not
	     * specified, use the component's current props
	     *
	     * @returns {{stateData, didFetch:bool}} the state data, along with whether
	     * an actual fetch occurred
	     */
	    var fetchNewStateData = function(component, stateKey, useCache, props) {
	        props = props || component.props;

	        var fetchParamsCache = component[storageKey].fetchParamsCache;

	        var stateDescriptor = stateDescriptors[stateKey];
	        var fetchParams = null;
	        if (stateDescriptor.getFetchParams) {
	            fetchParams = stateDescriptor.getFetchParams(props);
	        }

	        if (useCache && _.isEqual(fetchParamsCache[stateKey], fetchParams)) {
	            // fetchParams haven't changed, we don't need to fetch
	            return {stateData: null, didFetch: false};
	        }

	        fetchParamsCache[stateKey] = fetchParams;
	        var stateData = stateDescriptor.fetch(stateDescriptor.store,
	                                              fetchParams);

	        return {stateData: stateData, didFetch: true};
	    };

	    var fetchForUpdate = function(component, stateKey) {
	        // give destructuring plz
	        var stateData = fetchNewStateData(
	            component, stateKey, false).stateData;
	        setState(component, stateKey, stateData);
	    };

	    var fetchForNewProps = function(component, stateKey, props) {
	        // give destructuring plz
	        var fetchData = fetchNewStateData(component, stateKey, true, props);
	        if (fetchData.didFetch) {
	            var stateData = fetchData.stateData;
	            setState(component, stateKey, stateData);
	        }
	    };

	    var addChangeListeners = function(component) {
	        var changeListeners = component[storageKey].changeListeners;
	        _.each(stateDescriptors, function(stateDescriptor, stateKey) {
	            var handleChange = fetchForUpdate.bind(
	                null, component, stateKey);
	            changeListeners[stateKey] = handleChange;
	            stateDescriptor.store.addChangeListener(handleChange);
	        });
	    };

	    var removeChangeListeners = function(component) {
	        var changeListeners = component[storageKey].changeListeners;
	        _.each(stateDescriptors, function(stateDescriptor, stateKey) {
	            stateDescriptor.store.removeChangeListener(
	                changeListeners[stateKey]);
	            delete changeListeners[stateKey];
	        });
	    };

	    var fetchAllForNewProps = function(component, props) {
	        Object.keys(stateDescriptors).forEach(function(stateKey) {
	            fetchForNewProps(component, stateKey, props);
	        });
	    };

	    return {
	        getInitialState: function() {
	            this[storageKey] = {
	                /* A dictionary from state keys to cached fetchParams */
	                fetchParamsCache: {},

	                /* A dictionary from state keys to change event handlers */
	                changeListeners: {}
	            };

	            var initialState = {};
	            Object.keys(stateDescriptors).forEach(function(stateKey) {
	                var stateData = fetchNewStateData(
	                    this, stateKey, false).stateData;
	                initialState[stateKey] = stateData;
	            }.bind(this));
	            return initialState;
	        },

	        componentDidMount: function() {
	            addChangeListeners(this);
	        },

	        componentWillUnmount: function() {
	            removeChangeListeners(this);
	        },

	        componentWillReceiveProps: function(nextProps) {
	            fetchAllForNewProps(this, nextProps);
	        }
	    };
	};

	module.exports = StateFromStore;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/**
	 * Changeable
	 *
	 * Adds a this.change() function to a component
	 *
	 * This.change takes prop changes as parameters, and calls
	 * this.props.onChange with the modified props.
	 */

	var WIDGET_PROP_BLACKLIST = __webpack_require__(41);

	var USAGE = "Usage:\n" +
	            "  this.change({propName: 5}, callback);\n" +
	            "  this.change(\"propName\", 5, callback);\n" +
	            "  this.change(\"propName\")";

	/**
	 * Primary helper function for this.change()
	 *
	 * Takes the parameters in a consistent style, once this.change() has
	 * figured out which way it was called.
	 */
	var _changeMultiple = function(component, newProps, callback) {
	    // Omit "default" props:
	    // ref and key come from react, and don't actually represent
	    //   the conceptual state of our component
	    // onChange comes from our parent to allow this modification,
	    //   and doesn't conceptually represent the state of our component
	    var currProps = _.omit(component.props, WIDGET_PROP_BLACKLIST);
	    var nextProps = _.extend(currProps, newProps);
	    component.props.onChange(nextProps, callback);
	};

	/**
	 * Helper function for changing a single prop
	 */
	var _changeSingle = function(component, propName, value, callback) {
	    if (value === undefined) {
	        // If called with a single prop name, return a lambda to change
	        // a single prop on the current object
	        return _.partial(_changeSingle, component, propName);
	    } else {
	        // If called with two values, change a single prop of the
	        // current object
	        var newProps = {};
	        newProps[propName] = value;
	        _changeMultiple(component, newProps, callback);
	    }
	};

	/**
	 * this.change()
	 *
	 * Can be called as follows:
	 * this.change(newProps, callback);
	 *
	 * this.change(propName, propValue, callback);
	 *
	 * this.change(propName) -> returns a lambda that takes a prop value to
	 * set and a callback to call after having set that value.
	 */
	var change = function(newPropsOrSinglePropName,
	                      propValue,
	                      callback) {

	    if (_.isObject(newPropsOrSinglePropName) &&
	            callback === undefined) {
	        // Called with an object of multiple props to change
	        callback = propValue;
	        return _changeMultiple(
	            this,
	            newPropsOrSinglePropName,  // object newProps
	            callback
	        );

	    } else if (_.isString(newPropsOrSinglePropName)) {
	        // Called with a string propName of a single prop to change
	        return _changeSingle(
	            this,
	            newPropsOrSinglePropName,  // string propName
	            propValue,
	            callback
	        );

	    } else {
	        throw new Error("Invalid types sent to this.change(): " +
	                _.toArray(arguments).join() + "\n" + USAGE);
	    }
	};

	var Changeable = {
	    propTypes: {
	        onChange: React.PropTypes.func.isRequired
	    },
	    change: change
	};

	module.exports = Changeable;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	    function AnimationTimingEngine() {"use strict";
	        this.currentIndex = 0;
	        this.running = false;
	        this.rafId = null;
	        this.lastFrameTime = null;
	        this.updatables = [];
	    }

	    AnimationTimingEngine.prototype.start=function() {"use strict";
	        this.running = true;
	        this.lastFrameTime = null;
	        this.gameLoop();
	    };

	    AnimationTimingEngine.prototype.stop=function() {"use strict";
	        this.running = false;
	    };

	    AnimationTimingEngine.prototype.reset=function() {"use strict";
	        if (this.rafId) {
	            window.cancelAnimationFrame(this.rafId);
	        }
	        this.start();
	    };

	    AnimationTimingEngine.prototype.gameLoop=function(paintTime) {"use strict";
	        if (!this.lastFrameTime) {
	            this.lastFrameTime = paintTime;
	        } else {
	            var dt = paintTime - this.lastFrameTime; // dt in ms
	            this.lastFrameTime = paintTime;

	            this.tick(dt);
	        }

	        if (this.running) {
	            this.rafId = window.requestAnimationFrame(this.gameLoop.bind(this));
	        }
	    };

	    AnimationTimingEngine.prototype.tick=function(dt) {"use strict";
	        this.updatables.forEach(
	            function(updateWrapper)  {return updateWrapper.component.update(dt);});
	    };

	    AnimationTimingEngine.prototype.addUpdatable=function(component) {"use strict";
	        var index = this.currentIndex++;
	        // fine to put this at the end, it's just getting bigger
	        this.updatables.push({component: component, index: index});
	        return index;
	    };

	    AnimationTimingEngine.prototype.removeUpdatable=function(index) {"use strict";
	        var arrayIndex = _.sortedIndex(this.updatables, {index:index}, function(u)  {return u.index;});
	        if (this.updatables[arrayIndex].index === index) {
	            this.updatables.splice(arrayIndex, 1);
	        }
	    };
	;

	module.exports = AnimationTimingEngine;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var SpellStore = __webpack_require__(43);
	var _ = __webpack_require__(32);

	/* Grab data from spell.json datastore. */
	function Spell (exerciseName) {
	    this.exerciseName = exerciseName;
	    _.extend(this, SpellStore.getById(exerciseName));
	}

	module.exports = Spell;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.React;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window._;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        throw TypeError('Uncaught, unspecified "error" event.');
	      }
	      return false;
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var Spell = __webpack_require__(30);
	var UserStore = __webpack_require__(16);

	var SpellBadge = React.createClass({displayName: 'SpellBadge',
	    propTypes: {
	        exerciseName: React.PropTypes.string,
	        onClick: React.PropTypes.func
	    },

	    getDefaultProps: function () {
	        return {
	            exerciseName: null,
	            onClick: function() { }
	        };
	    },

	    _getClassName: function () {
	        var className = "spell-badge";
	        if (this.props.className) {
	            className += " " + this.props.className;
	        }
	        return className;
	    },

	    _renderImage: function () {
	        var spell = new Spell(this.props.exerciseName);

	        var asset = spell.displayName.toLowerCase().replace(/ /, '-');
	        var url = "static/img/spells/" + asset + ".png";
	        return React.DOM.img({className: "icon", src: url});
	    },

	    render: function () {
	        var spell = new Spell(this.props.exerciseName);
	        var powerUp = UserStore.getCounter(this.props.exerciseName);

	        var inlineBlock = {
	            display: "inline-block"
	        };

	        return React.DOM.div({
	                className: this._getClassName(), 
	                onClick: this.handleClick}, 
	            React.DOM.div({style: inlineBlock}, this._renderImage()), 
	            React.DOM.div({style: inlineBlock, className: "content"}, 
	                /* Only display powerup icon if it's relevant. */
	                powerUp > 0 && React.DOM.div({className: "powerup"}, "+", powerUp), 
	                React.DOM.div({className: "title"}, spell.displayName), 
	                React.DOM.div({className: "description"}, spell.description)
	            )
	        );
	    },

	    handleClick: function() {
	        this.props.onClick(this.props.exerciseName);
	    }
	});

	module.exports = SpellBadge;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var RP = React.PropTypes

	var Perseus = __webpack_require__(48);
	var CombatExerciseRenderer = __webpack_require__(44);
	var Spell = __webpack_require__(30);
	var Mersenne = __webpack_require__(46);


	var CombatExercise = React.createClass({displayName: 'CombatExercise',
	    propTypes: {
	        exerciseName: RP.string.isRequired,
	        problemIndex: RP.number.isRequired
	    },

	    getInitialState: function() {
	        return {
	            content: null,
	            loadedIndex: null,
	        };
	    },

	    componentWillMount: function() {
	        this._loadSpell();
	    },

	    componentWillReceiveProps: function(nextProps) {
	        var problemChanging = (
	            nextProps.exerciseName !== this.props.exerciseName ||
	            nextProps.problemIndex !== this.props.problemIndex);
	        if (problemChanging) {
	            this._loadSpell();
	        }
	    },

	    render: function() {
	        if (this.state.content) {
	            return React.DOM.div(null, 
	                
	                CombatExerciseRenderer({
	                    content: this.state.content, 
	                    onAttack: this.props.onAttack, 
	                    onFailedAttack: this.props.onFailedAttack})
	            );
	        } else {
	            return React.DOM.div(null, 
	                "Summoning spell..."
	            );
	        }
	    },

	    shuffle: function(items, seed) {
	        // mersenne wants a numeric seed
	        var seed = _.map(this.props.exerciseName, function(c)  {return c.charCodeAt();})
	        Mersenne.seed_array(seed);

	        // _.shuffle with seeded mersenne
	        var rand;
	        var index = 0;
	        var shuffled = [];
	        _.each(items, function(item) {
	            rand = Mersenne.rand(++index);
	            shuffled[index - 1] = shuffled[rand];
	            shuffled[rand] = item;
	        });
	        return shuffled;
	    },

	    _loadSpell: function() {
	        this.setState({content: null});

	        var problemIndex;
	        $.ajax({
	            url: "http://www.khanacademy.org/api/v1/exercises/" +
	                this.props.exerciseName,
	            cache: false
	        }).then(function(exercise)  {
	            var items = exercise.all_assessment_items;
	            var shuffledItems = _.shuffle(items);
	            var problemIndex = this.props.problemIndex;
	            var index = problemIndex % items.length;
	            var item = shuffledItems[index];
	            return $.ajax({
	                url: "http://www.khanacademy.org/api/v1/assessment_items/" +
	                    item.id +
	                    "?version=" +
	                    item.sha,
	                cache: false
	            });
	        }.bind(this)).then(function(item)  {
	            if (!this.isMounted()) {
	                // avoid errors when clicking quickly
	                return;
	            }
	            // TODO(aria): Make this not break everything if we've received new
	            // props
	            this.setState({content: JSON.parse(item.item_data), loadedIndex: problemIndex});
	        }.bind(this), function(err)  {
	            console.error("ERROR LOADING ITEM: ", err);
	        });
	    }
	});

	module.exports = CombatExercise;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var $__0=    __webpack_require__(3),Actions=$__0.Actions;
	var SpellBadge = __webpack_require__(34);

	var ActiveSpell = React.createClass({displayName: 'ActiveSpell',

	    _openSpellbook: function() {
	        Actions.openSpellbook();
	    },

	    render: function () {
	        if (this.props.exerciseName) {
	            return SpellBadge({className: "selected", 
	                        exerciseName: this.props.exerciseName, 
	                        onClick: this._openSpellbook});
	        } else {
	            return React.DOM.div({onClick: this._openSpellbook, className: "open-spellbook"}, 
	                "Click to open spellbook."
	            );
	        }
	    }
	});

	module.exports = ActiveSpell;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(42);
	Promise.longStackTraces();

	var _callbacks = [];
	var _promises = [];

	/**
	 * Add a promise to the queue of callback invocation promises.
	 * @param {Function} callback The Store's registered callback.
	 * @param {Object} payload The data from the Action.
	 */
	var _addPromise = function(callback, payload) {
	    _promises.push(Promise.resolve().then(function() {
	        if (callback(payload)) {
	            return payload;
	        } else {
	            throw new Error("Dispatcher callback unsuccessful");
	        }
	    }));
	};

	/**
	 * Empty the queue of callback invocation promises.
	 */
	var _clearPromises = function() {
	    _promises = [];
	};

	var Dispatcher = function() {};
	Dispatcher.prototype = _.extend(Dispatcher.prototype, {
	    /**
	     * Register a Store's callback so that it may be invoked by an action.
	     * @param {Function} callback The callback to be registered.
	     * @return {number} The index of the callback within the _callbacks array.
	     */
	    register: function(callback) {
	        _callbacks.push(callback);
	        return _callbacks.length - 1; // index
	    },

	    /**
	     * dispatch
	     * @param  {Object} payload The data from the action.
	     */
	    dispatch: function(payload) {
	        _callbacks.forEach(function(callback) {
	            _addPromise(callback, payload);
	        });
	        Promise.all(_promises).then(_clearPromises).done();
	    },

	    /**
	     * A datastore can use this to wait on other datastores before continuing.
	     * Unfortunately, this implementation is too simple to do things like
	     * managing chains of dependencies or detecting dependency cycles.
	     * @param  {Array} promisesIndexes
	     * @param  {Function} callback
	     */
	    waitFor: function(promiseIndexes, callback) {
	        var selectedPromises = _promises.filter(function(/*object*/ _, /*number*/ j) {
	            return promiseIndexes.indexOf(j) !== -1;
	        });
	        Promise.all(selectedPromises).then(callback).done();
	    }
	});

	module.exports = Dispatcher;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);

	var cx = React.addons.classSet;

	var KUIButton = React.createClass({displayName: 'KUIButton',
	    propTypes: {
	        onClick: React.PropTypes.func,

	        // Specify if you want the button to act as a link
	        href: React.PropTypes.string,

	        type: React.PropTypes.oneOf(["button", "submit"]).isRequired,
	        label: React.PropTypes.string,

	        // Specify either use="primary" (the default), use="secondary", or
	        // domainSlug={topic.domainSlug} to color the button appropriately
	        use: React.PropTypes.oneOf(["primary", "secondary"]),
	        domainSlug: React.PropTypes.string,
	        // Specify one of these progress values from UserProgressCache (or
	        // somewhere else if it's more convenient). If progress="complete" the
	        // button will be shown colored; otherwise it's shown in gray to
	        // indicate that it hasn't yet been done.
	        progress: React.PropTypes.oneOf(["complete", "started", "unstarted"]),

	        // CSS length like "200px" or "100%"
	        width: React.PropTypes.string

	        // TODO(alpert): "size" prop for big and small buttons (in terms of
	        // height/font size)
	    },

	    getDefaultProps: function() {
	        return {
	            use: "primary",
	            width: "auto",
	            progress: "complete"
	        };
	    },

	    getLabel: function() {
	        return this.props.label != null ?
	            this.props.label :
	            this.props.type === "submit" ?
	                $._("Submit") :
	                "";
	    },

	    render: function() {
	        var domainSlug = this.props.domainSlug;
	        var progress = this.props.progress;
	        var className = cx({
	            "kui-button": true,
	            "kui-button-submit": this.props.type === "submit",
	            "kui-button-plain": this.props.type === "button",

	            "kui-button-primary":
	                !domainSlug && this.props.use === "primary",
	            "kui-button-secondary":
	                !domainSlug && this.props.use === "secondary",

	            "kui-button-domain": !!domainSlug,
	            "kui-button-complete":
	                domainSlug && progress === "complete",
	        }) + (domainSlug ? " kui-button-domain-" + domainSlug : "");
	        if (this.props.href) {
	            return React.DOM.a({
	                role: "button", 
	                type: this.props.type, 
	                onClick: this.props.onClick, 
	                href: this.props.href, 
	                className: className, 
	                style: {width: this.props.width}}, 
	                this.getLabel()
	            );
	        }
	        return React.DOM.button({type: this.props.type, 
	                onClick: this.props.onClick, 
	                className: className, 
	                style: {width: this.props.width}}, 
	            this.getLabel()
	        );
	    }
	});

	module.exports = KUIButton;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define:false */
	/**
	 * Copyright 2013 Craig Campbell
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * Mousetrap is a simple keyboard shortcut library for Javascript with
	 * no external dependencies
	 *
	 * @version 1.4.6
	 * @url craig.is/killing/mice
	 */
	(function(document, undefined) {

	    /**
	     * mapping of special keycodes to their corresponding keys
	     *
	     * everything in this dictionary cannot use keypress events
	     * so it has to be here to map to the correct keycodes for
	     * keyup/keydown events
	     *
	     * @type {Object}
	     */
	    var _MAP = {
	            8: 'backspace',
	            9: 'tab',
	            13: 'enter',
	            16: 'shift',
	            17: 'ctrl',
	            18: 'alt',
	            20: 'capslock',
	            27: 'esc',
	            32: 'space',
	            33: 'pageup',
	            34: 'pagedown',
	            35: 'end',
	            36: 'home',
	            37: 'left',
	            38: 'up',
	            39: 'right',
	            40: 'down',
	            45: 'ins',
	            46: 'del',
	            91: 'meta',
	            93: 'meta',
	            224: 'meta'
	        },

	        /**
	         * mapping for special characters so they can support
	         *
	         * this dictionary is only used incase you want to bind a
	         * keyup or keydown event to one of these keys
	         *
	         * @type {Object}
	         */
	        _KEYCODE_MAP = {
	            106: '*',
	            107: '+',
	            109: '-',
	            110: '.',
	            111 : '/',
	            186: ';',
	            187: '=',
	            188: ',',
	            189: '-',
	            190: '.',
	            191: '/',
	            192: '`',
	            219: '[',
	            220: '\\',
	            221: ']',
	            222: '\''
	        },

	        /**
	         * this is a mapping of keys that require shift on a US keypad
	         * back to the non shift equivelents
	         *
	         * this is so you can use keyup events with these keys
	         *
	         * note that this will only work reliably on US keyboards
	         *
	         * @type {Object}
	         */
	        _SHIFT_MAP = {
	            '~': '`',
	            '!': '1',
	            '@': '2',
	            '#': '3',
	            '$': '4',
	            '%': '5',
	            '^': '6',
	            '&': '7',
	            '*': '8',
	            '(': '9',
	            ')': '0',
	            '_': '-',
	            '+': '=',
	            ':': ';',
	            '\"': '\'',
	            '<': ',',
	            '>': '.',
	            '?': '/',
	            '|': '\\'
	        },

	        /**
	         * this is a list of special strings you can use to map
	         * to modifier keys when you specify your keyboard shortcuts
	         *
	         * @type {Object}
	         */
	        _SPECIAL_ALIASES = {
	            'option': 'alt',
	            'command': 'meta',
	            'return': 'enter',
	            'escape': 'esc',
	            'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
	        },

	        /**
	         * variable to store the flipped version of _MAP from above
	         * needed to check if we should use keypress or not when no action
	         * is specified
	         *
	         * @type {Object|undefined}
	         */
	        _REVERSE_MAP,

	        /**
	         * a list of all the callbacks setup via Mousetrap.bind()
	         *
	         * @type {Object}
	         */
	        _callbacks = {},

	        /**
	         * direct map of string combinations to callbacks used for trigger()
	         *
	         * @type {Object}
	         */
	        _directMap = {},

	        /**
	         * keeps track of what level each sequence is at since multiple
	         * sequences can start out with the same sequence
	         *
	         * @type {Object}
	         */
	        _sequenceLevels = {},

	        /**
	         * variable to store the setTimeout call
	         *
	         * @type {null|number}
	         */
	        _resetTimer,

	        /**
	         * temporary state where we will ignore the next keyup
	         *
	         * @type {boolean|string}
	         */
	        _ignoreNextKeyup = false,

	        /**
	         * temporary state where we will ignore the next keypress
	         *
	         * @type {boolean}
	         */
	        _ignoreNextKeypress = false,

	        /**
	         * are we currently inside of a sequence?
	         * type of action ("keyup" or "keydown" or "keypress") or false
	         *
	         * @type {boolean|string}
	         */
	        _nextExpectedAction = false;

	    /**
	     * loop through the f keys, f1 to f19 and add them to the map
	     * programatically
	     */
	    for (var i = 1; i < 20; ++i) {
	        _MAP[111 + i] = 'f' + i;
	    }

	    /**
	     * loop through to map numbers on the numeric keypad
	     */
	    for (i = 0; i <= 9; ++i) {
	        _MAP[i + 96] = i;
	    }

	    /**
	     * cross browser add event method
	     *
	     * @param {Element|HTMLDocument} object
	     * @param {string} type
	     * @param {Function} callback
	     * @returns void
	     */
	    function _addEvent(object, type, callback) {
	        if (object.addEventListener) {
	            object.addEventListener(type, callback, false);
	            return;
	        }

	        object.attachEvent('on' + type, callback);
	    }

	    /**
	     * takes the event and returns the key character
	     *
	     * @param {Event} e
	     * @return {string}
	     */
	    function _characterFromEvent(e) {

	        // for keypress events we should return the character as is
	        if (e.type == 'keypress') {
	            var character = String.fromCharCode(e.which);

	            // if the shift key is not pressed then it is safe to assume
	            // that we want the character to be lowercase.  this means if
	            // you accidentally have caps lock on then your key bindings
	            // will continue to work
	            //
	            // the only side effect that might not be desired is if you
	            // bind something like 'A' cause you want to trigger an
	            // event when capital A is pressed caps lock will no longer
	            // trigger the event.  shift+a will though.
	            if (!e.shiftKey) {
	                character = character.toLowerCase();
	            }

	            return character;
	        }

	        // for non keypress events the special maps are needed
	        if (_MAP[e.which]) {
	            return _MAP[e.which];
	        }

	        if (_KEYCODE_MAP[e.which]) {
	            return _KEYCODE_MAP[e.which];
	        }

	        // if it is not in the special map

	        // with keydown and keyup events the character seems to always
	        // come in as an uppercase character whether you are pressing shift
	        // or not.  we should make sure it is always lowercase for comparisons
	        return String.fromCharCode(e.which).toLowerCase();
	    }

	    /**
	     * checks if two arrays are equal
	     *
	     * @param {Array} modifiers1
	     * @param {Array} modifiers2
	     * @returns {boolean}
	     */
	    function _modifiersMatch(modifiers1, modifiers2) {
	        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
	    }

	    /**
	     * resets all sequence counters except for the ones passed in
	     *
	     * @param {Object} doNotReset
	     * @returns void
	     */
	    function _resetSequences(doNotReset) {
	        doNotReset = doNotReset || {};

	        var activeSequences = false,
	            key;

	        for (key in _sequenceLevels) {
	            if (doNotReset[key]) {
	                activeSequences = true;
	                continue;
	            }
	            _sequenceLevels[key] = 0;
	        }

	        if (!activeSequences) {
	            _nextExpectedAction = false;
	        }
	    }

	    /**
	     * finds all callbacks that match based on the keycode, modifiers,
	     * and action
	     *
	     * @param {string} character
	     * @param {Array} modifiers
	     * @param {Event|Object} e
	     * @param {string=} sequenceName - name of the sequence we are looking for
	     * @param {string=} combination
	     * @param {number=} level
	     * @returns {Array}
	     */
	    function _getMatches(character, modifiers, e, sequenceName, combination, level) {
	        var i,
	            callback,
	            matches = [],
	            action = e.type;

	        // if there are no events related to this keycode
	        if (!_callbacks[character]) {
	            return [];
	        }

	        // if a modifier key is coming up on its own we should allow it
	        if (action == 'keyup' && _isModifier(character)) {
	            modifiers = [character];
	        }

	        // loop through all callbacks for the key that was pressed
	        // and see if any of them match
	        for (i = 0; i < _callbacks[character].length; ++i) {
	            callback = _callbacks[character][i];

	            // if a sequence name is not specified, but this is a sequence at
	            // the wrong level then move onto the next match
	            if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
	                continue;
	            }

	            // if the action we are looking for doesn't match the action we got
	            // then we should keep going
	            if (action != callback.action) {
	                continue;
	            }

	            // if this is a keypress event and the meta key and control key
	            // are not pressed that means that we need to only look at the
	            // character, otherwise check the modifiers as well
	            //
	            // chrome will not fire a keypress if meta or control is down
	            // safari will fire a keypress if meta or meta+shift is down
	            // firefox will fire a keypress if meta or control is down
	            if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

	                // when you bind a combination or sequence a second time it
	                // should overwrite the first one.  if a sequenceName or
	                // combination is specified in this call it does just that
	                //
	                // @todo make deleting its own method?
	                var deleteCombo = !sequenceName && callback.combo == combination;
	                var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
	                if (deleteCombo || deleteSequence) {
	                    _callbacks[character].splice(i, 1);
	                }

	                matches.push(callback);
	            }
	        }

	        return matches;
	    }

	    /**
	     * takes a key event and figures out what the modifiers are
	     *
	     * @param {Event} e
	     * @returns {Array}
	     */
	    function _eventModifiers(e) {
	        var modifiers = [];

	        if (e.shiftKey) {
	            modifiers.push('shift');
	        }

	        if (e.altKey) {
	            modifiers.push('alt');
	        }

	        if (e.ctrlKey) {
	            modifiers.push('ctrl');
	        }

	        if (e.metaKey) {
	            modifiers.push('meta');
	        }

	        return modifiers;
	    }

	    /**
	     * prevents default for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _preventDefault(e) {
	        if (e.preventDefault) {
	            e.preventDefault();
	            return;
	        }

	        e.returnValue = false;
	    }

	    /**
	     * stops propogation for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _stopPropagation(e) {
	        if (e.stopPropagation) {
	            e.stopPropagation();
	            return;
	        }

	        e.cancelBubble = true;
	    }

	    /**
	     * actually calls the callback function
	     *
	     * if your callback function returns false this will use the jquery
	     * convention - prevent default and stop propogation on the event
	     *
	     * @param {Function} callback
	     * @param {Event} e
	     * @returns void
	     */
	    function _fireCallback(callback, e, combo, sequence) {

	        // if this event should not happen stop here
	        if (Mousetrap.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
	            return;
	        }

	        if (callback(e, combo) === false) {
	            _preventDefault(e);
	            _stopPropagation(e);
	        }
	    }

	    /**
	     * handles a character key event
	     *
	     * @param {string} character
	     * @param {Array} modifiers
	     * @param {Event} e
	     * @returns void
	     */
	    function _handleKey(character, modifiers, e) {
	        var callbacks = _getMatches(character, modifiers, e),
	            i,
	            doNotReset = {},
	            maxLevel = 0,
	            processedSequenceCallback = false;

	        // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
	        for (i = 0; i < callbacks.length; ++i) {
	            if (callbacks[i].seq) {
	                maxLevel = Math.max(maxLevel, callbacks[i].level);
	            }
	        }

	        // loop through matching callbacks for this key event
	        for (i = 0; i < callbacks.length; ++i) {

	            // fire for all sequence callbacks
	            // this is because if for example you have multiple sequences
	            // bound such as "g i" and "g t" they both need to fire the
	            // callback for matching g cause otherwise you can only ever
	            // match the first one
	            if (callbacks[i].seq) {

	                // only fire callbacks for the maxLevel to prevent
	                // subsequences from also firing
	                //
	                // for example 'a option b' should not cause 'option b' to fire
	                // even though 'option b' is part of the other sequence
	                //
	                // any sequences that do not match here will be discarded
	                // below by the _resetSequences call
	                if (callbacks[i].level != maxLevel) {
	                    continue;
	                }

	                processedSequenceCallback = true;

	                // keep a list of which sequences were matches for later
	                doNotReset[callbacks[i].seq] = 1;
	                _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
	                continue;
	            }

	            // if there were no sequence matches but we are still here
	            // that means this is a regular match so we should fire that
	            if (!processedSequenceCallback) {
	                _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
	            }
	        }

	        // if the key you pressed matches the type of sequence without
	        // being a modifier (ie "keyup" or "keypress") then we should
	        // reset all sequences that were not matched by this event
	        //
	        // this is so, for example, if you have the sequence "h a t" and you
	        // type "h e a r t" it does not match.  in this case the "e" will
	        // cause the sequence to reset
	        //
	        // modifier keys are ignored because you can have a sequence
	        // that contains modifiers such as "enter ctrl+space" and in most
	        // cases the modifier key will be pressed before the next key
	        //
	        // also if you have a sequence such as "ctrl+b a" then pressing the
	        // "b" key will trigger a "keypress" and a "keydown"
	        //
	        // the "keydown" is expected when there is a modifier, but the
	        // "keypress" ends up matching the _nextExpectedAction since it occurs
	        // after and that causes the sequence to reset
	        //
	        // we ignore keypresses in a sequence that directly follow a keydown
	        // for the same character
	        var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
	        if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
	            _resetSequences(doNotReset);
	        }

	        _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
	    }

	    /**
	     * handles a keydown event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _handleKeyEvent(e) {

	        // normalize e.which for key events
	        // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
	        if (typeof e.which !== 'number') {
	            e.which = e.keyCode;
	        }

	        var character = _characterFromEvent(e);

	        // no character found then stop
	        if (!character) {
	            return;
	        }

	        // need to use === for the character check because the character can be 0
	        if (e.type == 'keyup' && _ignoreNextKeyup === character) {
	            _ignoreNextKeyup = false;
	            return;
	        }

	        Mousetrap.handleKey(character, _eventModifiers(e), e);
	    }

	    /**
	     * determines if the keycode specified is a modifier key or not
	     *
	     * @param {string} key
	     * @returns {boolean}
	     */
	    function _isModifier(key) {
	        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
	    }

	    /**
	     * called to set a 1 second timeout on the specified sequence
	     *
	     * this is so after each key press in the sequence you have 1 second
	     * to press the next key before you have to start over
	     *
	     * @returns void
	     */
	    function _resetSequenceTimer() {
	        clearTimeout(_resetTimer);
	        _resetTimer = setTimeout(_resetSequences, 1000);
	    }

	    /**
	     * reverses the map lookup so that we can look for specific keys
	     * to see what can and can't use keypress
	     *
	     * @return {Object}
	     */
	    function _getReverseMap() {
	        if (!_REVERSE_MAP) {
	            _REVERSE_MAP = {};
	            for (var key in _MAP) {

	                // pull out the numeric keypad from here cause keypress should
	                // be able to detect the keys from the character
	                if (key > 95 && key < 112) {
	                    continue;
	                }

	                if (_MAP.hasOwnProperty(key)) {
	                    _REVERSE_MAP[_MAP[key]] = key;
	                }
	            }
	        }
	        return _REVERSE_MAP;
	    }

	    /**
	     * picks the best action based on the key combination
	     *
	     * @param {string} key - character for key
	     * @param {Array} modifiers
	     * @param {string=} action passed in
	     */
	    function _pickBestAction(key, modifiers, action) {

	        // if no action was picked in we should try to pick the one
	        // that we think would work best for this key
	        if (!action) {
	            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
	        }

	        // modifier keys don't work as expected with keypress,
	        // switch to keydown
	        if (action == 'keypress' && modifiers.length) {
	            action = 'keydown';
	        }

	        return action;
	    }

	    /**
	     * binds a key sequence to an event
	     *
	     * @param {string} combo - combo specified in bind call
	     * @param {Array} keys
	     * @param {Function} callback
	     * @param {string=} action
	     * @returns void
	     */
	    function _bindSequence(combo, keys, callback, action) {

	        // start off by adding a sequence level record for this combination
	        // and setting the level to 0
	        _sequenceLevels[combo] = 0;

	        /**
	         * callback to increase the sequence level for this sequence and reset
	         * all other sequences that were active
	         *
	         * @param {string} nextAction
	         * @returns {Function}
	         */
	        function _increaseSequence(nextAction) {
	            return function() {
	                _nextExpectedAction = nextAction;
	                ++_sequenceLevels[combo];
	                _resetSequenceTimer();
	            };
	        }

	        /**
	         * wraps the specified callback inside of another function in order
	         * to reset all sequence counters as soon as this sequence is done
	         *
	         * @param {Event} e
	         * @returns void
	         */
	        function _callbackAndReset(e) {
	            _fireCallback(callback, e, combo);

	            // we should ignore the next key up if the action is key down
	            // or keypress.  this is so if you finish a sequence and
	            // release the key the final key will not trigger a keyup
	            if (action !== 'keyup') {
	                _ignoreNextKeyup = _characterFromEvent(e);
	            }

	            // weird race condition if a sequence ends with the key
	            // another sequence begins with
	            setTimeout(_resetSequences, 10);
	        }

	        // loop through keys one at a time and bind the appropriate callback
	        // function.  for any key leading up to the final one it should
	        // increase the sequence. after the final, it should reset all sequences
	        //
	        // if an action is specified in the original bind call then that will
	        // be used throughout.  otherwise we will pass the action that the
	        // next key in the sequence should match.  this allows a sequence
	        // to mix and match keypress and keydown events depending on which
	        // ones are better suited to the key provided
	        for (var i = 0; i < keys.length; ++i) {
	            var isFinal = i + 1 === keys.length;
	            var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
	            _bindSingle(keys[i], wrappedCallback, action, combo, i);
	        }
	    }

	    /**
	     * Converts from a string key combination to an array
	     *
	     * @param  {string} combination like "command+shift+l"
	     * @return {Array}
	     */
	    function _keysFromString(combination) {
	        if (combination === '+') {
	            return ['+'];
	        }

	        return combination.split('+');
	    }

	    /**
	     * Gets info for a specific key combination
	     *
	     * @param  {string} combination key combination ("command+s" or "a" or "*")
	     * @param  {string=} action
	     * @returns {Object}
	     */
	    function _getKeyInfo(combination, action) {
	        var keys,
	            key,
	            i,
	            modifiers = [];

	        // take the keys from this pattern and figure out what the actual
	        // pattern is all about
	        keys = _keysFromString(combination);

	        for (i = 0; i < keys.length; ++i) {
	            key = keys[i];

	            // normalize key names
	            if (_SPECIAL_ALIASES[key]) {
	                key = _SPECIAL_ALIASES[key];
	            }

	            // if this is not a keypress event then we should
	            // be smart about using shift keys
	            // this will only work for US keyboards however
	            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
	                key = _SHIFT_MAP[key];
	                modifiers.push('shift');
	            }

	            // if this key is a modifier then add it to the list of modifiers
	            if (_isModifier(key)) {
	                modifiers.push(key);
	            }
	        }

	        // depending on what the key combination is
	        // we will try to pick the best event for it
	        action = _pickBestAction(key, modifiers, action);

	        return {
	            key: key,
	            modifiers: modifiers,
	            action: action
	        };
	    }

	    /**
	     * binds a single keyboard combination
	     *
	     * @param {string} combination
	     * @param {Function} callback
	     * @param {string=} action
	     * @param {string=} sequenceName - name of sequence if part of sequence
	     * @param {number=} level - what part of the sequence the command is
	     * @returns void
	     */
	    function _bindSingle(combination, callback, action, sequenceName, level) {

	        // store a direct mapped reference for use with Mousetrap.trigger
	        _directMap[combination + ':' + action] = callback;

	        // make sure multiple spaces in a row become a single space
	        combination = combination.replace(/\s+/g, ' ');

	        var sequence = combination.split(' '),
	            info;

	        // if this pattern is a sequence of keys then run through this method
	        // to reprocess each pattern one key at a time
	        if (sequence.length > 1) {
	            _bindSequence(combination, sequence, callback, action);
	            return;
	        }

	        info = _getKeyInfo(combination, action);

	        // make sure to initialize array if this is the first time
	        // a callback is added for this key
	        _callbacks[info.key] = _callbacks[info.key] || [];

	        // remove an existing match if there is one
	        _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

	        // add this call back to the array
	        // if it is a sequence put it at the beginning
	        // if not put it at the end
	        //
	        // this is important because the way these are processed expects
	        // the sequence ones to come first
	        _callbacks[info.key][sequenceName ? 'unshift' : 'push']({
	            callback: callback,
	            modifiers: info.modifiers,
	            action: info.action,
	            seq: sequenceName,
	            level: level,
	            combo: combination
	        });
	    }

	    /**
	     * binds multiple combinations to the same callback
	     *
	     * @param {Array} combinations
	     * @param {Function} callback
	     * @param {string|undefined} action
	     * @returns void
	     */
	    function _bindMultiple(combinations, callback, action) {
	        for (var i = 0; i < combinations.length; ++i) {
	            _bindSingle(combinations[i], callback, action);
	        }
	    }

	    // start!
	    _addEvent(document, 'keypress', _handleKeyEvent);
	    _addEvent(document, 'keydown', _handleKeyEvent);
	    _addEvent(document, 'keyup', _handleKeyEvent);

	    var Mousetrap = {

	        /**
	         * binds an event to mousetrap
	         *
	         * can be a single key, a combination of keys separated with +,
	         * an array of keys, or a sequence of keys separated by spaces
	         *
	         * be sure to list the modifier keys first to make sure that the
	         * correct key ends up getting bound (the last key in the pattern)
	         *
	         * @param {string|Array} keys
	         * @param {Function} callback
	         * @param {string=} action - 'keypress', 'keydown', or 'keyup'
	         * @returns void
	         */
	        bind: function(keys, callback, action) {
	            keys = keys instanceof Array ? keys : [keys];
	            _bindMultiple(keys, callback, action);
	            return this;
	        },

	        /**
	         * unbinds an event to mousetrap
	         *
	         * the unbinding sets the callback function of the specified key combo
	         * to an empty function and deletes the corresponding key in the
	         * _directMap dict.
	         *
	         * TODO: actually remove this from the _callbacks dictionary instead
	         * of binding an empty function
	         *
	         * the keycombo+action has to be exactly the same as
	         * it was defined in the bind method
	         *
	         * @param {string|Array} keys
	         * @param {string} action
	         * @returns void
	         */
	        unbind: function(keys, action) {
	            return Mousetrap.bind(keys, function() {}, action);
	        },

	        /**
	         * triggers an event that has already been bound
	         *
	         * @param {string} keys
	         * @param {string=} action
	         * @returns void
	         */
	        trigger: function(keys, action) {
	            if (_directMap[keys + ':' + action]) {
	                _directMap[keys + ':' + action]({}, keys);
	            }
	            return this;
	        },

	        /**
	         * resets the library back to its initial state.  this is useful
	         * if you want to clear out the current keyboard shortcuts and bind
	         * new ones - for example if you switch to another page
	         *
	         * @returns void
	         */
	        reset: function() {
	            _callbacks = {};
	            _directMap = {};
	            return this;
	        },

	       /**
	        * should we stop this event before firing off callbacks
	        *
	        * @param {Event} e
	        * @param {Element} element
	        * @return {boolean}
	        */
	        stopCallback: function(e, element) {

	            // if the element has the class "mousetrap" then no need to stop
	            if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
	                return false;
	            }

	            // stop for input, select, and textarea
	            return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
	        },

	        /**
	         * exposes _handleKey publicly so it can be overwritten by extensions
	         */
	        handleKey: _handleKey
	    };

	    // expose mousetrap to the global object
	    module.exports = Mousetrap;

	    // expose mousetrap as an AMD module
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (Mousetrap), (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_RESULT__ = __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : module.exports = __WEBPACK_AMD_DEFINE_FACTORY__));
	    }
	}) (document);


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * adds a bindGlobal method to Mousetrap that allows you to
	 * bind specific keyboard shortcuts that will still work
	 * inside a text input field
	 *
	 * usage:
	 * Mousetrap.bindGlobal('ctrl+s', _saveChanges);
	 */

	var Mousetrap = __webpack_require__(39);

	Mousetrap = (function(Mousetrap) {
	    var _globalCallbacks = {},
	        _originalStopCallback = Mousetrap.stopCallback;

	    Mousetrap.stopCallback = function(e, element, combo, sequence) {
	        if (_globalCallbacks[combo] || _globalCallbacks[sequence]) {
	            return false;
	        }

	        return _originalStopCallback(e, element, combo);
	    };

	    Mousetrap.bindGlobal = function(keys, callback, action) {
	        Mousetrap.bind(keys, callback, action);

	        if (keys instanceof Array) {
	            for (var i = 0; i < keys.length; i++) {
	                _globalCallbacks[keys[i]] = true;
	            }
	            return;
	        }

	        _globalCallbacks[keys] = true;
	    };

	    return Mousetrap;
	})(Mousetrap);


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	    // standard props "added" by react
	    // (technically the renderer still adds them)
	    "key",
	    "ref",
	    // added by src/renderer.jsx
	    "widgetId",
	    "onChange",
	    "problemNum",
	    "enabledFeatures",
	    "apiOptions"
	];


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var Promise = __webpack_require__(47)();
	module.exports = Promise;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A key-value store to hold the available spells and associated data.
	 * Loads a JSON file and provides id-based access. As with monster-store,
	 * this is not a flux datastore!
	 */

	var testJSON = JSON.stringify({
	    /* Fire spells. */
	    "area_of_triangles_1": {
	        displayName: "Fire Bolt",
	        category: "attack",
	        description: "Flame. A force as old as time, rendered into a tool of man, and a friend to the novice spellcaster.",
	        type: "fire",
	        targetType: "single",
	        power: 20,
	        cooldown: 3
	    },

	    "area-of-triangles-2": {
	        displayName: "Fireball",
	        category: "attack",
	        description: "Hurl a ball of molten flame (i.e., a fireball) at your enemy.",
	        type: "fire",
	        targetType: "all",
	        power: 100,
	        cooldown: 3
	    },

	    "composing-and-decomposing-shapes": {
	        displayName: "Fire Shield",
	        category: "buff",
	        description: "Encase yourself in a whirlwind of flame, dealing damage to your opponents and protecting you from harm.",
	        type: "fire",
	        targetType: "single",
	        power: 20,
	        cooldown: 3
	    },

	    /* Frost spells. */
	    "identifying-parts-of-expressions": {
	        displayName: "Ice Armor",
	        category: "buff",
	        description: "Surround yourself in a hulking shell of icy permafrost.",
	        type: "frost",
	        targetType: "single",
	        power: 20,
	        cooldown: 3
	    },

	    "manipulating-linear-expressions-with-rational-coefficients": {
	        displayName: "Ice Lance",
	        category: "attack",
	        description: "'Water defies the rules of chemistry and law of physics.' -- Bill Bryson",
	        type: "frost",
	        targetType: "single",
	        power: 20,
	        cooldown: 3
	    },

	    "interpreting-expressions": {
	        displayName: "Blizzard",
	        category: "attack",
	        description: "This is an epic spell, with tons of good powers, like damage.",
	        type: "frost",
	        targetType: "all",
	        power: 20,
	        cooldown: 3
	    },

	    /* Arcane spells. */
	    "making-totals-in-different-ways-within-10": {
	        displayName: "Magic Missile",
	        category: "attack",
	        description: "Harness the powers of wizardry and mathematics to fire a compact energy missile at your opponent.",
	        type: "arcane",
	        targetType: "single",
	        power: 20,
	        cooldown: 3
	    },

	    "meaning-of-equal-sign-1": {
	        displayName: "Charged Bolt",
	        category: "attack",
	        description: "Energy incarnate.",
	        type: "arcane",
	        targetType: "single",
	        power: 20,
	        cooldown: 3
	    },

	    "solving-basic-multiplication-and-division-equations": {
	        displayName: "Heal",
	        category: "attack",
	        description: "Restore your health points.",
	        type: "arcane",
	        targetType: "single",
	        power: 20,
	        cooldown: 3
	    },

	    "comparing-with-multiplication": {
	        displayName: "Life Steal",
	        category: "attack",
	        description: "'Alas, poor Yorick! I knew him, Horatio; a fellow of infinite jest, of most excellent fancy.'",
	        type: "arcane",
	        targetType: "single",
	        power: 20,
	        cooldown: 3
	    },

	    "arithmetic_word_problems": {
	        displayName: "Time Stop",
	        category: "buff",
	        description: "They say 'Time is money'. Luckily for you, magic is more powerful than money. Stop time and take two turns instead of one on successful cast.",
	        type: "arcane",
	        targetType: "single",
	        power: 20,
	        cooldown: 3
	    }
	});

	var _spellDict = {};

	var load = function(json) {
	    _spellDict = JSON.parse(json);
	};

	load(testJSON);

	var SpellStore = {
	    getById: function(spellId) {
	        return _spellDict[spellId];
	    },

	    debug: _spellDict
	};

	module.exports = SpellStore;



/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(31);
	var Perseus = __webpack_require__(48);
	var CombatActions = __webpack_require__(9);
	var EntityStore = __webpack_require__(5);
	var KUIButton = __webpack_require__(38);

	var PERSEUS_ITEM = {
	    "question": {
	        "content": "Combat!",
	        "images": {},
	        "widgets": {}
	    },
	    "answerArea": {
	        "type": "multiple",
	        "options": {
	            "content": "",
	            "images": {},
	            "widgets": {}
	        },
	        "calculator": false
	    },
	    "itemDataVersion": {
	        "major": 0,
	        "minor": 1
	    },
	    "hints": []
	};

	var CombatExerciseRenderer = React.createClass({displayName: 'CombatExerciseRenderer',
	    propTypes: {
	        content: React.PropTypes.object.isRequired
	    },

	    getInitialState: function() {
	        return {
	            didFailAttack: false,
	            didCast: false
	        };
	    },

	    getDefaultProps: function() {
	        return {
	            content: PERSEUS_ITEM
	        };
	    },

	    _retreat: function() {
	        // TODO(dmnd): consequences?
	        CombatActions.endCombat();
	    },

	    _attemptAttack: function() {
	        var gradedResult = this._scoreInput();
	        if (gradedResult.correct) {
	            CombatActions.successfulAttack();
	            this.setState({
	                didCast: true,
	                didFailAttack: false
	            });
	        } else {
	            CombatActions.failedAttack();
	            this.setState({
	                didCast: false,
	                didFailAttack: true
	            });
	        }
	    },

	    _resetAttackState: function() {
	        if (this.state.didFailAttack || this.state.didCast) {
	            this.setState({
	                didFailAttack: false,
	                didCast: false
	            });
	        }
	    },

	    _castButtonClassName: function() {
	        // Apply appropriate visual effects to cast button
	        var castButtonClassName = "cast";
	        if (this.state.didFailAttack) {
	            castButtonClassName += " stutter";
	        } else if (this.state.didCast) {
	            castButtonClassName += " glow";
	        } else {
	            castButtonClassName += " shake";
	        }
	        return castButtonClassName;
	    },

	    render: function() {
	        var questionProps = _.extend({}, this.props.content.question,
	            {ref: "questionRenderer"});

	        var answerProps = _.extend({}, this.props.content.answerArea,
	            {ref: "answerAreaRenderer"});

	        return React.DOM.div(null, 
	            React.DOM.div({className: "exercise-view"}, 
	                Perseus.Renderer(questionProps), 
	                Perseus.AnswerAreaRenderer(answerProps)
	            ), 
	            React.DOM.div({className: "buttons-area"}, 
	                React.DOM.div({
	                        className: this._castButtonClassName(), 
	                        onMouseOut: this._resetAttackState}, 
	                    KUIButton({type: "submit", 
	                        label: "Cast", 
	                        width: "140px", 
	                        onClick: this._attemptAttack})
	                ), 
	                React.DOM.div({className: "retreat"}, 
	                    KUIButton({type: "button", 
	                        label: "Retreat", 
	                        domainSlug: "humanities", 
	                        width: "140px", 
	                        onClick: this._retreat})
	                )
	            )
	        );
	    },

	    _scoreInput: function() {
	        var qGuessAndScore = this.refs.questionRenderer.guessAndScore();
	        var aGuessAndScore = this.refs.answerAreaRenderer.guessAndScore();

	        var qGuess = qGuessAndScore[0], qScore = qGuessAndScore[1];
	        var aGuess = aGuessAndScore[0], aScore = aGuessAndScore[1];

	        var guess, score;
	        if (qGuess.length === 0) {
	            // No widgets in question. For compatability with old guess format,
	            // leave it out here completely.
	            guess = aGuess;
	            score = aScore;
	        } else {
	            guess = [qGuess, aGuess];
	            score = this._combineScores(qScore, aScore);
	        }

	        if (score.type === "points") {
	            var correct = score.earned >= score.total;
	            return {
	                empty: false,
	                correct: correct,
	                message: score.message,
	                guess: guess
	            };
	        } else if (score.type === "invalid") {
	            return {
	                empty: true,
	                correct: false,
	                message: score.message,
	                guess: guess
	            };
	        }
	    },

	    /**
	     * Given two score objects for two different widgets, combine them so that
	     * if one is wrong, the total score is wrong, etc.
	     */
	    _combineScores: function(scoreA, scoreB) {
	        var message;

	        if (scoreA.type === "points" && scoreB.type === "points") {
	            if (scoreA.message && scoreB.message &&
	                    scoreA.message !== scoreB.message) {
	                // TODO(alpert): Figure out how to combine messages usefully
	                message = null;
	            } else {
	                message = scoreA.message || scoreB.message;
	            }

	            return {
	                type: "points",
	                earned: scoreA.earned + scoreB.earned,
	                total: scoreA.total + scoreB.total,
	                message: message
	            };

	        } else if (scoreA.type === "points" && scoreB.type === "invalid") {
	            return scoreB;

	        } else if (scoreA.type === "invalid" && scoreB.type === "points") {
	            return scoreA;

	        } else if (scoreA.type === "invalid" && scoreB.type === "invalid") {
	            if (scoreA.message && scoreB.message &&
	                    scoreA.message !== scoreB.message) {
	                // TODO(alpert): Figure out how to combine messages usefully
	                message = null;
	            } else {
	                message = scoreA.message || scoreB.message;
	            }

	            return {
	                type: "invalid",
	                message: message
	            };
	        }
	    }
	});

	module.exports = CombatExerciseRenderer;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		"intro": {
			"lines": [
				{
					"speaker": "Narrator",
					"line": "You're on the home stretch of your shift delivering groceries."
				},
				{
					"speaker": "Narrator",
					"line": "The final house is your favourite: your mentor Sal's house."
				},
				{
					"speaker": "Narrator",
					"line": "Every day he has some new piece of wisdom for you."
				},
				{
					"speaker": "Narrator",
					"line": "Today is the day he promised to teach you the secrets of the magic missile."
				}
			]
		},
		"approach-house": {
			"lines": [
				{
					"speaker": "Narrator",
					"line": "As you approach the house, something seems strange."
				},
				{
					"speaker": "Narrator",
					"line": "You have a bad feeling about this."
				}
			]
		},
		"scene1": {
			"lines": [
				{
					"speaker": "Narrator",
					"line": "He's gone though! Oh no!"
				},
				{
					"speaker": "Narrator",
					"line": "There are signs of a struggle..."
				}
			]
		},
		"scene2": {
			"lines": [
				{
					"speaker": "Narrator",
					"line": "You wonder why you are here."
				}
			]
		},
		"darkforest": {
			"lines": [
				{
					"speaker": "",
					"line": "Joel was here."
				}
			]
		},
		"salinterior": {
			"lines": [
				{
					"speaker": "Narrator",
					"line": "An orb! Dark tidings. Dark tidings, indeed."
				}
			]
		}
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// this program is a JavaScript version of Mersenne Twister, with concealment and encapsulation in class,
	// an almost straight conversion from the original program, mt19937ar.c,
	// translated by y. okada on July 17, 2006.
	// and modified a little at july 20, 2006, but there are not any substantial differences.
	// in this program, procedure descriptions and comments of original source code were not removed.
	// lines commented with //c// were originally descriptions of c procedure. and a few following lines are appropriate JavaScript descriptions.
	// lines commented with /* and */ are original comments.
	// lines commented with // are additional comments in this JavaScript version.
	// before using this version, create at least one instance of MersenneTwister19937 class, and initialize the each state, given below in c comments, of all the instances.
	/*
	   A C-program for MT19937, with initialization improved 2002/1/26.
	   Coded by Takuji Nishimura and Makoto Matsumoto.

	   Before using, initialize the state by using init_genrand(seed)
	   or init_by_array(init_key, key_length).

	   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
	   All rights reserved.

	   Redistribution and use in source and binary forms, with or without
	   modification, are permitted provided that the following conditions
	   are met:

	     1. Redistributions of source code must retain the above copyright
	        notice, this list of conditions and the following disclaimer.

	     2. Redistributions in binary form must reproduce the above copyright
	        notice, this list of conditions and the following disclaimer in the
	        documentation and/or other materials provided with the distribution.

	     3. The names of its contributors may not be used to endorse or promote
	        products derived from this software without specific prior written
	        permission.

	   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
	   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
	   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


	   Any feedback is very welcome.
	   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
	   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
	*/

	function MersenneTwister19937()
	{
		/* constants should be scoped inside the class */
		var N, M, MATRIX_A, UPPER_MASK, LOWER_MASK;
		/* Period parameters */
		//c//#define N 624
		//c//#define M 397
		//c//#define MATRIX_A 0x9908b0dfUL   /* constant vector a */
		//c//#define UPPER_MASK 0x80000000UL /* most significant w-r bits */
		//c//#define LOWER_MASK 0x7fffffffUL /* least significant r bits */
		N = 624;
		M = 397;
		MATRIX_A = 0x9908b0df;   /* constant vector a */
		UPPER_MASK = 0x80000000; /* most significant w-r bits */
		LOWER_MASK = 0x7fffffff; /* least significant r bits */
		//c//static unsigned long mt[N]; /* the array for the state vector  */
		//c//static int mti=N+1; /* mti==N+1 means mt[N] is not initialized */
		var mt = new Array(N);   /* the array for the state vector  */
		var mti = N+1;           /* mti==N+1 means mt[N] is not initialized */

		function unsigned32 (n1) // returns a 32-bits unsiged integer from an operand to which applied a bit operator.
		{
			return n1 < 0 ? (n1 ^ UPPER_MASK) + UPPER_MASK : n1;
		}

		function subtraction32 (n1, n2) // emulates lowerflow of a c 32-bits unsiged integer variable, instead of the operator -. these both arguments must be non-negative integers expressible using unsigned 32 bits.
		{
			return n1 < n2 ? unsigned32((0x100000000 - (n2 - n1)) & 0xffffffff) : n1 - n2;
		}

		function addition32 (n1, n2) // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator +. these both arguments must be non-negative integers expressible using unsigned 32 bits.
		{
			return unsigned32((n1 + n2) & 0xffffffff)
		}

		function multiplication32 (n1, n2) // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator *. these both arguments must be non-negative integers expressible using unsigned 32 bits.
		{
			var sum = 0;
			for (var i = 0; i < 32; ++i){
				if ((n1 >>> i) & 0x1){
					sum = addition32(sum, unsigned32(n2 << i));
				}
			}
			return sum;
		}

		/* initializes mt[N] with a seed */
		//c//void init_genrand(unsigned long s)
		this.init_genrand = function (s)
		{
			//c//mt[0]= s & 0xffffffff;
			mt[0]= unsigned32(s & 0xffffffff);
			for (mti=1; mti<N; mti++) {
				mt[mti] = 
				//c//(1812433253 * (mt[mti-1] ^ (mt[mti-1] >> 30)) + mti);
				addition32(multiplication32(1812433253, unsigned32(mt[mti-1] ^ (mt[mti-1] >>> 30))), mti);
				/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
				/* In the previous versions, MSBs of the seed affect   */
				/* only MSBs of the array mt[].                        */
				/* 2002/01/09 modified by Makoto Matsumoto             */
				//c//mt[mti] &= 0xffffffff;
				mt[mti] = unsigned32(mt[mti] & 0xffffffff);
				/* for >32 bit machines */
			}
		}

		/* initialize by an array with array-length */
		/* init_key is the array for initializing keys */
		/* key_length is its length */
		/* slight change for C++, 2004/2/26 */
		//c//void init_by_array(unsigned long init_key[], int key_length)
		this.init_by_array = function (init_key, key_length)
		{
			//c//int i, j, k;
			var i, j, k;
			//c//init_genrand(19650218);
			this.init_genrand(19650218);
			i=1; j=0;
			k = (N>key_length ? N : key_length);
			for (; k; k--) {
				//c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1664525))
				//c//	+ init_key[j] + j; /* non linear */
				mt[i] = addition32(addition32(unsigned32(mt[i] ^ multiplication32(unsigned32(mt[i-1] ^ (mt[i-1] >>> 30)), 1664525)), init_key[j]), j);
				mt[i] = 
				//c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
				unsigned32(mt[i] & 0xffffffff);
				i++; j++;
				if (i>=N) { mt[0] = mt[N-1]; i=1; }
				if (j>=key_length) j=0;
			}
			for (k=N-1; k; k--) {
				//c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1566083941))
				//c//- i; /* non linear */
				mt[i] = subtraction32(unsigned32((dbg=mt[i]) ^ multiplication32(unsigned32(mt[i-1] ^ (mt[i-1] >>> 30)), 1566083941)), i);
				//c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
				mt[i] = unsigned32(mt[i] & 0xffffffff);
				i++;
				if (i>=N) { mt[0] = mt[N-1]; i=1; }
			}
			mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
		}

	    /* moved outside of genrand_int32() by jwatte 2010-11-17; generate less garbage */
	    var mag01 = [0x0, MATRIX_A];

		/* generates a random number on [0,0xffffffff]-interval */
		//c//unsigned long genrand_int32(void)
		this.genrand_int32 = function ()
		{
			//c//unsigned long y;
			//c//static unsigned long mag01[2]={0x0UL, MATRIX_A};
			var y;
			/* mag01[x] = x * MATRIX_A  for x=0,1 */

			if (mti >= N) { /* generate N words at one time */
				//c//int kk;
				var kk;

				if (mti == N+1)   /* if init_genrand() has not been called, */
					//c//init_genrand(5489); /* a default initial seed is used */
					this.init_genrand(5489); /* a default initial seed is used */

				for (kk=0;kk<N-M;kk++) {
					//c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
					//c//mt[kk] = mt[kk+M] ^ (y >> 1) ^ mag01[y & 0x1];
					y = unsigned32((mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK));
					mt[kk] = unsigned32(mt[kk+M] ^ (y >>> 1) ^ mag01[y & 0x1]);
				}
				for (;kk<N-1;kk++) {
					//c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
					//c//mt[kk] = mt[kk+(M-N)] ^ (y >> 1) ^ mag01[y & 0x1];
					y = unsigned32((mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK));
					mt[kk] = unsigned32(mt[kk+(M-N)] ^ (y >>> 1) ^ mag01[y & 0x1]);
				}
				//c//y = (mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK);
				//c//mt[N-1] = mt[M-1] ^ (y >> 1) ^ mag01[y & 0x1];
				y = unsigned32((mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK));
				mt[N-1] = unsigned32(mt[M-1] ^ (y >>> 1) ^ mag01[y & 0x1]);
				mti = 0;
			}

			y = mt[mti++];

			/* Tempering */
			//c//y ^= (y >> 11);
			//c//y ^= (y << 7) & 0x9d2c5680;
			//c//y ^= (y << 15) & 0xefc60000;
			//c//y ^= (y >> 18);
			y = unsigned32(y ^ (y >>> 11));
			y = unsigned32(y ^ ((y << 7) & 0x9d2c5680));
			y = unsigned32(y ^ ((y << 15) & 0xefc60000));
			y = unsigned32(y ^ (y >>> 18));

			return y;
		}

		/* generates a random number on [0,0x7fffffff]-interval */
		//c//long genrand_int31(void)
		this.genrand_int31 = function ()
		{
			//c//return (genrand_int32()>>1);
			return (this.genrand_int32()>>>1);
		}

		/* generates a random number on [0,1]-real-interval */
		//c//double genrand_real1(void)
		this.genrand_real1 = function ()
		{
			//c//return genrand_int32()*(1.0/4294967295.0);
			return this.genrand_int32()*(1.0/4294967295.0);
			/* divided by 2^32-1 */
		}

		/* generates a random number on [0,1)-real-interval */
		//c//double genrand_real2(void)
		this.genrand_real2 = function ()
		{
			//c//return genrand_int32()*(1.0/4294967296.0);
			return this.genrand_int32()*(1.0/4294967296.0);
			/* divided by 2^32 */
		}

		/* generates a random number on (0,1)-real-interval */
		//c//double genrand_real3(void)
		this.genrand_real3 = function ()
		{
			//c//return ((genrand_int32()) + 0.5)*(1.0/4294967296.0);
			return ((this.genrand_int32()) + 0.5)*(1.0/4294967296.0);
			/* divided by 2^32 */
		}

		/* generates a random number on [0,1) with 53-bit resolution*/
		//c//double genrand_res53(void)
		this.genrand_res53 = function ()
		{
			//c//unsigned long a=genrand_int32()>>5, b=genrand_int32()>>6;
			var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6;
			return(a*67108864.0+b)*(1.0/9007199254740992.0);
		}
		/* These real versions are due to Isaku Wada, 2002/01/09 added */
	}

	//  Exports: Public API

	//  Export the twister class
	exports.MersenneTwister19937 = MersenneTwister19937;

	//  Export a simplified function to generate random numbers
	var gen = new MersenneTwister19937;
	gen.init_genrand((new Date).getTime() % 1000000000);
	exports.rand = function(N) {
	    if (!N)
	        {
	        N = 32768;
	        }
	    return Math.floor(gen.genrand_real2() * N);
	}
	exports.seed = function(S) {
	    if (typeof(S) != 'number')
	        {
	        throw new Error("seed(S) must take numeric argument; is " + typeof(S));
	        }
	    gen.init_genrand(S);
	}
	exports.seed_array = function(A) {
	    if (typeof(A) != 'object')
	        {
	        throw new Error("seed_array(A) must take array of numbers; is " + typeof(A));
	        }
	    gen.init_by_array(A);
	}




/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var old;
	if (typeof Promise !== "undefined") old = Promise;
	function noConflict(bluebird) {
	    try { if (Promise === bluebird) Promise = old; }
	    catch (e) {}
	    return bluebird;
	}
	module.exports = function() {
	var util = __webpack_require__(49);
	var async = __webpack_require__(50);
	var errors = __webpack_require__(51);

	var INTERNAL = function(){};
	var APPLY = {};
	var NEXT_FILTER = {e: null};

	var cast = __webpack_require__(52)(Promise, INTERNAL);
	var PromiseArray = __webpack_require__(53)(Promise, INTERNAL, cast);
	var CapturedTrace = __webpack_require__(54)();
	var CatchFilter = __webpack_require__(55)(NEXT_FILTER);
	var PromiseResolver = __webpack_require__(56);

	var isArray = util.isArray;

	var errorObj = util.errorObj;
	var tryCatch1 = util.tryCatch1;
	var tryCatch2 = util.tryCatch2;
	var tryCatchApply = util.tryCatchApply;
	var RangeError = errors.RangeError;
	var TypeError = errors.TypeError;
	var CancellationError = errors.CancellationError;
	var TimeoutError = errors.TimeoutError;
	var OperationalError = errors.OperationalError;
	var originatesFromRejection = errors.originatesFromRejection;
	var markAsOriginatingFromRejection = errors.markAsOriginatingFromRejection;
	var canAttach = errors.canAttach;
	var thrower = util.thrower;
	var apiRejection = __webpack_require__(57)(Promise);


	var makeSelfResolutionError = function Promise$_makeSelfResolutionError() {
	    return new TypeError("circular promise resolution chain");
	};

	function Promise(resolver) {
	    if (typeof resolver !== "function") {
	        throw new TypeError("the promise constructor requires a resolver function");
	    }
	    if (this.constructor !== Promise) {
	        throw new TypeError("the promise constructor cannot be invoked directly");
	    }
	    this._bitField = 0;
	    this._fulfillmentHandler0 = void 0;
	    this._rejectionHandler0 = void 0;
	    this._promise0 = void 0;
	    this._receiver0 = void 0;
	    this._settledValue = void 0;
	    this._boundTo = void 0;
	    if (resolver !== INTERNAL) this._resolveFromResolver(resolver);
	}

	Promise.prototype.bind = function Promise$bind(thisArg) {
	    var ret = new Promise(INTERNAL);
	    ret._follow(this);
	    ret._propagateFrom(this, 2 | 1);
	    ret._setBoundTo(thisArg);
	    return ret;
	};

	Promise.prototype.toString = function Promise$toString() {
	    return "[object Promise]";
	};

	Promise.prototype.caught = Promise.prototype["catch"] =
	function Promise$catch(fn) {
	    var len = arguments.length;
	    if (len > 1) {
	        var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (typeof item === "function") {
	                catchInstances[j++] = item;
	            } else {
	                var catchFilterTypeError =
	                    new TypeError(
	                        "A catch filter must be an error constructor "
	                        + "or a filter function");

	                this._attachExtraTrace(catchFilterTypeError);
	                async.invoke(this._reject, this, catchFilterTypeError);
	                return;
	            }
	        }
	        catchInstances.length = j;
	        fn = arguments[i];

	        this._resetTrace();
	        var catchFilter = new CatchFilter(catchInstances, fn, this);
	        return this._then(void 0, catchFilter.doFilter, void 0,
	            catchFilter, void 0);
	    }
	    return this._then(void 0, fn, void 0, void 0, void 0);
	};

	Promise.prototype.then =
	function Promise$then(didFulfill, didReject, didProgress) {
	    return this._then(didFulfill, didReject, didProgress,
	        void 0, void 0);
	};


	Promise.prototype.done =
	function Promise$done(didFulfill, didReject, didProgress) {
	    var promise = this._then(didFulfill, didReject, didProgress,
	        void 0, void 0);
	    promise._setIsFinal();
	};

	Promise.prototype.spread = function Promise$spread(didFulfill, didReject) {
	    return this._then(didFulfill, didReject, void 0,
	        APPLY, void 0);
	};

	Promise.prototype.isCancellable = function Promise$isCancellable() {
	    return !this.isResolved() &&
	        this._cancellable();
	};

	Promise.prototype.toJSON = function Promise$toJSON() {
	    var ret = {
	        isFulfilled: false,
	        isRejected: false,
	        fulfillmentValue: void 0,
	        rejectionReason: void 0
	    };
	    if (this.isFulfilled()) {
	        ret.fulfillmentValue = this._settledValue;
	        ret.isFulfilled = true;
	    } else if (this.isRejected()) {
	        ret.rejectionReason = this._settledValue;
	        ret.isRejected = true;
	    }
	    return ret;
	};

	Promise.prototype.all = function Promise$all() {
	    return new PromiseArray(this).promise();
	};


	Promise.is = function Promise$Is(val) {
	    return val instanceof Promise;
	};

	Promise.all = function Promise$All(promises) {
	    return new PromiseArray(promises).promise();
	};

	Promise.prototype.error = function Promise$_error(fn) {
	    return this.caught(originatesFromRejection, fn);
	};

	Promise.prototype._resolveFromSyncValue =
	function Promise$_resolveFromSyncValue(value) {
	    if (value === errorObj) {
	        this._cleanValues();
	        this._setRejected();
	        this._settledValue = value.e;
	        this._ensurePossibleRejectionHandled();
	    } else {
	        var maybePromise = cast(value, void 0);
	        if (maybePromise instanceof Promise) {
	            this._follow(maybePromise);
	        } else {
	            this._cleanValues();
	            this._setFulfilled();
	            this._settledValue = value;
	        }
	    }
	};

	Promise.method = function Promise$_Method(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("fn must be a function");
	    }
	    return function Promise$_method() {
	        var value;
	        switch(arguments.length) {
	        case 0: value = tryCatch1(fn, this, void 0); break;
	        case 1: value = tryCatch1(fn, this, arguments[0]); break;
	        case 2: value = tryCatch2(fn, this, arguments[0], arguments[1]); break;
	        default:
	            var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
	            value = tryCatchApply(fn, args, this); break;
	        }
	        var ret = new Promise(INTERNAL);
	        ret._setTrace(void 0);
	        ret._resolveFromSyncValue(value);
	        return ret;
	    };
	};

	Promise.attempt = Promise["try"] = function Promise$_Try(fn, args, ctx) {
	    if (typeof fn !== "function") {
	        return apiRejection("fn must be a function");
	    }
	    var value = isArray(args)
	        ? tryCatchApply(fn, args, ctx)
	        : tryCatch1(fn, ctx, args);

	    var ret = new Promise(INTERNAL);
	    ret._setTrace(void 0);
	    ret._resolveFromSyncValue(value);
	    return ret;
	};

	Promise.defer = Promise.pending = function Promise$Defer() {
	    var promise = new Promise(INTERNAL);
	    promise._setTrace(void 0);
	    return new PromiseResolver(promise);
	};

	Promise.bind = function Promise$Bind(thisArg) {
	    var ret = new Promise(INTERNAL);
	    ret._setTrace(void 0);
	    ret._setFulfilled();
	    ret._setBoundTo(thisArg);
	    return ret;
	};

	Promise.cast = function Promise$_Cast(obj) {
	    var ret = cast(obj, void 0);
	    if (!(ret instanceof Promise)) {
	        var val = ret;
	        ret = new Promise(INTERNAL);
	        ret._setTrace(void 0);
	        ret._setFulfilled();
	        ret._cleanValues();
	        ret._settledValue = val;
	    }
	    return ret;
	};

	Promise.resolve = Promise.fulfilled = Promise.cast;

	Promise.reject = Promise.rejected = function Promise$Reject(reason) {
	    var ret = new Promise(INTERNAL);
	    ret._setTrace(void 0);
	    markAsOriginatingFromRejection(reason);
	    ret._cleanValues();
	    ret._setRejected();
	    ret._settledValue = reason;
	    if (!canAttach(reason)) {
	        var trace = new Error(reason + "");
	        ret._setCarriedStackTrace(trace);
	    }
	    ret._ensurePossibleRejectionHandled();
	    return ret;
	};

	Promise.onPossiblyUnhandledRejection =
	function Promise$OnPossiblyUnhandledRejection(fn) {
	        CapturedTrace.possiblyUnhandledRejection = typeof fn === "function"
	                                                    ? fn : void 0;
	};

	var unhandledRejectionHandled;
	Promise.onUnhandledRejectionHandled =
	function Promise$onUnhandledRejectionHandled(fn) {
	    unhandledRejectionHandled = typeof fn === "function" ? fn : void 0;
	};

	var debugging = false || !!(
	    typeof process !== "undefined" &&
	    typeof process.execPath === "string" &&
	    typeof process.env === "object" &&
	    (process.env["BLUEBIRD_DEBUG"] ||
	        process.env["NODE_ENV"] === "development")
	);


	Promise.longStackTraces = function Promise$LongStackTraces() {
	    if (async.haveItemsQueued() &&
	        debugging === false
	   ) {
	        throw new Error("cannot enable long stack traces after promises have been created");
	    }
	    debugging = CapturedTrace.isSupported();
	};

	Promise.hasLongStackTraces = function Promise$HasLongStackTraces() {
	    return debugging && CapturedTrace.isSupported();
	};

	Promise.prototype._then =
	function Promise$_then(
	    didFulfill,
	    didReject,
	    didProgress,
	    receiver,
	    internalData
	) {
	    var haveInternalData = internalData !== void 0;
	    var ret = haveInternalData ? internalData : new Promise(INTERNAL);

	    if (!haveInternalData) {
	        if (debugging) {
	            var haveSameContext = this._peekContext() === this._traceParent;
	            ret._traceParent = haveSameContext ? this._traceParent : this;
	        }
	        ret._propagateFrom(this, 7);
	    }

	    var callbackIndex =
	        this._addCallbacks(didFulfill, didReject, didProgress, ret, receiver);

	    if (this.isResolved()) {
	        async.invoke(this._queueSettleAt, this, callbackIndex);
	    }

	    return ret;
	};

	Promise.prototype._length = function Promise$_length() {
	    return this._bitField & 262143;
	};

	Promise.prototype._isFollowingOrFulfilledOrRejected =
	function Promise$_isFollowingOrFulfilledOrRejected() {
	    return (this._bitField & 939524096) > 0;
	};

	Promise.prototype._isFollowing = function Promise$_isFollowing() {
	    return (this._bitField & 536870912) === 536870912;
	};

	Promise.prototype._setLength = function Promise$_setLength(len) {
	    this._bitField = (this._bitField & -262144) |
	        (len & 262143);
	};

	Promise.prototype._setFulfilled = function Promise$_setFulfilled() {
	    this._bitField = this._bitField | 268435456;
	};

	Promise.prototype._setRejected = function Promise$_setRejected() {
	    this._bitField = this._bitField | 134217728;
	};

	Promise.prototype._setFollowing = function Promise$_setFollowing() {
	    this._bitField = this._bitField | 536870912;
	};

	Promise.prototype._setIsFinal = function Promise$_setIsFinal() {
	    this._bitField = this._bitField | 33554432;
	};

	Promise.prototype._isFinal = function Promise$_isFinal() {
	    return (this._bitField & 33554432) > 0;
	};

	Promise.prototype._cancellable = function Promise$_cancellable() {
	    return (this._bitField & 67108864) > 0;
	};

	Promise.prototype._setCancellable = function Promise$_setCancellable() {
	    this._bitField = this._bitField | 67108864;
	};

	Promise.prototype._unsetCancellable = function Promise$_unsetCancellable() {
	    this._bitField = this._bitField & (~67108864);
	};

	Promise.prototype._setRejectionIsUnhandled =
	function Promise$_setRejectionIsUnhandled() {
	    this._bitField = this._bitField | 2097152;
	};

	Promise.prototype._unsetRejectionIsUnhandled =
	function Promise$_unsetRejectionIsUnhandled() {
	    this._bitField = this._bitField & (~2097152);
	    if (this._isUnhandledRejectionNotified()) {
	        this._unsetUnhandledRejectionIsNotified();
	        this._notifyUnhandledRejectionIsHandled();
	    }
	};

	Promise.prototype._isRejectionUnhandled =
	function Promise$_isRejectionUnhandled() {
	    return (this._bitField & 2097152) > 0;
	};

	Promise.prototype._setUnhandledRejectionIsNotified =
	function Promise$_setUnhandledRejectionIsNotified() {
	    this._bitField = this._bitField | 524288;
	};

	Promise.prototype._unsetUnhandledRejectionIsNotified =
	function Promise$_unsetUnhandledRejectionIsNotified() {
	    this._bitField = this._bitField & (~524288);
	};

	Promise.prototype._isUnhandledRejectionNotified =
	function Promise$_isUnhandledRejectionNotified() {
	    return (this._bitField & 524288) > 0;
	};

	Promise.prototype._setCarriedStackTrace =
	function Promise$_setCarriedStackTrace(capturedTrace) {
	    this._bitField = this._bitField | 1048576;
	    this._fulfillmentHandler0 = capturedTrace;
	};

	Promise.prototype._unsetCarriedStackTrace =
	function Promise$_unsetCarriedStackTrace() {
	    this._bitField = this._bitField & (~1048576);
	    this._fulfillmentHandler0 = void 0;
	};

	Promise.prototype._isCarryingStackTrace =
	function Promise$_isCarryingStackTrace() {
	    return (this._bitField & 1048576) > 0;
	};

	Promise.prototype._getCarriedStackTrace =
	function Promise$_getCarriedStackTrace() {
	    return this._isCarryingStackTrace()
	        ? this._fulfillmentHandler0
	        : void 0;
	};

	Promise.prototype._receiverAt = function Promise$_receiverAt(index) {
	    var ret = index === 0
	        ? this._receiver0
	        : this[(index << 2) + index - 5 + 4];
	    if (this._isBound() && ret === void 0) {
	        return this._boundTo;
	    }
	    return ret;
	};

	Promise.prototype._promiseAt = function Promise$_promiseAt(index) {
	    return index === 0
	        ? this._promise0
	        : this[(index << 2) + index - 5 + 3];
	};

	Promise.prototype._fulfillmentHandlerAt =
	function Promise$_fulfillmentHandlerAt(index) {
	    return index === 0
	        ? this._fulfillmentHandler0
	        : this[(index << 2) + index - 5 + 0];
	};

	Promise.prototype._rejectionHandlerAt =
	function Promise$_rejectionHandlerAt(index) {
	    return index === 0
	        ? this._rejectionHandler0
	        : this[(index << 2) + index - 5 + 1];
	};

	Promise.prototype._addCallbacks = function Promise$_addCallbacks(
	    fulfill,
	    reject,
	    progress,
	    promise,
	    receiver
	) {
	    var index = this._length();

	    if (index >= 262143 - 5) {
	        index = 0;
	        this._setLength(0);
	    }

	    if (index === 0) {
	        this._promise0 = promise;
	        if (receiver !== void 0) this._receiver0 = receiver;
	        if (typeof fulfill === "function" && !this._isCarryingStackTrace())
	            this._fulfillmentHandler0 = fulfill;
	        if (typeof reject === "function") this._rejectionHandler0 = reject;
	        if (typeof progress === "function") this._progressHandler0 = progress;
	    } else {
	        var base = (index << 2) + index - 5;
	        this[base + 3] = promise;
	        this[base + 4] = receiver;
	        this[base + 0] = typeof fulfill === "function"
	                                            ? fulfill : void 0;
	        this[base + 1] = typeof reject === "function"
	                                            ? reject : void 0;
	        this[base + 2] = typeof progress === "function"
	                                            ? progress : void 0;
	    }
	    this._setLength(index + 1);
	    return index;
	};

	Promise.prototype._setProxyHandlers =
	function Promise$_setProxyHandlers(receiver, promiseSlotValue) {
	    var index = this._length();

	    if (index >= 262143 - 5) {
	        index = 0;
	        this._setLength(0);
	    }
	    if (index === 0) {
	        this._promise0 = promiseSlotValue;
	        this._receiver0 = receiver;
	    } else {
	        var base = (index << 2) + index - 5;
	        this[base + 3] = promiseSlotValue;
	        this[base + 4] = receiver;
	        this[base + 0] =
	        this[base + 1] =
	        this[base + 2] = void 0;
	    }
	    this._setLength(index + 1);
	};

	Promise.prototype._proxyPromiseArray =
	function Promise$_proxyPromiseArray(promiseArray, index) {
	    this._setProxyHandlers(promiseArray, index);
	};

	Promise.prototype._proxyPromise = function Promise$_proxyPromise(promise) {
	    promise._setProxied();
	    this._setProxyHandlers(promise, -1);
	};

	Promise.prototype._setBoundTo = function Promise$_setBoundTo(obj) {
	    if (obj !== void 0) {
	        this._bitField = this._bitField | 8388608;
	        this._boundTo = obj;
	    } else {
	        this._bitField = this._bitField & (~8388608);
	    }
	};

	Promise.prototype._isBound = function Promise$_isBound() {
	    return (this._bitField & 8388608) === 8388608;
	};

	Promise.prototype._resolveFromResolver =
	function Promise$_resolveFromResolver(resolver) {
	    var promise = this;
	    this._setTrace(void 0);
	    this._pushContext();

	    function Promise$_resolver(val) {
	        if (promise._tryFollow(val)) {
	            return;
	        }
	        promise._fulfill(val);
	    }
	    function Promise$_rejecter(val) {
	        var trace = canAttach(val) ? val : new Error(val + "");
	        promise._attachExtraTrace(trace);
	        markAsOriginatingFromRejection(val);
	        promise._reject(val, trace === val ? void 0 : trace);
	    }
	    var r = tryCatch2(resolver, void 0, Promise$_resolver, Promise$_rejecter);
	    this._popContext();

	    if (r !== void 0 && r === errorObj) {
	        var e = r.e;
	        var trace = canAttach(e) ? e : new Error(e + "");
	        promise._reject(e, trace);
	    }
	};

	Promise.prototype._spreadSlowCase =
	function Promise$_spreadSlowCase(targetFn, promise, values, boundTo) {
	    var promiseForAll = new PromiseArray(values).promise();
	    var promise2 = promiseForAll._then(function() {
	        return targetFn.apply(boundTo, arguments);
	    }, void 0, void 0, APPLY, void 0);
	    promise._follow(promise2);
	};

	Promise.prototype._callSpread =
	function Promise$_callSpread(handler, promise, value) {
	    var boundTo = this._boundTo;
	    if (isArray(value)) {
	        for (var i = 0, len = value.length; i < len; ++i) {
	            if (cast(value[i], void 0) instanceof Promise) {
	                this._spreadSlowCase(handler, promise, value, boundTo);
	                return;
	            }
	        }
	    }
	    promise._pushContext();
	    return tryCatchApply(handler, value, boundTo);
	};

	Promise.prototype._callHandler =
	function Promise$_callHandler(
	    handler, receiver, promise, value) {
	    var x;
	    if (receiver === APPLY && !this.isRejected()) {
	        x = this._callSpread(handler, promise, value);
	    } else {
	        promise._pushContext();
	        x = tryCatch1(handler, receiver, value);
	    }
	    promise._popContext();
	    return x;
	};

	Promise.prototype._settlePromiseFromHandler =
	function Promise$_settlePromiseFromHandler(
	    handler, receiver, value, promise
	) {
	    if (!(promise instanceof Promise)) {
	        handler.call(receiver, value, promise);
	        return;
	    }
	    var x = this._callHandler(handler, receiver, promise, value);
	    if (promise._isFollowing()) return;

	    if (x === errorObj || x === promise || x === NEXT_FILTER) {
	        var err = x === promise
	                    ? makeSelfResolutionError()
	                    : x.e;
	        var trace = canAttach(err) ? err : new Error(err + "");
	        if (x !== NEXT_FILTER) promise._attachExtraTrace(trace);
	        promise._rejectUnchecked(err, trace);
	    } else {
	        var castValue = cast(x, promise);
	        if (castValue instanceof Promise) {
	            if (castValue.isRejected() &&
	                !castValue._isCarryingStackTrace() &&
	                !canAttach(castValue._settledValue)) {
	                var trace = new Error(castValue._settledValue + "");
	                promise._attachExtraTrace(trace);
	                castValue._setCarriedStackTrace(trace);
	            }
	            promise._follow(castValue);
	            promise._propagateFrom(castValue, 1);
	        } else {
	            promise._fulfillUnchecked(x);
	        }
	    }
	};

	Promise.prototype._follow =
	function Promise$_follow(promise) {
	    this._setFollowing();

	    if (promise.isPending()) {
	        this._propagateFrom(promise, 1);
	        promise._proxyPromise(this);
	    } else if (promise.isFulfilled()) {
	        this._fulfillUnchecked(promise._settledValue);
	    } else {
	        this._rejectUnchecked(promise._settledValue,
	            promise._getCarriedStackTrace());
	    }

	    if (promise._isRejectionUnhandled()) promise._unsetRejectionIsUnhandled();

	    if (debugging &&
	        promise._traceParent == null) {
	        promise._traceParent = this;
	    }
	};

	Promise.prototype._tryFollow =
	function Promise$_tryFollow(value) {
	    if (this._isFollowingOrFulfilledOrRejected() ||
	        value === this) {
	        return false;
	    }
	    var maybePromise = cast(value, void 0);
	    if (!(maybePromise instanceof Promise)) {
	        return false;
	    }
	    this._follow(maybePromise);
	    return true;
	};

	Promise.prototype._resetTrace = function Promise$_resetTrace() {
	    if (debugging) {
	        this._trace = new CapturedTrace(this._peekContext() === void 0);
	    }
	};

	Promise.prototype._setTrace = function Promise$_setTrace(parent) {
	    if (debugging) {
	        var context = this._peekContext();
	        this._traceParent = context;
	        var isTopLevel = context === void 0;
	        if (parent !== void 0 &&
	            parent._traceParent === context) {
	            this._trace = parent._trace;
	        } else {
	            this._trace = new CapturedTrace(isTopLevel);
	        }
	    }
	    return this;
	};

	Promise.prototype._attachExtraTrace =
	function Promise$_attachExtraTrace(error) {
	    if (debugging) {
	        var promise = this;
	        var stack = error.stack;
	        stack = typeof stack === "string" ? stack.split("\n") : [];
	        CapturedTrace.protectErrorMessageNewlines(stack);
	        var headerLineCount = 1;
	        var combinedTraces = 1;
	        while(promise != null &&
	            promise._trace != null) {
	            stack = CapturedTrace.combine(
	                stack,
	                promise._trace.stack.split("\n")
	            );
	            promise = promise._traceParent;
	            combinedTraces++;
	        }

	        var stackTraceLimit = Error.stackTraceLimit || 10;
	        var max = (stackTraceLimit + headerLineCount) * combinedTraces;
	        var len = stack.length;
	        if (len > max) {
	            stack.length = max;
	        }

	        if (len > 0)
	            stack[0] = stack[0].split("\u0002\u0000\u0001").join("\n");

	        if (stack.length <= headerLineCount) {
	            error.stack = "(No stack trace)";
	        } else {
	            error.stack = stack.join("\n");
	        }
	    }
	};

	Promise.prototype._cleanValues = function Promise$_cleanValues() {
	    if (this._cancellable()) {
	        this._cancellationParent = void 0;
	    }
	};

	Promise.prototype._propagateFrom =
	function Promise$_propagateFrom(parent, flags) {
	    if ((flags & 1) > 0 && parent._cancellable()) {
	        this._setCancellable();
	        this._cancellationParent = parent;
	    }
	    if ((flags & 4) > 0) {
	        this._setBoundTo(parent._boundTo);
	    }
	    if ((flags & 2) > 0) {
	        this._setTrace(parent);
	    }
	};

	Promise.prototype._fulfill = function Promise$_fulfill(value) {
	    if (this._isFollowingOrFulfilledOrRejected()) return;
	    this._fulfillUnchecked(value);
	};

	Promise.prototype._reject =
	function Promise$_reject(reason, carriedStackTrace) {
	    if (this._isFollowingOrFulfilledOrRejected()) return;
	    this._rejectUnchecked(reason, carriedStackTrace);
	};

	Promise.prototype._settlePromiseAt = function Promise$_settlePromiseAt(index) {
	    var handler = this.isFulfilled()
	        ? this._fulfillmentHandlerAt(index)
	        : this._rejectionHandlerAt(index);

	    var value = this._settledValue;
	    var receiver = this._receiverAt(index);
	    var promise = this._promiseAt(index);

	    if (typeof handler === "function") {
	        this._settlePromiseFromHandler(handler, receiver, value, promise);
	    } else {
	        var done = false;
	        var isFulfilled = this.isFulfilled();
	        if (receiver !== void 0) {
	            if (receiver instanceof Promise &&
	                receiver._isProxied()) {
	                receiver._unsetProxied();

	                if (isFulfilled) receiver._fulfillUnchecked(value);
	                else receiver._rejectUnchecked(value,
	                    this._getCarriedStackTrace());
	                done = true;
	            } else if (receiver instanceof PromiseArray) {
	                if (isFulfilled) receiver._promiseFulfilled(value, promise);
	                else receiver._promiseRejected(value, promise);
	                done = true;
	            }
	        }

	        if (!done) {
	            if (isFulfilled) promise._fulfill(value);
	            else promise._reject(value, this._getCarriedStackTrace());
	        }
	    }

	    if (index >= 256) {
	        this._queueGC();
	    }
	};

	Promise.prototype._isProxied = function Promise$_isProxied() {
	    return (this._bitField & 4194304) === 4194304;
	};

	Promise.prototype._setProxied = function Promise$_setProxied() {
	    this._bitField = this._bitField | 4194304;
	};

	Promise.prototype._unsetProxied = function Promise$_unsetProxied() {
	    this._bitField = this._bitField & (~4194304);
	};

	Promise.prototype._isGcQueued = function Promise$_isGcQueued() {
	    return (this._bitField & -1073741824) === -1073741824;
	};

	Promise.prototype._setGcQueued = function Promise$_setGcQueued() {
	    this._bitField = this._bitField | -1073741824;
	};

	Promise.prototype._unsetGcQueued = function Promise$_unsetGcQueued() {
	    this._bitField = this._bitField & (~-1073741824);
	};

	Promise.prototype._queueGC = function Promise$_queueGC() {
	    if (this._isGcQueued()) return;
	    this._setGcQueued();
	    async.invokeLater(this._gc, this, void 0);
	};

	Promise.prototype._gc = function Promise$gc() {
	    var len = this._length() * 5;
	    for (var i = 0; i < len; i++) {
	        delete this[i];
	    }
	    this._setLength(0);
	    this._unsetGcQueued();
	};

	Promise.prototype._queueSettleAt = function Promise$_queueSettleAt(index) {
	    if (this._isRejectionUnhandled()) this._unsetRejectionIsUnhandled();
	    async.invoke(this._settlePromiseAt, this, index);
	};

	Promise.prototype._fulfillUnchecked =
	function Promise$_fulfillUnchecked(value) {
	    if (!this.isPending()) return;
	    if (value === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._rejectUnchecked(err, void 0);
	    }
	    this._cleanValues();
	    this._setFulfilled();
	    this._settledValue = value;
	    var len = this._length();

	    if (len > 0) {
	        async.invoke(this._settlePromises, this, len);
	    }
	};

	Promise.prototype._rejectUncheckedCheckError =
	function Promise$_rejectUncheckedCheckError(reason) {
	    var trace = canAttach(reason) ? reason : new Error(reason + "");
	    this._rejectUnchecked(reason, trace === reason ? void 0 : trace);
	};

	Promise.prototype._rejectUnchecked =
	function Promise$_rejectUnchecked(reason, trace) {
	    if (!this.isPending()) return;
	    if (reason === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._rejectUnchecked(err);
	    }
	    this._cleanValues();
	    this._setRejected();
	    this._settledValue = reason;

	    if (this._isFinal()) {
	        async.invokeLater(thrower, void 0, trace === void 0 ? reason : trace);
	        return;
	    }
	    var len = this._length();

	    if (trace !== void 0) this._setCarriedStackTrace(trace);

	    if (len > 0) {
	        async.invoke(this._rejectPromises, this, null);
	    } else {
	        this._ensurePossibleRejectionHandled();
	    }
	};

	Promise.prototype._rejectPromises = function Promise$_rejectPromises() {
	    this._settlePromises();
	    this._unsetCarriedStackTrace();
	};

	Promise.prototype._settlePromises = function Promise$_settlePromises() {
	    var len = this._length();
	    for (var i = 0; i < len; i++) {
	        this._settlePromiseAt(i);
	    }
	};

	Promise.prototype._ensurePossibleRejectionHandled =
	function Promise$_ensurePossibleRejectionHandled() {
	    this._setRejectionIsUnhandled();
	    if (CapturedTrace.possiblyUnhandledRejection !== void 0) {
	        async.invokeLater(this._notifyUnhandledRejection, this, void 0);
	    }
	};

	Promise.prototype._notifyUnhandledRejectionIsHandled =
	function Promise$_notifyUnhandledRejectionIsHandled() {
	    if (typeof unhandledRejectionHandled === "function") {
	        async.invokeLater(unhandledRejectionHandled, void 0, this);
	    }
	};

	Promise.prototype._notifyUnhandledRejection =
	function Promise$_notifyUnhandledRejection() {
	    if (this._isRejectionUnhandled()) {
	        var reason = this._settledValue;
	        var trace = this._getCarriedStackTrace();

	        this._setUnhandledRejectionIsNotified();

	        if (trace !== void 0) {
	            this._unsetCarriedStackTrace();
	            reason = trace;
	        }
	        if (typeof CapturedTrace.possiblyUnhandledRejection === "function") {
	            CapturedTrace.possiblyUnhandledRejection(reason, this);
	        }
	    }
	};

	var contextStack = [];
	Promise.prototype._peekContext = function Promise$_peekContext() {
	    var lastIndex = contextStack.length - 1;
	    if (lastIndex >= 0) {
	        return contextStack[lastIndex];
	    }
	    return void 0;

	};

	Promise.prototype._pushContext = function Promise$_pushContext() {
	    if (!debugging) return;
	    contextStack.push(this);
	};

	Promise.prototype._popContext = function Promise$_popContext() {
	    if (!debugging) return;
	    contextStack.pop();
	};

	Promise.noConflict = function Promise$NoConflict() {
	    return noConflict(Promise);
	};

	Promise.setScheduler = function(fn) {
	    if (typeof fn !== "function") throw new TypeError("fn must be a function");
	    async._schedule = fn;
	};

	if (!CapturedTrace.isSupported()) {
	    Promise.longStackTraces = function(){};
	    debugging = false;
	}

	Promise._makeSelfResolutionError = makeSelfResolutionError;
	__webpack_require__(58)(Promise, NEXT_FILTER, cast);
	__webpack_require__(59)(Promise);
	__webpack_require__(60)(Promise);
	__webpack_require__(61)(Promise, PromiseArray, cast, INTERNAL);
	Promise.RangeError = RangeError;
	Promise.CancellationError = CancellationError;
	Promise.TimeoutError = TimeoutError;
	Promise.TypeError = TypeError;
	Promise.OperationalError = OperationalError;
	Promise.RejectionError = OperationalError;
	Promise.AggregateError = errors.AggregateError;

	util.toFastProperties(Promise);
	util.toFastProperties(Promise.prototype);
	Promise.Promise = Promise;
	__webpack_require__(62)(Promise,INTERNAL,cast);
	__webpack_require__(63)(Promise,INTERNAL,cast);
	__webpack_require__(64)(Promise);
	__webpack_require__(65)(Promise,apiRejection,INTERNAL,cast);
	__webpack_require__(66)(Promise,PromiseArray,apiRejection,cast,INTERNAL);
	__webpack_require__(67)(Promise);
	__webpack_require__(68)(Promise,INTERNAL);
	__webpack_require__(69)(Promise,PromiseArray,cast);
	__webpack_require__(70)(Promise,PromiseArray,apiRejection,cast,INTERNAL);
	__webpack_require__(71)(Promise,PromiseArray);
	__webpack_require__(72)(Promise,PromiseArray,apiRejection);
	__webpack_require__(73)(Promise,PromiseArray);
	__webpack_require__(74)(Promise,INTERNAL);
	__webpack_require__(75)(Promise,INTERNAL);
	__webpack_require__(76)(Promise,PromiseArray);
	__webpack_require__(77)(Promise,INTERNAL);
	__webpack_require__(78)(Promise,apiRejection,cast);

	Promise.prototype = Promise.prototype;
	return Promise;

	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(79)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.Perseus;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var es5 = __webpack_require__(80);
	var haveGetters = (function(){
	    try {
	        var o = {};
	        es5.defineProperty(o, "f", {
	            get: function () {
	                return 3;
	            }
	        });
	        return o.f === 3;
	    }
	    catch (e) {
	        return false;
	    }

	})();
	var canEvaluate = typeof navigator == "undefined";
	var errorObj = {e: {}};
	function tryCatch1(fn, receiver, arg) {
	    try { return fn.call(receiver, arg); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function tryCatch2(fn, receiver, arg, arg2) {
	    try { return fn.call(receiver, arg, arg2); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function tryCatch3(fn, receiver, arg, arg2, arg3) {
	    try { return fn.call(receiver, arg, arg2, arg3); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function tryCatch4(fn, receiver, arg, arg2, arg3, arg4) {
	    try { return fn.call(receiver, arg, arg2, arg3, arg4); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function tryCatchApply(fn, args, receiver) {
	    try { return fn.apply(receiver, args); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	var inherits = function(Child, Parent) {
	    var hasProp = {}.hasOwnProperty;

	    function T() {
	        this.constructor = Child;
	        this.constructor$ = Parent;
	        for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) &&
	                propertyName.charAt(propertyName.length-1) !== "$"
	           ) {
	                this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	        }
	    }
	    T.prototype = Parent.prototype;
	    Child.prototype = new T();
	    return Child.prototype;
	};

	function asString(val) {
	    return typeof val === "string" ? val : ("" + val);
	}

	function isPrimitive(val) {
	    return val == null || val === true || val === false ||
	        typeof val === "string" || typeof val === "number";

	}

	function isObject(value) {
	    return !isPrimitive(value);
	}

	function maybeWrapAsError(maybeError) {
	    if (!isPrimitive(maybeError)) return maybeError;

	    return new Error(asString(maybeError));
	}

	function withAppended(target, appendee) {
	    var len = target.length;
	    var ret = new Array(len + 1);
	    var i;
	    for (i = 0; i < len; ++i) {
	        ret[i] = target[i];
	    }
	    ret[i] = appendee;
	    return ret;
	}

	function getDataPropertyOrDefault(obj, key, defaultValue) {
	    if (es5.isES5) {
	        var desc = Object.getOwnPropertyDescriptor(obj, key);
	        if (desc != null) {
	            return desc.get == null && desc.set == null
	                    ? desc.value
	                    : defaultValue;
	        }
	    } else {
	        return {}.hasOwnProperty.call(obj, key) ? obj[key] : void 0;
	    }
	}

	function notEnumerableProp(obj, name, value) {
	    if (isPrimitive(obj)) return obj;
	    var descriptor = {
	        value: value,
	        configurable: true,
	        enumerable: false,
	        writable: true
	    };
	    es5.defineProperty(obj, name, descriptor);
	    return obj;
	}


	var wrapsPrimitiveReceiver = (function() {
	    return this !== "string";
	}).call("string");

	function thrower(r) {
	    throw r;
	}

	var inheritedDataKeys = (function() {
	    if (es5.isES5) {
	        return function(obj, opts) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            var getKeys = Object(opts).includeHidden
	                ? Object.getOwnPropertyNames
	                : Object.keys;
	            while (obj != null) {
	                var keys;
	                try {
	                    keys = getKeys(obj);
	                } catch (e) {
	                    return ret;
	                }
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (visitedKeys[key]) continue;
	                    visitedKeys[key] = true;
	                    var desc = Object.getOwnPropertyDescriptor(obj, key);
	                    if (desc != null && desc.get == null && desc.set == null) {
	                        ret.push(key);
	                    }
	                }
	                obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	        };
	    } else {
	        return function(obj) {
	            var ret = [];
	            /*jshint forin:false */
	            for (var key in obj) {
	                ret.push(key);
	            }
	            return ret;
	        };
	    }

	})();

	function isClass(fn) {
	    try {
	        if (typeof fn === "function") {
	            var keys = es5.keys(fn.prototype);
	            return keys.length > 0 &&
	                   !(keys.length === 1 && keys[0] === "constructor");
	        }
	        return false;
	    } catch (e) {
	        return false;
	    }
	}

	function toFastProperties(obj) {
	    /*jshint -W027*/
	    function f() {}
	    f.prototype = obj;
	    return f;
	    eval(obj);
	}

	var rident = /^[a-z$_][a-z$_0-9]*$/i;
	function isIdentifier(str) {
	    return rident.test(str);
	}

	function filledRange(count, prefix, suffix) {
	    var ret = new Array(count);
	    for(var i = 0; i < count; ++i) {
	        ret[i] = prefix + i + suffix;
	    }
	    return ret;
	}

	var ret = {
	    isClass: isClass,
	    isIdentifier: isIdentifier,
	    inheritedDataKeys: inheritedDataKeys,
	    getDataPropertyOrDefault: getDataPropertyOrDefault,
	    thrower: thrower,
	    isArray: es5.isArray,
	    haveGetters: haveGetters,
	    notEnumerableProp: notEnumerableProp,
	    isPrimitive: isPrimitive,
	    isObject: isObject,
	    canEvaluate: canEvaluate,
	    errorObj: errorObj,
	    tryCatch1: tryCatch1,
	    tryCatch2: tryCatch2,
	    tryCatch3: tryCatch3,
	    tryCatch4: tryCatch4,
	    tryCatchApply: tryCatchApply,
	    inherits: inherits,
	    withAppended: withAppended,
	    asString: asString,
	    maybeWrapAsError: maybeWrapAsError,
	    wrapsPrimitiveReceiver: wrapsPrimitiveReceiver,
	    toFastProperties: toFastProperties,
	    filledRange: filledRange
	};

	module.exports = ret;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var schedule = __webpack_require__(81);
	var Queue = __webpack_require__(82);
	var errorObj = __webpack_require__(49).errorObj;
	var tryCatch1 = __webpack_require__(49).tryCatch1;
	var _process = typeof process !== "undefined" ? process : void 0;

	function Async() {
	    this._isTickUsed = false;
	    this._schedule = schedule;
	    this._length = 0;
	    this._lateBuffer = new Queue(16);
	    this._functionBuffer = new Queue(65536);
	    var self = this;
	    this.consumeFunctionBuffer = function Async$consumeFunctionBuffer() {
	        self._consumeFunctionBuffer();
	    };
	}

	Async.prototype.haveItemsQueued = function Async$haveItemsQueued() {
	    return this._length > 0;
	};

	Async.prototype.invokeLater = function Async$invokeLater(fn, receiver, arg) {
	    if (_process !== void 0 &&
	        _process.domain != null &&
	        !fn.domain) {
	        fn = _process.domain.bind(fn);
	    }
	    this._lateBuffer.push(fn, receiver, arg);
	    this._queueTick();
	};

	Async.prototype.invoke = function Async$invoke(fn, receiver, arg) {
	    if (_process !== void 0 &&
	        _process.domain != null &&
	        !fn.domain) {
	        fn = _process.domain.bind(fn);
	    }
	    var functionBuffer = this._functionBuffer;
	    functionBuffer.push(fn, receiver, arg);
	    this._length = functionBuffer.length();
	    this._queueTick();
	};

	Async.prototype._consumeFunctionBuffer =
	function Async$_consumeFunctionBuffer() {
	    var functionBuffer = this._functionBuffer;
	    while (functionBuffer.length() > 0) {
	        var fn = functionBuffer.shift();
	        var receiver = functionBuffer.shift();
	        var arg = functionBuffer.shift();
	        fn.call(receiver, arg);
	    }
	    this._reset();
	    this._consumeLateBuffer();
	};

	Async.prototype._consumeLateBuffer = function Async$_consumeLateBuffer() {
	    var buffer = this._lateBuffer;
	    while(buffer.length() > 0) {
	        var fn = buffer.shift();
	        var receiver = buffer.shift();
	        var arg = buffer.shift();
	        var res = tryCatch1(fn, receiver, arg);
	        if (res === errorObj) {
	            this._queueTick();
	            if (fn.domain != null) {
	                fn.domain.emit("error", res.e);
	            } else {
	                throw res.e;
	            }
	        }
	    }
	};

	Async.prototype._queueTick = function Async$_queue() {
	    if (!this._isTickUsed) {
	        this._schedule(this.consumeFunctionBuffer);
	        this._isTickUsed = true;
	    }
	};

	Async.prototype._reset = function Async$_reset() {
	    this._isTickUsed = false;
	    this._length = 0;
	};

	module.exports = new Async();
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(79)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var Objectfreeze = __webpack_require__(80).freeze;
	var util = __webpack_require__(49);
	var inherits = util.inherits;
	var notEnumerableProp = util.notEnumerableProp;

	function markAsOriginatingFromRejection(e) {
	    try {
	        notEnumerableProp(e, "isOperational", true);
	    }
	    catch(ignore) {}
	}

	function originatesFromRejection(e) {
	    if (e == null) return false;
	    return ((e instanceof OperationalError) ||
	        e["isOperational"] === true);
	}

	function isError(obj) {
	    return obj instanceof Error;
	}

	function canAttach(obj) {
	    return isError(obj);
	}

	function subError(nameProperty, defaultMessage) {
	    function SubError(message) {
	        if (!(this instanceof SubError)) return new SubError(message);
	        this.message = typeof message === "string" ? message : defaultMessage;
	        this.name = nameProperty;
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	        }
	    }
	    inherits(SubError, Error);
	    return SubError;
	}

	var _TypeError, _RangeError;
	var CancellationError = subError("CancellationError", "cancellation error");
	var TimeoutError = subError("TimeoutError", "timeout error");
	var AggregateError = subError("AggregateError", "aggregate error");
	try {
	    _TypeError = TypeError;
	    _RangeError = RangeError;
	} catch(e) {
	    _TypeError = subError("TypeError", "type error");
	    _RangeError = subError("RangeError", "range error");
	}

	var methods = ("join pop push shift unshift slice filter forEach some " +
	    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

	for (var i = 0; i < methods.length; ++i) {
	    if (typeof Array.prototype[methods[i]] === "function") {
	        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	    }
	}

	AggregateError.prototype.length = 0;
	AggregateError.prototype["isOperational"] = true;
	var level = 0;
	AggregateError.prototype.toString = function() {
	    var indent = Array(level * 4 + 1).join(" ");
	    var ret = "\n" + indent + "AggregateError of:" + "\n";
	    level++;
	    indent = Array(level * 4 + 1).join(" ");
	    for (var i = 0; i < this.length; ++i) {
	        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	        var lines = str.split("\n");
	        for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	        }
	        str = lines.join("\n");
	        ret += str + "\n";
	    }
	    level--;
	    return ret;
	};

	function OperationalError(message) {
	    this.name = "OperationalError";
	    this.message = message;
	    this.cause = message;
	    this["isOperational"] = true;

	    if (message instanceof Error) {
	        this.message = message.message;
	        this.stack = message.stack;
	    } else if (Error.captureStackTrace) {
	        Error.captureStackTrace(this, this.constructor);
	    }

	}
	inherits(OperationalError, Error);

	var key = "__BluebirdErrorTypes__";
	var errorTypes = Error[key];
	if (!errorTypes) {
	    errorTypes = Objectfreeze({
	        CancellationError: CancellationError,
	        TimeoutError: TimeoutError,
	        OperationalError: OperationalError,
	        RejectionError: OperationalError,
	        AggregateError: AggregateError
	    });
	    notEnumerableProp(Error, key, errorTypes);
	}

	module.exports = {
	    Error: Error,
	    TypeError: _TypeError,
	    RangeError: _RangeError,
	    CancellationError: errorTypes.CancellationError,
	    OperationalError: errorTypes.OperationalError,
	    TimeoutError: errorTypes.TimeoutError,
	    AggregateError: errorTypes.AggregateError,
	    originatesFromRejection: originatesFromRejection,
	    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	    canAttach: canAttach
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var util = __webpack_require__(49);
	var canAttach = __webpack_require__(51).canAttach;
	var errorObj = util.errorObj;
	var isObject = util.isObject;

	function getThen(obj) {
	    try {
	        return obj.then;
	    }
	    catch(e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	function Promise$_Cast(obj, originalPromise) {
	    if (isObject(obj)) {
	        if (obj instanceof Promise) {
	            return obj;
	        }
	        else if (isAnyBluebirdPromise(obj)) {
	            var ret = new Promise(INTERNAL);
	            ret._setTrace(void 0);
	            obj._then(
	                ret._fulfillUnchecked,
	                ret._rejectUncheckedCheckError,
	                ret._progressUnchecked,
	                ret,
	                null
	            );
	            ret._setFollowing();
	            return ret;
	        }
	        var then = getThen(obj);
	        if (then === errorObj) {
	            if (originalPromise !== void 0 && canAttach(then.e)) {
	                originalPromise._attachExtraTrace(then.e);
	            }
	            return Promise.reject(then.e);
	        } else if (typeof then === "function") {
	            return Promise$_doThenable(obj, then, originalPromise);
	        }
	    }
	    return obj;
	}

	var hasProp = {}.hasOwnProperty;
	function isAnyBluebirdPromise(obj) {
	    return hasProp.call(obj, "_promise0");
	}

	function Promise$_doThenable(x, then, originalPromise) {
	    var resolver = Promise.defer();
	    var called = false;
	    try {
	        then.call(
	            x,
	            Promise$_resolveFromThenable,
	            Promise$_rejectFromThenable,
	            Promise$_progressFromThenable
	        );
	    } catch(e) {
	        if (!called) {
	            called = true;
	            var trace = canAttach(e) ? e : new Error(e + "");
	            if (originalPromise !== void 0) {
	                originalPromise._attachExtraTrace(trace);
	            }
	            resolver.promise._reject(e, trace);
	        }
	    }
	    return resolver.promise;

	    function Promise$_resolveFromThenable(y) {
	        if (called) return;
	        called = true;

	        if (x === y) {
	            var e = Promise._makeSelfResolutionError();
	            if (originalPromise !== void 0) {
	                originalPromise._attachExtraTrace(e);
	            }
	            resolver.promise._reject(e, void 0);
	            return;
	        }
	        resolver.resolve(y);
	    }

	    function Promise$_rejectFromThenable(r) {
	        if (called) return;
	        called = true;
	        var trace = canAttach(r) ? r : new Error(r + "");
	        if (originalPromise !== void 0) {
	            originalPromise._attachExtraTrace(trace);
	        }
	        resolver.promise._reject(r, trace);
	    }

	    function Promise$_progressFromThenable(v) {
	        if (called) return;
	        var promise = resolver.promise;
	        if (typeof promise._progress === "function") {
	            promise._progress(v);
	        }
	    }
	}

	return Promise$_Cast;
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL, cast) {
	var canAttach = __webpack_require__(51).canAttach;
	var util = __webpack_require__(49);
	var isArray = util.isArray;

	function toResolutionValue(val) {
	    switch(val) {
	    case -1: return void 0;
	    case -2: return [];
	    case -3: return {};
	    }
	}

	function PromiseArray(values) {
	    var promise = this._promise = new Promise(INTERNAL);
	    var parent = void 0;
	    if (values instanceof Promise) {
	        parent = values;
	        promise._propagateFrom(parent, 1 | 4);
	    }
	    promise._setTrace(parent);
	    this._values = values;
	    this._length = 0;
	    this._totalResolved = 0;
	    this._init(void 0, -2);
	}
	PromiseArray.prototype.length = function PromiseArray$length() {
	    return this._length;
	};

	PromiseArray.prototype.promise = function PromiseArray$promise() {
	    return this._promise;
	};

	PromiseArray.prototype._init =
	function PromiseArray$_init(_, resolveValueIfEmpty) {
	    var values = cast(this._values, void 0);
	    if (values instanceof Promise) {
	        this._values = values;
	        values._setBoundTo(this._promise._boundTo);
	        if (values.isFulfilled()) {
	            values = values._settledValue;
	            if (!isArray(values)) {
	                var err = new Promise.TypeError("expecting an array, a promise or a thenable");
	                this.__hardReject__(err);
	                return;
	            }
	        } else if (values.isPending()) {
	            values._then(
	                PromiseArray$_init,
	                this._reject,
	                void 0,
	                this,
	                resolveValueIfEmpty
	           );
	            return;
	        } else {
	            values._unsetRejectionIsUnhandled();
	            this._reject(values._settledValue);
	            return;
	        }
	    } else if (!isArray(values)) {
	        var err = new Promise.TypeError("expecting an array, a promise or a thenable");
	        this.__hardReject__(err);
	        return;
	    }

	    if (values.length === 0) {
	        if (resolveValueIfEmpty === -5) {
	            this._resolveEmptyArray();
	        }
	        else {
	            this._resolve(toResolutionValue(resolveValueIfEmpty));
	        }
	        return;
	    }
	    var len = this.getActualLength(values.length);
	    var newLen = len;
	    var newValues = this.shouldCopyValues() ? new Array(len) : this._values;
	    var isDirectScanNeeded = false;
	    for (var i = 0; i < len; ++i) {
	        var maybePromise = cast(values[i], void 0);
	        if (maybePromise instanceof Promise) {
	            if (maybePromise.isPending()) {
	                maybePromise._proxyPromiseArray(this, i);
	            } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                isDirectScanNeeded = true;
	            }
	        } else {
	            isDirectScanNeeded = true;
	        }
	        newValues[i] = maybePromise;
	    }
	    this._values = newValues;
	    this._length = newLen;
	    if (isDirectScanNeeded) {
	        this._scanDirectValues(len);
	    }
	};

	PromiseArray.prototype._settlePromiseAt =
	function PromiseArray$_settlePromiseAt(index) {
	    var value = this._values[index];
	    if (!(value instanceof Promise)) {
	        this._promiseFulfilled(value, index);
	    } else if (value.isFulfilled()) {
	        this._promiseFulfilled(value._settledValue, index);
	    } else if (value.isRejected()) {
	        this._promiseRejected(value._settledValue, index);
	    }
	};

	PromiseArray.prototype._scanDirectValues =
	function PromiseArray$_scanDirectValues(len) {
	    for (var i = 0; i < len; ++i) {
	        if (this._isResolved()) {
	            break;
	        }
	        this._settlePromiseAt(i);
	    }
	};

	PromiseArray.prototype._isResolved = function PromiseArray$_isResolved() {
	    return this._values === null;
	};

	PromiseArray.prototype._resolve = function PromiseArray$_resolve(value) {
	    this._values = null;
	    this._promise._fulfill(value);
	};

	PromiseArray.prototype.__hardReject__ =
	PromiseArray.prototype._reject = function PromiseArray$_reject(reason) {
	    this._values = null;
	    var trace = canAttach(reason) ? reason : new Error(reason + "");
	    this._promise._attachExtraTrace(trace);
	    this._promise._reject(reason, trace);
	};

	PromiseArray.prototype._promiseProgressed =
	function PromiseArray$_promiseProgressed(progressValue, index) {
	    if (this._isResolved()) return;
	    this._promise._progress({
	        index: index,
	        value: progressValue
	    });
	};


	PromiseArray.prototype._promiseFulfilled =
	function PromiseArray$_promiseFulfilled(value, index) {
	    if (this._isResolved()) return;
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	    }
	};

	PromiseArray.prototype._promiseRejected =
	function PromiseArray$_promiseRejected(reason, index) {
	    if (this._isResolved()) return;
	    this._totalResolved++;
	    this._reject(reason);
	};

	PromiseArray.prototype.shouldCopyValues =
	function PromiseArray$_shouldCopyValues() {
	    return true;
	};

	PromiseArray.prototype.getActualLength =
	function PromiseArray$getActualLength(len) {
	    return len;
	};

	return PromiseArray;
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function() {
	var inherits = __webpack_require__(49).inherits;
	var defineProperty = __webpack_require__(80).defineProperty;

	var rignore = new RegExp(
	    "\\b(?:[a-zA-Z0-9.]+\\$_\\w+|" +
	    "tryCatch(?:1|2|3|4|Apply)|new \\w*PromiseArray|" +
	    "\\w*PromiseArray\\.\\w*PromiseArray|" +
	    "setTimeout|CatchFilter\\$_\\w+|makeNodePromisified|processImmediate|" +
	    "process._tickCallback|nextTick|Async\\$\\w+)\\b"
	);

	var rtraceline = null;
	var formatStack = null;

	function formatNonError(obj) {
	    var str;
	    if (typeof obj === "function") {
	        str = "[function " +
	            (obj.name || "anonymous") +
	            "]";
	    } else {
	        str = obj.toString();
	        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	        if (ruselessToString.test(str)) {
	            try {
	                var newStr = JSON.stringify(obj);
	                str = newStr;
	            }
	            catch(e) {

	            }
	        }
	        if (str.length === 0) {
	            str = "(empty array)";
	        }
	    }
	    return ("(<" + snip(str) + ">, no stack trace)");
	}

	function snip(str) {
	    var maxChars = 41;
	    if (str.length < maxChars) {
	        return str;
	    }
	    return str.substr(0, maxChars - 3) + "...";
	}

	function CapturedTrace(ignoreUntil, isTopLevel) {
	    this.captureStackTrace(CapturedTrace, isTopLevel);

	}
	inherits(CapturedTrace, Error);

	CapturedTrace.prototype.captureStackTrace =
	function CapturedTrace$captureStackTrace(ignoreUntil, isTopLevel) {
	    captureStackTrace(this, ignoreUntil, isTopLevel);
	};

	CapturedTrace.possiblyUnhandledRejection =
	function CapturedTrace$PossiblyUnhandledRejection(reason) {
	    if (typeof console === "object") {
	        var message;
	        if (typeof reason === "object" || typeof reason === "function") {
	            var stack = reason.stack;
	            message = "Possibly unhandled " + formatStack(stack, reason);
	        } else {
	            message = "Possibly unhandled " + String(reason);
	        }
	        if (typeof console.error === "function" ||
	            typeof console.error === "object") {
	            console.error(message);
	        } else if (typeof console.log === "function" ||
	            typeof console.log === "object") {
	            console.log(message);
	        }
	    }
	};

	CapturedTrace.combine = function CapturedTrace$Combine(current, prev) {
	    var curLast = current.length - 1;
	    for (var i = prev.length - 1; i >= 0; --i) {
	        var line = prev[i];
	        if (current[curLast] === line) {
	            current.pop();
	            curLast--;
	        } else {
	            break;
	        }
	    }

	    current.push("From previous event:");
	    var lines = current.concat(prev);

	    var ret = [];

	    for (var i = 0, len = lines.length; i < len; ++i) {

	        if ((rignore.test(lines[i]) ||
	            (i > 0 && !rtraceline.test(lines[i])) &&
	            lines[i] !== "From previous event:")
	       ) {
	            continue;
	        }
	        ret.push(lines[i]);
	    }
	    return ret;
	};

	CapturedTrace.protectErrorMessageNewlines = function(stack) {
	    for (var i = 0; i < stack.length; ++i) {
	        if (rtraceline.test(stack[i])) {
	            break;
	        }
	    }

	    if (i <= 1) return;

	    var errorMessageLines = [];
	    for (var j = 0; j < i; ++j) {
	        errorMessageLines.push(stack.shift());
	    }
	    stack.unshift(errorMessageLines.join("\u0002\u0000\u0001"));
	};

	CapturedTrace.isSupported = function CapturedTrace$IsSupported() {
	    return typeof captureStackTrace === "function";
	};

	var captureStackTrace = (function stackDetection() {
	    if (typeof Error.stackTraceLimit === "number" &&
	        typeof Error.captureStackTrace === "function") {
	        rtraceline = /^\s*at\s*/;
	        formatStack = function(stack, error) {
	            if (typeof stack === "string") return stack;

	            if (error.name !== void 0 &&
	                error.message !== void 0) {
	                return error.name + ". " + error.message;
	            }
	            return formatNonError(error);


	        };
	        var captureStackTrace = Error.captureStackTrace;
	        return function CapturedTrace$_captureStackTrace(
	            receiver, ignoreUntil) {
	            captureStackTrace(receiver, ignoreUntil);
	        };
	    }
	    var err = new Error();

	    if (typeof err.stack === "string" &&
	        typeof "".startsWith === "function" &&
	        (err.stack.startsWith("stackDetection@")) &&
	        stackDetection.name === "stackDetection") {

	        defineProperty(Error, "stackTraceLimit", {
	            writable: true,
	            enumerable: false,
	            configurable: false,
	            value: 25
	        });
	        rtraceline = /@/;
	        var rline = /[@\n]/;

	        formatStack = function(stack, error) {
	            if (typeof stack === "string") {
	                return (error.name + ". " + error.message + "\n" + stack);
	            }

	            if (error.name !== void 0 &&
	                error.message !== void 0) {
	                return error.name + ". " + error.message;
	            }
	            return formatNonError(error);
	        };

	        return function captureStackTrace(o) {
	            var stack = new Error().stack;
	            var split = stack.split(rline);
	            var len = split.length;
	            var ret = "";
	            for (var i = 0; i < len; i += 2) {
	                ret += split[i];
	                ret += "@";
	                ret += split[i + 1];
	                ret += "\n";
	            }
	            o.stack = ret;
	        };
	    } else {
	        formatStack = function(stack, error) {
	            if (typeof stack === "string") return stack;

	            if ((typeof error === "object" ||
	                typeof error === "function") &&
	                error.name !== void 0 &&
	                error.message !== void 0) {
	                return error.name + ". " + error.message;
	            }
	            return formatNonError(error);
	        };

	        return null;
	    }
	})();

	return CapturedTrace;
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(NEXT_FILTER) {
	var util = __webpack_require__(49);
	var errors = __webpack_require__(51);
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;
	var keys = __webpack_require__(80).keys;
	var TypeError = errors.TypeError;

	function CatchFilter(instances, callback, promise) {
	    this._instances = instances;
	    this._callback = callback;
	    this._promise = promise;
	}

	function CatchFilter$_safePredicate(predicate, e) {
	    var safeObject = {};
	    var retfilter = tryCatch1(predicate, safeObject, e);

	    if (retfilter === errorObj) return retfilter;

	    var safeKeys = keys(safeObject);
	    if (safeKeys.length) {
	        errorObj.e = new TypeError(
	            "Catch filter must inherit from Error "
	          + "or be a simple predicate function");
	        return errorObj;
	    }
	    return retfilter;
	}

	CatchFilter.prototype.doFilter = function CatchFilter$_doFilter(e) {
	    var cb = this._callback;
	    var promise = this._promise;
	    var boundTo = promise._boundTo;
	    for (var i = 0, len = this._instances.length; i < len; ++i) {
	        var item = this._instances[i];
	        var itemIsErrorType = item === Error ||
	            (item != null && item.prototype instanceof Error);

	        if (itemIsErrorType && e instanceof item) {
	            var ret = tryCatch1(cb, boundTo, e);
	            if (ret === errorObj) {
	                NEXT_FILTER.e = ret.e;
	                return NEXT_FILTER;
	            }
	            return ret;
	        } else if (typeof item === "function" && !itemIsErrorType) {
	            var shouldHandle = CatchFilter$_safePredicate(item, e);
	            if (shouldHandle === errorObj) {
	                var trace = errors.canAttach(errorObj.e)
	                    ? errorObj.e
	                    : new Error(errorObj.e + "");
	                this._promise._attachExtraTrace(trace);
	                e = errorObj.e;
	                break;
	            } else if (shouldHandle) {
	                var ret = tryCatch1(cb, boundTo, e);
	                if (ret === errorObj) {
	                    NEXT_FILTER.e = ret.e;
	                    return NEXT_FILTER;
	                }
	                return ret;
	            }
	        }
	    }
	    NEXT_FILTER.e = e;
	    return NEXT_FILTER;
	};

	return CatchFilter;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var util = __webpack_require__(49);
	var maybeWrapAsError = util.maybeWrapAsError;
	var errors = __webpack_require__(51);
	var TimeoutError = errors.TimeoutError;
	var OperationalError = errors.OperationalError;
	var async = __webpack_require__(50);
	var haveGetters = util.haveGetters;
	var es5 = __webpack_require__(80);

	function isUntypedError(obj) {
	    return obj instanceof Error &&
	        es5.getPrototypeOf(obj) === Error.prototype;
	}

	function wrapAsOperationalError(obj) {
	    var ret;
	    if (isUntypedError(obj)) {
	        ret = new OperationalError(obj);
	    } else {
	        ret = obj;
	    }
	    errors.markAsOriginatingFromRejection(ret);
	    return ret;
	}

	function nodebackForPromise(promise) {
	    function PromiseResolver$_callback(err, value) {
	        if (promise === null) return;

	        if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        } else if (arguments.length > 2) {
	            var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
	            promise._fulfill(args);
	        } else {
	            promise._fulfill(value);
	        }

	        promise = null;
	    }
	    return PromiseResolver$_callback;
	}


	var PromiseResolver;
	if (!haveGetters) {
	    PromiseResolver = function PromiseResolver(promise) {
	        this.promise = promise;
	        this.asCallback = nodebackForPromise(promise);
	        this.callback = this.asCallback;
	    };
	}
	else {
	    PromiseResolver = function PromiseResolver(promise) {
	        this.promise = promise;
	    };
	}
	if (haveGetters) {
	    var prop = {
	        get: function() {
	            return nodebackForPromise(this.promise);
	        }
	    };
	    es5.defineProperty(PromiseResolver.prototype, "asCallback", prop);
	    es5.defineProperty(PromiseResolver.prototype, "callback", prop);
	}

	PromiseResolver._nodebackForPromise = nodebackForPromise;

	PromiseResolver.prototype.toString = function PromiseResolver$toString() {
	    return "[object PromiseResolver]";
	};

	PromiseResolver.prototype.resolve =
	PromiseResolver.prototype.fulfill = function PromiseResolver$resolve(value) {
	    if (!(this instanceof PromiseResolver)) {
	        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
	    }

	    var promise = this.promise;
	    if (promise._tryFollow(value)) {
	        return;
	    }
	    async.invoke(promise._fulfill, promise, value);
	};

	PromiseResolver.prototype.reject = function PromiseResolver$reject(reason) {
	    if (!(this instanceof PromiseResolver)) {
	        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
	    }

	    var promise = this.promise;
	    errors.markAsOriginatingFromRejection(reason);
	    var trace = errors.canAttach(reason) ? reason : new Error(reason + "");
	    promise._attachExtraTrace(trace);
	    async.invoke(promise._reject, promise, reason);
	    if (trace !== reason) {
	        async.invoke(this._setCarriedStackTrace, this, trace);
	    }
	};

	PromiseResolver.prototype.progress =
	function PromiseResolver$progress(value) {
	    if (!(this instanceof PromiseResolver)) {
	        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
	    }
	    async.invoke(this.promise._progress, this.promise, value);
	};

	PromiseResolver.prototype.cancel = function PromiseResolver$cancel() {
	    async.invoke(this.promise.cancel, this.promise, void 0);
	};

	PromiseResolver.prototype.timeout = function PromiseResolver$timeout() {
	    this.reject(new TimeoutError("timeout"));
	};

	PromiseResolver.prototype.isResolved = function PromiseResolver$isResolved() {
	    return this.promise.isResolved();
	};

	PromiseResolver.prototype.toJSON = function PromiseResolver$toJSON() {
	    return this.promise.toJSON();
	};

	PromiseResolver.prototype._setCarriedStackTrace =
	function PromiseResolver$_setCarriedStackTrace(trace) {
	    if (this.promise.isRejected()) {
	        this.promise._setCarriedStackTrace(trace);
	    }
	};

	module.exports = PromiseResolver;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise) {
	var TypeError = __webpack_require__(51).TypeError;

	function apiRejection(msg) {
	    var error = new TypeError(msg);
	    var ret = Promise.rejected(error);
	    var parent = ret._peekContext();
	    if (parent != null) {
	        parent._attachExtraTrace(error);
	    }
	    return ret;
	}

	return apiRejection;
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, NEXT_FILTER, cast) {
	var util = __webpack_require__(49);
	var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;
	var isPrimitive = util.isPrimitive;
	var thrower = util.thrower;

	function returnThis() {
	    return this;
	}
	function throwThis() {
	    throw this;
	}
	function return$(r) {
	    return function Promise$_returner() {
	        return r;
	    };
	}
	function throw$(r) {
	    return function Promise$_thrower() {
	        throw r;
	    };
	}
	function promisedFinally(ret, reasonOrValue, isFulfilled) {
	    var then;
	    if (wrapsPrimitiveReceiver && isPrimitive(reasonOrValue)) {
	        then = isFulfilled ? return$(reasonOrValue) : throw$(reasonOrValue);
	    } else {
	        then = isFulfilled ? returnThis : throwThis;
	    }
	    return ret._then(then, thrower, void 0, reasonOrValue, void 0);
	}

	function finallyHandler(reasonOrValue) {
	    var promise = this.promise;
	    var handler = this.handler;

	    var ret = promise._isBound()
	                    ? handler.call(promise._boundTo)
	                    : handler();

	    if (ret !== void 0) {
	        var maybePromise = cast(ret, void 0);
	        if (maybePromise instanceof Promise) {
	            return promisedFinally(maybePromise, reasonOrValue,
	                                    promise.isFulfilled());
	        }
	    }

	    if (promise.isRejected()) {
	        NEXT_FILTER.e = reasonOrValue;
	        return NEXT_FILTER;
	    } else {
	        return reasonOrValue;
	    }
	}

	function tapHandler(value) {
	    var promise = this.promise;
	    var handler = this.handler;

	    var ret = promise._isBound()
	                    ? handler.call(promise._boundTo, value)
	                    : handler(value);

	    if (ret !== void 0) {
	        var maybePromise = cast(ret, void 0);
	        if (maybePromise instanceof Promise) {
	            return promisedFinally(maybePromise, value, true);
	        }
	    }
	    return value;
	}

	Promise.prototype._passThroughHandler =
	function Promise$_passThroughHandler(handler, isFinally) {
	    if (typeof handler !== "function") return this.then();

	    var promiseAndHandler = {
	        promise: this,
	        handler: handler
	    };

	    return this._then(
	            isFinally ? finallyHandler : tapHandler,
	            isFinally ? finallyHandler : void 0, void 0,
	            promiseAndHandler, void 0);
	};

	Promise.prototype.lastly =
	Promise.prototype["finally"] = function Promise$finally(handler) {
	    return this._passThroughHandler(handler, true);
	};

	Promise.prototype.tap = function Promise$tap(handler) {
	    return this._passThroughHandler(handler, false);
	};
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var util = __webpack_require__(49);
	var isPrimitive = util.isPrimitive;
	var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;

	module.exports = function(Promise) {
	var returner = function Promise$_returner() {
	    return this;
	};
	var thrower = function Promise$_thrower() {
	    throw this;
	};

	var wrapper = function Promise$_wrapper(value, action) {
	    if (action === 1) {
	        return function Promise$_thrower() {
	            throw value;
	        };
	    } else if (action === 2) {
	        return function Promise$_returner() {
	            return value;
	        };
	    }
	};


	Promise.prototype["return"] =
	Promise.prototype.thenReturn =
	function Promise$thenReturn(value) {
	    if (wrapsPrimitiveReceiver && isPrimitive(value)) {
	        return this._then(
	            wrapper(value, 2),
	            void 0,
	            void 0,
	            void 0,
	            void 0
	       );
	    }
	    return this._then(returner, void 0, void 0, value, void 0);
	};

	Promise.prototype["throw"] =
	Promise.prototype.thenThrow =
	function Promise$thenThrow(reason) {
	    if (wrapsPrimitiveReceiver && isPrimitive(reason)) {
	        return this._then(
	            wrapper(reason, 1),
	            void 0,
	            void 0,
	            void 0,
	            void 0
	       );
	    }
	    return this._then(thrower, void 0, void 0, reason, void 0);
	};
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise) {
	function PromiseInspection(promise) {
	    if (promise !== void 0) {
	        this._bitField = promise._bitField;
	        this._settledValue = promise.isResolved()
	            ? promise._settledValue
	            : void 0;
	    }
	    else {
	        this._bitField = 0;
	        this._settledValue = void 0;
	    }
	}

	PromiseInspection.prototype.isFulfilled =
	Promise.prototype.isFulfilled = function Promise$isFulfilled() {
	    return (this._bitField & 268435456) > 0;
	};

	PromiseInspection.prototype.isRejected =
	Promise.prototype.isRejected = function Promise$isRejected() {
	    return (this._bitField & 134217728) > 0;
	};

	PromiseInspection.prototype.isPending =
	Promise.prototype.isPending = function Promise$isPending() {
	    return (this._bitField & 402653184) === 0;
	};

	PromiseInspection.prototype.value =
	Promise.prototype.value = function Promise$value() {
	    if (!this.isFulfilled()) {
	        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise");
	    }
	    return this._settledValue;
	};

	PromiseInspection.prototype.error =
	PromiseInspection.prototype.reason =
	Promise.prototype.reason = function Promise$reason() {
	    if (!this.isRejected()) {
	        throw new TypeError("cannot get rejection reason of a non-rejected promise");
	    }
	    return this._settledValue;
	};

	PromiseInspection.prototype.isResolved =
	Promise.prototype.isResolved = function Promise$isResolved() {
	    return (this._bitField & 402653184) > 0;
	};

	Promise.PromiseInspection = PromiseInspection;
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports =
	function(Promise, PromiseArray, cast, INTERNAL) {
	var util = __webpack_require__(49);
	var canEvaluate = util.canEvaluate;
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;


	if (canEvaluate) {
	    var thenCallback = function(i) {
	        return new Function("value", "holder", "                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g, i));
	    };

	    var caller = function(count) {
	        var values = [];
	        for (var i = 1; i <= count; ++i) values.push("holder.p" + i);
	        return new Function("holder", "                                      \n\
	            'use strict';                                                    \n\
	            var callback = holder.fn;                                        \n\
	            return callback(values);                                         \n\
	            ".replace(/values/g, values.join(", ")));
	    };
	    var thenCallbacks = [];
	    var callers = [void 0];
	    for (var i = 1; i <= 5; ++i) {
	        thenCallbacks.push(thenCallback(i));
	        callers.push(caller(i));
	    }

	    var Holder = function(total, fn) {
	        this.p1 = this.p2 = this.p3 = this.p4 = this.p5 = null;
	        this.fn = fn;
	        this.total = total;
	        this.now = 0;
	    };

	    Holder.prototype.callers = callers;
	    Holder.prototype.checkFulfillment = function(promise) {
	        var now = this.now;
	        now++;
	        var total = this.total;
	        if (now >= total) {
	            var handler = this.callers[total];
	            var ret = tryCatch1(handler, void 0, this);
	            if (ret === errorObj) {
	                promise._rejectUnchecked(ret.e);
	            } else if (!promise._tryFollow(ret)) {
	                promise._fulfillUnchecked(ret);
	            }
	        } else {
	            this.now = now;
	        }
	    };
	}




	Promise.join = function Promise$Join() {
	    var last = arguments.length - 1;
	    var fn;
	    if (last > 0 && typeof arguments[last] === "function") {
	        fn = arguments[last];
	        if (last < 6 && canEvaluate) {
	            var ret = new Promise(INTERNAL);
	            ret._setTrace(void 0);
	            var holder = new Holder(last, fn);
	            var reject = ret._reject;
	            var callbacks = thenCallbacks;
	            for (var i = 0; i < last; ++i) {
	                var maybePromise = cast(arguments[i], void 0);
	                if (maybePromise instanceof Promise) {
	                    if (maybePromise.isPending()) {
	                        maybePromise._then(callbacks[i], reject,
	                                           void 0, ret, holder);
	                    } else if (maybePromise.isFulfilled()) {
	                        callbacks[i].call(ret,
	                                          maybePromise._settledValue, holder);
	                    } else {
	                        ret._reject(maybePromise._settledValue);
	                        maybePromise._unsetRejectionIsUnhandled();
	                    }
	                } else {
	                    callbacks[i].call(ret, maybePromise, holder);
	                }
	            }
	            return ret;
	        }
	    }
	    var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
	    var ret = new PromiseArray(args).promise();
	    return fn !== void 0 ? ret.spread(fn) : ret;
	};

	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var _setTimeout = function(fn, ms) {
	    var len = arguments.length;
	    var arg0 = arguments[2];
	    var arg1 = arguments[3];
	    var arg2 = len >= 5 ? arguments[4] : void 0;
	    setTimeout(function() {
	        fn(arg0, arg1, arg2);
	    }, ms);
	};

	module.exports = function(Promise, INTERNAL, cast) {
	var util = __webpack_require__(49);
	var errors = __webpack_require__(51);
	var apiRejection = __webpack_require__(57)(Promise);
	var TimeoutError = Promise.TimeoutError;

	var afterTimeout = function Promise$_afterTimeout(promise, message, ms) {
	    if (!promise.isPending()) return;
	    if (typeof message !== "string") {
	        message = "operation timed out after" + " " + ms + " ms"
	    }
	    var err = new TimeoutError(message);
	    errors.markAsOriginatingFromRejection(err);
	    promise._attachExtraTrace(err);
	    promise._cancel(err);
	};

	var afterDelay = function Promise$_afterDelay(value, promise) {
	    promise._fulfill(value);
	};

	var delay = Promise.delay = function Promise$Delay(value, ms) {
	    if (ms === void 0) {
	        ms = value;
	        value = void 0;
	    }
	    ms = +ms;
	    var maybePromise = cast(value, void 0);
	    var promise = new Promise(INTERNAL);

	    if (maybePromise instanceof Promise) {
	        promise._propagateFrom(maybePromise, 7);
	        promise._follow(maybePromise);
	        return promise.then(function(value) {
	            return Promise.delay(value, ms);
	        });
	    } else {
	        promise._setTrace(void 0);
	        _setTimeout(afterDelay, ms, value, promise);
	    }
	    return promise;
	};

	Promise.prototype.delay = function Promise$delay(ms) {
	    return delay(this, ms);
	};

	Promise.prototype.timeout = function Promise$timeout(ms, message) {
	    ms = +ms;

	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 7);
	    ret._follow(this);
	    _setTimeout(afterTimeout, ms, ret, message, ms);
	    return ret.cancellable();
	};

	};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL, cast) {
	var apiRejection = __webpack_require__(57)(Promise);
	var isArray = __webpack_require__(49).isArray;

	var raceLater = function Promise$_raceLater(promise) {
	    return promise.then(function(array) {
	        return Promise$_Race(array, promise);
	    });
	};

	var hasOwn = {}.hasOwnProperty;
	function Promise$_Race(promises, parent) {
	    var maybePromise = cast(promises, void 0);

	    if (maybePromise instanceof Promise) {
	        return raceLater(maybePromise);
	    } else if (!isArray(promises)) {
	        return apiRejection("expecting an array, a promise or a thenable");
	    }

	    var ret = new Promise(INTERNAL);
	    if (parent !== void 0) {
	        ret._propagateFrom(parent, 7);
	    } else {
	        ret._setTrace(void 0);
	    }
	    var fulfill = ret._fulfill;
	    var reject = ret._reject;
	    for (var i = 0, len = promises.length; i < len; ++i) {
	        var val = promises[i];

	        if (val === void 0 && !(hasOwn.call(promises, i))) {
	            continue;
	        }

	        Promise.cast(val)._then(fulfill, reject, void 0, ret, null);
	    }
	    return ret;
	}

	Promise.race = function Promise$Race(promises) {
	    return Promise$_Race(promises, void 0);
	};

	Promise.prototype.race = function Promise$race() {
	    return Promise$_Race(this, void 0);
	};

	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var cr = Object.create;
	if (cr) {
	    var callerCache = cr(null);
	    var getterCache = cr(null);
	    callerCache[" size"] = getterCache[" size"] = 0;
	}

	module.exports = function(Promise) {
	var util = __webpack_require__(49);
	var canEvaluate = util.canEvaluate;
	var isIdentifier = util.isIdentifier;

	function makeMethodCaller (methodName) {
	    return new Function("obj", "                                             \n\
	        'use strict'                                                         \n\
	        var len = this.length;                                               \n\
	        switch(len) {                                                        \n\
	            case 1: return obj.methodName(this[0]);                          \n\
	            case 2: return obj.methodName(this[0], this[1]);                 \n\
	            case 3: return obj.methodName(this[0], this[1], this[2]);        \n\
	            case 0: return obj.methodName();                                 \n\
	            default: return obj.methodName.apply(obj, this);                 \n\
	        }                                                                    \n\
	        ".replace(/methodName/g, methodName));
	}

	function makeGetter (propertyName) {
	    return new Function("obj", "                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName", propertyName));
	}

	function getCompiled(name, compiler, cache) {
	    var ret = cache[name];
	    if (typeof ret !== "function") {
	        if (!isIdentifier(name)) {
	            return null;
	        }
	        ret = compiler(name);
	        cache[name] = ret;
	        cache[" size"]++;
	        if (cache[" size"] > 512) {
	            var keys = Object.keys(cache);
	            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
	            cache[" size"] = keys.length - 256;
	        }
	    }
	    return ret;
	}

	function getMethodCaller(name) {
	    return getCompiled(name, makeMethodCaller, callerCache);
	}

	function getGetter(name) {
	    return getCompiled(name, makeGetter, getterCache);
	}

	function caller(obj) {
	    return obj[this.pop()].apply(obj, this);
	}
	Promise.prototype.call = function Promise$call(methodName) {
	    var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
	    if (canEvaluate) {
	        var maybeCaller = getMethodCaller(methodName);
	        if (maybeCaller !== null) {
	            return this._then(maybeCaller, void 0, void 0, args, void 0);
	        }
	    }
	    args.push(methodName);
	    return this._then(caller, void 0, void 0, args, void 0);
	};

	function namedGetter(obj) {
	    return obj[this];
	}
	function indexedGetter(obj) {
	    return obj[this];
	}
	Promise.prototype.get = function Promise$get(propertyName) {
	    var isIndex = (typeof propertyName === "number");
	    var getter;
	    if (!isIndex) {
	        if (canEvaluate) {
	            var maybeGetter = getGetter(propertyName);
	            getter = maybeGetter !== null ? maybeGetter : namedGetter;
	        } else {
	            getter = namedGetter;
	        }
	    } else {
	        getter = indexedGetter;
	    }
	    return this._then(getter, void 0, void 0, propertyName, void 0);
	};
	};


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, apiRejection, INTERNAL, cast) {
	var errors = __webpack_require__(51);
	var TypeError = errors.TypeError;
	var deprecated = __webpack_require__(49).deprecated;
	var util = __webpack_require__(49);
	var errorObj = util.errorObj;
	var tryCatch1 = util.tryCatch1;
	var yieldHandlers = [];

	function promiseFromYieldHandler(value, yieldHandlers) {
	    var _errorObj = errorObj;
	    var _Promise = Promise;
	    var len = yieldHandlers.length;
	    for (var i = 0; i < len; ++i) {
	        var result = tryCatch1(yieldHandlers[i], void 0, value);
	        if (result === _errorObj) {
	            return _Promise.reject(_errorObj.e);
	        }
	        var maybePromise = cast(result, promiseFromYieldHandler);
	        if (maybePromise instanceof _Promise) return maybePromise;
	    }
	    return null;
	}

	function PromiseSpawn(generatorFunction, receiver, yieldHandler) {
	    var promise = this._promise = new Promise(INTERNAL);
	    promise._setTrace(void 0);
	    this._generatorFunction = generatorFunction;
	    this._receiver = receiver;
	    this._generator = void 0;
	    this._yieldHandlers = typeof yieldHandler === "function"
	        ? [yieldHandler].concat(yieldHandlers)
	        : yieldHandlers;
	}

	PromiseSpawn.prototype.promise = function PromiseSpawn$promise() {
	    return this._promise;
	};

	PromiseSpawn.prototype._run = function PromiseSpawn$_run() {
	    this._generator = this._generatorFunction.call(this._receiver);
	    this._receiver =
	        this._generatorFunction = void 0;
	    this._next(void 0);
	};

	PromiseSpawn.prototype._continue = function PromiseSpawn$_continue(result) {
	    if (result === errorObj) {
	        this._generator = void 0;
	        var trace = errors.canAttach(result.e)
	            ? result.e : new Error(result.e + "");
	        this._promise._attachExtraTrace(trace);
	        this._promise._reject(result.e, trace);
	        return;
	    }

	    var value = result.value;
	    if (result.done === true) {
	        this._generator = void 0;
	        if (!this._promise._tryFollow(value)) {
	            this._promise._fulfill(value);
	        }
	    } else {
	        var maybePromise = cast(value, void 0);
	        if (!(maybePromise instanceof Promise)) {
	            maybePromise =
	                promiseFromYieldHandler(maybePromise, this._yieldHandlers);
	            if (maybePromise === null) {
	                this._throw(new TypeError("A value was yielded that could not be treated as a promise"));
	                return;
	            }
	        }
	        maybePromise._then(
	            this._next,
	            this._throw,
	            void 0,
	            this,
	            null
	       );
	    }
	};

	PromiseSpawn.prototype._throw = function PromiseSpawn$_throw(reason) {
	    if (errors.canAttach(reason))
	        this._promise._attachExtraTrace(reason);
	    this._continue(
	        tryCatch1(this._generator["throw"], this._generator, reason)
	   );
	};

	PromiseSpawn.prototype._next = function PromiseSpawn$_next(value) {
	    this._continue(
	        tryCatch1(this._generator.next, this._generator, value)
	   );
	};

	Promise.coroutine =
	function Promise$Coroutine(generatorFunction, options) {
	    if (typeof generatorFunction !== "function") {
	        throw new TypeError("generatorFunction must be a function");
	    }
	    var yieldHandler = Object(options).yieldHandler;
	    var PromiseSpawn$ = PromiseSpawn;
	    return function () {
	        var generator = generatorFunction.apply(this, arguments);
	        var spawn = new PromiseSpawn$(void 0, void 0, yieldHandler);
	        spawn._generator = generator;
	        spawn._next(void 0);
	        return spawn.promise();
	    };
	};

	Promise.coroutine.addYieldHandler = function(fn) {
	    if (typeof fn !== "function") throw new TypeError("fn must be a function");
	    yieldHandlers.push(fn);
	};

	Promise.spawn = function Promise$Spawn(generatorFunction) {
	    deprecated("Promise.spawn is deprecated. Use Promise.coroutine instead.");
	    if (typeof generatorFunction !== "function") {
	        return apiRejection("generatorFunction must be a function");
	    }
	    var spawn = new PromiseSpawn(generatorFunction, this);
	    var ret = spawn.promise();
	    spawn._run(Promise.spawn);
	    return ret;
	};
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, PromiseArray, apiRejection, cast, INTERNAL) {
	var util = __webpack_require__(49);
	var tryCatch3 = util.tryCatch3;
	var errorObj = util.errorObj;
	var PENDING = {};
	var EMPTY_ARRAY = [];

	function MappingPromiseArray(promises, fn, limit, _filter) {
	    this.constructor$(promises);
	    this._callback = fn;
	    this._preservedValues = _filter === INTERNAL
	        ? new Array(this.length())
	        : null;
	    this._limit = limit;
	    this._inFlight = 0;
	    this._queue = limit >= 1 ? [] : EMPTY_ARRAY;
	    this._init$(void 0, -2);
	}
	util.inherits(MappingPromiseArray, PromiseArray);

	MappingPromiseArray.prototype._init = function MappingPromiseArray$_init() {};

	MappingPromiseArray.prototype._promiseFulfilled =
	function MappingPromiseArray$_promiseFulfilled(value, index) {
	    var values = this._values;
	    if (values === null) return;

	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var limit = this._limit;
	    if (values[index] === PENDING) {
	        values[index] = value;
	        if (limit >= 1) {
	            this._inFlight--;
	            this._drainQueue();
	            if (this._isResolved()) return;
	        }
	    } else {
	        if (limit >= 1 && this._inFlight >= limit) {
	            values[index] = value;
	            this._queue.push(index);
	            return;
	        }
	        if (preservedValues !== null) preservedValues[index] = value;

	        var callback = this._callback;
	        var receiver = this._promise._boundTo;
	        var ret = tryCatch3(callback, receiver, value, index, length);
	        if (ret === errorObj) return this._reject(ret.e);

	        var maybePromise = cast(ret, void 0);
	        if (maybePromise instanceof Promise) {
	            if (maybePromise.isPending()) {
	                if (limit >= 1) this._inFlight++;
	                values[index] = PENDING;
	                return maybePromise._proxyPromiseArray(this, index);
	            } else if (maybePromise.isFulfilled()) {
	                ret = maybePromise.value();
	            } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                return this._reject(maybePromise.reason());
	            }
	        }
	        values[index] = ret;
	    }
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= length) {
	        if (preservedValues !== null) {
	            this._filter(values, preservedValues);
	        } else {
	            this._resolve(values);
	        }

	    }
	};

	MappingPromiseArray.prototype._drainQueue =
	function MappingPromiseArray$_drainQueue() {
	    var queue = this._queue;
	    var limit = this._limit;
	    var values = this._values;
	    while (queue.length > 0 && this._inFlight < limit) {
	        var index = queue.pop();
	        this._promiseFulfilled(values[index], index);
	    }
	};

	MappingPromiseArray.prototype._filter =
	function MappingPromiseArray$_filter(booleans, values) {
	    var len = values.length;
	    var ret = new Array(len);
	    var j = 0;
	    for (var i = 0; i < len; ++i) {
	        if (booleans[i]) ret[j++] = values[i];
	    }
	    ret.length = j;
	    this._resolve(ret);
	};

	MappingPromiseArray.prototype.preservedValues =
	function MappingPromiseArray$preserveValues() {
	    return this._preservedValues;
	};

	function map(promises, fn, options, _filter) {
	    var limit = typeof options === "object" && options !== null
	        ? options.concurrency
	        : 0;
	    limit = typeof limit === "number" &&
	        isFinite(limit) && limit >= 1 ? limit : 0;
	    return new MappingPromiseArray(promises, fn, limit, _filter);
	}

	Promise.prototype.map = function Promise$map(fn, options) {
	    if (typeof fn !== "function") return apiRejection("fn must be a function");

	    return map(this, fn, options, null).promise();
	};

	Promise.map = function Promise$Map(promises, fn, options, _filter) {
	    if (typeof fn !== "function") return apiRejection("fn must be a function");
	    return map(promises, fn, options, _filter).promise();
	};


	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise) {
	var util = __webpack_require__(49);
	var async = __webpack_require__(50);
	var tryCatch2 = util.tryCatch2;
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;

	function thrower(r) {
	    throw r;
	}

	function Promise$_spreadAdapter(val, receiver) {
	    if (!util.isArray(val)) return Promise$_successAdapter(val, receiver);
	    var ret = util.tryCatchApply(this, [null].concat(val), receiver);
	    if (ret === errorObj) {
	        async.invokeLater(thrower, void 0, ret.e);
	    }
	}

	function Promise$_successAdapter(val, receiver) {
	    var nodeback = this;
	    var ret = val === void 0
	        ? tryCatch1(nodeback, receiver, null)
	        : tryCatch2(nodeback, receiver, null, val);
	    if (ret === errorObj) {
	        async.invokeLater(thrower, void 0, ret.e);
	    }
	}
	function Promise$_errorAdapter(reason, receiver) {
	    var nodeback = this;
	    var ret = tryCatch1(nodeback, receiver, reason);
	    if (ret === errorObj) {
	        async.invokeLater(thrower, void 0, ret.e);
	    }
	}

	Promise.prototype.nodeify = function Promise$nodeify(nodeback, options) {
	    if (typeof nodeback == "function") {
	        var adapter = Promise$_successAdapter;
	        if (options !== void 0 && Object(options).spread) {
	            adapter = Promise$_spreadAdapter;
	        }
	        this._then(
	            adapter,
	            Promise$_errorAdapter,
	            void 0,
	            nodeback,
	            this._boundTo
	        );
	    }
	    return this;
	};
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var THIS = {};
	var util = __webpack_require__(49);
	var nodebackForPromise = __webpack_require__(56)
	    ._nodebackForPromise;
	var withAppended = util.withAppended;
	var maybeWrapAsError = util.maybeWrapAsError;
	var canEvaluate = util.canEvaluate;
	var TypeError = __webpack_require__(51).TypeError;
	var defaultSuffix = "Async";
	var defaultFilter = function(name, func) {
	    return util.isIdentifier(name) &&
	        name.charAt(0) !== "_" &&
	        !util.isClass(func);
	};
	var defaultPromisified = {__isPromisified__: true};


	function escapeIdentRegex(str) {
	    return str.replace(/([$])/, "\\$");
	}

	function isPromisified(fn) {
	    try {
	        return fn.__isPromisified__ === true;
	    }
	    catch (e) {
	        return false;
	    }
	}

	function hasPromisified(obj, key, suffix) {
	    var val = util.getDataPropertyOrDefault(obj, key + suffix,
	                                            defaultPromisified);
	    return val ? isPromisified(val) : false;
	}
	function checkValid(ret, suffix, suffixRegexp) {
	    for (var i = 0; i < ret.length; i += 2) {
	        var key = ret[i];
	        if (suffixRegexp.test(key)) {
	            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	            for (var j = 0; j < ret.length; j += 2) {
	                if (ret[j] === keyWithoutAsyncSuffix) {
	                    throw new TypeError("Cannot promisify an API " +
	                        "that has normal methods with '"+suffix+"'-suffix");
	                }
	            }
	        }
	    }
	}

	function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	    var keys = util.inheritedDataKeys(obj);
	    var ret = [];
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var value = obj[key];
	        if (typeof value === "function" &&
	            !isPromisified(value) &&
	            !hasPromisified(obj, key, suffix) &&
	            filter(key, value, obj)) {
	            ret.push(key, value);
	        }
	    }
	    checkValid(ret, suffix, suffixRegexp);
	    return ret;
	}

	function switchCaseArgumentOrder(likelyArgumentCount) {
	    var ret = [likelyArgumentCount];
	    var min = Math.max(0, likelyArgumentCount - 1 - 5);
	    for(var i = likelyArgumentCount - 1; i >= min; --i) {
	        if (i === likelyArgumentCount) continue;
	        ret.push(i);
	    }
	    for(var i = likelyArgumentCount + 1; i <= 5; ++i) {
	        ret.push(i);
	    }
	    return ret;
	}

	function argumentSequence(argumentCount) {
	    return util.filledRange(argumentCount, "arguments[", "]");
	}

	function parameterDeclaration(parameterCount) {
	    return util.filledRange(parameterCount, "_arg", "");
	}

	function parameterCount(fn) {
	    if (typeof fn.length === "number") {
	        return Math.max(Math.min(fn.length, 1023 + 1), 0);
	    }
	    return 0;
	}

	function generatePropertyAccess(key) {
	    if (util.isIdentifier(key)) {
	        return "." + key;
	    }
	    else return "['" + key.replace(/(['\\])/g, "\\$1") + "']";
	}

	function makeNodePromisifiedEval(callback, receiver, originalName, fn, suffix) {
	    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
	    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
	    var callbackName =
	        (typeof originalName === "string" && util.isIdentifier(originalName)
	            ? originalName + suffix
	            : "promisified");

	    function generateCallForArgumentCount(count) {
	        var args = argumentSequence(count).join(", ");
	        var comma = count > 0 ? ", " : "";
	        var ret;
	        if (typeof callback === "string") {
	            ret = "                                                          \n\
	                this.method(args, fn);                                       \n\
	                break;                                                       \n\
	            ".replace(".method", generatePropertyAccess(callback));
	        } else if (receiver === THIS) {
	            ret =  "                                                         \n\
	                callback.call(this, args, fn);                               \n\
	                break;                                                       \n\
	            ";
	        } else if (receiver !== void 0) {
	            ret =  "                                                         \n\
	                callback.call(receiver, args, fn);                           \n\
	                break;                                                       \n\
	            ";
	        } else {
	            ret =  "                                                         \n\
	                callback(args, fn);                                          \n\
	                break;                                                       \n\
	            ";
	        }
	        return ret.replace("args", args).replace(", ", comma);
	    }

	    function generateArgumentSwitchCase() {
	        var ret = "";
	        for(var i = 0; i < argumentOrder.length; ++i) {
	            ret += "case " + argumentOrder[i] +":" +
	                generateCallForArgumentCount(argumentOrder[i]);
	        }
	        var codeForCall;
	        if (typeof callback === "string") {
	            codeForCall = "                                                  \n\
	                this.property.apply(this, args);                             \n\
	            "
	                .replace(".property", generatePropertyAccess(callback));
	        } else if (receiver === THIS) {
	            codeForCall = "                                                  \n\
	                callback.apply(this, args);                                  \n\
	            ";
	        } else {
	            codeForCall = "                                                  \n\
	                callback.apply(receiver, args);                              \n\
	            ";
	        }

	        ret += "                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = fn;                                                    \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]", codeForCall);
	        return ret;
	    }

	    return new Function("Promise",
	                        "callback",
	                        "receiver",
	                        "withAppended",
	                        "maybeWrapAsError",
	                        "nodebackForPromise",
	                        "INTERNAL","                                         \n\
	        var ret = function FunctionName(Parameters) {                        \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._setTrace(void 0);                                       \n\
	            var fn = nodebackForPromise(promise);                            \n\
	            try {                                                            \n\
	                switch(len) {                                                \n\
	                    [CodeForSwitchCase]                                      \n\
	                }                                                            \n\
	            } catch (e) {                                                    \n\
	                var wrapped = maybeWrapAsError(e);                           \n\
	                promise._attachExtraTrace(wrapped);                          \n\
	                promise._reject(wrapped);                                    \n\
	            }                                                                \n\
	            return promise;                                                  \n\
	        };                                                                   \n\
	        ret.__isPromisified__ = true;                                        \n\
	        return ret;                                                          \n\
	        "
	        .replace("FunctionName", callbackName)
	        .replace("Parameters", parameterDeclaration(newParameterCount))
	        .replace("[CodeForSwitchCase]", generateArgumentSwitchCase()))(
	            Promise,
	            callback,
	            receiver,
	            withAppended,
	            maybeWrapAsError,
	            nodebackForPromise,
	            INTERNAL
	        );
	}

	function makeNodePromisifiedClosure(callback, receiver) {
	    function promisified() {
	        var _receiver = receiver;
	        if (receiver === THIS) _receiver = this;
	        if (typeof callback === "string") {
	            callback = _receiver[callback];
	        }
	        var promise = new Promise(INTERNAL);
	        promise._setTrace(void 0);
	        var fn = nodebackForPromise(promise);
	        try {
	            callback.apply(_receiver, withAppended(arguments, fn));
	        } catch(e) {
	            var wrapped = maybeWrapAsError(e);
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        }
	        return promise;
	    }
	    promisified.__isPromisified__ = true;
	    return promisified;
	}

	var makeNodePromisified = canEvaluate
	    ? makeNodePromisifiedEval
	    : makeNodePromisifiedClosure;

	function promisifyAll(obj, suffix, filter, promisifier) {
	    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	    var methods =
	        promisifiableMethods(obj, suffix, suffixRegexp, filter);

	    for (var i = 0, len = methods.length; i < len; i+= 2) {
	        var key = methods[i];
	        var fn = methods[i+1];
	        var promisifiedKey = key + suffix;
	        obj[promisifiedKey] = promisifier === makeNodePromisified
	                ? makeNodePromisified(key, THIS, key, fn, suffix)
	                : promisifier(fn);
	    }
	    util.toFastProperties(obj);
	    return obj;
	}

	function promisify(callback, receiver) {
	    return makeNodePromisified(callback, receiver, void 0, callback);
	}

	Promise.promisify = function Promise$Promisify(fn, receiver) {
	    if (typeof fn !== "function") {
	        throw new TypeError("fn must be a function");
	    }
	    if (isPromisified(fn)) {
	        return fn;
	    }
	    return promisify(fn, arguments.length < 2 ? THIS : receiver);
	};

	Promise.promisifyAll = function Promise$PromisifyAll(target, options) {
	    if (typeof target !== "function" && typeof target !== "object") {
	        throw new TypeError("the target of promisifyAll must be an object or a function");
	    }
	    options = Object(options);
	    var suffix = options.suffix;
	    if (typeof suffix !== "string") suffix = defaultSuffix;
	    var filter = options.filter;
	    if (typeof filter !== "function") filter = defaultFilter;
	    var promisifier = options.promisifier;
	    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

	    if (!util.isIdentifier(suffix)) {
	        throw new RangeError("suffix must be a valid identifier");
	    }

	    var keys = util.inheritedDataKeys(target, {includeHidden: true});
	    for (var i = 0; i < keys.length; ++i) {
	        var value = target[keys[i]];
	        if (keys[i] !== "constructor" &&
	            util.isClass(value)) {
	            promisifyAll(value.prototype, suffix, filter, promisifier);
	            promisifyAll(value, suffix, filter, promisifier);
	        }
	    }

	    return promisifyAll(target, suffix, filter, promisifier);
	};
	};



/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, PromiseArray, cast) {
	var util = __webpack_require__(49);
	var apiRejection = __webpack_require__(57)(Promise);
	var isObject = util.isObject;
	var es5 = __webpack_require__(80);

	function PropertiesPromiseArray(obj) {
	    var keys = es5.keys(obj);
	    var len = keys.length;
	    var values = new Array(len * 2);
	    for (var i = 0; i < len; ++i) {
	        var key = keys[i];
	        values[i] = obj[key];
	        values[i + len] = key;
	    }
	    this.constructor$(values);
	}
	util.inherits(PropertiesPromiseArray, PromiseArray);

	PropertiesPromiseArray.prototype._init =
	function PropertiesPromiseArray$_init() {
	    this._init$(void 0, -3) ;
	};

	PropertiesPromiseArray.prototype._promiseFulfilled =
	function PropertiesPromiseArray$_promiseFulfilled(value, index) {
	    if (this._isResolved()) return;
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        var val = {};
	        var keyOffset = this.length();
	        for (var i = 0, len = this.length(); i < len; ++i) {
	            val[this._values[i + keyOffset]] = this._values[i];
	        }
	        this._resolve(val);
	    }
	};

	PropertiesPromiseArray.prototype._promiseProgressed =
	function PropertiesPromiseArray$_promiseProgressed(value, index) {
	    if (this._isResolved()) return;

	    this._promise._progress({
	        key: this._values[index + this.length()],
	        value: value
	    });
	};

	PropertiesPromiseArray.prototype.shouldCopyValues =
	function PropertiesPromiseArray$_shouldCopyValues() {
	    return false;
	};

	PropertiesPromiseArray.prototype.getActualLength =
	function PropertiesPromiseArray$getActualLength(len) {
	    return len >> 1;
	};

	function Promise$_Props(promises) {
	    var ret;
	    var castValue = cast(promises, void 0);

	    if (!isObject(castValue)) {
	        return apiRejection("cannot await properties of a non-object");
	    } else if (castValue instanceof Promise) {
	        ret = castValue._then(Promise.props, void 0, void 0, void 0, void 0);
	    } else {
	        ret = new PropertiesPromiseArray(castValue).promise();
	    }

	    if (castValue instanceof Promise) {
	        ret._propagateFrom(castValue, 4);
	    }
	    return ret;
	}

	Promise.prototype.props = function Promise$props() {
	    return Promise$_Props(this);
	};

	Promise.props = function Promise$Props(promises) {
	    return Promise$_Props(promises);
	};
	};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, PromiseArray, apiRejection, cast, INTERNAL) {
	var util = __webpack_require__(49);
	var tryCatch4 = util.tryCatch4;
	var tryCatch3 = util.tryCatch3;
	var errorObj = util.errorObj;
	function ReductionPromiseArray(promises, fn, accum, _each) {
	    this.constructor$(promises);
	    this._preservedValues = _each === INTERNAL ? [] : null;
	    this._zerothIsAccum = (accum === void 0);
	    this._gotAccum = false;
	    this._reducingIndex = (this._zerothIsAccum ? 1 : 0);
	    this._valuesPhase = undefined;

	    var maybePromise = cast(accum, void 0);
	    var rejected = false;
	    var isPromise = maybePromise instanceof Promise;
	    if (isPromise) {
	        if (maybePromise.isPending()) {
	            maybePromise._proxyPromiseArray(this, -1);
	        } else if (maybePromise.isFulfilled()) {
	            accum = maybePromise.value();
	            this._gotAccum = true;
	        } else {
	            maybePromise._unsetRejectionIsUnhandled();
	            this._reject(maybePromise.reason());
	            rejected = true;
	        }
	    }
	    if (!(isPromise || this._zerothIsAccum)) this._gotAccum = true;
	    this._callback = fn;
	    this._accum = accum;
	    if (!rejected) this._init$(void 0, -5);
	}
	util.inherits(ReductionPromiseArray, PromiseArray);

	ReductionPromiseArray.prototype._init =
	function ReductionPromiseArray$_init() {};

	ReductionPromiseArray.prototype._resolveEmptyArray =
	function ReductionPromiseArray$_resolveEmptyArray() {
	    if (this._gotAccum || this._zerothIsAccum) {
	        this._resolve(this._preservedValues !== null
	                        ? [] : this._accum);
	    }
	};

	ReductionPromiseArray.prototype._promiseFulfilled =
	function ReductionPromiseArray$_promiseFulfilled(value, index) {
	    var values = this._values;
	    if (values === null) return;
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var isEach = preservedValues !== null;
	    var gotAccum = this._gotAccum;
	    var valuesPhase = this._valuesPhase;
	    var valuesPhaseIndex;
	    if (!valuesPhase) {
	        valuesPhase = this._valuesPhase = Array(length);
	        for (valuesPhaseIndex=0; valuesPhaseIndex<length; ++valuesPhaseIndex) {
	            valuesPhase[valuesPhaseIndex] = 0;
	        }
	    }
	    valuesPhaseIndex = valuesPhase[index];

	    if (index === 0 && this._zerothIsAccum) {
	        if (!gotAccum) {
	            this._accum = value;
	            this._gotAccum = gotAccum = true;
	        }
	        valuesPhase[index] = ((valuesPhaseIndex === 0)
	            ? 1 : 2);
	    } else if (index === -1) {
	        if (!gotAccum) {
	            this._accum = value;
	            this._gotAccum = gotAccum = true;
	        }
	    } else {
	        if (valuesPhaseIndex === 0) {
	            valuesPhase[index] = 1;
	        }
	        else {
	            valuesPhase[index] = 2;
	            if (gotAccum) {
	                this._accum = value;
	            }
	        }
	    }
	    if (!gotAccum) return;

	    var callback = this._callback;
	    var receiver = this._promise._boundTo;
	    var ret;

	    for (var i = this._reducingIndex; i < length; ++i) {
	        valuesPhaseIndex = valuesPhase[i];
	        if (valuesPhaseIndex === 2) {
	            this._reducingIndex = i + 1;
	            continue;
	        }
	        if (valuesPhaseIndex !== 1) return;

	        value = values[i];
	        if (value instanceof Promise) {
	            if (value.isFulfilled()) {
	                value = value._settledValue;
	            } else if (value.isPending()) {
	                return;
	            } else {
	                value._unsetRejectionIsUnhandled();
	                return this._reject(value.reason());
	            }
	        }

	        if (isEach) {
	            preservedValues.push(value);
	            ret = tryCatch3(callback, receiver, value, i, length);
	        }
	        else {
	            ret = tryCatch4(callback, receiver, this._accum, value, i, length);
	        }

	        if (ret === errorObj) return this._reject(ret.e);

	        var maybePromise = cast(ret, void 0);
	        if (maybePromise instanceof Promise) {
	            if (maybePromise.isPending()) {
	                valuesPhase[i] = 4;
	                return maybePromise._proxyPromiseArray(this, i);
	            } else if (maybePromise.isFulfilled()) {
	                ret = maybePromise.value();
	            } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                return this._reject(maybePromise.reason());
	            }
	        }

	        this._reducingIndex = i + 1;
	        this._accum = ret;
	    }

	    if (this._reducingIndex < length) return;
	    this._resolve(isEach ? preservedValues : this._accum);
	};

	function reduce(promises, fn, initialValue, _each) {
	    if (typeof fn !== "function") return apiRejection("fn must be a function");
	    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	    return array.promise();
	}

	Promise.prototype.reduce = function Promise$reduce(fn, initialValue) {
	    return reduce(this, fn, initialValue, null);
	};

	Promise.reduce = function Promise$Reduce(promises, fn, initialValue, _each) {
	    return reduce(promises, fn, initialValue, _each);
	};
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports =
	    function(Promise, PromiseArray) {
	var PromiseInspection = Promise.PromiseInspection;
	var util = __webpack_require__(49);

	function SettledPromiseArray(values) {
	    this.constructor$(values);
	}
	util.inherits(SettledPromiseArray, PromiseArray);

	SettledPromiseArray.prototype._promiseResolved =
	function SettledPromiseArray$_promiseResolved(index, inspection) {
	    this._values[index] = inspection;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	    }
	};

	SettledPromiseArray.prototype._promiseFulfilled =
	function SettledPromiseArray$_promiseFulfilled(value, index) {
	    if (this._isResolved()) return;
	    var ret = new PromiseInspection();
	    ret._bitField = 268435456;
	    ret._settledValue = value;
	    this._promiseResolved(index, ret);
	};
	SettledPromiseArray.prototype._promiseRejected =
	function SettledPromiseArray$_promiseRejected(reason, index) {
	    if (this._isResolved()) return;
	    var ret = new PromiseInspection();
	    ret._bitField = 134217728;
	    ret._settledValue = reason;
	    this._promiseResolved(index, ret);
	};

	Promise.settle = function Promise$Settle(promises) {
	    return new SettledPromiseArray(promises).promise();
	};

	Promise.prototype.settle = function Promise$settle() {
	    return new SettledPromiseArray(this).promise();
	};
	};


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports =
	function(Promise, PromiseArray, apiRejection) {
	var util = __webpack_require__(49);
	var RangeError = __webpack_require__(51).RangeError;
	var AggregateError = __webpack_require__(51).AggregateError;
	var isArray = util.isArray;


	function SomePromiseArray(values) {
	    this.constructor$(values);
	    this._howMany = 0;
	    this._unwrap = false;
	    this._initialized = false;
	}
	util.inherits(SomePromiseArray, PromiseArray);

	SomePromiseArray.prototype._init = function SomePromiseArray$_init() {
	    if (!this._initialized) {
	        return;
	    }
	    if (this._howMany === 0) {
	        this._resolve([]);
	        return;
	    }
	    this._init$(void 0, -5);
	    var isArrayResolved = isArray(this._values);
	    if (!this._isResolved() &&
	        isArrayResolved &&
	        this._howMany > this._canPossiblyFulfill()) {
	        this._reject(this._getRangeError(this.length()));
	    }
	};

	SomePromiseArray.prototype.init = function SomePromiseArray$init() {
	    this._initialized = true;
	    this._init();
	};

	SomePromiseArray.prototype.setUnwrap = function SomePromiseArray$setUnwrap() {
	    this._unwrap = true;
	};

	SomePromiseArray.prototype.howMany = function SomePromiseArray$howMany() {
	    return this._howMany;
	};

	SomePromiseArray.prototype.setHowMany =
	function SomePromiseArray$setHowMany(count) {
	    if (this._isResolved()) return;
	    this._howMany = count;
	};

	SomePromiseArray.prototype._promiseFulfilled =
	function SomePromiseArray$_promiseFulfilled(value) {
	    if (this._isResolved()) return;
	    this._addFulfilled(value);
	    if (this._fulfilled() === this.howMany()) {
	        this._values.length = this.howMany();
	        if (this.howMany() === 1 && this._unwrap) {
	            this._resolve(this._values[0]);
	        } else {
	            this._resolve(this._values);
	        }
	    }

	};
	SomePromiseArray.prototype._promiseRejected =
	function SomePromiseArray$_promiseRejected(reason) {
	    if (this._isResolved()) return;
	    this._addRejected(reason);
	    if (this.howMany() > this._canPossiblyFulfill()) {
	        var e = new AggregateError();
	        for (var i = this.length(); i < this._values.length; ++i) {
	            e.push(this._values[i]);
	        }
	        this._reject(e);
	    }
	};

	SomePromiseArray.prototype._fulfilled = function SomePromiseArray$_fulfilled() {
	    return this._totalResolved;
	};

	SomePromiseArray.prototype._rejected = function SomePromiseArray$_rejected() {
	    return this._values.length - this.length();
	};

	SomePromiseArray.prototype._addRejected =
	function SomePromiseArray$_addRejected(reason) {
	    this._values.push(reason);
	};

	SomePromiseArray.prototype._addFulfilled =
	function SomePromiseArray$_addFulfilled(value) {
	    this._values[this._totalResolved++] = value;
	};

	SomePromiseArray.prototype._canPossiblyFulfill =
	function SomePromiseArray$_canPossiblyFulfill() {
	    return this.length() - this._rejected();
	};

	SomePromiseArray.prototype._getRangeError =
	function SomePromiseArray$_getRangeError(count) {
	    var message = "Input array must contain at least " +
	            this._howMany + " items but contains only " + count + " items";
	    return new RangeError(message);
	};

	SomePromiseArray.prototype._resolveEmptyArray =
	function SomePromiseArray$_resolveEmptyArray() {
	    this._reject(this._getRangeError(0));
	};

	function Promise$_Some(promises, howMany) {
	    if ((howMany | 0) !== howMany || howMany < 0) {
	        return apiRejection("expecting a positive integer");
	    }
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    if (promise.isRejected()) {
	        return promise;
	    }
	    ret.setHowMany(howMany);
	    ret.init();
	    return promise;
	}

	Promise.some = function Promise$Some(promises, howMany) {
	    return Promise$_Some(promises, howMany);
	};

	Promise.prototype.some = function Promise$some(howMany) {
	    return Promise$_Some(this, howMany);
	};

	Promise._SomePromiseArray = SomePromiseArray;
	};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, PromiseArray) {
	var util = __webpack_require__(49);
	var async = __webpack_require__(50);
	var errors = __webpack_require__(51);
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;

	Promise.prototype.progressed = function Promise$progressed(handler) {
	    return this._then(void 0, void 0, handler, void 0, void 0);
	};

	Promise.prototype._progress = function Promise$_progress(progressValue) {
	    if (this._isFollowingOrFulfilledOrRejected()) return;
	    this._progressUnchecked(progressValue);

	};

	Promise.prototype._progressHandlerAt =
	function Promise$_progressHandlerAt(index) {
	    return index === 0
	        ? this._progressHandler0
	        : this[(index << 2) + index - 5 + 2];
	};

	Promise.prototype._doProgressWith =
	function Promise$_doProgressWith(progression) {
	    var progressValue = progression.value;
	    var handler = progression.handler;
	    var promise = progression.promise;
	    var receiver = progression.receiver;

	    var ret = tryCatch1(handler, receiver, progressValue);
	    if (ret === errorObj) {
	        if (ret.e != null &&
	            ret.e.name !== "StopProgressPropagation") {
	            var trace = errors.canAttach(ret.e)
	                ? ret.e : new Error(ret.e + "");
	            promise._attachExtraTrace(trace);
	            promise._progress(ret.e);
	        }
	    } else if (ret instanceof Promise) {
	        ret._then(promise._progress, null, null, promise, void 0);
	    } else {
	        promise._progress(ret);
	    }
	};


	Promise.prototype._progressUnchecked =
	function Promise$_progressUnchecked(progressValue) {
	    if (!this.isPending()) return;
	    var len = this._length();
	    var progress = this._progress;
	    for (var i = 0; i < len; i++) {
	        var handler = this._progressHandlerAt(i);
	        var promise = this._promiseAt(i);
	        if (!(promise instanceof Promise)) {
	            var receiver = this._receiverAt(i);
	            if (typeof handler === "function") {
	                handler.call(receiver, progressValue, promise);
	            } else if (receiver instanceof Promise && receiver._isProxied()) {
	                receiver._progressUnchecked(progressValue);
	            } else if (receiver instanceof PromiseArray) {
	                receiver._promiseProgressed(progressValue, promise);
	            }
	            continue;
	        }

	        if (typeof handler === "function") {
	            async.invoke(this._doProgressWith, this, {
	                handler: handler,
	                promise: promise,
	                receiver: this._receiverAt(i),
	                value: progressValue
	            });
	        } else {
	            async.invoke(progress, promise, progressValue);
	        }
	    }
	};
	};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var errors = __webpack_require__(51);
	var canAttach = errors.canAttach;
	var async = __webpack_require__(50);
	var CancellationError = errors.CancellationError;

	Promise.prototype._cancel = function Promise$_cancel(reason) {
	    if (!this.isCancellable()) return this;
	    var parent;
	    var promiseToReject = this;
	    while ((parent = promiseToReject._cancellationParent) !== void 0 &&
	        parent.isCancellable()) {
	        promiseToReject = parent;
	    }
	    promiseToReject._attachExtraTrace(reason);
	    promiseToReject._rejectUnchecked(reason);
	};

	Promise.prototype.cancel = function Promise$cancel(reason) {
	    if (!this.isCancellable()) return this;
	    reason = reason !== void 0
	        ? (canAttach(reason) ? reason : new Error(reason + ""))
	        : new CancellationError();
	    async.invokeLater(this._cancel, this, reason);
	    return this;
	};

	Promise.prototype.cancellable = function Promise$cancellable() {
	    if (this._cancellable()) return this;
	    this._setCancellable();
	    this._cancellationParent = void 0;
	    return this;
	};

	Promise.prototype.uncancellable = function Promise$uncancellable() {
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 2 | 4);
	    ret._follow(this);
	    ret._unsetCancellable();
	    return ret;
	};

	Promise.prototype.fork =
	function Promise$fork(didFulfill, didReject, didProgress) {
	    var ret = this._then(didFulfill, didReject, didProgress,
	                         void 0, void 0);

	    ret._setCancellable();
	    ret._cancellationParent = void 0;
	    return ret;
	};
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseMap = Promise.map;

	Promise.prototype.filter = function Promise$filter(fn, options) {
	    return PromiseMap(this, fn, options, INTERNAL);
	};

	Promise.filter = function Promise$Filter(promises, fn, options) {
	    return PromiseMap(promises, fn, options, INTERNAL);
	};
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise) {
	var SomePromiseArray = Promise._SomePromiseArray;
	function Promise$_Any(promises) {
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    if (promise.isRejected()) {
	        return promise;
	    }
	    ret.setHowMany(1);
	    ret.setUnwrap();
	    ret.init();
	    return promise;
	}

	Promise.any = function Promise$Any(promises) {
	    return Promise$_Any(promises);
	};

	Promise.prototype.any = function Promise$any() {
	    return Promise$_Any(this);
	};

	};


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseReduce = Promise.reduce;

	Promise.prototype.each = function Promise$each(fn) {
	    return PromiseReduce(this, fn, null, INTERNAL);
	};

	Promise.each = function Promise$Each(promises, fn) {
	    return PromiseReduce(promises, fn, null, INTERNAL);
	};
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function (Promise, apiRejection, cast) {
	    var TypeError = __webpack_require__(51).TypeError;
	    var inherits = __webpack_require__(49).inherits;
	    var PromiseInspection = Promise.PromiseInspection;

	    function inspectionMapper(inspections) {
	        var len = inspections.length;
	        for (var i = 0; i < len; ++i) {
	            var inspection = inspections[i];
	            if (inspection.isRejected()) {
	                return Promise.reject(inspection.error());
	            }
	            inspections[i] = inspection.value();
	        }
	        return inspections;
	    }

	    function thrower(e) {
	        setTimeout(function(){throw e;}, 0);
	    }

	    function dispose(resources, inspection) {
	        var i = 0;
	        var len = resources.length;
	        var ret = Promise.defer();
	        function iterator() {
	            if (i >= len) return ret.resolve();
	            var maybePromise = cast(resources[i++], void 0);
	            if (maybePromise instanceof Promise &&
	                maybePromise._isDisposable()) {
	                try {
	                    maybePromise = cast(maybePromise._getDisposer()
	                                        .tryDispose(inspection), void 0);
	                } catch (e) {
	                    return thrower(e);
	                }
	                if (maybePromise instanceof Promise) {
	                    return maybePromise._then(iterator, thrower,
	                                              null, null, null);
	                }
	            }
	            iterator();
	        }
	        iterator();
	        return ret.promise;
	    }

	    function disposerSuccess(value) {
	        var inspection = new PromiseInspection();
	        inspection._settledValue = value;
	        inspection._bitField = 268435456;
	        return dispose(this, inspection).thenReturn(value);
	    }

	    function disposerFail(reason) {
	        var inspection = new PromiseInspection();
	        inspection._settledValue = reason;
	        inspection._bitField = 134217728;
	        return dispose(this, inspection).thenThrow(reason);
	    }

	    function Disposer(data, promise) {
	        this._data = data;
	        this._promise = promise;
	    }

	    Disposer.prototype.data = function Disposer$data() {
	        return this._data;
	    };

	    Disposer.prototype.promise = function Disposer$promise() {
	        return this._promise;
	    };

	    Disposer.prototype.resource = function Disposer$resource() {
	        if (this.promise().isFulfilled()) {
	            return this.promise().value();
	        }
	        return null;
	    };

	    Disposer.prototype.tryDispose = function(inspection) {
	        var resource = this.resource();
	        var ret = resource !== null
	            ? this.doDispose(resource, inspection) : null;
	        this._promise._unsetDisposable();
	        this._data = this._promise = null;
	        return ret;
	    };

	    function FunctionDisposer(fn, promise) {
	        this.constructor$(fn, promise);
	    }
	    inherits(FunctionDisposer, Disposer);

	    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
	        var fn = this.data();
	        return fn.call(resource, resource, inspection);
	    };

	    Promise.using = function Promise$using() {
	        var len = arguments.length;
	        if (len < 2) return apiRejection(
	                        "you must pass at least 2 arguments to Promise.using");
	        var fn = arguments[len - 1];
	        if (typeof fn !== "function") return apiRejection("fn must be a function");
	        len--;
	        var resources = new Array(len);
	        for (var i = 0; i < len; ++i) {
	            var resource = arguments[i];
	            if (resource instanceof Disposer) {
	                var disposer = resource;
	                resource = resource.promise();
	                resource._setDisposable(disposer);
	            }
	            resources[i] = resource;
	        }

	        return Promise.settle(resources)
	            .then(inspectionMapper)
	            .spread(fn)
	            ._then(disposerSuccess, disposerFail, void 0, resources, void 0);
	    };

	    Promise.prototype._setDisposable =
	    function Promise$_setDisposable(disposer) {
	        this._bitField = this._bitField | 262144;
	        this._disposer = disposer;
	    };

	    Promise.prototype._isDisposable = function Promise$_isDisposable() {
	        return (this._bitField & 262144) > 0;
	    };

	    Promise.prototype._getDisposer = function Promise$_getDisposer() {
	        return this._disposer;
	    };

	    Promise.prototype._unsetDisposable = function Promise$_unsetDisposable() {
	        this._bitField = this._bitField & (~262144);
	        this._disposer = void 0;
	    };

	    Promise.prototype.disposer = function Promise$disposer(fn) {
	        if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this);
	        }
	        throw new TypeError();
	    };

	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	}

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	var isES5 = (function(){
	    "use strict";
	    return this === void 0;
	})();

	if (isES5) {
	    module.exports = {
	        freeze: Object.freeze,
	        defineProperty: Object.defineProperty,
	        keys: Object.keys,
	        getPrototypeOf: Object.getPrototypeOf,
	        isArray: Array.isArray,
	        isES5: isES5
	    };
	} else {
	    var has = {}.hasOwnProperty;
	    var str = {}.toString;
	    var proto = {}.constructor.prototype;

	    var ObjectKeys = function ObjectKeys(o) {
	        var ret = [];
	        for (var key in o) {
	            if (has.call(o, key)) {
	                ret.push(key);
	            }
	        }
	        return ret;
	    }

	    var ObjectDefineProperty = function ObjectDefineProperty(o, key, desc) {
	        o[key] = desc.value;
	        return o;
	    }

	    var ObjectFreeze = function ObjectFreeze(obj) {
	        return obj;
	    }

	    var ObjectGetPrototypeOf = function ObjectGetPrototypeOf(obj) {
	        try {
	            return Object(obj).constructor.prototype;
	        }
	        catch (e) {
	            return proto;
	        }
	    }

	    var ArrayIsArray = function ArrayIsArray(obj) {
	        try {
	            return str.call(obj) === "[object Array]";
	        }
	        catch(e) {
	            return false;
	        }
	    }

	    module.exports = {
	        isArray: ArrayIsArray,
	        keys: ObjectKeys,
	        defineProperty: ObjectDefineProperty,
	        freeze: ObjectFreeze,
	        getPrototypeOf: ObjectGetPrototypeOf,
	        isES5: isES5
	    };
	}


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var schedule;
	var _MutationObserver;
	if (typeof process === "object" && typeof process.version === "string") {
	    schedule = function Promise$_Scheduler(fn) {
	        process.nextTick(fn);
	    };
	}
	else if ((typeof MutationObserver !== "undefined" &&
	         (_MutationObserver = MutationObserver)) ||
	         (typeof WebKitMutationObserver !== "undefined" &&
	         (_MutationObserver = WebKitMutationObserver))) {
	    schedule = (function() {
	        var div = document.createElement("div");
	        var queuedFn = void 0;
	        var observer = new _MutationObserver(
	            function Promise$_Scheduler() {
	                var fn = queuedFn;
	                queuedFn = void 0;
	                fn();
	            }
	       );
	        observer.observe(div, {
	            attributes: true
	        });
	        return function Promise$_Scheduler(fn) {
	            queuedFn = fn;
	            div.setAttribute("class", "foo");
	        };

	    })();
	}
	else if (typeof setTimeout !== "undefined") {
	    schedule = function Promise$_Scheduler(fn) {
	        setTimeout(fn, 0);
	    };
	}
	else throw new Error("no async scheduler available");
	module.exports = schedule;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(79)))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	function arrayCopy(src, srcIndex, dst, dstIndex, len) {
	    for (var j = 0; j < len; ++j) {
	        dst[j + dstIndex] = src[j + srcIndex];
	    }
	}

	function Queue(capacity) {
	    this._capacity = capacity;
	    this._length = 0;
	    this._front = 0;
	    this._makeCapacity();
	}

	Queue.prototype._willBeOverCapacity =
	function Queue$_willBeOverCapacity(size) {
	    return this._capacity < size;
	};

	Queue.prototype._pushOne = function Queue$_pushOne(arg) {
	    var length = this.length();
	    this._checkCapacity(length + 1);
	    var i = (this._front + length) & (this._capacity - 1);
	    this[i] = arg;
	    this._length = length + 1;
	};

	Queue.prototype.push = function Queue$push(fn, receiver, arg) {
	    var length = this.length() + 3;
	    if (this._willBeOverCapacity(length)) {
	        this._pushOne(fn);
	        this._pushOne(receiver);
	        this._pushOne(arg);
	        return;
	    }
	    var j = this._front + length - 3;
	    this._checkCapacity(length);
	    var wrapMask = this._capacity - 1;
	    this[(j + 0) & wrapMask] = fn;
	    this[(j + 1) & wrapMask] = receiver;
	    this[(j + 2) & wrapMask] = arg;
	    this._length = length;
	};

	Queue.prototype.shift = function Queue$shift() {
	    var front = this._front,
	        ret = this[front];

	    this[front] = void 0;
	    this._front = (front + 1) & (this._capacity - 1);
	    this._length--;
	    return ret;
	};

	Queue.prototype.length = function Queue$length() {
	    return this._length;
	};

	Queue.prototype._makeCapacity = function Queue$_makeCapacity() {
	    var len = this._capacity;
	    for (var i = 0; i < len; ++i) {
	        this[i] = void 0;
	    }
	};

	Queue.prototype._checkCapacity = function Queue$_checkCapacity(size) {
	    if (this._capacity < size) {
	        this._resizeTo(this._capacity << 3);
	    }
	};

	Queue.prototype._resizeTo = function Queue$_resizeTo(capacity) {
	    var oldFront = this._front;
	    var oldCapacity = this._capacity;
	    var oldQueue = new Array(oldCapacity);
	    var length = this.length();

	    arrayCopy(this, 0, oldQueue, 0, oldCapacity);
	    this._capacity = capacity;
	    this._makeCapacity();
	    this._front = 0;
	    if (oldFront + length <= oldCapacity) {
	        arrayCopy(oldQueue, oldFront, this, 0, length);
	    } else {        var lengthBeforeWrapping =
	            length - ((oldFront + length) & (oldCapacity - 1));

	        arrayCopy(oldQueue, oldFront, this, 0, lengthBeforeWrapping);
	        arrayCopy(oldQueue, 0, this, lengthBeforeWrapping,
	                    length - lengthBeforeWrapping);
	    }
	};

	module.exports = Queue;


/***/ }
/******/ ])
})
