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


  var browserslist_output = new Array();
  bbm_versions.forEach(version => {
    if (Object.keys(browsers).includes(version.browser)) {
      browserslist_output.push(
        `${browsers[version.browser]} >= ${version.version}`,
      );
    }
  });
  return browserslist_output

}

require = require("@httptoolkit/esm")(module/*, options*/)
bbm = require("baseline-browser-mapping");

module.exports = function (config = {}) {
  return transform(bbm.getCompatibleVersions({
    targetYear: config.targetYear,
    includeDownstreamBrowsers: config.includeDownstreamBrowsers
  }))
}
