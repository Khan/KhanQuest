/** @jsx React.DOM */

var React = require("react");
var Perseus = require("perseus");

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

var CombatExercise = React.createClass({
    propTypes: {
        content: React.PropTypes.object.isRequired,
        onAttack: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            content: PERSEUS_ITEM,
            onAttack: function() { }
        };
    },

    render: function() {
        return <div>
            {Perseus.Renderer(this.props.content.question)}
            {Perseus.AnswerAreaRenderer(this.props.content.answerArea)}
            <button />
        </div>;
    }
});

module.exports = CombatExercise;
