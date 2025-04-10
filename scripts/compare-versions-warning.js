module.exports = function () {
  const lastUpdated = "2025-04-10";

  const cv = require("compare-versions");

  let dateOneMonthAgo = new Date();
  dateOneMonthAgo.setMonth(new Date().getMonth() - 1);

  if (new Date(lastUpdated) < dateOneMonthAgo) {
    fetch("https://registry.npmjs.org/browserslist-config-baseline")
      .then((response) => response.json())
      .then((data) => {
        const packageJson = require("../package.json");
        const localVersion = packageJson.version;
        const remoteVersion = data["dist-tags"].latest;
        if (cv.compare(localVersion, remoteVersion, "<")) {
          console.warn(
            `\nYou are using browserlist-config-baseline version: ${localVersion}\n` +
              `The latest available version is:                   ${remoteVersion}\n` +
              "You may be using stale data.  Please update browserslist-config-baseline\n" +
              "to ensure your config is accurate.\n\n" +
              "  # If using npm, please run:\n" +
              "  npm i browserslist-config-baseline@latest\n\n" +
              "  # If using yarn, please run:\n" +
              "  yarn upgrade --latest browserslist-config-baseline\n\n" +
              "  # If using bun, please run:\n" +
              "  bun update browserslist-config-baseline@latest\n\n" +
              "Consider adding whichever command is appropriate to your\n" +
              "build scripts to avoid seeing this message in future.\n",
          );
        }
      })
      .catch((err) => {
        console.log(
          `browserslist-config-basline encountered an error when trying to check your package version against the NPM registry.`,
          err,
        );
      });
  }
};
