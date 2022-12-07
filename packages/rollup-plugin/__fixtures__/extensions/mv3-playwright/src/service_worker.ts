import { bgCheckStream, sendBgOk } from './messages'
import { tabIds } from './storage'

const openOptionsPage = (): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    chrome.runtime.openOptionsPage(() => {
      if (chrome.runtime.lastError)
        reject(new Error(chrome.runtime.lastError.message))

      resolve()
    })
  })

bgCheckStream.subscribe(async ([, { tab }, respond]) => {
  const { id } = tab!
  respond({ id })
  await sendBgOk(undefined, { tabId: id })

  await tabIds.set({ id })
  await openOptionsPage()
})
