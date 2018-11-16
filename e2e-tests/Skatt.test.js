import puppeteer from 'puppeteer';

let page;
let browser;

describe('test skatt page', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      // Debug mode !
      // Change headless to false if you want a visual view on the e2e tests
      headless: true,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  })
  beforeEach(async () => { })
  afterAll(() => {
    browser.close();
  });

  it('test income 600000"', async () => {
    // await page.waitFor(2000);
    await expect(page).toMatch('Skattekalkulator 2018')
    // await page.waitForSelector('input[name="phone"]');
    await expect(page).toFill('input[name="income"]', '600000')
    // await page.waitFor(500);
    await expect(page).toMatch('Skatt: 165 249 kr')
    // await expect(page).toClick('.hw-dropdown__option', {text: 'Terrasse'});
    // await expect(page).toClick('textarea');
    // await expect(page).toMatch(`${'memberName'} (+47) ${'memberPhone'}`)
  })
})