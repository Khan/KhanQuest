var webpack = require("webpack");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: "./build",
        filename: "index.js",
        library: "KAQuest",
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.jsx$/, loader: "jsx-loader?harmony" }
        ]
    }
};
