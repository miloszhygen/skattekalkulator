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

  componentDidMount(){
    // TODO: put this in construct?
    const {income = 0,formue = 0, finnmark, married, fradrag = 0} = urlSearchParameterUtil(window.location.search);
    this.setState({
      stateFormue: formue,
      stateIncome: income,
      stateMarried: ( married === 'true' ),
      stateFinnmark: ( finnmark === 'true' ),
      stateFradrag: fradrag,
    })
  }
  componentDidUpdate(prevProps, prevState){
    if (JSON.stringify(prevState).localeCompare(JSON.stringify(this.state))) {
      this.updateSkatt()
    }
  }

  updateSkatt(){
    const {stateIncome,stateFormue,stateFinnmark,stateMarried,stateFradrag} = this.state;
    this.setState({ taxToPay: calculateTax({
      income: stateIncome,
      nettoFormue: stateFormue,
      finnmarksfradrag: stateFinnmark,
      married: stateMarried,
      fradrag: stateFradrag
    })})
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



        Helper:
        <br/>
        <a href="?income=600000&formue=2000000&married=true&finnmark=false&fradrag=120000">
          G: 137649</a>
        <br/>
        <a href="?income=600000&formue=2000000&married=false&finnmark=false&fradrag=120000">
          U: 142069</a>
        <br/>
        <a href="?income=600000&formue=2000000&married=true&finnmark=true&fradrag=120000">
          FG: 1231200</a>
        <br/>
        <a href="?income=600000&formue=2000000&married=false&finnmark=true&fradrag=120000">
          F: 127540</a>

        <hr/>

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
            onChange={(e)=> this.setState({stateIncome: e.target.value})}
          />
        </label>

        <hr/>
        <label>
          <input
            type="checkbox"
            value='1000'
            checked={stateFinnmark}
            onChange={()=> this.setState({stateFinnmark:!stateFinnmark})}
          />
           Rett til Finnmarksfradrags
        </label>

        <br/>
        <label>
          <input
            type="checkbox"
            value={1000}
            checked={stateMarried}
            onChange={()=> this.setState({stateMarried: !stateMarried})}
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
            onChange={(e)=> this.setState({stateFormue: e.target.value })}
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
            onChange={(e)=>this.setState({ stateFradrag: e.target.value})}
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
