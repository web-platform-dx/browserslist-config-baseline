var fs = require('node:fs');
var process = require('process');
var previous_core_wa_versions = require('../index');
var previous_downstream_wa_versions = require('../with-downstream/index')

var year_file_template = `module.exports = {VERSIONS_ARRAY}
`

var run_date = new Date().toISOString().slice(0, 10)

var wa_file_template = year_file_template + `
const compare_versions = require('./scripts/compare-versions-warning');

compare_versions('${run_date}');
`

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

function transformBbmArrayToBrowserslist(bbm_versions) {
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

function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

var today_date_string = new Date().toISOString().slice(0, 10);

var valid_baseline_year_ints = [...Array(new Date().getFullYear()).keys()].slice(2016);

import('baseline-browser-mapping').then(bbm => {

	valid_baseline_year_ints.forEach(year => {

		/*
		Handle refreshing year files first in case there is a change in compatible downstream browsers/
		new feature information in web-features that changes the output of baseline-browser-mapping.
		*/

		fs.writeFileSync(process.cwd() + `/${year}.js`, year_file_template.replace(
			'{VERSIONS_ARRAY}',
			JSON.stringify(
				transformBbmArrayToBrowserslist(
					bbm.getCompatibleVersions({
						targetYear: year
					})
				),
				null,
				2
			)
		));

		fs.writeFileSync(process.cwd() + `/with-downstream/${year}.js`, year_file_template.replace(
			'{VERSIONS_ARRAY}',
			JSON.stringify(
				transformBbmArrayToBrowserslist(
					bbm.getCompatibleVersions({
						targetYear: year,
						includeDownstreamBrowsers: true
					})
				),
				null,
				2
			)
		));

	});

	/*
	Now handle refreshing the widely available files
	*/

	// Check if previous core and new WA match
	if (
		!arraysEqual(
			previous_core_wa_versions,
			transformBbmArrayToBrowserslist(bbm.getCompatibleVersions())
		)
	) {
		fs.writeFileSync(process.cwd() + `/index.js`, wa_file_template.replace(
			'{VERSIONS_ARRAY}',
			JSON.stringify(
				transformBbmArrayToBrowserslist(
					bbm.getCompatibleVersions()
				),
				null,
				2
			)
		));

	}

	if (
		!arraysEqual(
			previous_downstream_wa_versions,
			transformBbmArrayToBrowserslist(
				bbm.getCompatibleVersions({
					includeDownstreamBrowsers: true
				})
			)
		)
	) {

		fs.writeFileSync(process.cwd() + `/with-downstream/index.js`, wa_file_template.replace(
			'{VERSIONS_ARRAY}',
			JSON.stringify(
				transformBbmArrayToBrowserslist(
					bbm.getCompatibleVersions({
						includeDownstreamBrowsers: true
					})
				),
				null,
				2
			)
		).replace("./scripts", "../scripts"));

	}

});
