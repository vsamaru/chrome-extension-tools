import { test } from 'vitest'
import { serve } from '../runners'

test(
  'crx runs from server output',
  async () => {
    const { browser } = await serve(__dirname)

    const page = await browser.newPage()
    await page.goto('https://example.com')

    await page.waitForSelector('text="Content script loaded"')
    await page.waitForSelector('text="Background response"')
    await page.waitForSelector('text="Background OK"')
    await page.waitForSelector('text="Options page OK"')
  },
  { retry: process.env.CI ? 5 : 0 },
)
