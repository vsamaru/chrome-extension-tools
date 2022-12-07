import { serve } from '../runners'
import { test, expect } from 'vitest'
import { getCustomId } from '../helpers'

test('crx runs from server output', async (ctx) => {
  const { browser } = await serve(__dirname)
  const page = await browser.newPage()
  await page.goto('http://www.google.com')

  const app = page.locator('#crx-app')
  await app.locator('img').waitFor()

  expect(await app.screenshot()).toMatchImageSnapshot({
    customSnapshotIdentifier: getCustomId(ctx),
  })
})
