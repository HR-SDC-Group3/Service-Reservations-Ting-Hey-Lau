const path = require('path');
const webpack = require('webpack');

const common = {
  context: path.join(__dirname),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react', '@babel/env', 'airbnb']
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      { 
        test: /aws-sdk/, 
        loaders: ["transform?brfs"],
      },
    ],
  }
};

const client = {
  entry: path.join(__dirname, '/client', 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js'
  }
};

const server = {
  entry: path.join(__dirname, '/server','index.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs-module'
  }
};


module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];
