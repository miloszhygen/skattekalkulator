import React, { Component } from 'react';

//Import utils
import { calculateTax } from './utils/taxUtil'
import { urlSearchParameterUtil } from './utils/urlSearchParameterUtil'
import './Skatt.css';

// TODO: Proptypes

class Skatt extends Component {
  state = {
    stateFinnmark: false,
    stateMarried: false,
    stateIncome: 0,
    stateFormue: 0,
    stateFradrag: 0,
    taxToPay: {}
  }

  componentWillMount(){

    // ex: [URL]/?income=2200000&formue=2000000
    // Find url parameters if provided and update state with corresponding tax
    const {income,formue, finnmark, married, fradrag} = urlSearchParameterUtil(window.location.search);
    this.setState({
      taxToPay: calculateTax({
        income: income,
        nettoFormue: formue,
        finnmarksfradrag: ( finnmark === 'true' ),
        married: ( married === 'true' ),
        fradrag: fradrag

      }),
      stateFormue: formue ,
      stateIncome: income,
      stateMarried: married,
      stateFinnmark: finnmark,
      stateFradrag: fradrag,
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
      stateFradrag,
      stateMarried,
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
            value={stateIncome || ''}
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
          <input
            type="checkbox"
            value='1000'
            checked={stateFinnmark}
            onChange={()=>{
              this.setState({stateFinnmark:!stateFinnmark})
              this.updateSkatt()
            }}
          />
           Rett til Finnmarksfradrags
        </label>

        <br/>
        <label>
          <input
            type="checkbox"
            value={1000}
            checked={stateMarried}
            onChange={()=>{
              this.setState({stateMarried:!stateMarried})
              this.updateSkatt()
            }}
          />
          Gift {stateMarried}
        </label>
        <br/>
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
                nettoFormue: e.target.value,
                fradrag: stateFradrag
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
         Fradrag (ikke minstefradrag) <br/>
          <input
            type="text"
            name="fradrag"
            value={stateFradrag || ''}
            onChange={(e)=> {
              this.setState({
              taxToPay: calculateTax({
                income: stateIncome,
                finnmarksfradrag: stateFinnmark,
                nettoFormue: stateFormue,
                stateFradrag: e.target.value
              }),
              stateFradrag: e.target.value
            })
            this.updateSkatt()
          }}
          />
          <br/>
          <small>Standardfradragene beregnes automatisk. Men har du egne fradrag i tillegg, føres de opp her. De vanligste fradragene er renteutgifter til lån, foreldrefradrag (typisk barnehage og SFO inntil 25.000 kroner for første barn og 15.000 for påfølgende) og pendlerfradrag. Også tap ved salg av aksjer og aksjefond regnes med her.</small>
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
