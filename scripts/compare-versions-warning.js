module.exports = function (last_updated) {

	var fs = require('node:fs');
	var process = require('process');
	var cv = require('compare-versions');

	if ((process.mainModule.filename).includes("update-all-versions")) {
		return
	}

	const package_json = require('../package.json');

	fetch('https://registry.npmjs.org/browserslist-config-baseline')
		.then((response) => response.json())
		.then(data => {
			var local_version = package_json.version;
			var remote_version = data['dist-tags'].latest;
			if (cv.compare(local_version, remote_version, '<')) {
				console.warn(
					'Browserslist: browserslist-config-baseline \n' +
					'has not been updated in over a month and \n' +
					'you are using an out of date definition of \n' +
					'Baseline Widely Available. \n\n' +
					'  # If using npm, please run: \n' +
					'  npm i browserslist-config-baseline@latest \n\n' +
					'  # If using yarn, please run: \n' +
					'  yarn upgrade --latest browserslist-config-baseline \n\n' +
					'  # If using bun, please run: \n' +
					'  bun update browserslist-config-baseline@latest \n\n'
				)
			}
		})
		.catch(err => {
			console.log(`browserslist-config-basline encountered an error when trying to check your package version against the NPM registry.`,
				err
			)
		})
}
