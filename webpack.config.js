var webpack = require("webpack");
var path = require('path');

module.exports = {
  // entry: './lib/index.js',

  output: {
    filename: 'public/bundle.js'
  },

  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee" },
      { test: /\.jade$/, loader: "react-jade-loader" }
    ]
  },

  resolve: {
    root: [],
    extensions: ["", ".coffee", ".js"]
  }
}
