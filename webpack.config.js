const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [            
            {
                test: /\.(css)$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'raw-loader'
                }]
            },
            {
                test: /\.(png|jpg|wav|mp3|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: (file) => {
                                const path = file.split('src').pop();
                                return `${path}`;                            
                            }
                        }
                    }
                ]
            }            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ]
};