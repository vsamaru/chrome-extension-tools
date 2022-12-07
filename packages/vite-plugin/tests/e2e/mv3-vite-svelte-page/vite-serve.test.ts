import { getCustomId, getPage } from '../helpers'
import { serve } from '../runners'
import { test, expect } from 'vitest'

test('crx runs from server output', async (ctx) => {
  const { browser } = await serve(__dirname)
  const page = await getPage(browser, 'chrome-extension')

  const app = page.locator('#app')
  await app.locator('img').waitFor()

  expect(await app.screenshot()).toMatchImageSnapshot({
    customSnapshotIdentifier: getCustomId(ctx),
  })
})
