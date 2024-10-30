const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new CssMinimizerPlugin(), '...']
    },
    module: {
        rules: [{
                  test:/\.html$/,
                  use: [{
                      loader: 'html-loader',
                      options: {minimize: true},
             },],
        },
        {
            test:/\.css$/,
            exclude: /styles\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test:/styles\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ]
        },
        {
           test: /\.m?js$/,
           exclude: /node_modules/,
           use: {
           loader: "babel-loader",
           options: {
              presets: ['@babel/preset-env'],
          }
        }
      }

    ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets/'}
            ],
        }),
    ],

    output: {
        filename: '[name].[contenthash].js',
        clean: true, // Clean the output directory before emit.
      },
}