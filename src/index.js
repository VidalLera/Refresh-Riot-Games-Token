import { refreshEnvVariable } from './api-call.js'
import { login } from './login.js'
import { refreshToken } from './refresh-token.js'
import { closeBrowser, openBrowser } from './browser.js'

const { page, browser } = await openBrowser()
const isLogged = await login({ page })
const { isTokenRefresh, newToken } = isLogged && await refreshToken({ page })
isTokenRefresh && refreshEnvVariable(newToken)
await closeBrowser({ page, browser })
