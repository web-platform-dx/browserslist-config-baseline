const getBaselineVersions = require("../scripts/get-baseline-versions");
module.exports = getBaselineVersions({
  baselineYear: 2018,
  includeDownstreamBrowsers: true,
});
