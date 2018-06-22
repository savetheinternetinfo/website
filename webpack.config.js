const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsManifestPlugin = require('webpack-assets-manifest');
const tailwindcss = require('tailwindcss')

module.exports = {
    devtool: 'source-map',
    
    entry: [
        path.resolve(__dirname, 'src/assets/css/main.scss'),
        path.resolve(__dirname, 'src/assets/js/main.ts')
    ],
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: 'bundle.js?[hash]',
        publicPath: '/assets/',
    },
    module: {
        rules: [
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: "file-loader"
                }
            },
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('postcss-import'),
                                tailwindcss(path.resolve(__dirname, 'tailwind-config.js')),
                                require('postcss-preset-env')({stage: 0}),
                                require('precss'),
                                require('autoprefixer'),
                                require('cssnano'),
                            ],
                        }
                    },
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css?[hash]",
            chunkFilename: "[id].css",
        }),
        new AssetsManifestPlugin({
            writeToDisk: true,
            integrity: true,
            publicPath: true,
            integrityHashes: ['sha384'],
        }),
    ]
}