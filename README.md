# <img src="https://unpkg.com/browserslist-config-baseline@0.1.2/assets/icon.svg" height="25"> browserslist-config-baseline

[Browserslist][1] config based on [WebDX Baseline][2] (as seen on MDN).

Baseline identifies web platform features that work across browsers. Baseline
helps you decide when to use a feature by telling you when it is less likely to
cause compatibility problems for your site's visitors.

[1]: https://www.npmjs.com/package/browserslist
[2]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility

<!-- prettier-ignore -->
```json
{
  "browserslist": [
    "extends browserslist-config-baseline"
  ]
}
```

## Browsers

This config includes versions of

- Apple Safari (iOS)
- Apple Safari (macOS)
- Google Chrome (Android)
- Google Chrome (desktop)
- Microsoft Edge (desktop)
- Mozilla Firefox (Android)
- Mozilla Firefox (desktop)

released within the last 30 months. This means that all features tagged as
**widely available** on MDN should be safe to use without any polyfills.

## See also

- [WebDX Baseline specification](https://github.com/web-platform-dx/web-features/blob/main/docs/baseline.md)
