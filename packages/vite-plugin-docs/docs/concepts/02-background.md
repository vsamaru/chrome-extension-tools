---
position: 2
title: Background
---

# Extension Background

Chrome Extensions use a **service worker** to listen for Chrome API Events in
the background.

Add a service worker to your extension in the manifest under
`background.service_worker`. CRXJS uses module-type service workers because Vite
uses the ES module format.

```json title=manifest.json
{
  "background": {
    "service_worker": "src/background.ts",
    "type": "module"
  }
}
```

CRXJS loads the service worker from the Vite Dev Server during development, and
HMR causes a full extension reload when Vite detects a change to the background
code.

Learn more about extension service workers in the
[Chrome Developer Docs](https://developer.chrome.com/docs/extensions/mv3/service_workers/).
