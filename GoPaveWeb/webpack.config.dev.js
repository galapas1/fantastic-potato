import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'source-map',
  entry: ["babel-polyfill", path.resolve(__dirname, 'src/index')],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
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