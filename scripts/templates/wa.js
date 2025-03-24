module.exports = `
module.exports = {VERSIONS_ARRAY}

const compare_versions = require(process.cwd() + '/scripts/compare-versions-warning');

compare_versions();

`
