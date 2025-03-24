module.exports = [
  'Chrome >= 105',
  'ChromeAndroid >= 105',
  'Edge >= 105',
  'Firefox >= 104',
  'FirefoxAndroid >= 104',
  'Safari >= 16',
  'iOS >= 16',
  'Opera >= 91',
  'op_mob >= 72',
  'Samsung >= 20.0',
  'Android >= 105',
  'and_qq >= 14.2'
]

const compare_versions = require('../scripts/compare-versions-warning');

compare_versions();
