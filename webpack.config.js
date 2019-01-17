const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const SER_DIR = path.join(__dirname, '/server');

module.exports = [{
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    noParse: /newrelic/,
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react', 'airbnb'],
        },
      },
    ],
  },
},
{
  entry: `${SER_DIR}/index.js`,
  target: 'node',
  output: {
    path: __dirname + '/public',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  },module: {
    noParse: /newrelic/,
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react', 'airbnb'],
        },
      },
    ],
  }  
}]
