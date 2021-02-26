const path = require("path");
const webpack = require('webpack');

module.exports = {
  mode: "development",

  entry: "../Eliminate/src/main.ts",
  output: {
    filename: "main.min.js",
    path: path.resolve(__dirname, "../Eliminate_wxgame/js")
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  plugins:[
    new webpack.DefinePlugin({
      'DEBUG': false,
      'RELEASE': true,
    }),
    new webpack.NormalModuleReplacementPlugin(/debug-platform/, function (resource) {
      resource.request = resource.request.replace(/debug-platform/, `wx-platform`);
    })
  ],
  devServer: {
    contentBase: path.join(__dirname)
  },
  devtool: false
};
