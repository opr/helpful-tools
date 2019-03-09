const webpack = require('webpack'),
  path = require('path');

module.exports = {
  entry: {
    'app': [
      '@babel/polyfill',
      './assets/js/src/react/index.jsx',
      './assets/js/src/modules/index.js'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false,
      minimize: true
    })
  ],
  output: {
    path: path.resolve(__dirname, './assets/js', 'dist'),
    publicPath: './assets/js/dist/',
    filename: 'bloc.min.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: [/(node_modules)/, /node_modules\/superagent/],
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.resolve('node_modules/react'),
    },
  }
};
