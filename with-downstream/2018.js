const getBaselineVersions = require("../scripts/get-baseline-versions");
module.exports = getBaselineVersions({
  targetYear: 2018,
  includeDownstreamBrowsers: true,
});
