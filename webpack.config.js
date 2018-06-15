
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

  target: 'web',

  entry: './src/index.js',

  output: {
    library: 'SomeReactCharts',
    libraryTarget: 'umd',
    filename: 'some-react-charts.js'
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
    'd3-path': 'd3-path',
    'd3-scale': 'd3-scale',
    'd3-shape': 'd3-shape',
    'fetcha': 'fetcha',
    'lodash-es': 'lodash-es',
    'react-autobind': 'react-autobind',
    'react-measure': 'react-measure',
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },

  plugins: [
    new UglifyJsPlugin()
  ]

};