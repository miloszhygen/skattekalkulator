import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import component
import Helpers from './components/Helpers'
import Input from './components/Input'
import TaxCalculations from './components/TaxCalculations'

// Import utils
import { calculateTax } from './utils/taxUtil'
import { urlSearchParameterUtil } from './utils/urlSearchParameterUtil'
import { splitNumberOnKiloUtil } from './utils/splitNumberOnKiloUtil'

// Import styles
import './Skatt.scss';

// Import helpers
import { YEARLY, MONTHLY } from './helpers/setTypes'
import setEnvironment from './helpers/setEnvironment';
import {getShareUrl} from './utils/getShareUrl';


// TODO: Proptypes

class Skatt extends Component {
  constructor () {
    super()
    const {income = 0,formue = 0, finnmark, married, fradrag = 0, kapital = 0, monthly = false} = urlSearchParameterUtil(window.location.search);
    this.state = {
      stateFormue: formue,
      stateIncome: parseInt(income, 10),
      stateMarried: ( married === 'true' ),
      stateFinnmark: ( finnmark === 'true' ),
      stateFradrag: parseInt(fradrag, 10),
      stateKapital: parseInt(kapital, 10),
      taxToPay: {},
      incomePr: (monthly === 'true') ? MONTHLY : YEARLY
    }
  }

  componentDidMount () {
    this.updateSkatt()
  }
  
  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevState).localeCompare(JSON.stringify(this.state))) {
      this.updateSkatt()
    }
  }

  updateSkatt () {
    const {stateIncome,stateFormue,stateFinnmark,stateMarried,stateFradrag,stateKapital,incomePr} = this.state;
    this.setState({
      shareUrl: getShareUrl(this.state),
      taxToPay: calculateTax({
        income: stateIncome,
        nettoFormue: stateFormue,
        finnmarksfradrag: stateFinnmark,
        married: stateMarried,
        fradrag: stateFradrag,
        kapital: stateKapital,
        incomePr: incomePr
      })})
  }


  render () {
    const {
      shareUrl,
      stateFinnmark,
      stateIncome,
      stateFormue,
      stateFradrag,
      stateMarried,
      stateKapital,
      taxToPay: {
        income = 0,
      }={}
    } = this.state;
    return (
      <div>
        {(setEnvironment()) && <Helpers/> }

        <header>
          <h1>Skattekalkulator 2018</h1>
          <h3>Skattekalkulator for allminnelig lønnsintekt*</h3>
        </header>


        <Input
          title="Skriv inn din bruttoinntekt 2018:"
          type="text"
          name="income"
          value={stateIncome || ''}
          onChange={(e)=> this.setState({stateIncome: parseInt(e.target.value,10) || 0})}
        />
        <Input
          titleright="Årlig"
          type="radio"
          value={YEARLY}
          checked={this.state.incomePr === YEARLY}
          onChange={(e) => this.setState({ incomePr: e.target.value })}
        />
        <Input
          titleright="Månedlig"
          type="radio"
          value={MONTHLY}
          checked={this.state.incomePr === MONTHLY}
          onChange={(e) => this.setState({ incomePr: e.target.value })}
        />

        <br/>
        {(this.state.incomePr === MONTHLY && income > 0) &&
          <div>Årlig inntekt: {splitNumberOnKiloUtil(income)} kr</div>
        }
        <hr/>

        <Input
          titleright="Rett til Finnmarksfradrags"
          type="checkbox"
          value="1000"
          checked={stateFinnmark}
          onChange={()=> this.setState({stateFinnmark:!stateFinnmark})}
        />
        <Input
          titleright="Gift"
          type="checkbox"
          value="1000"
          checked={stateMarried}
          onChange={()=> this.setState({stateMarried: !stateMarried})}
        />
        <br/>

        <Input
          title="Rente og kapitalinntekter"
          type="text"
          name="formue"
          value={stateKapital || ''}
          onChange={(e)=> this.setState({stateKapital: parseInt(e.target.value,10) || 0  })}
          text="Rente- og kapitalinntekter er typisk renten på bankinnskudd, avkastning på pengemarkedsfond og obligasjonsfond, samt gevinst ved salg av aksjer og aksjefond."
        />

        <br/>
        <Input
          title="Din netto formue"
          type="text"
          name="formue"
          value={stateFormue || ''}
          onChange={(e)=> this.setStsate({stateFormue: parseInt(e.target.value,10) || 0 })}
          text="Det er netto formue som skal legges inn. Fra og med skatteåret 2017 er det visse formuesobjekter som får en verdsettingsrabatt, samt at disse får tilordnet gjeld. Det er formuen etter fradraget for verdsettingsrabatten, og reduksjonsbeløpet i gjeld som skal legges inn som nettoformue."
        />

        <br/>

        <Input
          title="Fradrag (ikke minstefradrag)"
          type="text"
          name="fradrag"
          value={stateFradrag || ''}
          onChange={(e)=>this.setState({ stateFradrag:e.target.value})}
          text="Standardfradragene beregnes automatisk. Men har du egne fradrag i tillegg, føres de opp her. De vanligste fradragene er renteutgifter til lån, foreldrefradrag (typisk barnehage og SFO inntil 25.000 kroner for første barn og 15.000 for påfølgende) og pendlerfradrag. Også tap ved salg av aksjer og aksjefond regnes med her."
        />
        <hr/>
        <TaxCalculations {...this.state} />

        <Input
          title="DEL"
          type="text"
          name="del"
          onChange={() => null}
          value={`${window.location.origin}${shareUrl}`}
        />
      </div>
    );
  }
}

Skatt.propTypes = {
  stateFinnmark: PropTypes.bool,
  stateIncome: PropTypes.number,
  stateFormue: PropTypes.number,
  stateFradrag: PropTypes.number,
  stateMarried: PropTypes.bool,
  stateKapital: PropTypes.number,
  taxToPay: PropTypes.object
};

export default Skatt;

