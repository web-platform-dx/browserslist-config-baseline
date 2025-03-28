const getBaselineVersions = require("./scripts/get-baseline-versions");
module.exports = getBaselineVersions();

const compareVersions = require("./scripts/compare-versions-warning");
compareVersions();
