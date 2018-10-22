import { calculateTax } from './taxUtil';

describe('test tax calculator 2018', () => {

  /*
    Task 1:
    What will be the paid tax when income is below the Exemption card limit (“Frikortgrense”)? Example if income is 50.000.
  */

  it('TAX: calculate tax for 50k NOK gross income pr year ', () => {
    const income = 50000;
    const tax = 0;
    const taxToPay = calculateTax(income).tax;

    expect(taxToPay).toEqual(tax);
  })

  /*
    Task 2:
    You have a regular job («Lønnsinntekt»). We need to calculate the tax paid for Membership to the National Insurance Scheme/social security tax (“Trygdeavgift”). How much social security tax do you need to pay if you earn:
    a) 54.000
    b) 60.000
  */
  it('Calculated social security tax for 54k NOK gross income pr month (648k NOK gross income pr year)', () => {
    const income = 648000;
    const socialSecurityTax = 53136;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })

  it('Calculated social security tax for 60k NOK gross income pr month (720k NOK gross income pr year)', () => {
    const income = 720000;
    const socialSecurityTax = 59040;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })

  /*
    Task 3:
    The exception of the social security tax:
    The lowest amount you need to earn not paying social security tax you have found in task 1 (54 650). The amount you should pay in social security tax should never be above 25 percent of the part for the income that is above 54 650. What should you pay in social security tax if you earn?
    a) 75.000
    b) 100.000
  */
  it('Calculated social security tax for 75k NOK', () => {
    const income = 75000;
    const socialSecurityTax = 5088;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })


  /* Other tests */
  it('Calculated social security tax for 100k NOK', () => {
    const income = 100000;
    const socialSecurityTax = 8200;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })

  it('Calculated social security tax for 55k NOK', () => {
    const income = 55000;
    const socialSecurityTax = 88;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })

  it('Calculated social security tax for 57k NOK', () => {
    const income = 57000;
    const socialSecurityTax = 588;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })

  it('Calculated social security tax for 65k NOK', () => {
    const income = 65000;
    const socialSecurityTax = 2588;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })

  it('Calculated social security tax for 67k NOK', () => {
    const income = 67000;
    const socialSecurityTax = 3088;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })

  it('Calculated social security tax for 80k NOK', () => {
    const income = 80000;
    const socialSecurityTax = 6338;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })

  it('Calculated social security tax for 90k NOK', () => {
    const income = 90000;
    const socialSecurityTax = 7380;
    const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

    expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
  })

  it('TAX: calculate tax for 60k NOK gross income pr year ', () => {
    const income = 60000;
    const tax = 1338;
    const taxToPay = calculateTax(income).tax;

    expect(taxToPay).toEqual(tax);
  })
  it('TAX: calculate tax for 75k NOK gross income pr year ', () => {
    const income = 75000;
    const tax = 5088;
    const taxToPay = calculateTax(income).tax;

    expect(taxToPay).toEqual(tax);
  })

  // Under 169.000 kr skal det ikke betales trinnskatt
  it('TAX: calculate tax for 150k NOK gross income pr year ', () => {
    const income = 150000;
    const tax = 18683;
    const taxToPay = calculateTax(income).tax;

    expect(taxToPay).toEqual(tax);
  })

  // Under 169.000 kr skal det ikke betales trinnskatt
  it('TAX: calculate tax for 169k NOK gross income pr year ', () => {
    const income = 169000;
    const tax = 22644;
    const taxToPay = calculateTax(income).tax;

    expect(taxToPay).toEqual(tax);
  })

  // Fra 166.000 kr til 237.900 kr skal det betales 1,40 %
  it('TAX: calculate tax for 220k NOK gross income pr year ', () => {
    const income = 220000;
    const tax = 34311;
    const taxToPay = calculateTax(income).tax;

    expect(taxToPay).toEqual(tax);
  })
  // Fra 237.900 kr til 598.050 kr skal det betales 3,30 %
  it('TAX: calculate tax for 400k NOK gross income pr year ', () => {
    const income = 400000;
    const tax = 96071;
    const taxToPay = calculateTax(income).tax;

    expect(taxToPay).toEqual(tax);
  })

  // Fra 598.050 kr til 962.050 kr skal det betales 12,40 %
  it('TAX: calculate tax for 600k NOK gross income pr year ', () => {
    const income = 600000;
    const tax = 165249;
    const taxToPay = calculateTax(income).tax;

    expect(taxToPay).toEqual(tax);
  })
  // Fra 962.050 kr skal det betales 15,40 %
  it('TAX: calculate tax for 1M NOK gross income pr year ', () => {
    const income = 1000000;
    const tax = 340787;
    const taxToPay = calculateTax(income).tax;

    expect(taxToPay).toEqual(tax);
  })
})