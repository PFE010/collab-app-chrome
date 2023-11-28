const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    fallback: {
      "crypto": false,
      "buffer": false,
      "util": false,
      "timers": false,
      "stream": false,
      "url": false,
      "os": false,
      "path": false,
      "net": false,
      "tls": false,
      "fs": false
    }
  }
};
