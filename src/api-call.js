import { log } from './logger.js'

function refreshEnvVariable (token) {
  log('Env Var changed to ', token)
  // here next api call
}

export { refreshEnvVariable }
