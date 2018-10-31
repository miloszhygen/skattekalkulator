import puppeteer from 'puppeteer';

// TODO: use mock-data-response?
const userName = 'Ola Nordman';
const userPhone = '21212121';
const userEmail = 'ola@nordman.no';
const memberName = 'THOMAS NYGRAD'
const memberPhone = '33333333'
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
    await page.goto('http://localhost:1337/user/agreement/');
  })
  beforeEach(async () => { })
  afterAll(() => {
    browser.close();
  });

  it('should display "Velg ditt eget leveringssted"', async () => {
    await expect(page).toMatch('Velg ditt eget leveringssted')
  })

  it('should fill inn user phone and email', async () => {
    await page.waitForSelector('input[name="phone"]');
    await expect(page).toFill('input[name="phone"]', userPhone)
    await expect(page).toFill('input[name="email"]', userEmail)
  })

  it('should select one member', async () => {
    await expect(page).toClick('.hw-text-small', { text: memberName })
  })

  it('should select a deliveryplace from dropdown meny', async () => {
    await expect(page).toClick('.hw-dropdown__inner', {text: 'Velg egent sted her'});
    await expect(page).toClick('.hw-dropdown__option', {text: 'Terrasse'});
  })

  it('should add description', async () => {
    await expect(page).toClick('textarea');
    await page.type('textarea', 'Place behind the terras door!');
  })

  it('should accept terms and condition', async () => {
    await expect(page).toClick('.hw-text-small', { text: 'Jeg godkjenner ' })
  })

  it('should click on Continue button', async () => {
    await expect(page).toClick('span', { text: 'Fortsett' })
  })

  it('should show Summary page', async () => {
    await expect(page).toMatch('Oppsummering')
    await expect(page).toMatch('Navn: Terrasse')
    await expect(page).toMatch('Beskrivelse: Place behind the terras door!')
    await expect(page).toMatch(userName)
    await expect(page).toMatch(userEmail)
    await expect(page).toMatch(`(+47) ${userPhone}`)
    await expect(page).toMatch(`${memberName} (+47) ${memberPhone}`)
    await page.waitFor(2000);
  })

  it('should click on Bekreft button and navigate to receipt page', async () => {
    await expect(page).toClick('span', { text: 'Bekreft' })
  })

  it('should show success message on receipt page', async () => {
    await page.waitForSelector('h2'); // wait for header tag H2 to load
    await expect(page).toMatch('Takk for at du ønsker å benytte deg av denne tjenesten! Du er nå registrert')
  })
})



// "babel": "^6.23.0",
// "babel-polyfill": "^6.26.0",
// "babel-preset-env": "^1.7.0",
// "babel-preset-react": "^6.24.1",