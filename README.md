
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

## Url parameters
[http://localhost:3000/?income=600000&formue=3500000&married=true&finnmark=true](http://localhost:3000/?income=600000&formue=3500000&married=true&finnmark=true)

#### Url parametere
- income: int
- formue: int
- married: bool
- finnmark: bool
- fradrag
- age



## Demo
_No set income_
[skattekalkulator.surge.sh](skattekalkulator.surge.sh)

_Set income to 50000 NOK_
[http://skattekalkulator.surge.sh/?income=50000](http://skattekalkulator.surge.sh/?income=50000)

_Set income to 648000 NOK_
[http://skattekalkulator.surge.sh/?income=648000](http://skattekalkulator.surge.sh/?income=648000)


_Set income to 648000 NOK and Formue to 3500000_
[http://skattekalkulator.surge.sh/?income=648000&formue=3500000](http://skattekalkulator.surge.sh/?income=648000&formue=3500000)





## Resources

[Skattesatser 2018](https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skattesatser-2018/id2575161/)

[Skattekalkulator 2018](https://skattekalkulator2018.app.skatteetaten.no/)

[Smartepenger skatteberegning 2018](https://www.smartepenger.no/kalkulatorer/3039-skatteberegning-2018)




eksempel: https://www.smartepenger.no/kalkulatorer/3040-skatteberegning-for-lonnsmottakere-

## TODO
CODE IMPORVEMENTS
x add proptypes
- add input validation
x e2e tests
x aitbnb - linting


STYLE
- add awesome and cool styling - _Lets make it popp!_

LOGIC
- imporve the `trinnTax` logic
- add possibility to select month/year calculations
  - if monthly - show yearly income in visa versa
- show monthly pay before and after tax
- regex numbers to xxx xxx xxx, xx xxxx
- adding values to input also adds value to url
- show relevant info from the calculations

FUN TO HAVE
- Slik brukes skattepengene https://www.ssb.no/offentlig-sektor/faktaside/slik-brukes-skattepengene
- add age - pensjonister / unge / vanlige?



- Særfradrag enslige forsørgere: https://www.smartepenger.no/kalkulatorer/3039-skatteberegning-2018



### Version 2
- add all types of Skattesatser
