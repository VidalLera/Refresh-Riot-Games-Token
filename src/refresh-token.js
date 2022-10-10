import { doCaptcha } from './captcha.js'
import { log, logError, logSuccess } from './logger.js'

async function refreshToken ({ page }) {
  await page.waitForSelector('#apikey')
  await page.click('.osano-cm-dialog__close.osano-cm-close')

  const { token: oldToken } = await getToken(page)

  await doCaptcha(page)

  const { token: newToken } = await getToken(page)

  // const isTokenRefresh page.getByText('API Key generated successfully!' )
  const isTokenRefresh = newToken !== oldToken
  isTokenRefresh ? logSuccess('token refresh') : logError('token not refresh')

  return { isTokenRefresh, newToken }
}

async function getToken (page) {
  const token = await page.inputValue('#apikey')
  const expiredDate = await (page.getByText('Expires:').innerText()).valueOf()
  log({ token, expiredDate })
  return { token, expiredDate }
}

export { refreshToken }
