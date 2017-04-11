var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// ENV variables
var dotEnvVars = require('dotenv').config({silent: true});

var WEBPACK_DEV_SERVER_PORT = process.env.WEBPACK_DEV_SERVER_PORT || 3000;

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://localhost:${WEBPACK_DEV_SERVER_PORT}`,
        './src/index.jsx'
    ],

    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'react-hot-loader',
                    'babel-loader'
                ]
            }
        ]
    },

    plugins: [

        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new webpack.DefinePlugin(
            {
                __CAMUNDA_GRAPHQL_SERVER__: JSON.stringify(process.env.CAMUNDA_GRAPHQL_SERVER)
            }
        ),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin()

    ]
};