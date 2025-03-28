const getBaselineVersions = require("../scripts/get-baseline-versions");
module.exports = getBaselineVersions({
  targetYear: 2024,
  includeDownstreamBrowsers: true,
});
