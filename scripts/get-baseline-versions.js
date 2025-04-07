require = require("@httptoolkit/esm")(module);
bbm = require("baseline-browser-mapping");

const fs = require("fs");
const path = require("path");

function readConfig(loc, name) {
  do {
    try {
      const pkg = require(path.join(loc, "package.json"));
      if (pkg.hasOwnProperty(name)) return pkg[name];
    } catch {}
  } while (loc !== (loc = path.dirname(loc)));

  return null;
}

function transform(bbm_versions) {
  const browsers = {
    chrome: "Chrome",
    chrome_android: "ChromeAndroid",
    edge: "Edge",
    firefox: "Firefox",
    firefox_android: "FirefoxAndroid",
    safari: "Safari",
    safari_ios: "iOS",
    webview_android: "Android",
    samsunginternet_android: "Samsung",
    opera_android: "op_mob",
    opera: "Opera",
    qq_android: "and_qq",
    uc_android: "and_uc",
  };

  return bbm_versions
    .filter((version) => Object.keys(browsers).includes(version.browser))
    .map((version) => `${browsers[version.browser]} >= ${version.version}`);
}

function reconcileConfigs(extendsConfig) {
  const bbmConfig = {};

  const pkgConfig =
    readConfig(process.cwd(), "browserslist-config-baseline") ?? {};

  console.log(pkgConfig);

  // Check to see if there are two configured target years
  if (pkgConfig.targetYear && extendsConfig.targetYear) {
    bbmConfig.targetYear = Math.min(
      pkgConfig.targetYear,
      extendsConfig.targetYear,
    );

    console.warn(
      `[browserslist-config-baseline] You’ve set targetYear: ` +
        `${pkgConfig.targetYear} in your package.json, but extended this ` +
        `config as \`browserslist-config-baseline/${extendsConfig.targetYear}\`. ` +
        `Proceeding with the lower option, targetYear: ${bbmConfig.targetYear}. ` +
        `Remove targetYear in package.json or use \`extend browserslist-config-baseline\` ` +
        `to suppress this warning.`,
    );
  }

  // Check to see if widelyAvailableOnDate is being used alongside extends .../YYYY
  if (pkgConfig.widelyAvailableOnDate && extendsConfig.targetYear) {
    const widelyAvailableOnDate = new Date(pkgConfig.widelyAvailableOnDate);
    const targetYear = new Date(extendsConfig.targetYear + "-12-31");

    let stringFragment =
      widelyAvailableOnDate < targetYear
        ? `Proceeding with the lower option, widelyAvailableOnDate: ${pkgConfig.widelyAvailableOnDate}.\n`
        : `Proceeding with the lower option, targetYear: ${extendsConfig.targetYear}.\n`;

    console.warn(
      `[browserslist-config-baseline] You’ve set widelyAvailableOnDate: ` +
        `"${pkgConfig.widelyAvailableOnDate}" in your package.json, but extended this ` +
        `config as \`browserslist-config-baseline/${extendsConfig.targetYear}\`.\n` +
        stringFragment +
        `Remove widelyAvailableOnDate in package.json or use \`extend browserslist-config-baseline\` ` +
        `to suppress this warning.`,
    );
  }

  // Check to see if extends and package have conflicting includeDownstreamBrowsers
  if (
    extendsConfig.includeDownstreamBrowsers &&
    pkgConfig.includeDownstreamBrowsers === false
  ) {
    console.warn(
      `[browserslist-config-baseline]` +
        `You've extended your browserslist config using \`/with-downstream\` ` +
        `but set includeDownstreamBrowsers: false in package.json.\n` +
        `Proceeding with includeDownstreamBrowsers: false.\n` +
        `Remove includeDownstreamBrowsers: false in package.json or use` +
        `\`extend browserslist-config-baseline\` to suppress this warning.`,
    );
    bbmConfig.includeDownstreamBrowsers = false;
  }

  return {
    bbmConfig: bbmConfig,
    logConfigToConsole: pkgConfig.logConfigToConsole ?? false,
  };
}

module.exports = function (extendsConfig = {}) {
  const config = reconcileConfigs(extendsConfig);
  const versions = bbm.getCompatibleVersions(config.bbmConfig);
  const listToReturn = transform(versions);

  if (config.logConfigToConsole) {
    console.log(
      "Your browserslit config from browserslist-config-baseline is:\n",
      listToReturn,
    );
  }

  return listToReturn;
};
