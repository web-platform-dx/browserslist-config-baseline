const getBaselineVersions = require("../scripts/get-baseline-versions");
module.exports = getBaselineVersions({
  baselineYear: 2017,
  includeDownstreamBrowsers: true,
});
