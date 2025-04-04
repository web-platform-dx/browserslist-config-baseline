const packageJson = require(process.cwd() + "/package.json");

const incomingConfig = packageJson["browserslist-config-baseline"] ?? {};

let options = {
  includeDownstreamBrowsers: incomingConfig.includeDownstreamBrowsers ?? false,
};
if (incomingConfig.widelyAvailableOnDate)
  options.widelyAvailableOnDate = incomingConfig.widelyAvailableOnDate;
if (incomingConfig.targetYear) options.targetYear = incomingConfig.targetYear;

module.exports = options;
