const getBaselineVersions = require("../scripts/get-baseline-versions");
module.exports = getBaselineVersions({
  targetYear: 2016,
  includeDownstreamBrowsers: true,
});
