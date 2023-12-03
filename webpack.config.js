const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/scripts/script.js',
  output: {
    filename: 'script.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  plugins:[
    new CopyWebpackPlugin({patterns: [{from: 'static'}]})
  ] 
};
