# @crxjs/vite-plugin

## 2.0.0-beta.7

### Patch Changes

- badc910: fix: maintain ; and , during minification
- 5ac019d: React conflicts with preact

## 2.0.0-beta.6

### Patch Changes

- cbce5e1: Hotfix background

## 2.0.0-beta.5

### Patch Changes

- 088ab78: fix: build is broken when using minify with dynamic modules (#573)

## 2.0.0-beta.4

### Patch Changes

- d7949bf: Fix commonjs export

## 2.0.0-beta.3

### Patch Changes

- ec9e879: chore: move rxjs to package.deps

## 2.0.0-beta.2

### Patch Changes

- 53534d0: Remove peerDeps, optDeps, engines

## 2.0.0-beta.1

### Major Changes

- 628b14f: ## Vite 3 support and new file writer

  This release adds Vite 3 support and includes a complete rewrite of the
  content script file writer. There are no intentional breaking changes, but
  Vite 3 support required significant changes under the hood, therefore this is
  a major release.

## 1.1.0-beta.0

### Minor Changes

- 9b0381b: Add Svelte support

## 1.0.14

### Patch Changes

- 01f8e37: Allow <all_urls> in content_scripts.matches section of manifest.json
- a65fe1f: CRXJS isn't fully compatible with Vite 3

## 1.0.13

### Patch Changes

- 68c661f: Support Vite 3
- a8d5670: Fixed the npm link of the npm badge.

## 1.0.12

### Patch Changes

- 0027f1e: Fix manifest icons type

## 1.0.11

### Patch Changes

- dc479d1: Fix global constant replacement in background

## 1.0.10

### Patch Changes

- f35c49e: Update READMEs

## 1.0.9

### Patch Changes

- 8941353: Remove & refactor use of fs-extra

## 1.0.8

### Patch Changes

- 8a09cb9: Optimize rollup input

## 1.0.7

### Patch Changes

- e1604d8: Strip paths from content script resource match patterns

## 1.0.6

### Patch Changes

- 63d102f: Automatically ignores `build.outDir` for server HMR, so the file
  writer doesn't trigger a full reload.

  Fixes flaky HMR updates for content scripts; Tailwind should work fine now 🥳

- a1e2728: Fix isImporter recursion

## 1.0.5

### Patch Changes

- 86adbec: Sometimes during development, an extension page may open before the
  service worker has a chance to control fetch. The HTML file will load from the
  file system, but the script tag might load from the dev server. This PR adds a
  precontroller loader plugin to the dev server so that the extension page will
  reload and the fetch handler will get the real HTML file from the server.

## 1.0.4

### Patch Changes

- b83a4bd: Check for manifest assets first in the project root, then check in
  the public dir. Throw an informative error if the file does not exist in
  either dir.

## 1.0.3

### Patch Changes

- 8b2e587: check service worker on interval from extension page

## 1.0.2

### Patch Changes

- be8a1de: Remove unused code that throws when web accessible resources contains
  an HTML file.

## 1.0.1

### Patch Changes

- d2b4f9e: feat: allow hash in manifest html urls
