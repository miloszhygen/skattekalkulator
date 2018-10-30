import { calculateTax } from './taxUtil';

describe('tax calculator 2018', () => {
  // describe('have right to Finnmarksfradrag', () => {
  //   it('TAX:have right to Finnmarksfradrag', () => {
  //     const income = 600000;
  //     const tax = 146520;
  //     const taxToPay = calculateTax(income).tax;

  //     expect(taxToPay).toEqual(tax);
  //   })
  // })

  describe('Test test', () => {
    it('test', () => {
      const income = {
        income: 600000,
        finnmarksfradrag: false,
        nettoFormue: 2000000,
        married: false,
        fradrag: 120000
      };
      const expectedTax = 142069;
      const recievedTax = calculateTax(income).tax;

      expect(recievedTax).toEqual(expectedTax);
    })
  })





  describe('Kapitalinntekter', () => {
    it('kapital 120000, income 600k, fradrag 120k', () => {
      const income = {
        income: 600000,
        finnmarksfradrag: false,
        nettoFormue: 2000000,
        married: false,
        fradrag: 120000,
        kapital: 120000
      };
      const expectedTax = 169669;
      const recievedTax = calculateTax(income).tax;

      expect(recievedTax).toEqual(expectedTax);
    })
    it('kapital 120000', () => {
      const income = {
        income: 600000,
        finnmarksfradrag: false,
        nettoFormue: 0,
        married: false,
        fradrag: 0,
        kapital: 120000
      };
      const expectedTax = 192849;
      const recievedTax = calculateTax(income).tax;

      expect(recievedTax).toEqual(expectedTax);
    })
    it('kapital 120000, income 600k Marrid Finnmark', () => {
      const income = {
        income: 600000,
        finnmarksfradrag: true,
        nettoFormue: 3500000,
        married: true,
        fradrag: 200000,
        kapital: 120000
      };
      const expectedTax = 135510;
      const recievedTax = calculateTax(income).tax;

      expect(recievedTax).toEqual(expectedTax);
    })
    it('kapital 120000, income 600k Marrid Finnmark ', () => {
      const income = {
        income: 75000,
        finnmarksfradrag: true,
        nettoFormue: 3500000,
        married: true,
        fradrag: 200000,
        kapital: 120000
      };
      const expectedTax = 9678;
      const recievedTax = calculateTax(income).tax;

      expect(recievedTax).toEqual(expectedTax);
    })



  })

  describe('have fradrag', () => {
    it('FRADRAG: fradrag 120k', () => {
      const income = {
        income: 600000,
        finnmarksfradrag: false,
        nettoFormue: 1500000,
        married: false,
        fradrag: 120000
      };
      const expectedTax = 137819;
      const recievedTax = calculateTax(income).tax;

      expect(recievedTax).toEqual(expectedTax);
    })
    it('FRADRAG: fradrag 120k incopm 120000', () => {
      const income = {
        income: 120000,
        finnmarksfradrag: false,
        nettoFormue: 1500000,
        married: false,
        fradrag: 120000
      };
      const expectedTax = 10010;
      const recievedTax = calculateTax(income).tax;

      expect(recievedTax).toEqual(expectedTax);
    })


    it('FRADRAG: fradrag 120k income 50000', () => {
      const income = {
        income: 50000,
        finnmarksfradrag: false,
        nettoFormue: 1500000,
        married: false,
        fradrag: 120000
      };
      const expectedTax = 170;
      const recievedTax = calculateTax(income).tax;

      expect(recievedTax).toEqual(expectedTax);
    })

    it('FRADRAG: fradrag ', () => {
      const income = {
        income: 600000,
        finnmarksfradrag: false,
        nettoFormue: 0,
        married: false,
        fradrag: 60000
      };
      const expectedTax = 151449;
      const recievedTax = calculateTax(income).tax;

      expect(recievedTax).toEqual(expectedTax);
    })

  })

  describe('have formue married', () => {
    it('FORMUE: formueskatt for formue of 2M and from Finnmark', () => {
      const income = {income: 600000, finnmarksfradrag: true, nettoFormue: 3500000, married: true};
      const expectedTax = {
        tax: 151110,
        formueTotal: 4590
      }
      const recievedTax = {
        tax: calculateTax(income).tax,
        formueTotal: calculateTax(income).formueTotal
      }
      expect(recievedTax).toEqual(expectedTax);
    })

    it('FORMUE: formueskatt for formue of 2M', () => {
      const income = {income: 600000, finnmarksfradrag: false, nettoFormue: 2000000, married: true};
      const expectedTax = {
        tax: 165249,
        formueTotal: 0
      }
      const recievedTax = {
        tax: calculateTax(income).tax,
        formueTotal: calculateTax(income).formueTotal
      }
      expect(recievedTax).toEqual(expectedTax);
    })

    it('FORMUE: formueskatt for formue of 3.5M', () => {
      const income = {income: 150000, finnmarksfradrag: false, nettoFormue: 3500000, married: true};
      const expectedTax = {
        tax: 23273,
        formueTotal: 4590
      }
      const recievedTax = {
        tax:calculateTax(income).tax,
        formueTotal: calculateTax(income).formueTotal
      }
      expect(recievedTax).toEqual(expectedTax);
    })
  })

  describe('have formue not married', () => {
    it('FORMUE: formueskatt for formue of 1.5M and from Finnmark', () => {
      const income = {income: 600000, finnmarksfradrag: true, nettoFormue: 1500000};
      const expectedTax = {
        tax: 146690,
        formueTotal: 170
      }
      const recievedTax = {
        tax:calculateTax(income).tax,
        formueTotal: calculateTax(income).formueTotal
      }
      expect(recievedTax).toEqual(expectedTax);
    })
    it('FORMUE: formueskatt for formue of 1.5M', () => {
      const income = {income: 600000, finnmarksfradrag: false, nettoFormue: 1500000};
      const expectedTax = {
        tax: 165419,
        formueTotal: 170
      }
      const recievedTax = {
        tax:calculateTax(income).tax,
        formueTotal: calculateTax(income).formueTotal
      }
      expect(recievedTax).toEqual(expectedTax);
    })

    it('FORMUE: formueskatt for formue of 2M', () => {
      const income = {income: 600000, finnmarksfradrag: false, nettoFormue: 2000000};
      const expectedTax = {
        tax: 169669,
        formueTotal: 4420
      }
      const recievedTax = {
        tax: calculateTax(income).tax,
        formueTotal: calculateTax(income).formueTotal
      }
      expect(recievedTax).toEqual(expectedTax);
    })



    it('FORMUE: formueskatt for formue of 3.5M', () => {
      const income = {income: 150000, finnmarksfradrag: false, nettoFormue: 3500000};
      const expectedTax = {
        tax: 35853,
        formueTotal: 17170
      }
      const recievedTax = {
        tax:calculateTax(income).tax,
        formueTotal: calculateTax(income).formueTotal
      }
      expect(recievedTax).toEqual(expectedTax);
    })
  })

  describe('have right to Finnmarksfradrag', () => {
    it('TAX: income 50k NOK gross income pr year ', () => {
      const income = {income: 50000, finnmarksfradrag:true, married:false};
      const tax = 0;
      const taxToPay = calculateTax(income).tax;
      expect(taxToPay).toEqual(tax);
    })
    it('TAX: income 75k NOK gross income pr year ', () => {
      const income = {income: 75000, finnmarksfradrag:true, married:false};
      const tax = 5088;
      const taxToPay = calculateTax(income).tax;
      expect(taxToPay).toEqual(tax);
    })

    it('TAX: income 220000 NOK gross income pr year ', () => {
      const income = {income: 220000, finnmarksfradrag:true, married:false};
      const tax = 28921;
      const taxToPay = calculateTax(income).tax;
      expect(taxToPay).toEqual(tax);
    })

    it('TAX: calculate tax for 400k NOK gross income pr year ', () => {
      const income = {income: 400000, finnmarksfradrag:true, married:false};
      const tax = 84381;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })

    // Fra 598.050 kr til 962.050 kr skal det betales 12,40 %
    it('TAX: calculate tax for 600k NOK gross income pr year ', () => {
      const income = {income: 600000, finnmarksfradrag:true, married:false};
      const tax = 146520;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })
    // Fra 962.050 kr skal det betales 15,40 %
    it('TAX: calculate tax for 1M NOK gross income pr year ', () => {
      const income = {income: 1000000, finnmarksfradrag:true, married:false};
      const tax = 300817;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })

  })

  describe('normal income', () => {

    /*
      Task 1:
      What will be the paid tax when income is below the Exemption card limit (“Frikortgrense”)? Example if income is 50.000.
    */

    it('TAX: calculate tax for 50k NOK gross income pr year ', () => {
      const income = {income: 50000, finnmarksfradrag:false, married:false};
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
      const income = {income: 648000, finnmarksfradrag:false, married:false};
      const socialSecurityTax = 53136;
      const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

      expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
    })

    it('Calculated social security tax for 60k NOK gross income pr month (720k NOK gross income pr year)', () => {
      const income = {income: 720000, finnmarksfradrag:false, married:false};
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
      const income = {income: 75000, finnmarksfradrag:false, married:false};
      const socialSecurityTax = 5088;
      const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

      expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
    })


    /* Other tests */
    it('Calculated social security tax for 100k NOK', () => {
      const income = {income: 100000, finnmarksfradrag:false, married:false};
      const socialSecurityTax = 8200;
      const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

      expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
    })

    it('Calculated social security tax for 55k NOK', () => {
      const income = {income: 55000, finnmarksfradrag:false, married:false};
      const socialSecurityTax = 88;
      const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

      expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
    })

    it('Calculated social security tax for 57k NOK', () => {
      const income = {income: 57000, finnmarksfradrag:false, married:false};
      const socialSecurityTax = 588;
      const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

      expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
    })

    it('Calculated social security tax for 65k NOK', () => {
      const income = {income: 65000, finnmarksfradrag:false, married:false};
      const socialSecurityTax = 2588;
      const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

      expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
    })

    it('Calculated social security tax for 67k NOK', () => {
      const income = {income: 67000, finnmarksfradrag:false, married:false};
      const socialSecurityTax = 3088;
      const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

      expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
    })

    it('Calculated social security tax for 80k NOK', () => {
      const income = {income: 80000, finnmarksfradrag:false, married:false};
      const socialSecurityTax = 6338;
      const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

      expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
    })

    it('Calculated social security tax for 90k NOK', () => {
      const income = {income: 90000, finnmarksfradrag:false, married:false};
      const socialSecurityTax = 7380;
      const socialSecurityTaxToPay = calculateTax(income).socialSecurityTax;

      expect(socialSecurityTaxToPay).toEqual(socialSecurityTax);
    })

    it('TAX: calculate tax for 60k NOK gross income pr year ', () => {
      const income = {income: 60000, finnmarksfradrag:false, married:false};
      const tax = 1338;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })
    it('TAX: calculate tax for 75k NOK gross income pr year ', () => {
      const income = {income: 75000, finnmarksfradrag:false, married:false};
      const tax = 5088;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })

    // Under 169.000 kr skal det ikke betales trinnskatt
    it('TAX: calculate tax for 150k NOK gross income pr year ', () => {
      const income = {income: 150000, finnmarksfradrag:false, married:false};
      const tax = 18683;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })

    // Under 169.000 kr skal det ikke betales trinnskatt
    it('TAX: calculate tax for 169k NOK gross income pr year ', () => {
      const income = {income: 169000, finnmarksfradrag:false, married:false};
      const tax = 22644;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })

    // Fra 166.000 kr til 237.900 kr skal det betales 1,40 %
    it('TAX: calculate tax for 220k NOK gross income pr year ', () => {
      const income = {income: 220000, finnmarksfradrag:false, married:false};
      const tax = 34311;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })
    // Fra 237.900 kr til 598.050 kr skal det betales 3,30 %
    it('TAX: calculate tax for 400k NOK gross income pr year ', () => {
      const income = {income: 400000, finnmarksfradrag:false, married:false};
      const tax = 96071;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })

    // Fra 598.050 kr til 962.050 kr skal det betales 12,40 %
    it('TAX: calculate tax for 600k NOK gross income pr year ', () => {
      const income = {income: 600000, finnmarksfradrag:false, married:false};
      const tax = 165249;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })
    // Fra 962.050 kr skal det betales 15,40 %
    it('TAX: calculate tax for 1M NOK gross income pr year ', () => {
      const income = {income: 1000000, finnmarksfradrag:false, married:false};
      const tax = 340787;
      const taxToPay = calculateTax(income).tax;

      expect(taxToPay).toEqual(tax);
    })
  })

})
