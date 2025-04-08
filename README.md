# <img src="https://unpkg.com/browserslist-config-baseline@0.1.2/assets/icon.svg" height="25" alt="Baseline Widely Available logo"> browserslist-config-baseline

A [browserslist](https://www.npmjs.com/package/browserslist) config based on [Web Platform Baseline](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility).

Baseline identifies web platform features that work across browsers. Baseline helps you decide when to use a feature by telling you when it is less likely to cause compatibility problems for your site's visitors. There are two ways of targeting a Baseline feature set:

1. [Baseline Widely Available](#baseline-widely-available) - includes all features that were fully supported in Chrome, Edge, Firefox and Safari **30 months before the current date**.
2. [Baseline year feature sets](#baseline-year-feature-sets) - includes all features that were fully supported in Chrome, Edge, Firefox and Safari **at the end of a given calendar year**.

You should check your analytics to see which browser versions are prevalent in your userbase before selecting a Baseline target.

## Installation

To add `browserslist-config-baseline` to your project, use one of the following commands:

```sh
# npm
npm i browserslist-config-baseline
# yarn
yarn add browserslist-config-baseline
# bun
bun add browserslist-config-baseline
```

## Baseline Widely Available

To target Baseline Widely Available, add the following to your `package.json`:

<!-- prettier-ignore -->
```json
{
  "browserslist": [
    "extends browserslist-config-baseline"
  ]
}
```

If you want to see your list of chosen browsers every time `browserslist` calls `browserslist-baseline-config`, add a `browserslist-config-baseline` object to your `package.json` with `logConfigToConsole` set to `true`:

<!-- prettier-ignore -->
```json
{
  "browserslist": [
    "extends browserslist-config-baseline"
  ],
  "browserslist-config-baseline": {
    "logConfigToConsole": true
  }
}
```

The `logConfigToConsole` option works with both of the target configuration options mentioned below.

The data in this package changes frequently as new browser versions are released and new web-features become interoperable. Consider updating this module regularly by adding one of these commands to your build scripts:

```sh
# npm
npm i browserslist-config-baseline@latest

# yarn
yarn upgrade --latest browserslist-config-baseline

# bun
bun update browserslist-config-baseline@latest
```

If you haven't updated `browserslist-config-baseline` in the last month and you are targeting Widely Available, the package will check for updates whenever you run a `browserslist`-compatible tool and prompt you to upgrade if there is a new version available.

## Configuring `browserslist-config-baseline`

There are two ways to configure `browserslist-config-basesline`:

- [Add options to the end of your `extends` statement](#configuring-targets-using-the-extends-statement).
- Using a `browserslist-config-baseline` configuration object in your `package.json`.

## Configuring targets using the `extends` statement

### Baseline year feature sets

Baseline year feature sets include all the web platform features that were fully supported in the core browser set at the end of a given calendar year. To use a Baseline year feature set, add the year in the format `/YYYY` to the end of your `extends` statement:

<!-- prettier-ignore -->
```json
{
  "browserslist": [
    "extends browserslist-config-baseline/2020"
  ]
}
```

This equates to the following `browserslist` config:

```json
{
  "browserslist": [
    "Chrome >= 87",
    "ChromeAndroid >= 87",
    "Edge >= 87",
    "Firefox >= 83",
    "FirefoxAndroid >= 83",
    "Safari >= 14",
    "iOS >= 14"
  ]
}
```

The minimum browser versions that support these feature sets are usually the last version released in that year or a few versions earlier. The feature set > browser version mappings in this module were determined using [`baseline-browser-mapping`](https://npmjs.org/baseline-browser-mapping).

### Include Chromium downstream browsers

To include browsers that implement Chromium where possible, insert `/with-downstream` into your `extends` statement immediately after the package name:

<!-- prettier-ignore -->
```json
{
  "browserslist": [
    "extends browserslist-config-baseline/with-downstream/2020"
  ]
}
```

This equates to the following `browserslist` config:

```json
{
  "browserslist": [
    "Chrome >= 87",
    "ChromeAndroid >= 87",
    "Edge >= 87",
    "Firefox >= 83",
    "FirefoxAndroid >= 83",
    "Safari >= 14",
    "iOS >= 14",
    "Opera >= 73",
    "op_mob >= 62",
    "Samsung >= 14.0",
    "Android >= 87",
    "and_uc >= 15.3",
    "and_qq >= 11.7"
  ]
}
```

The minimum browser versions of non-core browsers are provided by `baseline-browser-mapping` based on two sources: [`@mdn/browser-compat-data`](https://npmjs.org/@mdn/browsers-compat-data) where those engine version mappings exist, and parsed user agents from [`useragents.io`](https://useragents.io) where necessary. For more information on these mappings, please see [`baseline-browser-mapping`'s README](https://www.npmjs.com/package/baseline-browser-mapping#downstream-browsers).

## Configuring targets using a `browserslist-config-baseline` object in `package.json`

You can add a `browserslist-config-baseline` object to your `package.json` to set your Baseline target.

> **NOTE**
> The `browserslist-config-baseline` config in `package.json` only works if you use the basic `extends` statement. If you add a `YYYY` year and/or `with-downstream` to your `extends` statement, that will take precedence over the target settings in your `browserslist-config-baseline` object. The `logConfigToConsole` option works with both config methods.

### Target Baseline year feature sets

To target a Baseline year, set the `baselineYear` property to the desired year:

<!-- prettier-ignore -->
```json
{
  "browserslist": [
    "extends browserslist-config-baseline"
  ],
  "browserslist-config-baseline": {
      "baselineYear": 2020
  }
}
```

> **NOTE**
> You cannot use the `baselineYear` and `widelyAvailableOnDate` options together. The `baseline-browser-mapping` module that supplies data to `browserslist-config-baseline` will throw an error.

### Target Baseline Widely available on a particular date

To target Baseline Widely available on a particular date, set the `widelyAvailableOnDate` property to the desired date in the format `YYYY-MM-DD`:

<!-- prettier-ignore -->
```json
{
  "browserslist": [
    "extends browserslist-config-baseline"
  ],
  "browserslist-config-baseline": {
      "widelyAvailableOnDate": "2020-06-01"
  }
}
```

> **NOTE**
> You cannot use the `baselineYear` and `widelyAvailableOnDate` options together. The `baseline-browser-mapping` module that supplies data to `browserslist-config-baseline` will throw an error.

### Include downstream browsers

To include browsers the implement Chromium, set the `includeDownstreamBrowsers` property to `true`:

<!-- prettier-ignore -->
```json
{
  "browserslist": [
    "extends browserslist-config-baseline"
  ],
  "browserslist-config-baseline": {
      "includeDownstreamBrowsers": true
  }
}
```

## See also

- [WebDX Baseline specification](https://github.com/web-platform-dx/web-features/blob/main/docs/baseline.md)
- [Web Platform Status dashboard](https://webstatus.dev/) - a dashboard for checking the Baseline status of web platform features.
