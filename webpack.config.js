const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: { comments: false },
        },
      }),
      new CssMinimizerPlugin(),
    ],
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
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              ['cssnano', {
                preset: 'advanced',
              }],
            ],
          },
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
