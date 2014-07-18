/** @jsx React.DOM */

window.Game = require("./game.jsx");
window.Engine = require("./sprite.jsx").Engine;
window.Sprite = require("./sprite.jsx").Sprite;
window.SpriteRenderer = require("./sprite.jsx").SpriteRenderer;
window.Resources = require("./sprite.jsx").Resources;
window.Map = require("./map.jsx");
window.Actions = require("./actions.jsx").Actions;
window.MonsterStore = require("./monster-store.jsx");
window.EntityStore = require("./entity.jsx");
window.CombatStore = require("./combat/combat-store.jsx");
window.CombatActions = require("./combat/combat-actions.js");

window.MapShell = React.createClass({
    render: function() {
        return <div>
            <button onClick={() => Actions.setCurrentMap("overworld")}
                    type="button">
                overworld
            </button>
            <button onClick={() => Actions.setCurrentMap("cave")}
                    type="button">
                cave
            </button>

            <Map />
        </div>;
    }
});
