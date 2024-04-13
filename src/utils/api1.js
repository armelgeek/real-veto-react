import axios from "axios";
const defaults = {
  baseURL: process.env.API_URL || "http:// http://192.168.1.1:8100/api",
  headers: () => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  },
  error: {
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong. Please check your internet connection or contact our support.",
    status: 503,
    data: {},
  },
};
const api = (method, url,hasFile, variables) =>
  new Promise((resolve, reject) => {
    let formData= variables;
    axios({
      url: `${url}`,
      method,
      headers: defaults.headers(),
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? formData : undefined,
    }).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
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
export default {
  get: (...args) => api("get", ...args),
  post: (...args) => api("post", ...args),
  put: (...args) => api("put", ...args),
  patch: (...args) => api("patch", ...args),
  delete: (...args) => api("delete", ...args),
};
