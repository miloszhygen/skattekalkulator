/**
 * Utility to calculate taxes
 * returns an object with calculations for tax for chosen income
 */

// Import setTypes
import { YEARLY, MONTHLY } from './../helpers/setTypes'


// Skattesatser
const taxValuesConfig = {
  frikortgrense: 55000,
  trygdeavgiftMin: 54650,
  trygdeavgiftSats: 0.082,
  minstefradragMax: 97610,
  minstefradragMin: 31800,
  personfradrag: 54750,
  trinn0: 169000,
  trinn1: 237900,
  trinn2: 598050,
  trinn3: 962050,
  trinn1Tax: 0.014,
  trinn2Tax: 0.033,
  trinn3Tax: 0.124,
  trinn3TaxFin: 0.104,
  trinn4Tax: 0.154,
  finnmarksfradragNok: 15500,
  skattPercent:.23,
  skattPercentFin:.195,
  formueSkattGrense: 1480000,
  formueTaxStatSats:0.0015,
  formueTaxKomSats:0.007
}

const rightToFinnmarksfradrag = (finnmarksfradrag) => {
  const { skattPercent, skattPercentFin, finnmarksfradragNok } = taxValuesConfig;
  let finnmarksfradragValue = 0;
  let skatteSats = skattPercent;
  if (finnmarksfradrag) {
    finnmarksfradragValue = finnmarksfradragNok;
    skatteSats = skattPercentFin;
  }
  return {
    skatteSats,
    finnmarksfradragValue
  }
}



const calculateFormueTax = (formue, married) => {
  /*
    Formueskatt 101:
    ================
    Formuesskatt til kommunen UGIFT
    -------------------------------
      Skatteklasse 0 	0 og over	0,7 %
      Skatteklasse 1	0 - 1 480 000 kroner	0,0 %
      Skatteklasse 1	1 480 000 kroner og over	0,7 %

      Formuesskatt til staten
      Skatteklasse 0, 1
      0 - 1 480 000 kroner	0,0 %
      1 480 000 kroner og over	0,15 %


    Formuesskatt til kommunen GIFT
    -------------------------------
      Skatteklasse 0 	0 og over	0,7 %
      Skatteklasse 1	0 -  2960000 kroner	0,0 %
      Skatteklasse 1	 2960000 kroner og over	0,7 %

      Formuesskatt til staten
      Skatteklasse 0, 1
      0 -  2960000 kroner	0,0 %
      2960000 kroner og over	0,15 %

  */
  const { formueTaxStatSats, formueTaxKomSats, formueSkattGrense } = taxValuesConfig;

  let formueTax = 0;
  let formueTaxStat = 0;
  let formueTaxKom = 0;

  if (formue > ((married) ? (formueSkattGrense * 2) : formueSkattGrense)) {
    const formuDiffToLimit = formue - ((married) ? (formueSkattGrense * 2) : formueSkattGrense)
    formueTaxStat = formuDiffToLimit * formueTaxStatSats;
    formueTaxKom = formuDiffToLimit * formueTaxKomSats;

    formueTax = formueTaxStat + formueTaxKom;
  }
  return {
    formueTotal:formueTax,
    stat:formueTaxStat,
    kommune:formueTaxKom
  };
}






const aboveFrikortLimit = (income) => {
  // Frikort linit 55 000 Nok
  const { frikortgrense } = taxValuesConfig;
  // Chack if the income is above or equal to the set frikort limit that is 55000 NOK
  return (income <= frikortgrense)
}

const checkIfSocialSecurityTaxIsWithin25PercentOfIncome = (income) => {
  // (income * 8.2%) / (income - 54650) needs to be higher than 25% to make this logic become true
  const { trygdeavgiftSats, trygdeavgiftMin } = taxValuesConfig;
  return (income * trygdeavgiftSats) / (income - trygdeavgiftMin) > 0.25;
}

const socialSecurityTax = (income) => {
  const { trygdeavgiftSats, trygdeavgiftMin } = taxValuesConfig;
  return (checkIfSocialSecurityTaxIsWithin25PercentOfIncome(income))
    ? Math.round((income - trygdeavgiftMin) * 0.25)
    : Math.round(income * trygdeavgiftSats)
}

const calculatedMinstefradrag = (income) => {
  const { minstefradragMax, minstefradragMin } = taxValuesConfig;
  // Minstefradrag is 45% of your income - max 97610 NOK, min 31800 NOK
  let minstefradrag = income * .45;
  // Check if calculated minstefradrag is higher then 97610, if so, return 97610
  if (minstefradrag > minstefradragMax) {
    minstefradrag = minstefradragMax
  }
  // Check if calculated minstefradrag is lower then 31800, if so, return 31800
  if (minstefradrag < minstefradragMin) {
    minstefradrag = minstefradragMin
  }
  return minstefradrag;
}

const trinnTax = (income, finnmarksfradrag) => {
  const { trinn0, trinn1, trinn2, trinn3, trinn1Tax, trinn2Tax, trinn3Tax, trinn3TaxFin, trinn4Tax } = taxValuesConfig;
  /*
    Trinnskatt 101:
    ===============
    Trinn 0: Under 169.000 kr skal det ikke betales trinnskatt
    Trinn 1: Fra 166.000 kr til 237.900 kr skal det betales 1,40 %
    Trinn 2: Fra 237.900 kr til 598.050 kr skal det betales 3,30 %
    Trinn 3: Fra 598.050 kr til 962.050 kr skal det betales 12,40 %
    Trinn 4: Fra 962.050 kr skal det betales 15,40 %
  */

  // Check if income is within the scope of trinnskatt and add corresponding taxation level
  const trinnOne = (((income < trinn1) ? income : trinn1) - trinn0) * trinn1Tax;
  const trinnTwo = (((income < trinn2) ? income : trinn2) - trinn1) * trinn2Tax;
  const trinnThree = (((income < trinn3) ? income : trinn3) - trinn2) * ((finnmarksfradrag) ? trinn3TaxFin : trinn3Tax);
  const trinnFour = (income - trinn3) * trinn4Tax;
  // Calculate trinnskatt based on the above values, if values is negative, set variable to 0 else, set to trinnskatt value
  const trinnOneTax = (trinnOne > 0) ? trinnOne : 0;
  const trinnTwoTax = (trinnTwo > 0) ? trinnTwo : 0;
  const trinnThreeTax = (trinnThree > 0) ? trinnThree : 0;
  const trinnFoyrTax = (trinnFour > 0) ? trinnFour : 0;

  let trinnTax = trinnOneTax + trinnTwoTax + trinnThreeTax + trinnFoyrTax;
  // There is no trinnskatt of you have an income belove 169000 NOK pr year
  if (income < trinn0 ) {
    trinnTax = 0;
  }
  return {
    totalTrinnSkatt: trinnTax,
    trinnOne: trinnOneTax,
    trinnTwo: trinnTwoTax,
    trinnThree: trinnThreeTax,
    trinnFour: trinnFoyrTax
  }
}

export const calculateTax = (incomeData) => {
  const { income = 0, finnmarksfradrag = false, nettoFormue = 0, married = false, fradrag = 0, kapital = 0, incomePr = YEARLY  } = incomeData

  const { personfradrag } = taxValuesConfig;
  // Make sure skattPercent is right depending on if you live in Finnmark or not, if so, also add finnmarksfradragValue with corresponding value from taxValuesConfig
  const { finnmarksfradragValue, skatteSats } = rightToFinnmarksfradrag(finnmarksfradrag)
  // Set income based on yearly or monthly income
  let calculatedIncome = (incomePr === YEARLY) ? income : income * 12
  // Tax base is the value you get after substracting minstefradag (45% of income, max 97610 NOK, min 31800 NOK) and personfradrag (54750 NOK)
  const taxBase = calculatedIncome - calculatedMinstefradrag(calculatedIncome) - personfradrag  - finnmarksfradragValue - fradrag + kapital;
  // Make sure the base tax value is grater than 0, if so, calculate 23% of the value (23% is the 2018 base tax constant )
  const validTaxBase = (taxBase > 0) ? (taxBase * skatteSats) : 0;
  // Add social security tax to the calculated base tax
  const taxWithoutTrinn = validTaxBase + socialSecurityTax(calculatedIncome);
  // Check if the income is above the frikort limit that is 55000 NOK, if not return 0 if else, return the tax with trinn tax
  const taxToPay = (aboveFrikortLimit(calculatedIncome))
    ? 0 + calculateFormueTax(nettoFormue,married).formueTotal
    : taxWithoutTrinn + trinnTax(calculatedIncome, finnmarksfradrag).totalTrinnSkatt + calculateFormueTax(nettoFormue,married).formueTotal;

  return {
    income: calculatedIncome,
    incomeMonthlyNetto:((incomePr === MONTHLY)? income : income/12),
    tax: Math.round(taxToPay),
    ...calculateFormueTax(nettoFormue,married),
    taxBase: taxBase,
    taxBeforeTrinn: taxWithoutTrinn,
    minstefradrag: calculatedMinstefradrag(calculatedIncome),
    socialSecurityTax: socialSecurityTax(calculatedIncome),
    trinnTax: trinnTax(calculatedIncome),
  }
};