var webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');


const config = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
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
                        }
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
        new webpack.HotModuleReplacementPlugin(),
    ]

};

module.exports = config;