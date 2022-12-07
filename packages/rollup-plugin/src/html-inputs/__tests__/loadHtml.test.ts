/* eslint-disable @typescript-eslint/no-var-requires */
import {
  kitchenSinkRoot,
  optionsHtml,
} from '../../../__fixtures__/mv2-kitchen-sink-paths'
import { loadHtml } from '../cheerio'
import cheerio from 'cheerio'
import fs from 'fs-extra'

jest.spyOn(fs, 'readFileSync')
jest.spyOn(cheerio, 'load')

beforeEach(() => {
  jest.clearAllMocks()
})

const filePath = optionsHtml
test('calls readFileSync', () => {
  const result = loadHtml(kitchenSinkRoot)(filePath)

  expect(result).toBeInstanceOf(Function)
  expect(result).toHaveProperty('filePath', filePath)

  expect(fs.readFileSync).toBeCalledWith(filePath, 'utf8')
})

test('calls cheerio.load', () => {
  const htmlCode = fs.readFileSync(filePath, 'utf8')

  loadHtml(kitchenSinkRoot)(filePath)

  expect(cheerio.load).toBeCalledWith(htmlCode)
})
