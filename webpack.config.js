const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    mode: 'development',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.(s?)css$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {
                            includePaths: ['./src/main.scss'],
                            sourceMap: true
                        }
                    }, {
                        loader: "import-glob-loader"
                    }
                ]
            },
            {
                test: /\.(otf|woff|woff2|eot|ttf)$/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        proxy: {
            '/.netlify/functions': {
                target: 'http://lambda:9000',
                pathRewrite: { "^/\\.netlify/functions": "" }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: 'index.html',
            inject: 'body',
            title: 'Weather App'
        }),
        new Dotenv()
    ]
}