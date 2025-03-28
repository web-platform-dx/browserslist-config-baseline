const getBaselineVersions = require('../scripts/get-baseline-versions')
module.exports = getBaselineVersions({ includeDownstreamBrowsers: true });

const compareVersions = require('../scripts/compare-versions-warning');
compareVersions();
