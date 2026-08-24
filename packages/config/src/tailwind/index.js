module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
  postcssConfig: require("./postcss.config.js"),
  sharedStyles: require("./shared-styles.css"),
};
