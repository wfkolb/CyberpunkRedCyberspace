// webpack.config.js
const path = require('path');

module.exports = {
  entry: {
    client: './public/src/client/client.js',
    viewer: './public/src/client/viewer.js',
    monitor: './public/src/client/monitor.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(fbx)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      fs: false,
      path: false,
    },
  },
};
