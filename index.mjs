import { launch } from "puppeteer"

const BASE_URL = 'https://developer.riotgames.com'
const LOGIN = `${BASE_URL}/login`

const log = (...args) => console.log('[lol-refresh-token] -> ', ...args);

const email = 'vidalleravalencia@gmail.com'
const user = 'vidallera'
const password = 'vidallera01'

log("index.js");

const browser = await launch()
log(" 🚀 launched 🚀 ");
const page = await browser.newPage();
await page.goto(LOGIN, {
  waitUntil: 'networkidle2',
})
log(`in login: ${LOGIN}`)
setTimeout(() => {}, 2000)
let url = await page.evaluate(() => document.location.href);
log(`logged in ${url}`)
await page.$eval('.field__form-input[type=text]', el => el.value = user);
await page.$eval('.field__form-input[type=password]', el => el.value = password);
await page.click('button[type=submit]')
url = await page.evaluate(() => document.location.href);
log(`logged in ${url}`)

