import { basename, relative } from 'path'
import { RollupOptions } from 'rollup'
import slash from 'slash'
import { ManifestInputPluginCache } from '../plugin-options'
import { cloneObject } from './cloneObject'
import { convertMatchPatterns } from './convertMatchPatterns'

export function getImportContentScriptFileName(target: string) {
  const base = basename(target)
  return target.replace(base, `import-${base}`)
}

export function updateManifestV3(
  m: chrome.runtime.ManifestV3,
  options: RollupOptions,
  wrapContentScripts: boolean,
  cache: ManifestInputPluginCache,
) {
  const manifest = cloneObject(m)

  if (manifest.background) {
    manifest.background.type = 'module'
  }

  if (manifest.content_scripts) {
    const { output = {} } = options
    const { chunkFileNames = 'chunks/[name]-[hash].js' } = Array.isArray(output)
      ? output[0]
      : output

    const cfn = chunkFileNames as string

    cache.chunkFileNames = cfn

    // Output could be an array
    if (Array.isArray(output)) {
      if (
        // Should only be one value for chunkFileNames
        output.reduce((r, x) => r.add(x.chunkFileNames ?? 'no cfn'), new Set())
          .size > 1
      )
        // We need to know chunkFileNames now, before the output stage
        throw new TypeError(
          'Multiple output values for chunkFileNames are not supported',
        )

      // If chunkFileNames is undefined, use our default
      output.forEach((x) => (x.chunkFileNames = cfn))
    } else {
      // If chunkFileNames is undefined, use our default
      output.chunkFileNames = cfn
    }

    const allMatches = manifest.content_scripts
      .flatMap(({ matches }) => matches ?? [])
      .concat(manifest.host_permissions ?? [])
      .map(convertMatchPatterns)

    const matches = Array.from(new Set(allMatches))
    // Use slash to guarantee support Windows
    const resources = [
      slash(
        `${cfn
          .split('/')
          .join('/')
          .replace('[format]', '*')
          .replace('[name]', '*')
          .replace('[hash]', '*')}`,
      ),
      ...cache.contentScripts.map((x) => slash(relative(cache.srcDir!, x))),
    ]

    if (wrapContentScripts) {
      manifest.content_scripts = manifest.content_scripts.map((c) => ({
        ...c,
        js: c.js?.map(getImportContentScriptFileName),
      }))
    }

    manifest.web_accessible_resources = manifest.web_accessible_resources ?? []

    manifest.web_accessible_resources.push({
      resources,
      matches,
    })
  }

  return manifest
}
