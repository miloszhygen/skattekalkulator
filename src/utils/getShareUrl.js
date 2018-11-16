import { YEARLY } from './../helpers/setTypes'

export const getShareUrl = (state) => {
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