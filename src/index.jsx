/** @jsx React.DOM */

window.Game = require("./game.jsx");
window.Sprite = require("./sprites/sprite.jsx").Sprite;
window.SpriteRenderer = require("./sprites/sprite.jsx").SpriteRenderer;
window.Resources = require("./sprites/sprite.jsx").Resources;
window.Map = require("./map.jsx");
window.Actions = require("./actions.jsx").Actions;
window.MonsterStore = require("./monster-store.jsx");
window.EntityStore = require("./entity.jsx");
window.CombatStore = require("./combat/combat-store.jsx");
window.CombatActions = require("./combat/combat-actions.js");
window.CombatView = require("./combat/combat-view.jsx");
window.ParticleCloudRenderer = require("./sprites/animation.jsx").ParticleCloudRenderer;

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
            <button onClick={() => Actions.setCurrentMap("salinterior")}
                    type="button">
                salinterior
            </button>
            <button onClick={() => Actions.setCurrentMap("cottage")}
                    type="button">
                cottage
            </button>

            <Map />
        </div>;
    }
});
