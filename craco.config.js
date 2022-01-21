const path = require("path");
const CracoAlias = require("craco-alias");

module.exports = {
  babel: {
    presets: [
      // "@babel/preset-typescript",
      // "@babel/preset-react",
      "@babel/preset-env",
    ],
    plugins: [["glsl", { loose: true }]],
  },
  webpack: {
    configure: {
      module: {
        rules: [
          {
            type: "javascript/auto",
            test: /\.mjs$/,
            include: /node_modules/,
          },
        ],
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.path.json",
      },
    },
  ],
};
