var webpack = require('webpack');

module.exports = {
  entry: {
    'application': __dirname + '/index.js',
    'application.min': __dirname + '/index.js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  output: {
    path: __dirname + '/dist',
    pathinfo: true,
    filename: '[name].js',
    sourcePrefix: ''
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [{
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$|\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};
