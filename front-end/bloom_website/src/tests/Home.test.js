import puppeteer from 'puppeteer'
const appUrlBase = 'http://bloom.bham.team'
let browser
let page
beforeAll(async () => {
  browser = await puppeteer.launch({})
  page = await browser.newPage()
})

describe('Home Page', () => {
  test('Heading displays', async () => {

    await page.goto(`${appUrlBase}/`)
    await page.waitForSelector('h1')
    const result = await page.evaluate(() => {
      return document.querySelector('h1').innerText
    })
    expect(result).toEqual('YOUR ONE-STOP SHOP FOR ALL YOUR BUSINESS NEEDS')
  })

  jest.setTimeout(30000)
  test('Get Started button takes to the registration page', async () => {
    
    await page.goto(`${appUrlBase}/`);
    await page.waitForSelector(".btn.sign-in");

    const btnText = await page.evaluate(() => document.querySelector(".btn.sign-in").innerText)

    expect(btnText).toEqual("Get started")
    
  })

  test("Getting started button takes to the sign up page", async () => {

    await page.goto(`${appUrlBase}/`);
    await page.click(".btn.sign-in");
    await page.waitForSelector("h2")

    const heading = await page.evaluate(() => document.querySelector("h2").innerText)

    expect(heading).toEqual("Sign Up")

  })

  test("Test navbar button directs to the sign in page.", async () => {

    await page.goto(`${appUrlBase}/`);
    await page.click("nav>div>button");
    await page.waitForSelector("h2")

    const heading = await page.evaluate(() => document.querySelector("h2").innerText)

    expect(heading).toEqual("Sign In")


  })


})



afterAll(() => {
  browser.close()
})