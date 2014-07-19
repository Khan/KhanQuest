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

var CombatExerciseRenderer = React.createClass({
    propTypes: {
        content: React.PropTypes.object.isRequired,
        onAttack: React.PropTypes.func.isRequired,
        onFailedAttack: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            content: PERSEUS_ITEM,
            onAttack: function() {
                console.log('onAttack');
            },
            onFailedAttack: function() {
                console.log('onFailedAttack');
            }
        };
    },

    _attemptAttack: function() {
        var gradedResult = this._scoreInput();
        if (gradedResult.correct) {
            this.props.onAttack();
        } else {
            this.props.onFailedAttack();
        }
    },

    _retreat: function() {
        console.log("seeya!");
        // TODO: end battle
    },

    render: function() {
        var questionProps = _.extend({}, this.props.content.question,
            {ref: "questionRenderer"});

        var answerProps = _.extend({}, this.props.content.answerArea,
            {ref: "answerAreaRenderer"});

        return <div>
            {Perseus.Renderer(questionProps)}
            {Perseus.AnswerAreaRenderer(answerProps)}
            <div>
                <button className="retreat" onClick={this._retreat}>
                    Retreat
                </button>
                <button className="attempt" onClick={this._attemptAttack}>
                    Cast spell
                </button>
            </div>
            <div>
                Hacks:
                <button className="correct" onClick={this.props.onAttack}>
                    Correct
                </button>
                <button className="wrong" onClick={this.props.onFailedAttack}>
                    Wrong
                </button>
            </div>
        </div>;
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
