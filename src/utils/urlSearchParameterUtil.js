/**
 * https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/2880929#2880929
 */

export const urlSearchParameterUtil = (query) => {
  if (!query) { return {}; }
  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [ key, value ] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, { });
};
