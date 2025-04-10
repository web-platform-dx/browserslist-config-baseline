const getBaselineVersions = require("../scripts/get-baseline-versions");
module.exports = getBaselineVersions({
  baselineYear: 2022,
  includeDownstreamBrowsers: true,
});
