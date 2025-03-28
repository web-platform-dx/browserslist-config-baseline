const fs = require('node:fs');
const output = JSON.stringify({
  lastUpdated: new Date().toISOString().slice(0, 10)
});
try {
  fs.writeFileSync(
    './lastUpdated.json',
    output,
    { encoding: 'utf-8' }
  );
} catch (e) {
  console.error(e);
}
