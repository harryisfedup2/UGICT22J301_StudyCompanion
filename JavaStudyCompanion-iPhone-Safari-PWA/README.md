# Java Study Companion for iPhone

This is an installable web app (PWA) for iPhone and other modern browsers. It reuses the four Java theory lessons and all 30 practical programs from the Android source project. Practical details include a scrollable source-code pane, Copy Code, and expected output. The developer contact links are included in About.

## Install on iPhone

1. Publish this folder to an HTTPS static host. GitHub Pages is suitable.
2. Open the published site in **Safari** on the iPhone.
3. Tap **Share**, choose **Add to Home Screen**, then tap **Add**.
4. Launch **Java Companion** from the Home Screen.

For offline study, open each lesson once while connected so Safari can save it for later.

## Publish with GitHub Pages

1. Create a repository and upload the contents of this folder (keep index.html at the published folder's root).
2. In the repository settings, open **Pages**, select **Deploy from a branch**, and choose the branch and folder containing index.html.
3. Wait for GitHub Pages to show the site address, then open that address in iPhone Safari.

No Apple Developer account is needed for this Safari install route. This package is not an App Store IPA; a native iOS app would need to be built and signed on macOS with Xcode.

## Project files

- index.html, styles.css, app.js: app screens and navigation.
- practicals.json: practical titles, explanations, Java source, and expected output.
- assets/theory/: the four syllabus-aligned lesson pages.
- manifest.webmanifest, sw.js: install and offline support.
- assets/icon.svg, assets/icon-192.png, assets/icon-512.png: custom Java Study Companion icon.

