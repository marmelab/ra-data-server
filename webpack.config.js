const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    // The entry point of the app is './src/frontend.js'
    entry: path.resolve(__dirname, "./examples/simple/admin/index.js"),
    output: {
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                // Use 'babel-loader' to compile the JS files
                test: /\.js$/,
                include: path.join(__dirname),
                loader: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    plugins: [
        // Use 'html-webpack-plugin' to generate the 'index.html' file
        // from the './src/index.html' template
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "./examples/simple/index.html"),
            inject: false,
        }),
    ],
    // Generate source maps to make debugging easier
    devtool: "eval-cheap-module-source-map",
    devServer: {
        // Fallback to 'index.html' in case of 404 responses
        // This is required for a single-page application
        historyApiFallback: true,
    },
};
