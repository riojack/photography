const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    application: `${__dirname}/index.js`,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    path: `${__dirname}/dist`,
    pathinfo: true,
    filename: '[name].js',
    sourcePrefix: '',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        minimize: true,
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      },
    })],
  },
  module: {
    rules: [{
      test: /\.jsx$|\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.css$|\.scss$/,
      exclude: /node_modules/,
      use: [{
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      },
      {
        loader: 'sass-loader',
      },
      ],
    },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
