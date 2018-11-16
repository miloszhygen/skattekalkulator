import React from 'react';
import { splitNumberOnKiloUtil } from './../utils/splitNumberOnKiloUtil'

const TaxCalculations = (props) => {
  const {
    stateFinnmark,
    taxToPay: {
      income = 0,
      tax = 0,
      socialSecurityTax = 0,
      minstefradrag = 0,
      taxBase = 0,
      trinnTax:{
        totalTrinnSkatt = 0,
        trinnOne = 0,
        trinnTwo = 0,
        trinnThree = 0,
        trinnFour = 0
      }={}
    }={}
  } = props;


  return (
    <div>
      { (income > 0 ) &&
      <div>
        <h3>Skatt: {splitNumberOnKiloUtil(tax)} kr </h3>
        <p>{stateFinnmark && '(Finnmarksfradrag)'}</p>
        <hr/>
        <p>Hvorav:</p>
        <p>Skattegrunnlag: {splitNumberOnKiloUtil(taxBase)}</p>
        <p>
          <b>Trygdeavgift: {splitNumberOnKiloUtil(socialSecurityTax)} kr</b>
        </p>
        <p>Trinnskatt: {splitNumberOnKiloUtil(totalTrinnSkatt)} kr</p>
        <p>Minstefradrag: {splitNumberOnKiloUtil(minstefradrag)} kr</p>
        {(totalTrinnSkatt > 0) &&
          <div className="box--margin-left">
            <p>Fordelt slik:</p>
            {(trinnOne > 0) && <p> Trinn 1: {splitNumberOnKiloUtil(trinnOne)} kr</p>}
            {(trinnTwo > 0) && <p> Trinn 2: {splitNumberOnKiloUtil(trinnTwo)} kr</p>}
            {(trinnThree > 0) && <p> Trinn 3: {splitNumberOnKiloUtil(trinnThree)} kr</p>}
            {(trinnFour > 0) && <p> Trinn 3: {splitNumberOnKiloUtil(trinnFour)} kr</p>}
          </div>
        }
        <br/>
      </div>
      }
    </div>
  )};

export default TaxCalculations;