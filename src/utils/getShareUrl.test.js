import { getShareUrl } from './getShareUrl';


describe('getShareUrl', () => {
  it('get /?income=600000&formue=2000000&finnmark=true&married=false&fradrag=120000&monthly=true', () => {
    const state = {'stateFormue':'2000000','stateIncome':600000,'stateMarried':false,'stateFinnmark':true,'stateFradrag':120000,'stateKapital':0,'taxToPay':{},'incomePr':'MONTHLY'}
    const expectedUrl = '/?income=600000&formue=2000000&finnmark=true&married=false&fradrag=120000&monthly=true';
    const recievedUrl = getShareUrl(state);

    expect(expectedUrl).toEqual(recievedUrl);
  })
})
