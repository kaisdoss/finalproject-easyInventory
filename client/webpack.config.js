const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// Method 1 : For using environment variables in our app but it's not the best because our API_URL is hardcoded-like
const API_URL = 'http://localhost:5000';
// Method 2 : This is the best method :D
// const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: ['react-hot-loader/patch', path.resolve(__dirname, 'src', 'index.js')],
  output: { path: path.resolve(__dirname, 'dist') },
  mode: 'development',
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      Assets: path.resolve(__dirname, 'src/assets/'),
    },
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new Dotenv({
    //   path: './.env', // Path to .env file (this is the default)
    //   safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(API_URL),
      },
    }),
  ],
};
// 


