// craco.config.js
module.exports = {
  style: {
    postcss: {
      loaderOptions: (postcssLoaderOptions) => {
        postcssLoaderOptions.postcssOptions = {
          plugins: [
            require("@tailwindcss/postcss"),
          ],
        };
        return postcssLoaderOptions;
      },
    },
  },
};