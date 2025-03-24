
module.exports = [
  "Chrome >= 105",
  "ChromeAndroid >= 105",
  "Edge >= 105",
  "Firefox >= 104",
  "FirefoxAndroid >= 104",
  "Safari >= 16",
  "iOS >= 16"
]

const compare_versions = require('./scripts/compare-versions-warning');

compare_versions();
