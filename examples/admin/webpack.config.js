const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    // The entry point of the app is './src/frontend.js'
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: __dirname,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            { test: /\.js$/, loader: "source-map-loader" },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
        alias: {
            "ra-data-server": path.resolve(__dirname, "../../src/"),
        },
    },
    plugins: [
        // Use 'html-webpack-plugin' to generate the 'index.html' file
        // from the './src/index.html' template
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "./index.html"),
            inject: false,
        }),
    ],
    // Generate source maps to make debugging easier
    devtool: "source-map",
    devServer: {
        // Fallback to 'index.html' in case of 404 responses
        // This is required for a single-page application
        historyApiFallback: true,
    },
};
