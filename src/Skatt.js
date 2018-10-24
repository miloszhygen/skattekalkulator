import React, { Component } from 'react';

//Import utils
import { calculateTax } from './utils/taxUtil'
import { urlSearchParameterUtil } from './utils/urlSearchParameterUtil'
import './Skatt.css';

// TODO: Proptypes

class Skatt extends Component {
  state = {
    finnmark:false,
    married:false,
    stateIncome:0,
    taxToPay: {}
  }

  componentWillMount(){
    // Find url parameters if provided and update state with corresponding tax
    const responseStatus = urlSearchParameterUtil(window.location.search);
    this.setState({ taxToPay: calculateTax({income: responseStatus.income }) })
  }
  componentDidUpdate(prevProps, prevState){
    if (prevState.finnmark !== this.state.finnmark) {
      this.setState({ taxToPay: calculateTax({
        income: this.state.stateIncome,
        finnmarksfradrag:this.state.finnmark
      })})
    }
  }
  render() {
    const {
      finnmark,
      taxToPay: {
        income = 0,
        tax = 0,
        socialSecurityTax = 0,
        minstefradrag = 0,
        trinnTax:{
          totalTrinnSkatt = 0,
          trinnOne = 0,
          trinnTwo = 0,
          trinnThree = 0,
          trinnFour = 0
        }={}
      }={}
    } = this.state;
    return (
      <div>
        <header>
          <h1>Skattekalkulator 2018</h1>
          <h3>Skattekalkulator for allminnelig lønnsintekt*</h3>
        </header>
        <label>
          Skriv inn din bruttoinntekt 2018: <br/>
          <input
            type="text"
            name="income"
            value={income || ''}
            onChange={(e)=> this.setState({
              taxToPay: calculateTax({
                income: e.target.value,
                finnmarksfradrag:finnmark
              }),
              stateIncome: e.target.value})}
          />
        </label>

        <hr/>

        <label>
          <input
            type="checkbox"
            value=''
            checked={this.state.finnmark}
            onChange={()=>{
              this.setState({finnmark:!this.state.finnmark})
            }}
          />
           Rett til Finnmarksfradrag
        </label>

        {/* <br/>
        <label>
          <input
            type="checkbox"
            value=''
            checked={this.state.married}
            onChange={()=>{
              this.setState({married:!this.state.married})
            }}
          />
          Gift
        </label> */}

        <hr/>
        { (income > 0 ) &&
          <div>
            <h3>Skatt: {tax} kr </h3>
            <p>{finnmark && '(Finnmarksfradrag)'}</p>
            <hr/>
            <p>Hvorav:</p>
            <p>
              <b> Trygdeavgift: {socialSecurityTax} kr</b>
            </p>
            <p>Trinnskatt: {totalTrinnSkatt} kr</p>
            {(totalTrinnSkatt > 0) &&
              <div className="box--margin-left">
                <p>Fordelt slik:</p>
                {(trinnOne > 0) && <p> Trinn 1: {trinnOne} kr</p>}
                {(trinnTwo > 0) && <p> Trinn 2: {trinnTwo} kr</p>}
                {(trinnThree > 0) && <p> Trinn 3: {trinnThree} kr</p>}
                {(trinnFour > 0) && <p> Trinn 3: {trinnFour} kr</p>}
              </div>
            }
            <p>Minstefradrag: {minstefradrag} kr</p>
          </div>
        }
        <small>*Kalkulatoren gjelder ikke bosatte i Finmark og Nord-Troms. Den tar heller ikke med i kalkulasjonene særfradrag enslige forsørgere.</small>
      </div>
    );
  }
}

export default Skatt;
