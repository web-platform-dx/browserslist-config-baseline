const getBaselineVersions = require("../scripts/get-baseline-versions");
module.exports = getBaselineVersions({
  targetYear: 2021,
  includeDownstreamBrowsers: true,
});
