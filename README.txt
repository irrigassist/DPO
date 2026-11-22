DAILY PUMP OPERATION - installable app package

FILES
  index.html            the app
  manifest.webmanifest  name, colours and icons for installing
  sw.js                 makes the app work offline
  icons/                app icons

PUT IT ONLINE (free, needs HTTPS)
  1. Upload this whole folder to GitHub Pages, Netlify (drag and drop) or Cloudflare Pages.
  2. Open the web address once on your phone, with internet.
  3. Chrome on Android: menu > Install app (or Add to Home screen).
  After that first visit the app opens and works without internet.

ANDROID APK (optional)
  Go to pwabuilder.com, enter your web address, choose Android and download the package.

UPDATING
  When you replace index.html, change VERSION in sw.js (for example dpo-v2), then upload again.

YOUR DATA
  Entries are saved inside the app on the phone, tied to the web address. A new address starts empty.
  Before moving, use Settings > Backup and restore > Save backup, then Restore from file in the new app.
