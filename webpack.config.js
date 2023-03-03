// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const cssNano = require('cssnano');

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
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     minimize: true,
      //     compress: {
      //     },
      //     output: {
      //       comments: false,
      //     },
      //   },
      // }),
      // new OptimizeCSSAssetsPlugin({
      //   cssProcessorPluginOptions: {
      //     preset: ['advanced'],
      //   },
      // }),
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
      // {
      //   loader: 'postcss-loader',
      //   options: {
      //     ident: 'postcss',
      //     plugins: [
      //       cssNano({
      //         preset: 'advanced',
      //       }),
      //     ],
      //   },
      // },
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
