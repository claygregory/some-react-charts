
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');

const production = process.argv.indexOf('-p') !== -1;

const plugins = [
  new CleanWebpackPlugin(['examples'], {
    root: DIST_DIR
  }),
  new HtmlWebpackPlugin({
    template: './src/examples/index.html'
  })
];

if (!production) {
  plugins.push(new webpack.NamedModulesPlugin());
  plugins.push(new webpack.HotModuleReplacementPlugin());
}


module.exports = {

  mode: 'none',

  target: 'web',

  entry:  './src/examples/index.jsx',

  output: {
    path: DIST_DIR + '/examples',
    filename: production ? '[hash].js' : 'examples.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  plugins: plugins

};