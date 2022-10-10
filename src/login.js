import { password, user } from './data.js'
import { log, logError, logSuccess } from './logger.js'
import { BASE_URL, LOGIN } from './routes.js'

async function login ({ page }) {
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

export { login }
