const path = require("path");

module.exports = {
  mode: "development",

  entry: "../libs/leaf/src/main.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../", "libs/leaf")
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
