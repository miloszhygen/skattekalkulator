import { YEARLY } from './../helpers/setTypes'

// Returns a value used for creating the share url ex: /?income=600000&formue=2000000&married=true&finnmark=true&fradrag=120000
export const getShareUrl = (state) => {
  // TODO: improve
  let shareUrl = '/?'
  const {stateFormue,stateIncome,stateMarried,stateFinnmark,stateFradrag,stateKapital,incomePr} = state;
  if (stateIncome) {
    shareUrl += `income=${stateIncome}&`
  }
  if (stateFormue) {
    shareUrl += `formue=${stateFormue}&`;
  }
  if (stateFinnmark) {
    shareUrl += `finnmark=${stateFinnmark}&`;
  }
  shareUrl += `married=${stateMarried}&`;
  if (stateFradrag) {
    shareUrl += `fradrag=${stateFradrag}&`;
  }
  if (stateKapital) {
    shareUrl += `kapital=${stateKapital}&`;
  }
  if (incomePr!== YEARLY) {
    shareUrl += 'monthly=true';
  }
  return shareUrl
}