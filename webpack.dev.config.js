var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// ENV variables
var dotEnvVars = require('dotenv').config({silent: true});

var WEBPACK_DEV_SERVER_PORT = process.env.WEBPACK_DEV_SERVER_PORT || 3000;

module.exports = {
    entry: [
        'whatwg-fetch',
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
                    'react-hot-loader/webpack',
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
                __CAMUNDA_GRAPHQL_SERVER__: JSON.stringify(process.env.CAMUNDA_GRAPHQL_SERVER),
                __LOGIN_NAME__: JSON.stringify(process.env.LOGIN_NAME),
                __LOGIN_PASSWORD__: JSON.stringify(process.env.LOGIN_PASSWORD),
                __JWTAuthProvider__: JSON.stringify(process.env.JWTAuthProvider)
            }
        ),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin()

    ]
};