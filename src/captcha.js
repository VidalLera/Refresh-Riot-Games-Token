// this is working if captcha doesnt need to be resolved
async function doCaptcha (page) {
  await page.locator('#rc-anchor-container').click()
  await page.waitForTimeout(2000)
  await page.click('[name="confirm_action"]')
}

export { doCaptcha }
