import { click } from "@testing-library/user-event/dist/click";
import puppeteer from "puppeteer";
const appUrlBase = "http://localhost:3000";
let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch({});
  page = await browser.newPage();
});

describe("Business Main Page", () => {
  jest.setTimeout(80000);
  test("It shows 2 registered businesses", async () => {

    //This part needs to be done to log into the startup page.
      await page.goto(`${appUrlBase}/login`);
      await page.waitForSelector("#exampleInputEmail1");
      await page.click("#exampleInputEmail1");
      await page.type("#exampleInputEmail1", "testUser@test.com");
      await page.waitForSelector("#exampleInputPassword1");
      await page.click("#exampleInputPassword1");
      await page.type("#exampleInputPassword1", "password");
      await page.click("#login");

      await page.waitForSelector("h1");

      const heading = await page.evaluate(() => document.querySelector("h1").innerText);

      expect(heading).toEqual("Your Businesses");
      const busiList = [];
      await page.waitForSelector(".busi-container");
      
      const businesses = await page.evaluate(() => {
          return [...document.querySelectorAll('h3')].map(el => el.innerText);
        })

      expect(businesses.length).toEqual(2);

      
    })
  test("It shows 2 correct businesses", async () => {

    //This part needs to be done to log into the startup page.
      await page.goto(`${appUrlBase}/login`);
      await page.waitForSelector("#exampleInputEmail1");
      await page.click("#exampleInputEmail1");
      await page.type("#exampleInputEmail1", "testUser@test.com");
      await page.waitForSelector("#exampleInputPassword1");
      await page.click("#exampleInputPassword1");
      await page.type("#exampleInputPassword1", "password");
      await page.click("#login");

      await page.waitForSelector("h1");

      const heading = await page.evaluate(() => document.querySelector("h1").innerText);

      expect(heading).toEqual("Your Businesses");
      const busiList = [];
      await page.waitForSelector(".busi-container");
      
      const businesses = await page.evaluate(() => {
          return [...document.querySelectorAll('h3')].map(el => el.innerText);
        })

      expect(businesses.length).toEqual(2);

      expect(businesses[0]).toEqual("Test Business 1");
      expect(businesses[1]).toEqual("Test Business 2");

      
    })
  test("Register your business takes to the correct page", async () => {

    //This part needs to be done to log into the startup page.
      await page.goto(`${appUrlBase}/login`);
      await page.waitForSelector("#exampleInputEmail1");
      await page.click("#exampleInputEmail1");
      await page.type("#exampleInputEmail1", "testUser@test.com");
      await page.waitForSelector("#exampleInputPassword1");
      await page.click("#exampleInputPassword1");
      await page.type("#exampleInputPassword1", "password");
      await page.click("#login");

      await page.waitForSelector("h1");

      const heading = await page.evaluate(() => document.querySelector("h1").innerText);

      expect(heading).toEqual("Your Businesses");
      const busiList = [];
      await page.waitForSelector("div.top-nav > button");
      await page.click("div.top-nav > button");
      await page.waitForSelector("h2");

      const heading2 = await page.evaluate(() => document.querySelector("h2").innerText);

      expect(heading2).toEqual("Business Registration");
      
      

      
    })
});


