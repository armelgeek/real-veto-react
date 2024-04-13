import axios from 'axios';
import _ from 'lodash';
import { toast } from 'react-toastify';
const defaults = {
  baseURL: process.env.API_URL || 'http://192.168.1.1:8100/api/',
  headers: () => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      "x-access-token": localStorage.getItem("user-veto"),
    };
  },
  error: {
    code: 'INTERNAL_ERROR',
    message:
      "Quelque chose s'est mal passé. Veuillez vérifier votre connexion Internet ou contacter notre support.",
    status: 503,
    data: {},
  },
};
const request = axios;
request.interceptors.response.use(
  (response) => {
   // if (response.data.success==true) {
      if (_.isUndefined(response)) {
        return [];
      } else {
        return response;
      }
   // }
  },
  (error) => {
    var status = error.response.status;
      toast.error(error.response.message)
  }
);
//console.log( user.token);
const api = (method, url, hasFile, variables) =>{
  let promise = new Promise((resolve, reject) => {
    let formData = variables;
    request({
      url: `${url}`,
      method,
      headers: defaults.headers(),
      params: method == 'get' ? variables : undefined,
      data: method !== 'get' ? formData : undefined,
    }).then(
      response => {
        console.log('response')
        if (_.isUndefined(response)) {
          resolve([]);
        } else {
          resolve(response.data);
        }
      },
      error => {
        console.log('error');
        if (error?.response) {
          if (error?.response?.data?.error) {
            reject(error?.response?.data?.error);
          } else if (error?.response.data?.errors) {
            reject(error?.response.data?.errors);
          }
        } else {
          reject(defaults.error);
        }
      }
    );
  });
  toast.promise(
    promise,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯'
    }
)
}
  
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args),
};
