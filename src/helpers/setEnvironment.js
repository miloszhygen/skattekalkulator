const rootWindow = (typeof window === 'object') ? window.location.hostname : global;

export default function setEnvironment () {
  if (rootWindow === 'localhost') {
    return true;
  }
  return false;
}