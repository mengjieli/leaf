const path = require("path");

module.exports = {
  mode: "development",

  entry: "../libs/tween/src/tween.ts",
  output: {
    filename: "tween.js",
    path: path.resolve(__dirname, "../libs/tween/", "")
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
  devServer: {
    contentBase: path.join(__dirname)
  },
  devtool: "source-map"
};
