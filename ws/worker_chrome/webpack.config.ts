import * as path from 'path';
import * as webpack from 'webpack';
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ROOT = path.resolve( __dirname, 'src' );

const config: webpack.Configuration = {
    mode: 'production',
    target: "web",
    entry: {
        worker: './src/index.ts'
    },
    optimization: {
        minimize: !!process.env.minimize||false
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new NodePolyfillPlugin()
    ],
};
export default config;