
# Skattekalkulator
A tax calculator for normal income in Norway.

The app is created by running the create react app [create react app](https://github.com/facebook/create-react-app)


## Prerequisites
You need node version `>= 9.10` to run. If you use `nvm` run `nvm use`.

You also need [Yarn](https://yarnpkg.com/lang/en/) installed.


## Start the app in develop mode
`yarn install`

`yarn start`

## Building the app
`yarn build`

## Testing
The app uses [jest](https://jestjs.io/) for testing.

`yarn test`


## Demo
_No set income_
[skattekalkulator.surge.sh](skattekalkulator.surge.sh)

_Set income to 50000 NOK_
[http://skattekalkulator.surge.sh/?income=50000](http://skattekalkulator.surge.sh/?income=50000)

_Set income to 648000 NOK_
[http://skattekalkulator.surge.sh/?income=648000](http://skattekalkulator.surge.sh/?income=648000)


## Resources

[Skattesatser 2018](https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skattesatser-2018/id2575161/)

[Skattekalkulator 2018](https://skattekalkulator2018.app.skatteetaten.no/)

[Smartepenger skatteberegning 2018](https://www.smartepenger.no/kalkulatorer/3039-skatteberegning-2018)




eksempel: https://www.smartepenger.no/kalkulatorer/3040-skatteberegning-for-lonnsmottakere-

## TODO
x Send an object into taxcalc function and then deconstruct the object
x Income as globale obj in test.

x add Gift/Ugift?
  x add tests

- add age - pensjonister / unge / vanlige?
- copy this -> https://www.smartepenger.no/kalkulatorer/3040-skatteberegning-for-lonnsmottakere-




- add proptypes
- imporve the `trinnTax` logic
- add input validation
- add awesome and cool styling - _Lets make it popp!_

- add all types of Skattesatser
- add possibility to select month/year calculations
  - if monthly - show yearly income in visa versa
- regex numbers to xxx xxx xxx, xx xxxx
- Slik brukes skattepengene https://www.ssb.no/offentlig-sektor/faktaside/slik-brukes-skattepengene
- show monthly pay before and after tax



- Særfradrag enslige forsørgere: https://www.smartepenger.no/kalkulatorer/3039-skatteberegning-2018


- formuesskatt https://www.smartepenger.no/kalkulatorer/3039-skatteberegning-2018


- e2e tests