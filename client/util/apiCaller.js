import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

// Simple string needed in all requests to the server. Should be replaced with something proper like Auth0
export const AUTH_TOKEN = '123456';

// Url of the API (different when running tests)
export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

// Call the API server requesting a binery file as response
export function callApiBlob(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { responseType: 'blob', timeout: 30000, 'x-auth': AUTH_TOKEN },
    method,
    body: JSON.stringify(body),
  })
    .then(response => response.blob().then(blob => ({ blob, response })))
    .then(({ blob, response }) => {
      if (!response.ok) {
        return Promise.reject(blob);
      }
      return blob;
    })
    .then(
      response => response,
      error => error
    );
}

// Try to get the CSRF token from the meta element from the page
const documentGetCsrfToken = () => {
  if (typeof document === 'undefined' || !document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content')) {
    return null;
  }
  return document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content').value;
};

// Call the API server and use JSON for content type
export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json', 'x-auth': AUTH_TOKEN, 'csrf-token': documentGetCsrfToken() },
    method,
    body: JSON.stringify(body),
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .then(
      response => response,
      error => error
    );
}
