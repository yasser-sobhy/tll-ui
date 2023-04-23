import axios from 'axios';
import qs from 'qs';

const callApi = async (method, url, data, options = {}) => {

  const headers = {};

  const request = {
    baseURL: process.env.REACT_APP_TLL_ENDPOINT,
    url: url,
    method, data, headers
  };

  const response = await axios(request);
  return response.data;
};

const addParamsToRoute = (route, params) => {
  return params ? route + '?' + qs.stringify(params) : route
};

export const Api = {
  get: (route, params = null, options = {}) => {
    return callApi('GET', addParamsToRoute(route, params), null, options);
  },
  post: (route, data, params = null, options = {}) => {
    return callApi('POST', addParamsToRoute(route, params), data, options)
  },
  put: (route, data, params = null, options = {}) => {
    return callApi('PUT', addParamsToRoute(route, params), data, options)
  },
  patch: (route, data, params = null, options = {}) => {
    return callApi('PATCH', addParamsToRoute(route, params), data, options)
  },
  delete: (route, params = null, options = {}) => {
    return callApi('DELETE', addParamsToRoute(route, params), null, options)
  },
}