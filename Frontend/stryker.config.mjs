// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'.",
  testRunner: "jest",
  reporters: ["progress", "clear-text", "html"],
  coverageAnalysis: "off",
  mutate: ["src/**/*.js", "src/**/*.jsx", "!src/**/*test.js", "!src/**/__tests__/**"],
  jest: {
    projectType: "custom",
    // Stryker usará `npm test`/config por defecto de Jest
  },
};
export default config;
