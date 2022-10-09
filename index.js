import { chromium } from 'playwright'
import { log } from './logger.js'
import { LOGIN } from './routes.js'
import { user, password } from './data.js'

log('index.js')

const browser = await chromium.launch({ headless: false })
log('🚀 launched 🚀')
const page = await browser.newPage()
await page.goto(LOGIN)
log(`in url LOGIN: ${LOGIN}`)
await page.waitForSelector('input[name="username"]')
await page.getByTestId('input-username').fill(user)
await page.getByTestId('input-password').fill(password)
await page.click('button[type="submit"]')
await page.waitForSelector('[title="reCAPTCHA"]')
await page.waitForTimeout(2000)
await page.click('[title="reCAPTCHA"]')
await page.waitForTimeout(3000)
await page.screenshot({ path: 'page.png' })
await page.click('input[type="submit"]')

// await page.close()
// await browser.close()
