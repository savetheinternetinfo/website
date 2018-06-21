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
        publicPath: '/assets',
    },
    module: {
        rules: [
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
            publicPath: true,
            integrity: true,
            integrityHashes: ['sha384'],
        }),
    ]
}