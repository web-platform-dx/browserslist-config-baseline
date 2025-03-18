/**
 * @link https://github.com/web-platform-dx/web-features/blob/main/docs/baseline.md#core-browser-set
 */
const coreBrowsers = [
	"iOS",
	"Safari",
	"ChromeAndroid",
	"Chrome",
	"Edge",
	"FirefoxAndroid",
	"Firefox",
];

module.exports = [coreBrowsers.join(" > 1, ") + " > 1 and last 2.5 years"];
