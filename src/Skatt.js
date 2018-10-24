import React, { Component } from 'react';

//Import utils
import { calculateTax } from './utils/taxUtil'
import { urlSearchParameterUtil } from './utils/urlSearchParameterUtil'
import './Skatt.css';

// TODO: Proptypes

class Skatt extends Component {
  state = {
    stateFinnmark:false,
    stateMarried:false,
    stateIncome:0,
    stateFormue:0,
    taxToPay: {}
  }

  componentWillMount(){
    
    // ex: [URL]/?income=2200000&formue=2000000
    // Find url parameters if provided and update state with corresponding tax
    const {income,formue, finnmark, married} = urlSearchParameterUtil(window.location.search);
    this.setState({
      taxToPay: calculateTax({
        income: income,
        nettoFormue: formue,
        finnmarksfradrag: ( finnmark === 'true' ),
        married: ( married === 'true' )
      }),
      stateFormue: formue ,
      stateIncome: income,
      stateMarried: married,
      stateFinnmark: finnmark,
    })
    this.updateSkatt()
  }
  componentDidUpdate(prevProps, prevState){
    const {stateIncome, stateFinnmark, stateFormue, stateMarried} = this.state;
    if (prevState.stateFinnmark !== stateFinnmark || prevState.stateMarried !== stateMarried) {
      this.setState({ taxToPay: calculateTax({
        income: stateIncome,
        nettoFormue: stateFormue,
        finnmarksfradrag: stateFinnmark,
        married:stateMarried
      })})
      this.updateSkatt()
    }
  }
  updateSkatt(){
    console.log('updating skatt');
    
  }
  render() {
    const {
      stateFinnmark,
      stateIncome,
      stateFormue,
      taxToPay: {
        income = 0,
        formue = 0,
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
            onChange={(e)=> {
              this.setState({
              taxToPay: calculateTax({
                income: e.target.value,
                finnmarksfradrag: stateFinnmark
              }),
              stateIncome: e.target.value})
              this.updateSkatt()
            }}
          />
        </label>

        <hr/>
        <label>
          Din netto formue <br/>
          <input
            type="text"
            name="formue"
            value={stateFormue || ''}
            onChange={(e)=> {
              this.setState({
              taxToPay: calculateTax({
                income: stateIncome,
                finnmarksfradrag: stateFinnmark,
                nettoFormue: e.target.value
              }),
              stateFormue: e.target.value
            })
            this.updateSkatt()
          }}
          />
          <br/>
          <small>Det er netto formue som skal legges inn. Fra og med skatteåret 2017 er det visse formuesobjekter som får en verdsettingsrabatt, samt at disse får tilordnet gjeld. Det er formuen etter fradraget for verdsettingsrabatten, og reduksjonsbeløpet i gjeld som skal legges inn som nettoformue.</small>
        </label>
        <br/>
        <label>
          <input
            type="checkbox"
            value=''
            checked={this.state.stateFinnmark === 'true'}
            onChange={()=>{
              this.setState({stateFinnmark:!this.state.stateFinnmark})
              this.updateSkatt()
            }}
          />
           Rett til Finnmarksfradrags
        </label>

        <br/>
        <label>
          <input
            type="checkbox"
            value=''
            checked={this.state.stateMarried === 'true'}
            onChange={()=>{
              this.setState({stateMarried:!this.state.stateMarried})
              this.updateSkatt()
            }}
          />
          Gift
        </label>

        <hr/>
        { (income > 0 ) &&
          <div>
            <h3>Skatt: {tax} kr </h3>
            <p>{stateFinnmark && '(Finnmarksfradrag)'}</p>
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
