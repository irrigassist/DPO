# Daily Pump Operation PWA

## Files
- `index.html`: your existing app, with PWA metadata and service-worker registration added.
- `manifest.webmanifest`: install name, launch URL, display mode and icon declarations.
- `sw.js`: offline app-shell caching and same-origin asset caching.
- `icons/`: install icons in the required sizes.

## Publish on GitHub Pages
1. Extract this ZIP.
2. Upload **the contents** of this folder to the root of the GitHub Pages publishing folder (not the ZIP itself).
3. Keep the folder structure unchanged, especially `icons/`.
4. Commit/push and wait for GitHub Pages to redeploy.
5. Open the HTTPS GitHub Pages URL in Chrome, refresh, then use Chrome menu > Install app (or Add to Home screen).

## Important
- This package keeps the app's existing HTML and local data logic. It does not add a shared cloud database or multi-user sync.
- The service worker caches the app shell for offline launching. Features relying on external services/CDNs (for example Google Fonts or the ExcelJS CDN) may still need internet.
- If your repository is a project site such as `https://username.github.io/repository/`, the relative paths in this package are intentional. Do not change them to root paths.
- After updating an already-installed version, close the app and reopen it. If Chrome still shows an old version, clear the site's storage/cache once and reload.
