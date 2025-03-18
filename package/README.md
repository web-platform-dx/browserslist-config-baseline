# <img src="https://unpkg.com/browserslist-config-baseline@0.1.2/assets/icon.svg" height="25" alt="Baseline Widely Available logo"> browserslist-config-baseline

A [browserslist](https://www.npmjs.com/package/browserslist) config based on [WebDX Baseline](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility).

Baseline identifies web platform features that work across browsers. Baseline helps you decide when to use a feature by telling you when it is less likely to cause compatibility problems for your site's visitors.  There are two ways of targeting a Baseline feature set:

1. [Baseline Widely Available](#baseline-widely-available) - includes all features that were fully supported in Chrome, Edge, Firefox and Safari **30 months before the current data**.
2. [Baseline year feature sets](#baseline-year-feature-sets) - includes all features that were fully supported in Chrome, Edge, Firefox and Safari **at the end of a given calendar year**.

You should check your analytics to see which browser versions are prevalent in your userbase before selecting a Baseline target.

## Baseline Widely Available

<!-- prettier-ignore -->
```json
{
  "browserslist": [
    "extends browserslist-config-baseline"
  ]
}
```

> **WARNING:**
> The default configuration of this module approximates Baseline Widely Available by taking all versions of the core browser set released in the last 2.5 years. However, there will be discrepancies between the real Baseline Widely Available feature set and the minimum browser versions this module returns. The real Baseline Widely Available feature set is supported by one or more versions of the core browser set prior to the 2.5 year cut off. As a result, this module may cause your packager to skip polyfills that you need or fail to highlight improper usage of newer web features. To provide a fully accurate list of browsers compatible with Baseline Widely Available, consider using [`bl2bl`](https://npmjs.org/bl2bl).

## Baseline year feature sets

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

## Include Chromium downstream browsers

To include browsers that implement Chromium where possible, insert `/with-downstream` into your statement between the root directory and the year:

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

The minimum browser versions of non-core browsers are provided by `baseline-browser-mapping` based on two sources: [`@mdn/browser-compat-data`](https://npmjs.org/@mdn/browsers-compat-data) where those engine version mappings exist, and parsed user agents from [`useragents.io`](https://useragents.io) where necessary.  For more information on these mappings, please see [`baseline-browser-mapping`'s README](https://www.npmjs.com/package/baseline-browser-mapping#downstream-browsers).

## See also

- [bl2bl](https://github.com/web-platform-dx/bl2bl) - a command line tool for generating Baseline compliant `browserslist` configurations that are readable in `package.json` and/or `.browserslistrc` files.
- [WebDX Baseline specification](https://github.com/web-platform-dx/web-features/blob/main/docs/baseline.md)
