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
    
    await page.goto(`${appUrlBase}/`)
    
    
    

  })


})



afterAll(() => {
  browser.close()
})