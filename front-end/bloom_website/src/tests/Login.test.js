import { click } from "@testing-library/user-event/dist/click";
import puppeteer from "puppeteer";
const appUrlBase = "http://localhost:3000";
let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch({});
  page = await browser.newPage();
});

describe("Login Page", () => {
  test("Displays correct heading", async () => {
    await page.goto(`${appUrlBase}/login`);

    await page.waitForSelector("h2");

    const heading = await page.evaluate(
      () => document.querySelector("h2").innerText
    );

    expect(heading).toEqual("Sign In");
  });
  jest.setTimeout(10000)
  test("Test blank fields", async () => {

    await page.goto(`${appUrlBase}/login`);
    await page.click("#login")

    await page.waitForSelector(".information")

    const label = await page.evaluate(
        () => {
            return document.querySelector(".information").innerText;
        }
    )

    expect(label).toEqual("Do not leave any field blank")

  })

  jest.setTimeout(60000)
  test("Successful login", async () => {

    await page.goto(`${appUrlBase}/login`);
    await page.waitForSelector("#exampleInputEmail1");
    await page.click("#exampleInputEmail1");
    await page.type("#exampleInputEmail1", "testUser@test.com");
    await page.waitForSelector("#exampleInputPassword1");
    await page.click("#exampleInputPassword1");
    await page.type("#exampleInputPassword1", "password");
    await page.click("#login");

    await page.waitForSelector(".information")

    const label = await page.evaluate(
        () => {
            return document.querySelector(".information").innerText;
        }
    )

    expect(label).toEqual("Loading")
    
    //Testing navigation to businesses page
    await page.waitForSelector("h1");

    const heading = await page.evaluate(() => document.querySelector("h1").innerText);

    expect(heading).toEqual("Your Businesses");

  })


});
