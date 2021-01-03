const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack')


module.exports = {
  entry: {
    index: path.resolve(__dirname, '/src/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, './public'),
    compress: true,
    port: 9000,
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.jpg|png|gif|woff|woff2|eot|ttf|svg|mp4|webm|ico$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 90000,
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title : 'Music Pro',
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      minify: false
    }),
    new Dotenv({
      path: './.env.development', // Path to .env file (this is the default)
      safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
    })
  ]
}
