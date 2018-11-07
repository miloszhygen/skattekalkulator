import puppeteer from 'puppeteer';

let page;
let browser;

describe('create agreement page', () => {
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

  it('test skatt"', async () => {
    await page.waitFor(2000);
    // await page.waitForSelector('input[name="phone"]');
    // await expect(page).toFill('input[name="phone"]', 'userPhone')
    // await expect(page).toMatch('Velg ditt eget leveringssted')
    // await expect(page).toClick('.hw-dropdown__option', {text: 'Terrasse'});
    // await expect(page).toClick('textarea');
    // await expect(page).toMatch(`${'memberName'} (+47) ${'memberPhone'}`)
  })
})