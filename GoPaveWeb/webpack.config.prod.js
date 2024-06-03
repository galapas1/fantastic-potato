var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack =require('webpack');

module.exports = {
  entry: ["babel-polyfill", path.resolve(__dirname, 'src/index')],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [

   new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
   }),
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true
    }),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      },
    ]
  },
  resolve: {
    alias: {
    Components: path.resolve(__dirname, 'src/components/index.js'),
    Forms: path.resolve(__dirname, 'src/screens/Forms/'),
    Actions: path.resolve(__dirname, 'src/actions/index.js'),
    Constants: path.resolve(__dirname, 'src/Constants.js'),
    HelperFunctions: path.resolve(__dirname, 'src/helperFunctions'),
    Data: path.resolve(__dirname, 'src/data'),
    Selectors: path.resolve(__dirname, 'src/selectors'),
    Validation: path.resolve(__dirname, 'src/validation/'),
    }
  }
};