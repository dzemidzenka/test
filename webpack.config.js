const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const VENDOR_LIBS = [
    'jquery',
    'normalize.css',
    'lodash'
];



const config = {
    entry: {
        app: './src/js/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash].bundle.js',
        publicPath: '',
    },

    module: {
        rules: [{
                use: 'babel-loader',
                exclude: /node_modules/,
                test: /\.js$/ //file ends with JS
            },
            {
                // use: ['style-loader', 'css-loader'],
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                }),
                test: /\.css$/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 1
                        },
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },


    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HTMLPlugin({
            template: "src/index.html"
        }),
        new HTMLPlugin({
            template: "src/template.html"
        }),

        // new HtmlMinifierPlugin({
        //     removeComments: true,
        // }),
        // new UglifyJSPlugin(),

        // new webpack.HotModuleReplacementPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),      
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

    ]

};

module.exports = config;
