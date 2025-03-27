const bbm = require('./scripts/bbm');
const transform = require('./scripts/transform-bbm-to-browserslist');
module.exports = transform(bbm.getCompatibleVersions({
  targetYear: 2024
}));
