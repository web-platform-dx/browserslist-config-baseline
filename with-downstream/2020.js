const getBaselineVersions = require("../scripts/get-baseline-versions");
module.exports = getBaselineVersions({
  baselineYear: 2020,
  includeDownstreamBrowsers: true,
});
