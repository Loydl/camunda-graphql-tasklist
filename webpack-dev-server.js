var webpack = require('webpack');
var webPackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var dotenv = require('dotenv');

dotenv.config({silent: true});

const WEBPACK_DEV_SERVER_PORT = process.env.WEBPACK_DEV_SERVER_PORT || 3000;

new webPackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(WEBPACK_DEV_SERVER_PORT, 'localhost', (err) => {
    if (err) {
        return console.log(err)
    }

    console.log(`Webpack Dev Server listening at http://localhost:${WEBPACK_DEV_SERVER_PORT}/`)
});