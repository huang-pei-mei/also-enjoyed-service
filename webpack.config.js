const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '/client/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/assets/index.html',
      title: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'client/assets/next.png' }],
    }),
  ],
  output: {
    filename: 'alsoEnjoyedBundle.js',
    path: path.resolve(__dirname, 'public')
  }
};