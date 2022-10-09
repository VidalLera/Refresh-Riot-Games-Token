import { chromium } from 'playwright'
import { log, logError, logSuccess } from './logger.js'
import { BASE_URL, LOGIN } from './routes.js'
import { user, password } from './data.js'

log('index.js')

const browser = await chromium.launch({ headless: false })
log('🚀 launched 🚀')
const page = await browser.newPage()

const isLogged = await login(page)
const isTokenRefresh = await refreshToken(page)

async function login (page) {
  await page.goto(LOGIN)
  log(`in url LOGIN: ${LOGIN}`)

  await page.waitForSelector('input[name="username"]')
  await page.getByTestId('input-username').fill(user)
  await page.getByTestId('input-password').fill(password)
  await page.click('button[type="submit"]')

  const isLogged = page.waitForURL(BASE_URL).then(_val => true).catch(_val => false)
  isLogged ? logSuccess('logged') : logError('not logged')
  return isLogged
}

async function refreshToken (page) {
  await page.waitForSelector('[title="reCAPTCHA"]')

  const oldApiKey = await page.inputValue('#apikey')
  const oldExpiredDate = await (page.getByText('Expires:').innerText()).valueOf()
  log({ oldApiKey, oldExpiredDate })

  const isCaptchaDone = await doCaptcha(page)

  const newApiKey = await page.inputValue('#apikey')
  const newExpiredDate = await (page.getByText('Expires:').innerText()).valueOf()
  log({ newApiKey, newExpiredDate })

  const isTokenRefresh = oldApiKey !== newApiKey
  isTokenRefresh ? logSuccess('token refresh') : logError('token not refresh')
  return isTokenRefresh
}

async function doCaptcha (page) {
  await page.click('[title="reCAPTCHA"]')
  await page.waitForTimeout(1000)
  await page.click('[name="confirm_action"]')
  return true
}

// await page.close()
// await browser.close()
