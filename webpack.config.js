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
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
        include: [
          path.join(__dirname, 'client/assets/next.png'),
          path.join(__dirname, 'client/assets/circle.png'),
          path.join(__dirname, 'client/assets/star.png'),
          path.join(__dirname, 'client/assets/starFilled.png'),
          path.join(__dirname, 'client/assets/starHalf.png')
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
      patterns: [{ from: 'client/assets/next.png' }, { from: 'client/assets/circle.png' }, { from: 'client/assets/star.png' }, { from: 'client/assets/starFilled.png' }, { from: 'client/assets/starHalf.png' }],
    }),
  ],
  output: {
    filename: 'alsoEnjoyedBundle.js',
    path: path.resolve(__dirname, 'public')
  }
};