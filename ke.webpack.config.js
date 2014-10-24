/*jshint node:true */
var path = require("path");

var webpack = require("webpack");

module.exports = {
    entry: path.join(__dirname, "./node_modules/khan-exercises/main.js"),
    output: {
        path: "./build",
        filename: "ke.js"
    },
    plugins: [
        // khan-exercise.js loads some things async, like utils/calculator.js,
        // but we don't actually want those to be in separate files, so
        // force everything to be bundled into one chunk
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ],
    node: {
        // webpack gets confused by the `process` function in utils/tmpl.js and
        // thinks it needs to embed a process shim -- tell it not to
        process: false
    }
};
