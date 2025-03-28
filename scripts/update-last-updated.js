const fs = require('node:fs');
fs.readFile('./scripts/compare-versions-warning.js', 'utf8', (err,data) => {
  if (err) {
    console.error(err);
    return;
  }
  const searchString = 'lastUpdated = "';
  const replaceIndex = data.indexOf(searchString)+searchString.length;
  const todayDateString = new Date().toISOString().slice(0,10);
  const outputString = data.substring(0,replaceIndex) + todayDateString + data.substring(replaceIndex+10)
  fs.writeFileSync('./scripts/compare-versions-warning.js', outputString, {encoding: 'utf8'})
});
