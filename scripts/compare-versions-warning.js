module.exports = function () {

	var fs = require('node:fs');
	var process = require('process');
	var cv = require('compare-versions');

	if ((process.mainModule.filename).includes("update-all-files")) {
		return
	}

	var package_json = JSON.parse(fs.readFileSync(process.cwd() + '/node_modules/browserslist-config-baseline/package.json', 'utf-8'));

	var warning_message = ` Your locally installed version of browserslist-config-baseline
 is out of date and your Baseline Widely Available definition may be
 inaccurate.  Please run \`npm i browserslist-config-baseline@latest\` to
 get the latest version.`

	fetch('https://registry.npmjs.org/browserslist-config-baseline')
		.then((response) => response.json())
		.then(data => {
			var local_version = package_json.version;
			var remote_version = data['dist-tags'].latest;
			if (cv.compare(local_version, remote_version, '<')) {
				console.warn('\x1b[43m%s\x1b[0m', 'BROWSERSLIST CONFIG WARNING')
				console.log(warning_message);
			}
		})
		.catch(err=>{
			console.log(`browserslist-config-basline encountered an error when trying to check your package version against the NPM registry.`,
				err
			)
		})
}
