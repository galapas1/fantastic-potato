var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('../webpack.config.prod');
var open = require('open');

/* eslint-disable no-console */

var port = 3000;
var app = express();
var compiler = webpack(config);

process.env.NODE_ENV = 'production'; // this assures the Babel dev config doesn't apply.

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(express.static('public'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (req, res){
  res.sendFile(path.join( __dirname, '../src/index.html'));
})

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});