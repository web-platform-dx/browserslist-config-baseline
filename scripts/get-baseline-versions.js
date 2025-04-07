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

const incomingConfig =
  readConfig(process.cwd(), "browserslist-config-baseline") ?? {};
let logConfigToConsole = incomingConfig.logConfigToConsole ?? false;

let transform = function (bbm_versions) {
  var browsers = {
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
};

module.exports = function (config = {}) {
  const versions = bbm.getCompatibleVersions(
    Object.assign({}, incomingConfig, config)
  );
  const listToReturn = transform(versions);

  if (logConfigToConsole) {
    console.log(
      "Your browserslit config from browserslist-config-baseline is:\n",
      listToReturn,
    );
  }

  return listToReturn;
};
