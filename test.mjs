import assert from "assert";
import browserslist from "browserslist";
import config from "./index.js";

/** @type {{ [name: string]: string[] }} */
const browsers = browserslist(config).reduce((acc, current) => {
  const [name, version] = current.split(" ", 2);
  acc[name] ??= [];
  acc[name].push(version);
  return acc;
}, {});

const wanted = [
  "and_chr",
  "and_ff",
  "chrome",
  "edge",
  "firefox",
  "ios_saf",
  "safari",
];

for (const name of wanted) {
  assert(Object.hasOwn(browsers, name), `Should include ${name}`);
}

console.log(browsers);
