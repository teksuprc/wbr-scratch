const path = require('path');
const hwp = require('html-webpack-plugin');
const cwp = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
                    }
                }
            },{
                test: /\.css$/,
                use: [{loader: 'style-loader'},{loader: 'css-loader'}]
        }]
    },
    resolve: {
        extensions: ['.css', '.js', '.jsx', '.json']
    },
    devServer: {
        port: 8080,
        contentBase: './dist'
    },
    plugins: [
        new hwp({
            template: path.join(__dirname, '/src/index.html'), reject: true
        }),
        new cwp([
            {from: '**/*.json', to: 'data/', context: 'src/'},
            {from: '**/*.json', to: '.', context: 'public/'},
            {from: '**/*.ico', to: '.', context: 'public/'},
        ])
    ]
}