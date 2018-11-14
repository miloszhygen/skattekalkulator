
# Skattekalkulator
A tax calculator for normal income in Norway.

The app is created by running the create react app [create react app](https://github.com/facebook/create-react-app)


## Prerequisites
You need node version `>= 9.10` to run. If you use `nvm` run `nvm use`.

You also need [Yarn](https://yarnpkg.com/lang/en/) installed.


## Start the app in develop mode
`yarn install`

`yarn dev`

## Building the app
`yarn build`

## Testing
The app uses [jest](https://jestjs.io/) for testing.

`yarn test`

In watch mode

`yarn test:local`

### E2E tests
Running e2e tests

`yarn test:e2e"`

Running e2e tests in watch mode

`yarn test:e2e:local`


## Url parameters
[http://localhost:3000/?income=600000&formue=3500000&married=true&finnmark=true](http://localhost:3000/?income=600000&formue=3500000&married=true&finnmark=true)

#### Url parametere
- income: int
- formue: int
- married: bool
- finnmark: bool
- fradrag: int
- kapital: int
- monthly: bool

## Demo
_No set income_
[http://skattekalkulator.surge.sh](skattekalkulator.surge.sh)

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
x splitt all numbers using splitNumberOnKiloUtil
x make Calculations component work

STYLE

# Im here 
- NEXT --> add awesome and cool styling - _Lets make it popp!_
  :::> I have added scss possibilities
  React scss DOCS: https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet


REACT
x Create components for the different parts
- make e2e tests work


- share the calculator using a create link button?
  - create the URL that is necessary


- show relevant info from the calculations


### Version 2
- add all types of Skattesatser
- show monthly pay before and after tax

LOGIC
- imporve the `trinnTax` logic
- adding values to input also adds value to url
**********


FUN TO HAVE
- Slik brukes skattepengene https://www.ssb.no/offentlig-sektor/faktaside/slik-brukes-skattepengene
- add age - pensjonister / unge / vanlige?
- Særfradrag enslige forsørgere: https://www.smartepenger.no/kalkulatorer/3039-skatteberegning-2018

