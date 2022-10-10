import { chromium } from 'playwright'
import { log } from './logger.js'

async function closeBrowser ({ page, browser }) {
  await page.close()
  await browser.close()
  log('☄️ browser closed ☄️')
}

async function openBrowser () {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()
  log('🚀 browser launched 🚀')
  return { page, browser }
}

export { openBrowser, closeBrowser }
