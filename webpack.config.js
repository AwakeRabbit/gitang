
var webpack = require('webpack');
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const isProd = process.argv.indexOf('-p') !== -1;

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },


    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceMap: !isProd,
                        retainLines: !isProd,
                        presets: ['env','stage-2']
                    }
                }

            },

            {
                test: /\.html$/,
                loader: 'html-loader',
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, use: { loader: 'file?name=public/fonts/[name].[ext]' } }
        ]
    },
    devServer: {
        contentBase: './src/public',
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: !isProd,
            allChunks: true
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            exclude: /\/node_modules/,
            sourceMap: false,
            uglifyOptions: {
                compress: isProd,
                output: {
                    comments: !isProd,
                    beautify: !isProd
                }
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./src/public/index.html'),
            minify: true
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        })
    ]
};