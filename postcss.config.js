const autoprefixer = require('autoprefixer');
const cssCustomProperties = require('postcss-custom-properties');
const postcssCalc = require('postcss-calc');

module.exports = {
  plugins: [autoprefixer(), cssCustomProperties(), postcssCalc()]
};
