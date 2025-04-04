const options = require("./scripts/handle-config");

const getBaselineVersions = require("./scripts/get-baseline-versions");
const targetVersions = getBaselineVersions(options);

module.exports = targetVersions;

const compareVersions = require("./scripts/compare-versions-warning");
compareVersions();
