const urlPrefix = process.env.URL_PREFIX ? `/${process.env.URL_PREFIX}` : "";
// const urlPrefix = "/ps0ketools";
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const path = require("path");

module.exports = withPlugins([[withSass], [withImages], [withCSS]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
});
